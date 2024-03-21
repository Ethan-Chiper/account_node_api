const AccountConnection = require('./MultiConnection').getAccountDBConnection();
const timestamps = require('mongoose-timestamp');

const accountSchema = new AccountConnection.Schema({
    email: { type: String, required: true, unique: true },
    accountId: { type: String, required: true, unique: true },
    accountName: { type: String, required: true },
    appSecretToken: { type: String, required: true },
    website: { type: String }
});
accountSchema.plugin(timestamps);

const Account = AccountConnection.model('Account', accountSchema);

module.exports = Account;