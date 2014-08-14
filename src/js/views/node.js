/**
 * Node BackboneJS view for Dossier
 *
 * Copyright 2014 zachwick <zach@zachwick.com>
 * Licensed under the AGPLv3 or later
 *
 */

var NodeView = Backbone.View.extend({
	// NodeView DOM elements are 'li' tags.
	tagName: "li",

	// The NodeView object deals with Node models.
	model: Node,

	// An easy to use wrapper around the Underscore template function.
	template: function() {
		return _.template($("#node-template").html());
	},

	// Binding UI events that we care about to NodeView methods
	events: {
		"click .node-display": "toggleDisplayNode"
	},

	// The NodeView.initialize method is called whenever we create a new
	// NodeView object. You can think of if like a C++ constructor.
	initialize: function() {
		// We don't do a whole lot with this view since Nodes are kind of
		// an artificial construct anyway which only exist to have a default
		// grouping of Datapoints that correspond to a Site.
	},

	// This method is called any time that the .node-display checkbox is clicked
	// If the box is checked, we get all of the Datapoint child nodes for this
	// node. If the box is not checked, we don't fetch anything. In either case
	// we call the AppView.populateDataTable method in order to create table
	// records.
	toggleDisplayNode: function(e) {
		this.model.set({ display: this.$("input[name='node-display']").is(":checked") });
		if (this.model.get("display")) {
			this.model.fetch({
				success: _.bind(function(model, response, jqXHR) {
					App.populateDataTable();
				},this)
			});
		} else {
			App.populateDataTable();
		}
	},

	// Create/Manipulate the DOM in order to create and display the TripView.
	render: function() {
		this.$el.html (this.template()(this.model.toJSON()));
		return this;
	}
});
