let models = require("../../../models");
const { Op } = require("sequelize");
const multiparty = require('multiparty'); 
const bcrypt = require("bcrypt");
const helpers = require("../../../helpers/helper_functions");




/**
 * Load the 
 */
exports.list = async function(req, res, next) {
    if(typeof res.locals.role_permission !== 'undefined' && res.locals.role_permission == 'Yes') {  
        var role_list = await models.Role.findAll({attributes:["role_id", "title", "priority", "active"], order:[["priority", "asc"]]});

        res.render('pages/admin/website_update/role_permission/list', 
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
    if(typeof res.locals.role_permission !== 'undefined' && res.locals.role_permission == 'Yes') {
        var role_id = req.params.role_id;
        var role_details = '';

        if(typeof role_id !== 'undefined' && role_id > 0) {
            role_details = await models.Role.findOne({attributes:["role_id", "title"], where: {role_id:role_id}});
            role_permission_details = await models.RolePermission.findOne({where:{role_id : role_id}});
        }


        res.render('pages/admin/website_update/role_permission/form', 
        {
            title:"Role & Permission | GYWS",
            role_details: role_details,
            role_permission_details : role_permission_details,
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
    if(typeof res.locals.role_permission !== 'undefined' && res.locals.role_permission == 'Yes') {
        var role_id                   = req.body.role_id;
        var role_permission_id        = req.body.role_permission_id;

        var role_permission           = req.body.role_permission;
        var event                     = req.body.event;
        var operator                  = req.body.operator;
        var donor                     = req.body.donor;

        var donation_program          = req.body.donation_program;
        var donation_history          = req.body.donation_history;
        var external_record           = req.body.external_record;
        var si_record                 = req.body.si_record;
        var csr_record                = req.body.csr_record;

        var expense_record            = req.body.expense_record;

        var newsletter                = req.body.newsletter;
        var finance                   = req.body.finance;
        var annual                    = req.body.annual;
        var impact                    = req.body.impact;

        var payment                   = req.body.payment;

        var media_blog                = req.body.media_blog;
        var media_links               = req.body.media_links; 

        var student_enrollment        = req.body.student_enrollment;
        var student_class             = req.body.student_class;
        var donor_student_allotment   = req.body.donor_student_allotment;

        var role                    = req.body.role;
        var designation             = req.body.designation;
        var member_type             = req.body.member_type;
        var donation_category       = req.body.donation_category;
        var donor_category          = req.body.donor_category;
        var team                    = req.body.team;

        var testimonial             = req.body.testimonial;
        

        if(role_id != '') {
            if(role_permission_id == '') {
                models.RolePermission.create({
                    role_id : role_id ,
                    role_permission  :  role_permission ? role_permission : 'No',
                    event            :  event ? event :'No',
                    operator         :  operator ? operator :'No',
                    donor            :  donor ? donor :'No',            
                    donation_program :  donation_program ? donation_program :'No',
                    donation_history :  donation_history ? donation_history :'No',
                    external_record  :  external_record ? external_record :'No',
                    si_record        :  si_record ? si_record :'No',
                    csr_record       :  csr_record ? csr_record :'No',            
                    expense_record   :  expense_record ? expense_record :'No',            
                    newsletter       :  newsletter ? newsletter :'No',
                    finance          :  finance ? finance :'No',
                    annual           :  annual ? annual :'No',
                    impact           :  impact ? impact :'No',            
                    payment          :  payment ?  payment :'No',            
                    media_blog       :  media_blog ? media_blog :'No',
                    media_links      :  media_links ?  media_links :'No',            
                    student_enrollment  : student_enrollment ? student_enrollment :'No',
                    student_class    :  student_class ? student_class :'No',
                    donor_student_allotment   : donor_student_allotment ? donor_student_allotment :'No',             
                    role           :  role ? role :'No',
                    designation    :  designation ? designation :'No',
                    member_type    :  member_type ? member_type :'No',
                    donation_category       : donation_category ? donation_category :'No',
                    donor_category :  donor_category ? donor_category :'No',
                    team           :  team ? team :'No',            
                    testimonial    :  testimonial ? testimonial :'No',
                    createdBy: 1
                }).then(function(result) {
                    if(result) {
                        req.flash('info',"Permission set successfully");
                        res.redirect('/admin/website-update/role-permission/form/'+result.role_id);
                    } else {
                        req.flash('err',"Failed to set permission! Please try again");
                        res.redirect('/admin/website-update/role-permission/list');
                    }
                }).catch(function(error) {
                    req.flash('err',"Something wrong! Please try again");
                    res.redirect('/admin/website-update/role-permission/list');
                });
            } else {
                models.RolePermission.update({
                    role_permission  :  role_permission ? role_permission : 'No',
                    event            :  event ? event :'No',
                    operator         :  operator ? operator :'No',
                    donor            :  donor ? donor :'No',            
                    donation_program :  donation_program ? donation_program :'No',
                    donation_history :  donation_history ? donation_history :'No',
                    external_record  :  external_record ? external_record :'No',
                    si_record        :  si_record ? si_record :'No',
                    csr_record       :  csr_record ? csr_record :'No',            
                    expense_record   :  expense_record ? expense_record :'No',            
                    newsletter       :  newsletter ? newsletter :'No',
                    finance          :  finance ? finance :'No',
                    annual           :  annual ? annual :'No',
                    impact           :  impact ? impact :'No',            
                    payment          :  payment ?  payment :'No',            
                    media_blog       :  media_blog ? media_blog :'No',
                    media_links      :  media_links ?  media_links :'No',            
                    student_enrollment  : student_enrollment ? student_enrollment :'No',
                    student_class    :  student_class ? student_class :'No',
                    donor_student_allotment   : donor_student_allotment ? donor_student_allotment :'No',             
                    role           :  role ? role :'No',
                    designation    :  designation ? designation :'No',
                    member_type    :  member_type ? member_type :'No',
                    donation_category       : donation_category ? donation_category :'No',
                    donor_category :  donor_category ? donor_category :'No',
                    team           :  team ? team :'No',            
                    testimonial    :  testimonial ? testimonial :'No',
                },{where:{role_permission_id : role_permission_id, role_id : role_id}})
                .then(function(affected_rows) {
                    if(affected_rows) {
                        req.flash('info',"Permission updated successfully");
                        res.redirect('/admin/website-update/role-permission/form/' + role_id);
                    } else {
                        req.flash('err',"Failed to update permission! Please try again");
                        res.redirect('/admin/website-update/role-permission/form/' + role_id);
                    }
                }).catch(function(error) {
                    console.log(error);
                    req.flash('err',"Something wrong! Please try again");
                    res.redirect('/admin/website-update/role-permission/form/' + role_permission_id);
                });
            }
        } else {
            req.flash('err',"Something wrong! Please try again");
            res.redirect('/admin/website-update/role-permission/list');
        }
    }else{
        res.redirect('/admin/dashboard');
    }
    
}







