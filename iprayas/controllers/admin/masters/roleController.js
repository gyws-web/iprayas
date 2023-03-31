let models = require("../../../models");
const { Op } = require("sequelize");




/**
 * Return the list of the roles
 */
exports.list = async function(req, res, next) { 
    if( typeof res.locals.role   !=='undefined' && res.locals.role   =='Yes'){   
    var role_list = await models.Role.findAll({order: [["priority","asc"]]});
    res.render('pages/admin/masters/role/list', 
    {
        title:"GYWS | Role List",
        role_list: role_list,
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
    if( typeof res.locals.role   !=='undefined' && res.locals.role   =='Yes'){
    var role_id = req.params.role_id;
    var role_details = '';

    if(typeof role_id !== 'undefined' && role_id > 0) {
        await models.Role.findOne({
            where: {role_id:role_id}
        }).then(result => {
            role_details = result;
            //return res.status(200).send({success:true, role_details:result});
        }).catch(error => {
            res.json(error);
        });
    }

    res.render('pages/admin/masters/role/form', 
    {
        title:"GYWS | Role",
        role_details: role_details,
        s_msg: req.flash('info'),
        e_msg: req.flash('err')
    });
}else{
    res.redirect('/admin/dashboard');
}
}




/**
 * Save new role or update the existing role
 */
exports.saveOrUpdate = async function(req, res) {
    if( typeof res.locals.role   !=='undefined' && res.locals.role   =='Yes'){
    var role_id = req.body.role_id;
    var title = req.body.title;
    var priority = req.body.priority;
    var active = req.body.active;

    if(title != '' && active != '') {
        if(role_id == '') {  //Insert new record
            var is_exists = await models.Role.findOne({where:{title:title}});
            if(!is_exists) {
                await models.Role.create({
                    title : title,
                    priority : priority,
                    active : active,
                    createdBy: 1
                }).then(async function(data) {
                    if(data) {
                        req.flash('info',"Role successfully created");
                        return res.redirect('/admin/masters/role/list');
                    } else {
                        req.flash('err',"Failed to create role! Please try again");
                        return res.redirect('/admin/masters/role/form');
                    }
                }).catch(function(error) {
                    return res.send(error);
                });
            } else {
                req.flash('err',"Duplicate role!");
                return res.redirect('/admin/masters/role/form');
            }
        } else { //Update existing record
            var is_exists = await models.Role.findOne({where:{title:title, role_id:{[Op.ne]:role_id}}});
            if(!is_exists) {
                await models.Role.update({
                    title : title,
                    priority : priority,
                    active : active,
                    updatedBy: 1
                },{where:{role_id:role_id}})
                .then(async function(affected_rows) {
                    if(affected_rows > 0) {
                        req.flash('info',"Role successfully updated");
                    } else {
                        req.flash('err',"Failed to update role! Please try again");
                    }
                    return res.redirect('/admin/masters/role/list');
                }).catch(function(error) {
                    return res.send(error);
                })
            } else {
                req.flash('err',"Duplicate role!");
                return res.back();
            }
        }
    } else {
        req.flash('err',"Fill all the mandatary fields");
        return res.redirect('/admin/masters/role/form'); 
    }
}else{
    res.redirect('/admin/dashboard');
}
    
}








/**
 * Delete record one at a time
 */
exports.delete = async function(req, res, next) {
    if( typeof res.locals.role   !=='undefined' && res.locals.role   =='Yes'){
    var role_id = req.body.role_id;
  
    if(typeof role_id !== 'undefined' && role_id > 0) {
        try {
            await models.Role.destroy({where:{role_id:role_id}});
            req.flash('info', "Role successfully deleted")
        } catch(error) {
            req.flash('err', "Failed to delete role! Please try again");
        }
        return res.redirect('/admin/masters/role/list');
    } else {
        req.flash('err', "Something wrong! Please try again")
        return res.redirect('/admin/masters/role/list');
    }
}else{
    res.redirect('/admin/dashboard');
}
}



/************************************* FRONTEND FUNCTIONS *************************************/


