/**
 * User BackboneJS model for Dossier Webapp
 *
 * Copyright 2014 zachwick <zach@zachwick.com>
 * Licensed under the AGPLv3 or later
 */

var User = Backbone.RelationalModel.extend({
	idAttribute: 'id',

	defaults: {
		// The username that the person signed in with
		username: "",

		// The email associated with that username
		// We currently do nothing with this data however
		email: "",

		// The privilege level that this user has:
		// 2 = Admin
		// 1 = User
		privilege: "",

		// The id of this User record in the DB
		id: ""
	},

	urlRoot: '/users/'
});

