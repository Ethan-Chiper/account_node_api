const AccountModel = require('../Models/Account');

const AccountQuery = {
    /***
     * create Account
     * @param queryOptions
     * @returns {Promise<queryOptions>}
     */
    createAccount: async (queryOptions) => {
        let document = queryOptions?.document ?? {};
        let options = queryOptions?.options ?? {};
        let Account = await AccountModel.create([document], options);
        return Account[0];
    },
    /**
     * find account
     * @param {*} condition 
     * @param {*} projection 
     * @param {*} islean 
     * @returns 
     */
    findAccount: async (condition, projection, islean = true) => {
		return await AccountModel.find(condition, projection).lean(islean);
	},
};

module.exports = AccountQuery;