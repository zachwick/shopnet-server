/**
 * SelectVehicle BackboneJS view for IOSiX Fleet Webapp
 *
 * Copyright 2014 IOSiX LLC
 * All Rights Reserved
 *
 */

// The SelectVehicleView is each option in the HTML select tag where the
// user picks the vehicle that the .IOS data file to upload corresponds to.

var SelectVehicleView = Backbone.View.extend({
	// The SelectVehicleView DOM element is an "option" HTML tag
	tagName: "option",

	// SelectVehicleView's deal with Vehicle models. Note that this is a clear
	// case of a single model having more than view. This makes sense as each
	// way of representing the same data model should be its own view. This
	// has the implication however that if one view changes a model attribute,
	// all views that are bound to the model will act upon the change.
	model: Vehicle,

	// A convenience wrapper around the UnderscoreJS template function.
	// The template for the SelectVehicleView can be found in /templates/intex.html
	template: function() {
		return _.template($("#select-vehicle-template").html());
	},

	// This method is called everytime that we create a new SelectVehicleView
	// object. You should be pretty familiar with this construct by this point in
	// the code base.
	initialize: function() {
		// The SelectVehicleView is not much more that an automagically created
		// option tag, so we don't do anything special with it other than create
		// and display it.
	},

	// Create the SelectVehicleView DOM elements based on the vehicle model and
	// the HTML template.
	render: function() {
		this.$el.html (this.template()(this.model.toJSON()));
		this.$el.attr("value",this.model.get("id"));
		return this;
	}
});
