let models = require("../../../models");
const { Op } = require("sequelize");
const multiparty = require('multiparty'); 
const fs = require("fs-extra");
const Sequelize = require('sequelize');
const helpers = require("../../../helpers/helper_functions");



/**
 * Load the blog form
 * Create new or update existing blog
 */
exports.load = async function(req, res, next) {
    var aboutus_details = "";
        try {
            aboutus_details = await models.AboutUs.findOne({
                attributes:{exclude:["createdAt", "createdBy", "updatedAt", "updatedBy"]},
                where: {aboutus_id:1}
            });
        } catch(error) {
            return res.send(error);
        }

    res.render('pages/admin/website_update/aboutus/form', 
    {
        title:"About Us | GYWS",
        aboutus_details: aboutus_details,
        s_msg: req.flash('info'),
        e_msg: req.flash('err')
    });
}




/**
 * Save new blog or update the existing blog
 */
exports.saveOrUpdate = async function(req, res) {
    var form = new multiparty.Form();
    form.parse(req, async function(err, fields, files) {
        var aboutus_id = fields.aboutus_id[0];
        var who_we_are = fields.who_we_are[0];
        var our_history = fields.our_history[0];
        var our_vision = fields.our_vision[0];
        var our_mission = fields.our_mission[0];
        var founders_message = fields.founders_message[0];
        console.log(aboutus_id,who_we_are,our_history);

            if(aboutus_id == '') {  //Insert new record
                
                await models.AboutUs.create({
                    who_we_are: who_we_are, 
                    our_history: our_history, 
                    our_vision: our_vision, 
                    our_mission: our_mission,
                    founders_message: founders_message,
                    createdBy: 1
                }).catch(function(error) {
                    return res.send(error);
                });
            } else { //Update existing record
            
                await models.AboutUs.update({
                    who_we_are: who_we_are, 
                    our_history: our_history, 
                    our_vision: our_vision, 
                    our_mission: our_mission,
                    founders_message: founders_message,
                    updatedBy: 1
                },{where:{aboutus_id:aboutus_id}});
                

            }
            return res.redirect('/admin/website-update/aboutus');
    });
    
}









/**
 * Delete blog record one at a time
 */
/* exports.delete = async function(req, res, next) {
    if( typeof res.locals.media_blog   !=='undefined' && res.locals.media_blog   =='Yes'){
    var blog_id = req.body.blog_id;
  
    if(typeof blog_id !== 'undefined' && blog_id > 0) {
        try {
            await models.blog.destroy({where:{blog_id:blog_id}});
            req.flash('info', "blog successfully deleted")
        } catch(error) {
            req.flash('err', "Failed to delete blog! Please try again");
        }
        return res.redirect('/admin/website-update/blog/list');
    } else {
        req.flash('err', "Something wrong! Please try again")
        return res.redirect('/admin/website-update/blog/list');
    }
}else{
    res.redirect('/admin/dashboard');
}
} */








