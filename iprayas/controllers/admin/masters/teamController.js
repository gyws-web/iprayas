let models = require("../../../models");
const { Op } = require("sequelize");
const multiparty = require('multiparty');
const helpers = require("../../../helpers/helper_functions");




/**
 * Return the list of the all donation category
 */
exports.list = async function(req, res, next) {  
    if( typeof res.locals.team    !=='undefined' && res.locals.team    =='Yes'){  
        var team_list = await models.Team.findAll({order: [["priority","asc"]]});
        res.render('pages/admin/masters/team/list', 
        {
            title:"GYWS | Team List",
            team_list: team_list,
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
    if( typeof res.locals.team  !=='undefined' && res.locals.team    =='Yes'){
        var team_id = req.params.team_id;
        var team_details = '';

        if(typeof team_id !== 'undefined' && team_id > 0) {
            await models.Team.findOne({
                where: {team_id:team_id}
            }).then(result => {
                team_details = result;
                //return res.status(200).send({success:true, team_details:result});
            }).catch(error => {
                res.json(error);
            });
        }

        res.render('pages/admin/masters/team/form', 
        {
            title:"GYWS | Team Catgeory",
            team_details: team_details,
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
    if( typeof res.locals.team    !=='undefined' && res.locals.team    =='Yes'){
        var form = new multiparty.Form();
        form.parse(req, async function(err, fields, files) {
            var team_id = fields.team_details[0];
            var title = fields.title[0];
            var priority = fields.priority[0];
            var active = fields.active[0];

            if(title != '' && active != '') {
                if(team_id == '') {  //Insert new record
                    var is_exists = await models.Team.findOne({where:{title:title}});
                    if(!is_exists) {
                        await models.Team.create({
                            title : title,
                            priority : priority,
                            active : active,
                            createdBy: 1
                        }).then(async function(data) {
                            if(data) {
                                req.flash('info',"Team successfully created");
                                return res.redirect('/admin/masters/team/list');
                            } else {
                                req.flash('err',"Failed to create donor type! Please try again");
                                return res.redirect('/admin/masters/team/form');
                            }  
                        }).catch(function(error) {
                            return res.send(error);
                        });
                    } else {
                        req.flash('err',"Duplicate Team!");
                        return res.redirect('/admin/masters/team/list');
                    }
                } else { //Update existing record
                    var is_exists = await models.Team.findOne({where:{title:title, team_id:{[Op.ne]:team_id}}});
                    if(!is_exists) {
                        await models.Team.update({
                            title : title,
                            priority : priority,
                            active : active,
                            updatedBy: 1
                        },{where:{team_id:team_id}})
                        .then(async function(affected_rows) {
                            if(affected_rows > 0) {
                                req.flash('info',"Team successfully updated");
                            } else {
                                req.flash('err',"Failed to update Team! Please try again");
                            }
                            return res.redirect('/admin/masters/team/list');
                        }).catch(function(error) {
                            return res.send(error);
                        })
                    } else {
                        req.flash('err',"Duplicate Team!");
                        return res.back();
                    }
                }
            } else {
                req.flash('err',"Fill all the mandatary fields");
                return res.redirect('/admin/masters/team/form'); 
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
    if( typeof res.locals.team    !=='undefined' && res.locals.team    =='Yes'){
        var team_id = req.body.team_id;
    
        if(typeof team_id !== 'undefined' && team_id > 0) {
            await models.Team.destroy({where:{team_id:team_id}});
            req.flash('info', "Team successfully deleted");
            // try {
            //     var donation_category = await models.Team.findOne({attributes:["photo"],where:{team_id:team_id}});
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
            return res.redirect('/admin/masters/team/list');
        }
        
    }else{
        res.redirect('/admin/dashboard');
    }
}