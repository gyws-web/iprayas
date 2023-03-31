let models = require("../../models");


/**
 * Load static page
 */
exports.about = async function(req, res, next) {
    res.render('pages/gyws/cms/about', {
        title:"GYWS | About Us",
    }); 
}


