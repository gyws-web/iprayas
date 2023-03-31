let models = require("../../../models");
const { Op } = require("sequelize");
const multiparty = require('multiparty');
const helpers = require("../../../helpers/helper_functions");




/**
 * Return the list of the all donation category
 */
exports.list = async function(req, res, next) {
    if( typeof res.locals.donation_category    !=='undefined' && res.locals.donation_category    =='Yes'){  
    /*console.log("YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY");
    console.log(req.session);
    console.log()
    sess = req.session;
    console.log("Setting session data:username=%s and email=%s", sess.user.email, sess.user.username);*/


    
    var donation_category_list = await models.DonationCategory.findAll({order: [["priority","asc"]]});

    res.render('pages/admin/masters/donation_category/list', 
    {
        title:"GYWS | Donation Category List",
        donation_category_list: donation_category_list,
        s_msg: req.flash('info'),
        e_msg: req.flash('err')
    });
}else{
    res.redirect('/admin/dashboard');
}
}




/**
 * Load the form
 * Create new or update existing record
 */
exports.load = async function(req, res, next) {
    if( typeof res.locals.donation_category    !=='undefined' && res.locals.donation_category    =='Yes'){  
    var donation_category_id = req.params.donation_category_id;
    var donation_category_details = '';

    if(typeof donation_category_id !== 'undefined' && donation_category_id > 0) {
        await models.DonationCategory.findOne({
            where: {donation_category_id:donation_category_id}
        }).then(result => {
            donation_category_details = result;
            //return res.status(200).send({success:true, donation_category_details:result});
        }).catch(error => {
            res.json(error);
        });
    }

    res.render('pages/admin/masters/donation_category/form', 
    {
        title:"GYWS | Donation Catgeory",
        donation_category_details: donation_category_details,
        s_msg: req.flash('info'),
        e_msg: req.flash('err')
    });
}else{
    res.redirect('/admin/dashboard');
}
}




/**
 * Save new operator or update the existing operator
 */
exports.saveOrUpdate = async function(req, res) {
    if( typeof res.locals.donation_category    !=='undefined' && res.locals.donation_category    =='Yes'){  
    var form = new multiparty.Form();
    form.parse(req, async function(err, fields, files) {
        var donation_category_id = fields.donation_category_id[0];
        var title = fields.title[0];
        var priority = fields.priority[0];
        var slug = fields.slug[0];
        var active = fields.active[0];

        if(title != '' && active != '') {
            if(donation_category_id == '') {  //Insert new record
                var is_exists = await models.DonationCategory.findOne({where:{title:title}});
                if(!is_exists) {
                    await models.DonationCategory.create({
                        title : title,
                        priority : priority,
                        slug : slug,
                        active : active,
                        photo:'',
                        createdBy: 1
                    }).then(async function(data) {
                        if(data) {
                            uploadSingleFile(files, data.donation_category_id);
                            req.flash('info',"Donation category successfully created");
                            return res.redirect('/admin/masters/donation-category/list');
                        } else {
                            req.flash('err',"Failed to create donation type! Please try again");
                            return res.redirect('/admin/masters/donation-category/form');
                        }  
                    }).catch(function(error) {
                        return res.send(error);
                    });
                } else {
                    req.flash('err',"Duplicate donation category!");
                    return res.redirect('/admin/masters/donation-category/list');
                }
            } else { //Update existing record
                var is_exists = await models.DonationCategory.findOne({where:{title:title, donation_category_id:{[Op.ne]:donation_category_id}}});
                if(!is_exists) {
                    await models.DonationCategory.update({
                        title : title,
                        priority : priority,
                        slug : slug,
                        active : active,
                        updatedBy: 1
                    },{where:{donation_category_id:donation_category_id}})
                    .then(async function(affected_rows) {
                        uploadSingleFile(files, donation_category_id);  
                        if(affected_rows > 0) {
                            req.flash('info',"Donation category successfully updated");
                        } else {
                            req.flash('err',"Failed to update donation category! Please try again");
                        }
                        return res.redirect('/admin/masters/donation-category/list');
                    }).catch(function(error) {
                        return res.send(error);
                    })
                } else {
                    req.flash('err',"Duplicate donation category!");
                    return res.back();
                }
            }
        } else {
            req.flash('err',"Fill all the mandatary fields");
            return res.redirect('/admin/masters/donation-category/form'); 
        }

    });
}else{
    res.redirect('/admin/dashboard');
}
    
}








/**
 * Delete record one at a time
 */
exports.delete = async function(req, res, next) {
    if( typeof res.locals.donation_category    !=='undefined' && res.locals.donation_category    =='Yes'){  
    var donation_category_id = req.body.donation_category_id;
  
    if(typeof donation_category_id !== 'undefined' && donation_category_id > 0) {
        try {
            var donation_category = await models.DonationCategory.findOne({attributes:["photo"],where:{donation_category_id:donation_category_id}});
            if(donation_category) {
                await models.DonationCategory.destroy({where:{donation_category_id:donation_category_id}});
                if(donation_category.photo != '') helpers.removeDir("public/contents/donation_categories/"+donation_category.photo);
                req.flash('info', "Donation type successfully deleted");
            } else {
                req.flash('err', "Failed to delete donation category! Please try again");
            }
        } catch(error) {
            req.flash('err', "Failed to delete donation type! Please try again");
        }
    } else {
        req.flash('err', "Something wrong! Please try again")
    }
    return res.redirect('/admin/masters/donation-category/list');
}else{
    res.redirect('/admin/dashboard');
}
}




/**
 * Upload thumbnail image of the donation category
 * @param {*} files 
 * @param {*} donation_category_id 
 */
async function uploadSingleFile(files, donation_category_id) {
    var location = "public/contents/donation_categories/";
    var filenames = await helpers.uploadSingleFile(files, location, false, donation_category_id);
    if(filenames.length > 0) {
        await models.DonationCategory.update({
            "photo":filenames[0],
        },{where:{donation_category_id: donation_category_id}});
    }
}






/************************************* FRONTEND FUNCTIONS *************************************/
