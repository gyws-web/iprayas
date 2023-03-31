let models = require("../../../models");
const { Op } = require("sequelize");
const multiparty = require('multiparty');
const helpers = require("../../../helpers/helper_functions");




/**
 * Return the list of the all donation category
 */
exports.list = async function(req, res, next) {  
    if( typeof res.locals.initiatives    !=='undefined' && res.locals.initiatives    =='Yes'){  
        var initiatives_list = await models.Initiatives.findAll({order: [["initiatives_id","asc"]]});
        res.render('pages/admin/website_update/initiatives/list', 
        {
            title:"GYWS | Initiatives List",
            initiatives_list: initiatives_list,
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
    if( typeof res.locals.initiatives  !=='undefined' && res.locals.initiatives == 'Yes'){
        var initiatives_id = req.params.initiatives_id;
        var initiatives_details = '';

        if(typeof initiatives_id !== 'undefined' && initiatives_id > 0) {
            await models.Initiatives.findOne({
                where: {initiatives_id:initiatives_id}
            }).then(result => {
                initiatives_details = result;
                //return res.status(200).send({success:true, initiatives_details:result});
            }).catch(error => {
                res.json(error);
            });
        }

        res.render('pages/admin/website_update/initiatives/form', 
        {
            title:"GYWS | initiatives Catgeory",
            initiatives_details: initiatives_details,
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
    if( typeof res.locals.initiatives    !=='undefined' && res.locals.initiatives    =='Yes'){
        var form = new multiparty.Form();
        form.parse(req, async function(err, fields, files) {

            console.log(fields);

            /* var initiatives_id = fields.initiatives_details[0];
            var title = fields.title[0];
            var description = fields.description[0];
            var active = fields.active[0]; */

            /* if(title != '' && active != '') {
                if(initiatives_id == '') {  //Insert new record
                    var is_exists = await models.Initiatives.findOne({where:{title:title}});
                    if(!is_exists) {
                        await models.Initiatives.create({
                            title : title,
                            description : description,
                            active : active,
                            createdBy: 1
                        }).then(async function(data) {
                            if(data) {
                                req.flash('info',"initiatives successfully created");
                                return res.redirect('/admin/masters/initiatives/list');
                            } else {
                                req.flash('err',"Failed to create donor type! Please try again");
                                return res.redirect('/admin/masters/initiatives/form');
                            }  
                        }).catch(function(error) {
                            return res.send(error);
                        });
                    } else {
                        req.flash('err',"Duplicate initiatives!");
                        return res.redirect('/admin/masters/initiatives/list');
                    }
                } else { //Update existing record
                    var is_exists = await models.Initiatives.findOne({where:{title:title, initiatives_id:{[Op.ne]:initiatives_id}}});
                    if(!is_exists) {
                        await models.Initiatives.update({
                            title : title,
                            description : description,
                            active : active,
                            updatedBy: 1
                        },{where:{initiatives_id:initiatives_id}})
                        .then(async function(affected_rows) {
                            if(affected_rows > 0) {
                                req.flash('info',"initiatives successfully updated");
                            } else {
                                req.flash('err',"Failed to update initiatives! Please try again");
                            }
                            return res.redirect('/admin/masters/initiatives/list');
                        }).catch(function(error) {
                            return res.send(error);
                        })
                    } else {
                        req.flash('err',"Duplicate initiatives!");
                        return res.back();
                    }
                }
            } else {
                req.flash('err',"Fill all the mandatary fields");
                return res.redirect('/admin/masters/initiatives/form'); 
            } */

        });
    }else{
        res.redirect('/admin/dashboard');
    }
    
}








/**
 * Delete record one at a time
 */
exports.delete = async function(req, res, next) {
    if( typeof res.locals.initiatives    !=='undefined' && res.locals.initiatives    =='Yes'){
        var initiatives_id = req.body.initiatives_id;
    
        if(typeof initiatives_id !== 'undefined' && initiatives_id > 0) {
            await models.initiatives.destroy({where:{initiatives_id:initiatives_id}});
            req.flash('info', "initiatives successfully deleted");
            // try {
            //     var donation_category = await models.Initiatives.findOne({attributes:["photo"],where:{initiatives_id:initiatives_id}});
            //     if(donation_category) {
                    
            //         if(donation_category.photo != '') helpers.removeDir("public/contents/donation_categories/"+donation_category.photo);
                
            //     } else {
            //         req.flash('err', "Failed to delete donation category! Please try again");
            //     }
            // } catch(error) {
            //     req.flash('err', "Failed to delete donation type! Please try again");
            // }
        } else {
            req.flash('err', "Something wrong! Please try again");
            return res.redirect('/admin/masters/initiatives/list');
        }
        
    }else{
        res.redirect('/admin/dashboard');
    }
}