/**
 * Datapoint BackboneJS view for IOSiX Fleet Webapp
 *
 * Copyright 2014 IOSiX LLC
 * All Rights Reserved
 *
 */

// The DatapointView is the information bubble that appears when a map
// marker gets a click event.

var DatapointView = Backbone.View.extend({
	// DatapointView DOM elements are div's.
	tagName: "tr",

	// DatapointView's deal with Datapoint models. This makes sense.
	model: Datapoint,

	// A conveniece wrapper around the UnderscoreJS template function.
	// The structure of the template can be found in /templates/index.html
	template: function() {
		return _.template($("#datapoint-template").html());
	},

	// There are no UI events bound to the DatapointView.
	// The mapMarker click event that displays the information bubble is
	// defined and bound in the AppView. This is because those events are
	// using the Leaflet API, so it made sense to put them there.
	events: {

	},

	// The DatapointView.initialize method is called whenever we create a
	// new DatapointView object.
	initialize: function() {
		// When any attribute of this view's model changes, call the view's
		// 'render' method
		this.listenTo (this.model, "change", this.render);

		// When this view's model emits a 'destroy' signal, call the view's
		// 'remove' method. This is basically a BackboneJS wrapper around
		// jQuery's 'remove' method.
		this.listenTo (this.model, "destroy", this.remove);
	},

	// Create and manipulate the DOM to create and display the DatapointView.
	render: function() {
		this.$el.html (this.template()(_.extend(this.model.toJSON(),{ node_location: (this.model.get("node_id")).get("node_location")})));
		return this;
	}
});
