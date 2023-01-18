
module.exports = {
    checkAdmin:  async (req, res, next) => {
        const users = require("../controllers/users.controller");
        users.findLocalUserByEmail(req, res).then((user)=>{
        if (user.rolId==7) {
            next();
            } else {
                res.status(500).json({
                    success: 0,
                    message: "User not Admin"
                });
                
            }
        }) ;
    },
    checkManager: (req, res, next) => {
        const users = require("../controllers/users.controller");
        users.findLocalUserByEmail(req, res).then((user)=>{
        if (user.rolId==9) {
            next();
            } else {
                res.status(500).json({
                    success: 0,
                    message: "User not Manager"
                });
                
            }
        }) ;
    },
    checkWaiter: (req, res, next) => {
        const users = require("../controllers/users.controller");
        users.findLocalUserByEmail(req, res).then((user)=>{
        if (user.rolId==10) {
            next();
            } else {
                res.status(500).json({
                    success: 0,
                    message: "User not Waiter"
                });
                
            }
        }) ;
    },
    checkCustomer: (req, res, next) => {
        const users = require("../controllers/users.controller");
        users.findLocalUserByEmail(req, res).then((user)=>{
        if (user.rolId==8) {
            next();
            } else {
                res.status(500).json({
                    success: 0,
                    message: "User not Customer"
                });
                
            }
        }) ;
    }
};