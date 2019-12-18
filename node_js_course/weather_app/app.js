const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

geocode("Asnijbkfuabhjkwhifbhawkjn", (error, data) => {
		if (error) {
			return console.log(error);
		}
		forecast(data.latitude, data.longitude, (error, dataa) => {
			if (error) {
				return console.log(error);
			}
			console.log(data.location + " :\n");
			console.log(dataa);
		});
	}
);