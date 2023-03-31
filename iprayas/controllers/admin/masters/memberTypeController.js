let models = require("../../../models");
const { Op } = require("sequelize");




/**
 * Return the list of the all member type
 */
exports.list = async function(req, res, next) {
    if( typeof res.locals.member_type    !=='undefined' && res.locals.member_type    =='Yes'){  
    /*console.log("YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY");
    console.log(req.session);
    console.log()
    sess = req.session;
    console.log("Setting session data:username=%s and email=%s", sess.user.email, sess.user.username);*/


    
    var member_type_list = await models.MemberType.findAll({order: [["priority","asc"]]});

    res.render('pages/admin/masters/member_type/list', 
    {
        title:"GYWS | Member Type List",
        member_type_list: member_type_list,
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
    if( typeof res.locals.member_type    !=='undefined' && res.locals.member_type    =='Yes'){  
    var member_type_id = req.params.member_type_id;
    var member_type_details = '';

    if(typeof member_type_id !== 'undefined' && member_type_id > 0) {
        await models.MemberType.findOne({
            where: {member_type_id:member_type_id}
        }).then(result => {
            member_type_details = result;
            //return res.status(200).send({success:true, member_type_details:result});
        }).catch(error => {
            res.json(error);
        });
    }

    res.render('pages/admin/masters/member_type/form', 
    {
        title:"GYWS | Member Type",
        member_type_details: member_type_details,
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
    if( typeof res.locals.member_type    !=='undefined' && res.locals.member_type    =='Yes'){  
    var member_type_id = req.body.member_type_id;
    var title = req.body.title;
    console.log("---------------------------------------------");
    console.log(title);
    var priority = req.body.priority;
    var active = req.body.active;

    if(title != '' && active != '') {
        if(member_type_id == '') {  //Insert new record
            var is_exists = await models.MemberType.findOne({where:{title:title}});
            if(!is_exists) {
                await models.MemberType.create({
                    title : title,
                    priority : priority,
                    active : active,
                    createdBy: 1
                }).then(async function(data) {
                    if(data) {
                        req.flash('info',"Member Type successfully created");
                        return res.redirect('/admin/masters/member-type/list');
                    } else {
                        req.flash('err',"Failed to create member type! Please try again");
                        return res.redirect('/admin/masters/member-type/form');
                    }
                }).catch(function(error) {
                    return res.send(error);
                });
            } else {
                req.flash('err',"Duplicate member type!");
                return res.redirect('/admin/masters/member-type/form');
            }
        } else { //Update existing record
            var is_exists = await models.MemberType.findOne({where:{title:title, member_type_id:{[Op.ne]:member_type_id}}});
            if(!is_exists) {
                await models.MemberType.update({
                    title : title,
                    priority : priority,
                    active : active,
                    updatedBy: 1
                },{where:{member_type_id:member_type_id}})
                .then(async function(affected_rows) {
                    if(affected_rows > 0) {
                        req.flash('info',"Member type successfully updated");
                    } else {
                        req.flash('err',"Failed to update member type! Please try again");
                    }
                    return res.redirect('/admin/masters/member-type/list');
                }).catch(function(error) {
                    return res.send(error);
                })
            } else {
                req.flash('err',"Duplicate member type!");
                return res.back();
            }
        }
    } else {
        req.flash('err',"Fill all the mandatary fields");
        return res.redirect('/admin/masters/member-type/form'); 
    }
}else{
    res.redirect('/admin/dashboard');
}
    
}








/**
 * Delete record one at a time
 */
exports.delete = async function(req, res, next) {
    if( typeof res.locals.member_type    !=='undefined' && res.locals.member_type    =='Yes'){  
    var member_type_id = req.body.member_type_id;
  
    if(typeof member_type_id !== 'undefined' && member_type_id > 0) {
        try {
            await models.MemberType.destroy({where:{member_type_id:member_type_id}});
            req.flash('info', "Member type successfully deleted")
        } catch(error) {
            req.flash('err', "Failed to delete member type! Please try again");
        }
        return res.redirect('/admin/masters/member-type/list');
    } else {
        req.flash('err', "Something wrong! Please try again")
        return res.redirect('/admin/masters/member-type/list');
    }
}else{
    res.redirect('/admin/dashboard');
}
}



/************************************* FRONTEND FUNCTIONS *************************************/


