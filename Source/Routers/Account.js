const express = require('express');
const Router = express.Router();
const {sendFailureMessage, sendSuccessData} = require('../App/Responder');
const AccountController = require('../Controllers/AccountController');
const {isEmpty} = require('../Helpers/Utils');

Router.post('/create', async (request, response) => {
    try {
        let hasErrors = validationResult(request);
        if (hasErrors.isEmpty()) {
            let {error, message, data} = await AccountController.create(request?.body);
            if (!isEmpty(data) && error === false) {
                return sendSuccessData(response, message, data);
            }
        } else {
            return sendFailureMessage(response, hasErrors?.errors[0]?.msg, 422);
        }
        return sendFailureMessage(response, message, 400);
    } catch (error) {
        return sendFailureMessage(response, error, 500);
    }
});

Router.get('/list/:accountId?', listValidation(), async (request, response) => {
    try {
        let hasErrors = validationResult(request);
        if (hasErrors.isEmpty()) {
            let {error, message, data} = await AccountController.list(request?.query, request?.params?.productId,);
            if (!isEmpty(data) && error === false) {
                return sendSuccessData(response, message, data);
            }
        } else {
            return sendFailureMessage(response, hasErrors?.errors[0]?.msg, 422);
        }
        return sendFailureMessage(response, message, 400);
    } catch (error) {
        return sendFailureMessage(response, error, 500);
    }
});


Router.get('/:accountId/destinations', AccountController.getDestinations);

module.exports = Router;