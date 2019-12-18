const request = require("request");

const geocode = (address, callback) => {
	const url =	"https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1Ijoic3BpdG94IiwiYSI6ImNrMnFsMjhiczBld2wzaGxuMnlpdzNoeGoifQ.feZj9o0nzLcrborAmSQaPA&limit=1&language=french";

	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback("Unable to connect with weather service !", undefined);
		} else if (body.features.length === 0) {
			callback("Unable to find location", undefined);
		} else {
			callback(undefined, {
				latitude: body.features[0].center[1],
				longitude: body.features[0].center[0],
				location: body.features[0].place_name
			});
		}
	});
};

module.exports = geocode
