/**
 * Site BackboneJS view for Dossier
 * 
 * Copyright 2014 zachwick <zach@zachwick.com>
 * Licensed under the AGPLv3 or later
 **/

var SiteView = Backbone.View.extend({
	// VehicleView DOM elements are "li" tags
	tagName: "li",

	// VehicleView's deal with Vehicle models.
	// This is considered by all involved, a very smart thing.
	model: Site,

	// A wrapper around the Underscore template function so that
	// we can use it more easily.
	template: function() {
		return _.template($("#site-template").html());
	},

	// Here we are binding any UI events that we are interested in
	// NB: The toggleEditingState function is not implemented, so there is
	//     currently no way to edit a site except via the database.
	events: {
		'click span:not(.delete):not(.edit):not(.not-name):not(.node-display)': 'toggleDisplaySite',
		'click .delete': 'deleteSelf',
		'click .edit': 'toggleEditingState'
	},

	// This method calls the REST API DELETE method which surprisingly,
	// deletes the corresponding site record from the database.
	deleteSelf: function(e) {
		e.stopPropagation();
		e.preventDefault();
		this.model.destroy();
	},

	// This is not yet implemented, but the idea is to change all of the
	// site information fields into inputs and
	// add a save button that calls this.model.save() when clicked. This means
	// that a new event binding needs to be added for this view.
	toggleEditingState: function(e) {

	},

	// This method opens and closes the row corresponding to this site in the
	// site list.
	// The actual opening/closing is done by changing the "display" attribute on
	// the model. In the 'initialize' method for this view, we bind the 'render'
	// method to any change event on any of the model's attributes. This has the
	// effect of re-rendering the VehicleView when we change the "display"
	// attribute. In the template for the SiteView, there is a ternary clause
	// around the "display" that toggles a CSS class. This allows the user's 
	// browser to use its CSS rendering to do the visual change instead of its 
	// javascript engine - this results in better performance.
	toggleDisplaySite: function(e) {
		e.stopPropagation();
		e.preventDefault();
		this.model.set({ display: !this.model.get("display") });
		if (this.model.get("display")) {
			this.model.fetch();
		}
	},

	// This SiteView.initialize function is called whenever we create a new
	// VehicleView object; Think of it kind of like a C++ constructor.
	initialize: function() {
		// Any time that any attribute of this view's model changes, call the
		// VehicleView.render method.
		this.listenTo (this.model, "change", this.render);

		// When the model for this view emits a "destroy" event (meaning that it
		// got deleted), then call this.remove which is a function defined in
		// jQuery. Look at the jQuery documentation for more info.
		this.listenTo (this.model, "destroy", this.remove);

		// Ensure that 'this' is bound correctly in each of the VehicleView's
		// methods.
		_.bindAll(this,
		          "renderNodes",
		          "renderOneNode",
		          "render",
		          "toggleDisplaySite",
		          "deleteSelf"
		         );
	},

	// In this method, we call SiteView.renderOneNode for each node that is
	// associated with this SiteView's Site model.
	renderNodes: function() {
		// Dafuq? Why is this guard needed at all? .each should be able to
		// handle being called on an empty array; Damn javascript...
		if (this.model.get("nodes").length && typeof this.model.get("nodes").each !== "undefined") {
			this.model.get("nodes").each(this.renderOneNode, this);
		}
	},

	// This method creates a new NodeView for each Node model and puts the
	// created DOM elements into the list of nodes for this SiteView.
	renderOneNode: function(node) {
		var view = new NodeView({ model: node });
		this.$(".site-nodes").append(view.render().el);
	},

	// Create/Manipulate the DOM in order to create and display the SiteView
	render: function() {
		this.$el.html (this.template()(this.model.toJSON()));
		this.$el.toggleClass('state-expanded',this.model.get("display"));
		this.renderNodes();
		return this;
	}
});
