let models = require("../../models");
const { Op } = require("sequelize");
const multiparty = require('multiparty'); 
const fs = require("fs-extra");
const Sequelize = require('sequelize');


/**
 * Load the blog form
 * Create new or update existing blog
 */
 exports.load = async function(req, res, next) {
    var aboutus_details = "";
        models.AboutUs.findOne({
            attributes:{exclude:["createdAt", "createdBy", "updatedAt", "updatedBy"]},
            where: {aboutus_id:1}
        }).then(function(data) {
            res.render('pages/gyws/cms/about', 
            {
                title:"About Us | GYWS",
                aboutus_details: data,
                s_msg: req.flash('info'),
                e_msg: req.flash('err')
            });
        }).catch(function(err) {
            console.log(err);
        })
}


exports.loadHomePage = async function(req, res, next) {
    /*console.log("YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY");
    console.log(req.session);
    console.log()
    sess = req.session;
    console.log("Setting session data:username=%s and email=%s", sess.user.email, sess.user.username);*/

    var testimonial_list = await models.Testimonial.findAll({where:{active:"Yes"}, limit:4});

    var event_list = '';
    await models.Event.findAll({
        order:[["event_id", "DESC"]],
        where:{active:"Enable"},
        include: [
            { 
                model: models.EventImage, as:"event_images",
                attributes:["image"]
            }
        ]
    }).then(function(result) {
        event_list = result;
    }).catch(error => {
        res.json(error);
    });

    //res.status(200).send({success:true, event_list:event_list});

    res.render('pages/gyws/home/page', {
        title:"Home | GYWS",
        event_list: event_list,
        testimonial_list: testimonial_list
    }); 
}

