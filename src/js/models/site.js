/**
 * Site BackboneJS model for Dossier Webapp
 *
 * Copyright 2014 zachwick <zach@zachwick.com>
 * Licensed under the AGPLv3 or later
 **/

var Site = Backbone.RelationalModel.extend({
	idAttribute: 'id',

	// A 'Site' has many 'Node' child nodes
	// This "relation" key (and related functionality) comes from the
	// 'backbone-relational.js' library.
	relations: [{
		type: Backbone.HasMany,
		key: "nodes",
		relatedModel: "Node",
		reverseRelation: {
			key: "site_id",
			// You need to be careful with includeInJSON so that when
			// you try and serialize a "Site" object with children to
			// a JSON string, you don't get a cyclic reference.
			includeInJSON: "id"
		}
	}],
	defaults: {
		// Name of the site
		name: "",
		display: false
	},
	
	// A URI fragment that corresponds to the REST API's URL for the Site data
	// objects. Because 'idAttribute' is defined as the 'id', attirbute, the URL
	// for a Site Backbone object is "/sites/<id>"
	urlRoot: '/sites/'
});

// Definition for a Backbone Collection of Site models

var Sites = Backbone.Collection.extend({
	model: Site,
	url: '/sites/'
});
