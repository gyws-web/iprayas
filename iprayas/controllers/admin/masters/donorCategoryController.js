let models = require("../../../models");
const { Op } = require("sequelize");
const multiparty = require('multiparty');
const helpers = require("../../../helpers/helper_functions");




/**
 * Return the list of the all donation category
 */
exports.list = async function(req, res, next) {
    if( typeof res.locals.donor_category    !=='undefined' && res.locals.donor_category    =='Yes'){  
    /*console.log("YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY");
    console.log(req.session);
    console.log()
    sess = req.session;
    console.log("Setting session data:username=%s and email=%s", sess.user.email, sess.user.username);*/


    
    var donor_category_list = await models.DonorCategory.findAll({order: [["priority","asc"]]});

    res.render('pages/admin/masters/donor_category/list', 
    {
        title:"GYWS | Donor Category List",
        donor_category_list: donor_category_list,
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
    if( typeof res.locals.donor_category    !=='undefined' && res.locals.donor_category    =='Yes'){  
    var donor_category_id = req.params.donor_category_id;
    var donor_category_details = '';

    if(typeof donor_category_id !== 'undefined' && donor_category_id > 0) {
        await models.DonorCategory.findOne({
            where: {donor_category_id:donor_category_id}
        }).then(result => {
            donor_category_details = result;
            //return res.status(200).send({success:true, donor_category_details:result});
        }).catch(error => {
            res.json(error);
        });
    }

    res.render('pages/admin/masters/donor_category/form', 
    {
        title:"GYWS | Donor Catgeory",
        donor_category_details: donor_category_details,
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
    if( typeof res.locals.donor_category    !=='undefined' && res.locals.donor_category    =='Yes'){  
    var form = new multiparty.Form();
    form.parse(req, async function(err, fields, files) {
        var donor_category_id = fields.donor_category_details[0];
        var title = fields.title[0];
        var priority = fields.priority[0];
        var active = fields.active[0];

        if(title != '' && active != '') {
            if(donor_category_id == '') {  //Insert new record
                var is_exists = await models.DonorCategory.findOne({where:{title:title}});
                if(!is_exists) {
                    await models.DonorCategory.create({
                        title : title,
                        priority : priority,
                        active : active,
                        createdBy: 1
                    }).then(async function(data) {
                        if(data) {
                            req.flash('info',"Donor category successfully created");
                            return res.redirect('/admin/masters/donor-category/list');
                        } else {
                            req.flash('err',"Failed to create donor type! Please try again");
                            return res.redirect('/admin/masters/donor-category/form');
                        }  
                    }).catch(function(error) {
                        return res.send(error);
                    });
                } else {
                    req.flash('err',"Duplicate donor category!");
                    return res.redirect('/admin/masters/donor-category/list');
                }
            } else { //Update existing record
                var is_exists = await models.DonorCategory.findOne({where:{title:title, donor_category_id:{[Op.ne]:donor_category_id}}});
                if(!is_exists) {
                    await models.DonorCategory.update({
                        title : title,
                        priority : priority,
                        active : active,
                        updatedBy: 1
                    },{where:{donor_category_id:donor_category_id}})
                    .then(async function(affected_rows) {
                        if(affected_rows > 0) {
                            req.flash('info',"Donor category successfully updated");
                        } else {
                            req.flash('err',"Failed to update donor category! Please try again");
                        }
                        return res.redirect('/admin/masters/donor-category/list');
                    }).catch(function(error) {
                        return res.send(error);
                    })
                } else {
                    req.flash('err',"Duplicate donor category!");
                    return res.back();
                }
            }
        } else {
            req.flash('err',"Fill all the mandatary fields");
            return res.redirect('/admin/masters/donor-category/form'); 
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
    if( typeof res.locals.donor_category    !=='undefined' && res.locals.donor_category    =='Yes'){  
    var donor_category_id = req.body.donor_category_id;
  
    if(typeof donor_category_id !== 'undefined' && donor_category_id > 0) {
        await models.DonorCategory.destroy({where:{donor_category_id:donor_category_id}});
        req.flash('info', "Donor type successfully deleted");
        // try {
        //     var donation_category = await models.DonorCategory.findOne({attributes:["photo"],where:{donor_category_id:donor_category_id}});
        //     if(donation_category) {
                
        //         if(donation_category.photo != '') helpers.removeDir("public/contents/donation_categories/"+donation_category.photo);
               
        //     } else {
        //         req.flash('err', "Failed to delete donation category! Please try again");
        //     }
        // } catch(error) {
        //     req.flash('err', "Failed to delete donation type! Please try again");
        // }
    } else {
        req.flash('err', "Something wrong! Please try again")
    }
    return res.redirect('/admin/masters/donor-category/list');
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
