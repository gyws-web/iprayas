let models = require("../../models");


/**
 * Load static page
 */
exports.jvm = async function(req, res, next) {
    res.render('pages/gyws/initiatives/jvm', {
        title:"GYWS | JVM",
    }); 
}


/**
 * Load static page
 */
exports.prayas = async function(req, res, next) {
    res.render('pages/gyws/initiatives/prayas', {
        title:"GYWS | Prayas",
    }); 
}


/**
 * Load static page
 */
exports.udyat = async function(req, res, next) {
    res.render('pages/gyws/initiatives/udyat', {
        title:"GYWS | udyat",
    }); 
}


/**
 * Load static page
 */
exports.aarohan = async function(req, res, next) {
    res.render('pages/gyws/initiatives/pfp', {
        title:"GYWS | Aarohan",
    }); 
}


/**
 * Load static page
 */
exports.kbc = async function(req, res, next) {
    res.render('pages/gyws/initiatives/kbc', {
        title:"GYWS | KGP Blood Connect",
    }); 
}