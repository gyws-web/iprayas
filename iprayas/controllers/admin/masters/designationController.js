let models = require("../../../models");
const { Op } = require("sequelize");




/**
 * Return the list of the designation
 */
exports.list = async function(req, res, next) {   
    if( typeof res.locals.designation    !=='undefined' && res.locals.designation    =='Yes'){  
    var designation_list = await models.Designation.findAll({order: [["priority","asc"]]});
    res.render('pages/admin/masters/designation/list', 
    {
        title:"GYWS | Designation List",
        designation_list: designation_list,
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
    if( typeof res.locals.designation    !=='undefined' && res.locals.designation    =='Yes'){ 
    var designation_id = req.params.designation_id;
    var designation_details = '';

    if(typeof designation_id !== 'undefined' && designation_id > 0) {
        await models.Designation.findOne({
            where: {designation_id:designation_id}
        }).then(result => {
            designation_details = result;
            //return res.status(200).send({success:true, designation_details:result});
        }).catch(error => {
            res.json(error);
        });
    }

    res.render('pages/admin/masters/designation/form', 
    {
        title:"GYWS | Designation",
        designation_details: designation_details,
        s_msg: req.flash('info'),
        e_msg: req.flash('err')
    });
}else{
    res.redirect('/admin/dashboard');
}
}




/**
 * Save new designation or update the existing designation
 */
exports.saveOrUpdate = async function(req, res) {
    if( typeof res.locals.designation    !=='undefined' && res.locals.designation    =='Yes'){ 
    var designation_id = req.body.designation_id;
    var title = req.body.title;
    var priority = req.body.priority;
    var active = req.body.active;

    if(title != '' && active != '') {
        if(designation_id == '') {  //Insert new record
            var is_exists = await models.Designation.findOne({where:{title:title}});
            if(!is_exists) {
                await models.Designation.create({
                    title : title,
                    priority : priority,
                    active : active,
                    createdBy: 1
                }).then(async function(data) {
                    if(data) {
                        req.flash('info',"Designation successfully created");
                        return res.redirect('/admin/masters/designation/list');
                    } else {
                        req.flash('err',"Failed to create designation! Please try again");
                        return res.redirect('/admin/masters/designation/form');
                    }
                }).catch(function(error) {
                    return res.send(error);
                });
            } else {
                req.flash('err',"Duplicate designation!");
                return res.redirect('/admin/masters/designation/form');
            }
        } else { //Update existing record
            var is_exists = await models.Designation.findOne({where:{title:title, designation_id:{[Op.ne]:designation_id}}});
            if(!is_exists) {
                await models.Designation.update({
                    title : title,
                    priority : priority,
                    active : active,
                    updatedBy: 1
                },{where:{designation_id:designation_id}})
                .then(async function(affected_rows) {
                    if(affected_rows > 0) {
                        req.flash('info',"Designation successfully updated");
                    } else {
                        req.flash('err',"Failed to update designation! Please try again");
                    }
                    return res.redirect('/admin/masters/designation/list');
                }).catch(function(error) {
                    return res.send(error);
                })
            } else {
                req.flash('err',"Duplicate designation!");
                return res.back();
            }
        }
    } else {
        req.flash('err',"Fill all the mandatary fields");
        return res.redirect('/admin/masters/designation/form'); 
    }
}else{
    res.redirect('/admin/dashboard');
}
    
}








/**
 * Delete record one at a time
 */
exports.delete = async function(req, res, next) {
    if( typeof res.locals.designation    !=='undefined' && res.locals.designation    =='Yes'){ 
    var designation_id = req.body.designation_id;
  
    if(typeof designation_id !== 'undefined' && designation_id > 0) {
        try {
            await models.Designation.destroy({where:{designation_id:designation_id}});
            req.flash('info', "Designation successfully deleted")
        } catch(error) {
            req.flash('err', "Failed to delete designation! Please try again");
        }
        return res.redirect('/admin/masters/designation/list');
    } else {
        req.flash('err', "Something wrong! Please try again")
        return res.redirect('/admin/masters/designation/list');
    }
}else{
    res.redirect('/admin/dashboard');
}
}



/************************************* FRONTEND FUNCTIONS *************************************/


