const express = require("express");
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.use(express.static(__dirname + '/client'))

const port = process.env.PORT || 3000

// Calculate BMI using the POST method with a JSON request and a JSON response.
app.post('/calculate-bmi', function(request, response){
	console.log('\nCalculate BMI: ' + JSON.stringify(request.body));

	// Get height from request body JSON and convert height from centimeters to meters.
	const hightInCentiMeters = request.body.heightInCentimeters;
	const heightInMeters = hightInCentiMeters * 0.01; /* 1m = 100cm */

	// Get weight from request body JSON. 
	const weightInKilograms = request.body.weightInKilograms;

	// Calculate BMI and calculate BMI rounded it to two decimal places. 
	const bmi = (weightInKilograms / (heightInMeters * heightInMeters));
	const bmiTo2DecimalPlaces = Math.round(bmi * 100) / 100;

	// Create JSON response that includes both BMI and BMI rounded to two decimal places.
	const responseJSON = JSON.stringify({ bmi:bmi, bmiRounded:bmiTo2DecimalPlaces });

	response.json(responseJSON);

	console.log('Response: ' + responseJSON);
})

app.listen(port, () => console.log(`Calculate BMI started at \'http://localhost:${port}\'\n` +
  `press Ctrl-C to terminate.`)
)

