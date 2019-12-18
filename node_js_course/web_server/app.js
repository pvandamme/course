const express = require('express')
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

app = express()

app.use(express.static('public'))

app.get('/weather', (req, res) => {
	if (!req.query.adress) {
		return res.send({ error: "You must enter an adress !" })
	}
	geocode(req.query.adress, (error, { latitude, longitude, location } = {}) => {
		if (error) {
			return res.send({ error });
		}
		forecast(latitude, longitude, (error, data) => {
			if (error) {
				return res.send({ error });
			}
			res.send({
				forecast: data,
				location,
			})
		})
	})
})

app.get('*', (req, res) => {
	res.send('404 Error')
})

app.listen(8080, () => {
	console.log('Server up and running on port 8080')
})