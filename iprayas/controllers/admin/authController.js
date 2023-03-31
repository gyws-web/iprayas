let models = require("../../models");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");



exports.loadLoginPage = async function(req, res, next) {
    res.render('pages/admin/auth/login', {title:"Admin Login | GYWS"}); 
}


/**
 * Check login of the admin/operator users
 */
exports.checkLogin = async function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    if(username != '' && password != '') {
        var operator = await models.Operator.findOne({where:{[Op.or]: [{ email: username }, { username: username }],active:"Enable"}});
        if(operator) {
            bcrypt.compare(password, operator.password, function(err, result) {
                if(err) {
                    res.render('pages/admin/auth/login', {title:"Admin Login | GYWS", success:false, message: "Invalid username and password!"});
                } 
                
                if(result) {
                    req.session.operator = operator; 
                    return res.redirect('/admin/dashboard');
                } else {
                    res.render('pages/admin/auth/login', {title:"Admin Login | GYWS", success:false, message: "Invalid username and password!"});
                }
            });
        } else {
            res.render('pages/admin/auth/login', {title:"Admin Login | GYWS", success:false, message: "Invalid username and password!"});
        }
    } else {
        res.status(200).send({success:false, message:"All fields are mandatory"});
    }
}



/**
 * Logout admin from the system and destroy session
 */
exports.logout = function(req, res, next) {
    //sess = req.session;
    
    req.session.destroy(function(err) {
        if(err){
            msg = 'Error destroying session';
            res.json(msg);
        }else{
            msg = 'Session destroy successfully';
            console.log(msg)
            return res.redirect('/admin/login');
        }
    });
}
