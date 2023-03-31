let models = require("../../../models");
const { Op } = require("sequelize");
const multiparty = require('multiparty'); 
const helpers = require("../../../helpers/helper_functions");




/**
 * Return the list of the all operators
 */
exports.list = async function(req, res, next) {
    if( typeof res.locals.testimonial  !=='undefined' && res.locals.testimonial  =='Yes'){
    var testimonial_list = '';
    var testimonial_list = await models.Testimonial.findAll({where:{active:'Yes'}});
    
    res.render('pages/admin/website_update/testimonial/list', 
    {
        title:"Testimonial List | GYWS",
        testimonial_list: testimonial_list,
        s_msg: req.flash('info'),
        e_msg: req.flash('err')
    });
}else{
    res.redirect('/admin/dashboard');
}
}




/**
 * Load the event form
 * Create new or update existing event
 */
exports.load = async function(req, res, next) {
    if( typeof res.locals.testimonial  !=='undefined' && res.locals.testimonial  =='Yes'){
    var testimonial_id = req.params.testimonial_id;
    var testimonial_details = '';

    if(typeof testimonial_id !== 'undefined' && testimonial_id > 0) {
        await models.Testimonial.findOne({
            where: {testimonial_id:testimonial_id},
        }).then(result => {
            testimonial_details = result;
        }).catch(error => {
            res.json(error);
        });
    }


    res.render('pages/admin/website_update/testimonial/form', 
    {
        title:"Testimonial | GYWS",
        testimonial_details: testimonial_details,
        s_msg: req.flash('info'),
        e_msg: req.flash('err')
    });
}else{
    res.redirect('/admin/dashboard');
}
}




/**
 * Save new donor or update the existing donor
 */
exports.saveOrUpdate = async function(req, res) {
    if( typeof res.locals.testimonial  !=='undefined' && res.locals.testimonial  =='Yes'){
    var form = new multiparty.Form();
    form.parse(req, async function(err, fields, files) {
        var testimonial_id = fields.testimonial_id[0];
        var name = fields.name[0];
        var designation = fields.designation[0];
        var testimonial = fields.testimonial[0];
        var active = fields.active[0];

        if(name != '' && designation != '' && testimonial != '' && active != '') {
            if(testimonial_id == '') {  //Insert new record
                await models.Testimonial.create({
                    name : name,
                    designation : designation,
                    testimonial : testimonial,
                    photo : '',
                    active : active,
                    createdBy: 1
                }).then(function(testimonial) {
                    if(testimonial) {
                        uploadSingleFile(files, testimonial.testimonial_id);                  
                        req.flash('info',"Testimonial successfully created");
                        return res.redirect('/admin/website-update/testimonial/list');
                    } else {
                        req.flash('err',"Failed to create testimonial! Please try again");
                        return res.redirect('/admin/website-update/testimonial/form');
                    }
                }).catch(function(error) {
                    return res.send(error);
                });
            } else { //Update existing record
                await models.Testimonial.update({
                    name : name,
                    designation : designation,
                    testimonial : testimonial,
                    active : active,
                    updatedBy: 1
                },{where:{testimonial_id:testimonial_id}})
                .then(async function(affected_rows) {
                    if(affected_rows > 0) {
                        //If thumbnail and images are selected
                        uploadSingleFile(files, testimonial_id);                  
                        req.flash('info',"Testimonial successfully updated");
                    } else {
                        req.flash('err',"Failed to update testimonial! Please try again");
                    }
                    return res.redirect('/admin/website-update/testimonial/list');
                }).catch(function(error) {
                    return res.send(error);
                });
            }
        } else {
            req.flash('err',"Fill all the mandatory fields");
            return res.redirect('/admin/website-update/testimonial/form'); 
        }
    });
}else{
    res.redirect('/admin/dashboard');
}
    
}





/**
 * Delete donor record one at a time
 */
// exports.delete = async function(req, res, next) {
//     if( typeof res.locals.testimonial  !=='undefined' && res.locals.testimonial  =='Yes'){
//     var testimonial_id = req.body.testimonial_id;
  
//     if(typeof testimonial_id !== 'undefined' && testimonial_id > 0) {
//         try {
//             var donor = await models.Donor.findOne({attributes:["photo"],where:{testimonial_id:testimonial_id}});
//             if(donor) {
//                 await models.Donor.destroy({where:{testimonial_id:testimonial_id}});
//                 if(donor.photo != '') helpers.removeDir("public/contents/donors/"+donor.photo);
//                 req.flash('info', "Donor successfully deleted");
//             } else {
//                 req.flash('err', "Failed to delete donor! Please try again");
//             }
//         } catch(error) {
//             req.flash('err', "Failed to delete donor! Please try again");
//         }
//     } else {
//         req.flash('err', "Something wrong! Please try again")
//     }
//     return res.redirect('/admin/website-update/donor/list');
// }else{
//     res.redirect('/admin/dashboard');
// }
// }


exports.delete = async function(req, res, next) {
    if( typeof res.locals.testimonial  !=='undefined' && res.locals.testimonial  =='Yes'){
        var testimonial_id = req.body.testimonial_id;
    
        if(typeof testimonial_id !== 'undefined' && testimonial_id > 0) {
            var del = await models.Testimonial.destroy({where:{testimonial_id:testimonial_id}});
            if(del){
                req.flash('info', "Testimonial successfully deleted.")
                res.redirect('/admin/website-update/testimonial/list');                
            }else{
                req.flash('err', "Something wrong! Please try again")
            }
        } else {
            req.flash('err', "Something wrong! Please try again")
        }
    }else{
        res.redirect('/admin/dashboard');
    }
}





/**
 * Upload thumbnail image of the donor
 * @param {*} files 
 * @param {*} testimonial_id 
 */
async function uploadSingleFile(files, testimonial_id) {
    var location = "public/contents/testimonials/";
    var filenames = await helpers.uploadSingleFile(files, location, false, testimonial_id);
    if(filenames.length > 0) {
        await models.Testimonial.update({
            "photo":filenames[0],
        },{where:{testimonial_id: testimonial_id}});
    }
}




