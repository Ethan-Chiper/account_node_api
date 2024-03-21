const Dotenv = require('dotenv');
Dotenv.config({path: 'Source/App/.env.dev'});
const environment = process.env;
module.exports = {
	DB_URL: {
		ACCOUNT_URL: environment.DB_ACCount_URL || 'mongodb://192.168.0.102:27017/account',
	},
	KONG_URL: {
		KONG: environment.KONG_URL || 'http://192.168.0.102:7001/consumers/'
	}
};