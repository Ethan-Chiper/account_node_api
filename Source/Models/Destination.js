const DestinationConnection = require('./MultiConnection').getDestinationDBConnection();
const timestamps = require('mongoose-timestamp');

const destinationSchema = new DestinationConnection.Schema({
    accountId: { type: String, required: true },
    url: { type: String, required: true },
    httpMethod: { type: String, required: true },
    headers: { type: Object, required: true }
});
destinationSchema.plugin(timestamps);

const Destination = DestinationConnection.model('Destination', destinationSchema);

module.exports = Destination;
