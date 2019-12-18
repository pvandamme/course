const request = require('request')

const forecast = (latitude, longitude, callback) => {
	const url = "https://api.darksky.net/forecast/cdf8985e0c833c4b96cc6f525dd8a684/" + encodeURIComponent(latitude) +  ","  + encodeURIComponent(longitude) + "?lang=fr&units=ca"

	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback('Unable to connect with weather service !', undefined)
		} else if (body.error) {
			callback('Unable to find location', undefined)
		} else {
			callback(undefined, body.daily.data[0].summary + ' Il fait actuellement ' + body.currently.temperature + ' °C et il y a ' + Number((body.currently.precipProbability * 100).toFixed(1)) + "% de chance qu'il pleuve")
		}
	})
}

module.exports = forecast