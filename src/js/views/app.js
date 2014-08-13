var AppView = Backbone.View.extend({
	// A Sizzle/jQuery selector for the DOM element that an AppView object
	// uses to interact with the DOM
	el: "#app-container",

	// Note that this is a fancy way to wrap around the UnderscoreJS template
	// function. We will use this AppView.template function to manipulate the
	// DOM
	template: function() {
		return _.template($("#app-template").html());
	},

	// Define any UI events and the functions that are bound to them
	events: {
		'submit #add-vehicle-form': 'newVehicle',
		'submit #add-user-form': 'newUser',
		'click .logout-button': 'doLogout',
		'click .add-node-button': 'showAddNodeModal',
		'click .upload-datafile-button': 'showUploadDataModal',
		'click .add-user-button': 'showAddUserModal',
		'click .x-button': "closeModal"
	},

	showAddUserModal: function(e) {
		this.$("#modal-background").show();
		this.$("#add-user-modal").show();
	},

	closeModal: function(e) {
		// Clear any input elements except submit buttons
		this.$(".modal-wrapper:visible input:not([type='submit'])").val("");
		// Hide the semi-opaque background
		this.$("#modal-background").hide();
		// Hide any visible modal-wrapper divs
		this.$(".modal-wrapper:visible").hide();
	},

	showAddNodeModal: function(e) {
		this.$("#modal-background").show();
		this.$("#add-node-modal").show();
	},

	showUploadDataModal: function(e) {
		this.$("#modal-background").show();
		this.$("#upload-data-modal").show();
	},

	// This method directs the browser to '/logout' which logs out the user
	// and then triggers the whole create session/login flow.
	doLogout: function(e) {
		window.location = "/logout";
	},

	// This AppView.initialize function is called whenever we create a new
	// AppView object; Think of it kind of like a C++ constructor.
	initialize: function(options) {
		// The a Backbone collection of Vehicle models
		//this.vehicles = new Vehicles();
		this.sites = new Sites();

		this.user = new User();

		// A reference to the OSM map view.
		this.map = null;

		// An object that has a property for each Datapoint model shown on
		// the OSM map view. The key for each property is the Datapoint model's
		// cid attribute, a unique identifier from the extension of
		// Backbone.Model that is unique across all of the Backbone models that
		// we use.
		// NB: the cid is created at runtime, so don't use it for anything 
		//     important.
		this.mapMarkers = {};

		// When we 'update' or 'change' our collection of vehicles, call the
		// AppView.populateMap function. Look at the BackboneJS docs for more
		// info.
		this.listenTo(this.sites, 'update change', this.populateMap);

		// When we 'add' or 'remove' from our collection of vehicles, call the
		// AppView.render method. Look at the BackboneJS docs for more info.
		this.listenTo(this.sites, 'add remove', this.render);

		// When we 'change' the user model, re-render
		this.listenTo(this.user, 'change', this.render);

		// Call the AppView.render method to initialize the DOM
		this.render();

		// Make sure that our collection of Site objects is up to date.
		this.sites.fetch();

		// Make sure that our user object reflects the currently logged-in user
		this.user.fetch();

		// Ensure that 'this' plays nicely inside each of our AppView's methods
		_.bindAll(this,
		          "addOneSite",
		          "addAllSites",
		          "newSite",
		          "render",
		          "populateMap",
		          "createMap",
		          "drawMapMarker"
		         );
	},

	// Create a new VehicleView and add it to the displayed list of vehicles
	// @param vehicle - A Vehicle model to create a view for.
	addOneSite: function(site) {
		var view = new SiteView({ model: site });
		this.$("#vehicle-list").append(view.render().el);
		// The SelectVehicleView was previously used in the upload form to
		// select which vehicle the datafile belongs to. That info now comes
		// from correctly parsing the VIN. To add it back, uncomment the two
		// lines below and the select element in the index.html template
		/*var selectView = new SelectVehicleView({ model: vehicle });
		this.$(".upload-vehicle-select").append(selectView.render().el);*/
	},

	// Create a new VehicleView for each Vehicle model in our vehicles
	// collection. We do this by calling AppView.addOneVehicle for each model.
	addAllSites: function() {
		this.sites.each(this.addOneSite, this);
	},

	newUser: function(e) {
		e.stopPropagation();
		e.preventDefault();

		if (this.$("input[name='password']").val() == this.$("input[name='confirm']").val()) {
			var newUser = new User({
				username: this.$("input[name='username']").val(),
				email: this.$("input[name='email']").val(),
				password: this.$("input[name='password']").val(),
				privilege: this.$("#add-user-form > option:selected").val()
			});
			newUser.save();
		}

		this.closeModal();
	},

	// Add a new vehicle to the database
	// @param e - the Event object that triggered AppView.newVehicle being
	//            called.
	newSite: function(e) {
		e.stopPropagation();
		e.preventDefault();

		// MAKE is defined in bootstap.js
		var parsedMake = MAKE.indexOf (this.$("input[name='make']").val());

		// Create a new Vehicle model with the data from the form inputs
		// NB: We don't set an 'id' because that is generated automatically
		//     by the database insertion and passed back to us.
		/*var newSite = new Site({
			make: parsedMake,
			model: this.$("input[name='model']").val(),
			year:  this.$("input[name='year']").val(),
			vin:   this.$("input[name='vin']").val(),
			odom:  this.$("input[name='odom']").val()
		});
		 */
		this.closeModal();

		// Don't allow empty inputs to be submitted
		// TODO: implement some kind of error messaging.
		/*if (newVehicle.get("model") != "" && newVehicle.get("year") != "" &&
		    newVehicle.get("vin") != "" && newVehicle.get("odom") != "") {

			// This is the actual AJAX request that saves the new Vehicle
			newVehicle.save({},{
				// The 'success' handler only fires on non-error codes
				success: _.bind(function(model,response,collection) {
					// Simply adding the new Vehicle model to our collection
					// is enough because then the event bindings that were
					// defined in AppView.initialize take over
					this.vehicles.add(model);
				},this)
			});
		}*/
	},
	
	// This method is the access point of all DOM manipulation by the
	// AppView object
	render: function() {
		this.$el.html(this.template()({privilege: this.user.get("privilege")}));
		this.addAllVehicles();
		this.createMap();
		this.populateMap();
	},

	// This method creates a L.map object centered on Ann Arbor, MI
	// This method has the side effect of loading a map tile set
	// and displaying a blank map that can be interacted with.
	createMap: function() {
		this.map = L.map('map-container', {
			layers: MQ.mapLayer(),
			center: [42.24558,-83.747088],
			zoom: 12
		});
	},

	// This method loops through each Trip model of each Vehicle model and
	// for every Trip that has a truthy "display" attribute, calls the
	// AppView.drawMapMarker method passing each Datapoint model of the Trip
	// model in succession.
	populateMap: function() {
		_.each(this.mapMarkers, _.bind(function(marker) {
			this.map.removeLayer(marker); 
		},this));

		this.vehicles.each(_.bind(function(vehicle) {
			if (vehicle.get("display")) {
				if (vehicle.get("trips").length) {
					vehicle.get("trips").each(_.bind(function(trip) {
						if (trip.get("display")) {
							if (trip.get("datapoints").length && typeof trip.get("datapoints").each !== "undefined") {
								trip.get("datapoints").each(this.drawMapMarker, this);
							}
						}
					},this));
				}
			}
		}, this));
	},

	// This method takes a Datapoint model and draws the corresponding map marker
	// NB: The key that is created in the mapMarkers object is the unique cid that
	//     Backbone creates for each new model. You should not ever use this key as
	//     it is created at runtime and could be different each time the JS runs.
	drawMapMarker: function(datapoint) {
		this.mapMarkers[datapoint.cid] = L.marker( [datapoint.get('lat'), datapoint.get('lon')]).addTo(this.map);

		var view = new DatapointView({ model: datapoint });
		this.mapMarkers[datapoint.cid].bindPopup(view.render().el);
	}
});
