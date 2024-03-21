const {todayDate, endDate, dateFinder,getNanoId, networkCall, isEmpty} = require('../Helpers/Utils');
const {createUserAndTokenInKong} = require('../Helpers/KongUtils');
const {createAccount, findAccount} = require('../Repository/AccountRepositary');
const AccountModel = require('../Models/Account');

const AccountController = {
    /***
     * create account
     * @param requestData
     * @returns {Promise<{data: *, error: boolean, message: *}|{error: boolean, message: string}>}
     */
    create: async (requestData) => {
        try {
            let uniqeID = 'acc_' + getNanoId();
            let requestObject = {
                account_id: uniqeID,
                email: requestData?.email,
                accountName: requestData?.accountName,
                appSecretToken: requestData?.appSecretToken,
                website: requestData?.website
            };
            console.log(1, requestObject);
            if (isEmpty(requestObject)) {
                return {
                    error: true,
                    message: 'Request data is not found',
                    data: undefined
                }
            }
            let account = await createAccount({document:requestObject,options: {lean: false}});
            if (isEmpty(account)) {
                return {
                    error: true,
                    message: 'account data is not saved properly',
                    data: undefined
                };
            }
            let userId = 'account' + '_' + account.account_id;
            await createUserAndTokenInKong(userId, (token) => {
                if (token)
                    console.log('token', token);
                return {error: false, message: 'consumer account_id created successfully'};
            });
            return {
                error: false,
                message: 'account created successfully',
                data: product
            };
        } catch (error) {
            return {
                error: true,
                message: error,
                data: undefined
            };
        }
    },

    /**
     * account list
     * @param {*} query 
     * @param {*} account_id 
     * @returns 
     */
    list: async(query, account_id) => {
        try{
            let queryObject = {};
			let limit = query?.limit ? Number.parseInt(query?.limit) : 20;
			let page = query?.page ? Number.parseInt(query?.page) : 1;
			if (query?.account_id) queryObject['account_id'] = query?.account_id;
			if (query?.name) queryObject['name'] = query?.name;
			if (query?.status) queryObject['status'] = query?.status;
			if (query?.from_date || query?.to_date || query.date_option) {
				queryObject['createdAt'] = dateFinder(query);
			}
            if (account_id) {
				queryObject['account_id'] = account_id;
			}
            let AccountData = await findAccount(queryObject)
				.limit(limit)
				.skip((page - 1) * limit)
				.sort({_id: -1})
				.lean();
            if(isEmpty(AccountData)) {
                return {
					error: true,
					message: 'Account list is not found',
					data: undefined
				};
            }
            return {
				error: false,
				message: 'Account list',
				data: AccountData
			};
        }catch(error){
            return {
				error: error,
				message: 'Account list is not available',
				data: undefined
			};
        }  
    },
};
module.exports = AccountController;

