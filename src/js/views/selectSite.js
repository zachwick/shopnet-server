/**
 * SelectSite BackboneJS view for Dossier
 *
 * Copyright 2014 zachwick <zach@zachwick.com>
 * Licensed under the AGPLv3 or later
 *
 */

// The SelectSiteView is each option in the HTML select tag where the
// user picks the site that the data file to upload corresponds to.

var SelectSiteView = Backbone.View.extend({
	// The SelectSiteView DOM element is an "option" HTML tag
	tagName: "option",

	// SelectSiteView's deal with Site models. Note that this is a clear
	// case of a single model having more than view. This makes sense as each
	// way of representing the same data model should be its own view. This
	// has the implication however that if one view changes a model attribute,
	// all views that are bound to the model will act upon the change.
	model: Site,

	// A convenience wrapper around the UnderscoreJS template function.
	// The template for the SelectSiteView can be found in /templates/intex.html
	template: function() {
		return _.template($("#select-site-template").html());
	},

	// This method is called everytime that we create a new SelectSiteView
	// object. You should be pretty familiar with this construct by this point in
	// the code base.
	initialize: function() {
		// The SelectSiteView is not much more that an automagically created
		// option tag, so we don't do anything special with it other than create
		// and display it.
	},

	// Create the SelectSiteView DOM elements based on the vehicle model and
	// the HTML template.
	render: function() {
		this.$el.html (this.template()(this.model.toJSON()));
		this.$el.attr("value",this.model.get("id"));
		return this;
	}
});
