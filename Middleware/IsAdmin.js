const AppErr = require("../Helper/AppError");
const verifyToken = require("../Helper/VerifyToken");
const Adminmodel = require("../Modals/Admin");


const IsAdmin = async (req, res, next) => {
    try {
        let { token } = req.headers;
        if (!token) {
            return next(new AppErr("Unauthorized User", 401));
        }
        let { id } = await verifyToken(token);
        req.user = id;

        let user = await Adminmodel.findById(id);
        if (!user) {
            return next(new AppErr("Invailed Token", 401));
        }

        return next()
    } catch (error) {
        return next(new AppErr(error.message, 500));
    }
};

module.exports = IsAdmin;
