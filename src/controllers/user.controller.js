// Important requires
const createError = require("http-errors");

/**
 * Test Function
 * @param {*} req
 * @param {*} res
 * @returns
 */
const test = (req, res) => {
    try {
        if (0) {
            throw new createError[422](
                "Error no userId/userDetails not found!"
            );
        }
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
};
