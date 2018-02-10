const https = require('https');

const auth = require('./auth.json');

function define(word = 'forgot', lang = 'en') {
	word = decodeURIComponent(word.toLowerCase().trim());
	console.log(word);
	const options = {
		host: 'od-api.oxforddictionaries.com',
		path: `/api/v1/entries/${lang}/${word}/`,
		method: 'GET',
		port: 443,
		headers: {
			'app_id': auth.oxford_app_id,
			'app_key': auth.oxford_app_key
		}
	};

	https.get(options, function (res) {
		let data = '';

		res.on('data', function(chunk) {
			data += chunk;
		});

		res.on('end', function() {
			console.log(data);
		});

	}).on('error', function(err) {
		console.log('Error: ' + err.message);
	});
}

module.exports = {
	define: define,
}