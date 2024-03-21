const {check} = require('express-validator');

const Validate = {
	/**
	 * account Validation
	 * @returns
	 */
	listValidation: () => {
		return [
			check('accountName', 'please enter the accountName').notEmpty({ignore_whitespace: true})
		];
	},
    createAccount:() => {
        return [
            check('accountName', 'please enter the accountName').notEmpty().trim(),
            check('email', 'please enter email value').notEmpty().trim(),
        ];
    }
};
module.exports = Validate;