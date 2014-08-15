/**
 * Node BackboneJS model for Dossier Webapp
 *
 * Copyright 2014 zachwick <zach@zachwick.com>
 * Licensed under the AGPLv3 or later
 **/

var Node = Backbone.RelationalModel.extend({
	// The attribute that uniquely identifies each instance
	idAttribute: 'id',

	// A 'Node' has many 'Datapoint' child nodes
	// This "relation" key (and related functionality) comes from the
	// 'backbone-relational.js' library.
	relations: [{
		type: Backbone.HasMany,
		key: "datapoints",
		relatedModel: "Datapoint",
		// When serializing a 'Node' object into a JSON representation, be aware
		// of any cyclic references.
		reverseRelation: {
			key: "node_id",
			includeInJSON: "id"
		}
	}],
	defaults: {
		// Unique identifier for each Node object
		id: "",
		
		// ID/label that is unique to the well head at a particular site
		well_id: "",

		// A key to a "Site" object unique identifier
		site_id: "",

		// If truthy, the Datapoint objects that are children of this Node
		// object will be shown.
		display: false,

		// Latitude of the Node's physical position
		lat: 0.00,

		// Longitude of the Node's physical position
		lon: 0.00,

		// MAC address
		macaddr: 0
	},
	
	// A URI fragment that corresponds to the REST API's URL of the endpoint
	// for Node data objects
	urlRoot: '/nodes/'
});

// Definition for a Backbone Collection of Node models.
// This is (probably) required for the Site->Node relationship to work.
// But, if it is not needed for that purpose, it makes a group of Node
// objects easier to work with.
var Nodes = Backbone.Collection.extend({
	model: Node,
	url: '/nodes/'
});
