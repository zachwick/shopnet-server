/**
 * SelectUser BackboneJS view for Dossier
 *
 * Copyright 2014 zachwick <zach@zachwick.com>
 * Licensed under the AGPLv3 or later
 **/

// The SelectUserView is used for each option in the HTML select tag where the
// user picks which the User that the newly created Site belongs to.

var SelectUserView = Backbone.View.extend({
	// The SelectUserView DOM element is an "option" HTML tag
	tagName: "option",

	// SelectUserView's deal with User models. This is for the same reason that
	// SelectSiteView's deal with Site models.
	model: User,

	// A convenience wrapper around the UnderscoreJS template function.
	// The template for the SelectUserView can be found in /templates/index.html
	template: function() {
		return _.template($("#select-user-template").html());
	},

	// This method is called every time that we create a new SelectUserView
	// object. This should be a very familiar construct by now.
	initialize: function() {
		// The SelectUserView is not much more than an automagically created
		// option tag, so we don't need to do anything special with it other
		// than create and display it.
	},

	// Create the SelectUserView DOM elements based on the User model and
	// the HTML template.
	render: function() {
		this.$el.html (this.template()(this.model.toJSON()));
		this.$el.attr("value", this.model.get("id"));
		return this;
	}
});
