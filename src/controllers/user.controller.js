// Important requires
const createError = require("http-errors");
const { createRecord, readRecord, updateRecord, deleteRecord } = require('../utils/CRUD');


/**
 * Create User function
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const createUser = async (req, res,next) => {
    try {

        /**
         * Read Record
         */
        const userPath = `Users/${req.sub}`;
        const testData = await readRecord(userPath);

        if(testData){
            throw new createError[409](
                "Error, User id has already been defined"
            );
        }

        /**
         * Create Record
         */
        const recordData = { userId: req.sub,
            name: req.name,};
        await createRecord(userPath, recordData);

        return res.status(200).send({
            message: "true",
        });
        
    } catch (error) {
        console.error(error);
        next(error);
    }
};


/**
 * Test Function
 * @param {*} req
 * @param {*} res
 * @returns
 */
const test = async (req, res,next) => {
    try {
        if (0) {
            throw new createError[422](
                "Error no userId/userDetails not found!"
            );
        }

        const response = {
            sub:"1234",
            name:"Test2"
        }


        /**
         * Create Record
         */
        const recordPath = 'Users/'+ response.sub;
        const recordData = { userId: response.sub,
            name: response.name,};
        await createRecord(recordPath, recordData);

        /**
         * Read Record
         */
        const recordPath2 = `Users/${response.sub}`;
        const recordData2 = await readRecord(recordPath2);

        console.log(recordData2)

        const response2 = {
            sub:"1234",
            name:"Test5"
        }

        /**
         * Update Record
         */
        const recordPath3 = 'Users/'+ response.sub;
        const recordData3 = { userId: response2.sub,
            name: response2.name,};
        await updateRecord(recordPath3, recordData3);

        /**
         * Delete Record
         */
        const recordPath4 = `Users/${response2.sub}`;
        await deleteRecord(recordPath4);

        return res.status(200).send({
            message: "true",
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

module.exports = {
    test,
    createUser,
};
