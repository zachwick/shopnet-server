/**
 * Datapoint BackboneJS model for Dossier Webapp
 *
 * Copyright 2014 zachwick <zach@zachwick.com>
 * Licensed under the AGPLv3 or later
 */

var Datapoint = Backbone.RelationalModel.extend({
	// The object's attribute to use a unique identifier
	idAttribute: 'id',

	defaults: {
		// The percentage of methane in the sample
		methane: 0.00,

		// The percentage of CO2 in the sample
		co2: 0.00,

		// The temperature of the sample
		temp: 0.00,

		// The pressure of the sample
		pressure: 0.00,

		// Ambient temp
		amb_temp: 0.00,

		// Pipe temp
		pipe_temp: 0.00,

		// Relative Humidity
		humidity: 0.00,

		// Timestamp
		timestamp: 0
	},

	// The REST API endpoint for Datapoint objects is at the URI fragment
	// "/datapoints/" and the URI for a particular Datapoint is "/datapoints/<id>"
	urlRoot: '/datapoints/'
});

// Definition of a Backbone Collection made up of Datapoint objects
// This is needed for the Node -> Datapoint relationship
var Datapoints = Backbone.Collection.extend({
	model: Datapoint,
	url: '/sites/'
});
