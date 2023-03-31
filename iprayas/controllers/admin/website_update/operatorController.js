let models = require("../../../models");
const { Op } = require("sequelize");
const multiparty = require('multiparty'); 
const bcrypt = require("bcrypt");
const helpers = require("../../../helpers/helper_functions");

var config = require('../../../config/config.json');
const Sequelize = require("sequelize");
var sequelize = new Sequelize(
    config.development.database, 
    config.development.username,
    config.development.password, {
        host: 'localhost',
        dialect: 'mysql',
        logging: true,
        pool: {
            max: 5,
            min: 0,
            idle: 10000
    }
});



/**
 * Return the list of the all operators
 */
exports.list = async function(req, res, next) { 
    if(typeof res.locals.operator !=='undefined' && res.locals.operator =='Yes')   {
        var operator_list = '';
        await models.Operator.findAll({
            where: {operator_id:{[Op.ne]:1}},
            include: [
                { model: models.Role, as:"role_details"},
                { model: models.Designation, as: "designation_details"},
                { model: models.MemberType, as: "member_type_details"}
            ]
        }).then(result => {
            operator_list = result;
        }).catch(error => {
            res.json(error);
        });
        //return res.status(200).send({success:true, operator_list:operator_list});
    
        res.render('pages/admin/website_update/operator/list', 
        {
            title:"GYWS | Operator List",
            operator_list: operator_list,
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
    if(typeof res.locals.operator !=='undefined' && res.locals.operator =='Yes')   {
        var operator_id = req.params.operator_id;
        var operator_details = '';
        if(typeof operator_id !== 'undefined' && operator_id > 0) {
            await models.Operator.findOne({
                where: {operator_id:operator_id},
                include: [
                    { model: models.Role, as:"role_details"},
                    { model: models.Designation, as: "designation_details"}
                ]
            }).then(result => {
                operator_details = result;
                //return res.status(200).send({success:true, operator_details:result});
            }).catch(error => {
                res.json(error);
            });
        }
        //Get the role and designation list
        var role_list = await models.Role.findAll({attributes:["role_id","title"], where:{active: "Yes"}, order:[["title","ASC"]]});
        var designation_list = await models.Designation.findAll({attributes:["designation_id","title"], where:{active: "Yes"}, order:[["title","ASC"]]});
        var member_type_list = await models.MemberType.findAll({where:{"active":"Yes"}});
        var team_list = await models.Team.findAll({where:{"active":"Yes"}});
        var initiatives_list = await models.Initiatives.findAll({where:{"active":"Yes"}});

        res.render('pages/admin/website_update/operator/form', 
        {
            title:"Operator | GYWS",
            role_list: role_list,
            designation_list: designation_list,
            operator_details: operator_details,
            member_type_list: member_type_list,
            team_list:team_list,
            initiatives_list : initiatives_list,
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
    if(typeof res.locals.operator !=='undefined' && res.locals.operator =='Yes')   {
        var form = new multiparty.Form();
        form.parse(req, async function(err, fields, files) {
            var operator_id = fields.operator_id[0];
            var name = fields.name[0];
            var email = fields.email[0];
            var mobile = fields.mobile[0];
            var role_id = fields.role_id[0];
            // var department = fields.department[0];
            var member_type_id = fields.member_type_id[0];
            var current_designation_id = fields.current_designation_id[0];
            var username = fields.username[0];
            var password = fields.password[0];
            var bio = fields.bio[0];
            var linkedin_link = fields.linkedin_link[0];
            var facebook_link = fields.facebook_link[0];
            var active = fields.active[0];
            var inintiative_id =fields.inintiative_id.toString();
            // return res.send(inintiative_id);
            var team_id =fields.team_id.toString();

            if(name != '' && email != '' && role_id != '' && current_designation_id != '' && username != '' && password != '') {
                if(operator_id == '') {  //Insert new record
                    var is_email_exists = await models.Operator.findOne({where:{email:email}});
                    if(!is_email_exists) {
                        bcrypt.hash(password, 10, async function(err, hash) {
                            if(err) {
                                req.flash('err',"Something wrong! Please try again");
                                return res.redirect('/admin/website-update/operator/list');
                            } else {
                                await models.Operator.create({
                                    name : name,
                                    email : email,
                                    mobile : mobile,
                                    role_id : role_id,
                                    // department : department,
                                    member_type_id : member_type_id,
                                    photo: '',
                                    current_designation_id : current_designation_id,
                                    username : username,
                                    password : hash,
                                    bio : bio,
                                    linkedin_link : linkedin_link,
                                    facebook_link : facebook_link,
                                    active : active,
                                    inintiative_id : inintiative_id.toString(),
                                    team_id : team_id,
                                    createdBy: 1
                                }).then(async function(operator) {
                                    if(operator) {
                                        //If thumbnail and images are selected
                                        await uploadSingleFile(files, operator.operator_id);                  
                                        req.flash('info',"Operator successfully created");
                                        return res.redirect('/admin/website-update/operator/list');
                                    } else {
                                        req.flash('err',"Failed to create operator! Please try again");
                                        return res.redirect('/admin/website-update/operator/form');
                                    }
                                }).catch(function(error) {
                                    return res.send(error);
                                });
                            }
                        });
                    } else {
                        req.flash('err',"Duplicate email address!");
                        return res.redirect('/admin/website-update/operator/form');
                    }
                } else { //Update existing record
                    var is_email_exists = await models.Operator.findOne({where:{email:email, operator_id:{[Op.ne]:operator_id}}});
                    if(!is_email_exists) {
                        await models.Operator.update({
                            name : name,
                            email : email,
                            mobile : mobile,
                            role_id : role_id,
                            member_type_id : member_type_id,
                            // department : department,
                            current_designation_id : current_designation_id,
                            username : username,
                            password : password,
                            bio : bio,
                            linkedin_link : linkedin_link,
                            facebook_link : facebook_link,
                            active : active,
                            inintiative_id : inintiative_id,
                            team_id : team_id,
                            updatedBy: 1
                        },{where:{operator_id:operator_id}})
                        .then(async function(affected_rows) {
                            if(affected_rows > 0) {
                                //If thumbnail and images are selected
                                await uploadSingleFile(files, operator_id);                  
                                req.flash('info',"Operator successfully updated");
                            } else {
                                req.flash('err',"Failed to update operator! Please try again");
                            }
                            return res.redirect('/admin/website-update/operator/list');
                        }).catch(function(error) {
                            return res.send(error);
                        })
                    } else {
                        req.flash('err',"Duplicate email address!");
                        return res.back();
                    }
                }
            } else {
                req.flash('err',"Fill all the mandatory fields");
                return res.redirect('/admin/website-update/operator/form'); 
            }
        });
    }else{
        res.redirect('/admin/dashboard');
    }
    
}








/**
 * Delete operator record one at a time
 */
exports.delete = async function(req, res, next) {
    if(typeof res.locals.operator !=='undefined' && res.locals.operator =='Yes')   {
        var operator_id = req.body.operator_id;
        if(typeof operator_id !== 'undefined' && operator_id > 0) {
            try {
                await models.Operator.destroy({where:{operator_id:operator_id}});
                req.flash('info', "Operator successfully deleted")
            } catch(error) {
                req.flash('err', "Failed to delete operator! Please try again");
            }
            return res.redirect('/admin/website-update/operator/list');
        } else {
            req.flash('err', "Something wrong! Please try again")
            return res.redirect('/admin/website-update/operator/list');
        }
    }else{
        res.redirect('/admin/dashboard');
    }
}





/**
 * Upload thumbnail image of the operator
 * @param {*} files 
 * @param {*} operator_id 
 */
async function uploadSingleFile(files, operator_id) {
    var location = "public/contents/operators/";
    var filenames = await helpers.uploadSingleFile(files, location, false, operator_id);
    if(filenames.length > 0) {
        await models.Operator.update({
            "photo":filenames[0],
        },{where:{operator_id: operator_id}});
    }
    
}





/************************************* FRONTEND FUNCTIONS *************************************/


/**
 * Return the list of the all operators member_type wise
 */
exports.getOperatorListMemberWise = async function(req, res, next) {

    var member_type_list = await models.MemberType.findAll({attributes:["member_type_id","title"],where:{active:"yes"}, order:[["priority","asc"]]});
    var initiatives_list = await models.Initiatives.findAll({where:{active:"yes"}, order:[["initiatives_id","asc"]]});
    var teamList = await models.Team.findAll({where:{active:"Yes"}});

    var id= req.params.id ? req.params.id : 1;
    var type = req.params.type;

    if(type != undefined && type == "initiatives"){
        if(id !='' && id!=undefined){
            var inintiative_title = await models.Initiatives.findOne({where:{initiatives_id : id},attributes:['title']});
            var coordinatorsList = await await sequelize.query("SELECT * FROM `operators` as op LEFT JOIN membertypes as mb on "+
            "mb.member_type_id = op.member_type_id WHERE CONCAT(',', op.inintiative_id, ',') like '%,"+id+",%' and mb.title='Coordinator' ", 
            { type: sequelize.QueryTypes.SELECT });

            var teamList = await models.Team.findAll({where:{active:'Yes'}});
            var teamId = []
            var headTeamList = '';
            if(teamList){

                for(var i=0; i< teamList.length; i++){
                    teamId.push(teamList[i].team_id)
                //     headTeamList = await sequelize.query("SELECT op.*,tm.team_id,tm.title as team_title FROM `operators` as op "+
                //     "LEFT JOIN team as tm on tm.team_id = op.team_id "+
                //     "WHERE CONCAT(',', op.team_id, ',') like '%,"+teamList[i].team_id+",%' " ,{ type: sequelize.QueryTypes.SELECT });
                }
                headTeamList = await sequelize.query("SELECT op.*,tm.team_id,tm.title as team_title FROM `operators` as op "+
                "LEFT JOIN team as tm on tm.team_id = op.team_id "+
                "WHERE op.team_id like '%"+teamId+"%' " ,{ type: sequelize.QueryTypes.SELECT });
                
            }
        }
    }
    if(type != undefined && type == "members"){
        if(id !='' && id!=undefined){
            var member_title = await models.MemberType.findOne({where:{member_type_id : id},attributes:['title']});
            var operator_list = '';
            await models.Operator.findAll({
                attributes:["name","mobile","photo","mobile","email","department", "linkedin_link","facebook_link"],
                include: [
                    { 
                        model: models.Designation, as: "designation_details",
                        attributes:["title"]
                    },
                ],
                where:{
                    member_type_id: id
                }
            }).then(result => {
                operator_list = result;
            }).catch(error => {
                res.json(error);
            });            
        }
    }
    
    
    

    //return res.status(200).send({success:true, member_type_list:member_type_list, operator_list:operator_list});

    res.render('pages/gyws/members/page', 
    {
        title:"GYWS | Members",
        member_type_list:member_type_list,
        initiatives_list : initiatives_list,
        coordinatorsList : coordinatorsList ? coordinatorsList :'',
        operator_list: operator_list,
        inintiative_title:inintiative_title ? inintiative_title :'',
        teamList : teamList ? teamList : '',
        headTeamList : headTeamList ? headTeamList :'',
        member_title : member_title ? member_title : '',
        type : type ? type :'',
        s_msg: req.flash('info'),
        e_msg: req.flash('err')
    });
}






/**
 * Return the list of the all operators member_type wise
 */
exports.ajax_getOperatorListMemberWise = async function(req, res, next) {
    var member_type_id = req.body.data.member_type_id;
    
    var operator_list = '';
    await models.Operator.findAll({
        attributes:["name","mobile","photo","email","department", "linkedin_link","facebook_link"],
        include: [
            { 
                model: models.Designation, as: "designation_details",
                attributes:["title"]
            },
        ],
        where:{
            member_type_id: member_type_id
        }
    }).then(result => {
        operator_list = result;
        res.status(200).send({success:"true", operator_details:result});
    }).catch(error => {
        res.json(error);
        //return '';
    });

    
}



