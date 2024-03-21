const mongoose = require('mongoose');
const Config = require('../App/Config');
const DB_URL = Config.DB_URL;
const MultiDBConnection = {
	establish: async (Express) => {
		return await new Promise(async (resolve) => {
			let accountDBCheck = false;
			let destinationDBCheck = false;

            mongoose.set('strictQuery', true);
			try {
                mongoose.connect(DB_URL.ACCOUNT_URL, {
                    serverSelectionTimeoutMS: 3000,
                    socketTimeoutMS: 30000,
					useNewUrlParser: true,
					useUnifiedTopology: true
                });
				console.log('account database connection established');
				accountDBCheck = true;
			} catch (error) {
				throw error;
			}
            mongoose.set('debug', true);

			mongoose.set('strictQuery', true);
			try {
                mongoose.connect(DB_URL.ACCOUNT_URL, {
                    serverSelectionTimeoutMS: 3000,
                    socketTimeoutMS: 30000,
					useNewUrlParser: true,
					useUnifiedTopology: true
                });
				console.log('destination database connection established');
				destinationDBCheck = true;
			} catch (error) {
				throw error;
			}
            mongoose.set('debug', true);

			resolve([accountDBCheck, destinationDBCheck]);
		})
			.then(() => {
				Express.listen('2072', () => {
					console.log('server is running in 2072');
				});
			})
			.catch((error) => {
				throw error;
			});
	},
	getAccountDBConnection: () => {
		return mongoose;
	},
	getDestinationDBConnection: () => {
		return mongoose;
	}
};
module.exports = MultiDBConnection;