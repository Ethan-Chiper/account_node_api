const Express = require('express');
const App = Express();
const bodyParser = require('body-parser');
App.use(bodyParser.json());
/***------------------------------------------------------------------------------------------*/
App.use('/api/account', require('./Routers/Account'));
App.use('/api/destination', require('./Routers/Destination'));
/***-----------------------------------------------------------------------------------------*/
require('./Models/MultiConnection').establish(App);
module.exports = App;