let models = require("../../../models");
const { Op } = require("sequelize");
const multiparty = require('multiparty'); 
const fs = require("fs-extra");
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
 * Return the list of the all students
 */
exports.list = async function(req, res, next) {
    if( typeof res.locals.student_enrollment   !=='undefined' && res.locals.student_enrollment   =='Yes'){ 
    var session  = (typeof req.query.session !== "undefined" && req.query.session != '' ? req.query.session : '');
    var standard = (typeof req.query.standard !== "undefined" && req.query.standard != '' ? req.query.standard : '');
    var section  = (typeof req.query.section !== "undefined" && req.query.section != '' ? req.query.section : '');
    var gender   = (typeof req.query.gender !== "undefined" && req.query.gender != '' ? req.query.gender : '');

    var where = '';
    var student_list = '';
    if(session != '')  where += " b.academic_session='"+session+"' and";
    if(standard != '') where += " b.standard='"+standard+"' and";
    if(section != '')  where += " b.section='"+section+"' and";
    if(gender != '')   where += " a.gender='"+gender+"' and";

    where = where.substring(0, where.length-3);
    if(where != '') {
        student_list = await sequelize.query("select a.student_id, a.name, a.father_name, a.contact_no, a.photo, a.gender, "+
                                                 "b.academic_session, b.standard, b.section " +
                                                 "from students as a left join studentclasses as b on b.student_id=a.student_id "+
                                                 "where "+where, { type: sequelize.QueryTypes.SELECT });
    } else {
        student_list = await models.Student.findAll({
            attributes:["student_id", "name", "father_name", "contact_no", "photo"],
            order:[["student_id","DESC"]],
            include:[{
                model: models.StudentClass, as: 'student_class',
                attributes:["standard"]
            }]
        });
    }

    res.render('pages/admin/each/student/list', 
    {
        title:"Student List | GYWS",
        student_list: student_list,
        academic_session_list: await academicSessionList(),
        session: session,
        standard: standard,
        section: section,
        gender: gender,
        s_msg: req.flash('info'),
        e_msg: req.flash('err')
    });
}else{
    res.redirect('/admin/dashboard');
}
}




/**
 * Load the student report
 * Create new or update existing student
 */
exports.load = async function(req, res, next) {
    if( typeof res.locals.student_enrollment   !=='undefined' && res.locals.student_enrollment   =='Yes'){ 
    var student_id = req.params.student_id;
    var student_details = '';
    if(typeof student_id !== 'undefined' && student_id > 0) {
        try {
            student_details = await models.Student.findOne({
                attributes:{exclude:["createdAt", "createdBy", "updatedAt", "updatedBy"]},
                where: {student_id:student_id},
                include:[{
                    model: models.StudentClass, as: 'student_class',
                    attributes: ["sc_id", "standard","section","roll", "academic_session"]
                }]
            });
            if(student_details == null) {
                req.flash('err',"Something wrong! Please try again");
                return res.redirect("/admin/each/student/list");
            }
        } catch(error) {
            return res.send(error);
        }
    } 

    res.render('pages/admin/each/student/form', {
        title:"Student | GYWS",
        student_details: student_details,
        academic_session_list: await academicSessionList(),
        s_msg: req.flash('info'),
        e_msg: req.flash('err')
    });
}else{
    res.redirect('/admin/dashboard');
}
}




/**
 * Save new blog or update the existing blog
 */
exports.saveOrUpdate = async function(req, res) {
    if( typeof res.locals.student_enrollment   !=='undefined' && res.locals.student_enrollment   =='Yes'){ 
    var form = new multiparty.Form();
    form.parse(req, async function(err, fields, files) {
        var student_id = fields.student_id[0];
        var sc_id = fields.sc_id[0];
        var name = fields.name[0];
        var gender = fields.gender[0];
        var standard = fields.standard[0];
        var section = fields.section[0];
        var roll = fields.roll[0];
        var father_name = fields.father_name[0];
        var mother_name = fields.mother_name[0];
        var contact_no = fields.contact_no[0];
        var address = fields.address[0];
        var left = fields.left[0];
        var leave_reason = fields.leave_reason[0];
        var academic_session = fields.session[0];

        if(name != '' && gender != '' && standard != '' && section != '') {
            if(student_id == '') {  //Insert new record
 
                await models.Student.create({
                    name: name, 
                    gender: gender,  
                    father_name: father_name,
                    mother_name: mother_name,
                    contact_no: contact_no,
                    address: address,
                    left: left,
                    leave_reason: leave_reason,
                    photo:'',
                    createdBy: 1
                }).then(async function(student) {
                    if(student) {
                        await models.StudentClass.create({
                            standard: standard, 
                            section: section,
                            roll: roll,
                            academic_session: academic_session,
                            student_id: student.student_id,
                            createdBy: 1
                        });

                        uploadSingleFile(files, student.student_id);
                          
                        req.flash('info',"Student successfully added");
                        return res.redirect('/admin/each/student/list');
                    } else {
                        req.flash('err',"Failed to add student! Please try again");
                        return res.redirect('/admin/each/student/form');
                    }
                }).catch(function(error) {
                    return res.send(error);
                });
            } else { //Update existing record
                await models.Student.update({
                    name: name, 
                    gender: gender,  
                    father_name: father_name,
                    mother_name: mother_name,
                    contact_no: contact_no,
                    address: address,
                    left: left,
                    leave_reason: leave_reason,
                    updatedBy: 1
                },{where:{student_id:student_id}})
                .then(async function(affected_rows) {
                    if(affected_rows > 0) {
                        await models.StudentClass.update({
                            standard: standard, 
                            section: section,
                            roll: roll,
                            academic_session: academic_session,
                            updatedBy: 1
                        },{where:{sc_id: sc_id, student_id:student_id}})
                        .catch(function(error) {
                            req.flash('err',"Failed to update student! Please try again");
                            return res.redirect('/admin/each/student/form');
                        });
                        await uploadSingleFile(files, student_id);
                        req.flash('info',"Student successfully updated");
                        return res.redirect('/admin/each/student/form/'+student_id);
                    } else {
                        req.flash('err',"Failed to update blog! Please try again");
                        return res.redirect('/admin/each/student/form');
                    }
                }).catch(function(error) {
                    return res.send(error);
                })
            }
        } else {
            req.flash('err',"Please fill all the mandatory fields!");
            return res.redirect('/admin/each/student/form');
        }
    });
}else{
    res.redirect('/admin/dashboard');
}
    
}






/**
 * Delete student record one at a time
 */
exports.delete = async function(req, res, next) {
    if( typeof res.locals.student_enrollment   !=='undefined' && res.locals.student_enrollment   =='Yes'){ 
    var student_id = req.body.student_id;
  
    if(typeof student_id !== 'undefined' && student_id > 0) {
        try {
            var student = await models.Student.findOne({attributes:["photo"],where:{student_id:student_id}});
            if(student) {
                await models.Student.destroy({where:{student_id:student_id}});
                await models.StudentClass.destroy({where:{student_id:student_id}});
                if(student.photo != '') helpers.removeDir("public/contents/students/"+student.photo);
                req.flash('info', "Student successfully deleted");
            } else {
                req.flash('err', "Failed to delete student! Please try again");
            }
        } catch(error) {
            req.flash('err', "Failed to delete student! Please try again");
        }
    } else {
        req.flash('err', "Something wrong! Please try again")
    }
    return res.redirect('/admin/each/student/list');
}else{
    res.redirect('/admin/dashboard');
}
}






/**
 * Load the student report form
 */
exports.loadReport = async function(req, res, next) {
    if( typeof res.locals.student_enrollment   !=='undefined' && res.locals.student_enrollment   =='Yes'){ 
    var student_id = req.params.student_id;
    var session = req.params.session;
    var student_details = '';
    if(typeof student_id !== 'undefined' && student_id > 0) {
        try {
            student_details = await models.Student.findOne({
                attributes:{exclude:["createdAt", "createdBy", "updatedAt", "updatedBy"]},
                where: {student_id:student_id},
                include:[{
                    model: models.StudentClass, as: 'student_class',
                    attributes: ["sc_id", "standard","section","roll", "academic_session", "report1", "report2", "report3", "report4"],
                    where:{academic_session:session}
                }]
            });
            if(student_details == null) {
                req.flash('err',"Something wrong! Please try again");
                return res.redirect("/admin/each/student/list");
            }
        } catch(error) {
            return res.send(error);
        }
    } 


    //res.status(200).send({success:true, student_details:student_details});

    res.render('pages/admin/each/student/report', {
        title:"Student Report | GYWS",
        student_details: student_details,
        academic_session_list: await academicSessionList(),
        s_msg: req.flash('info'),
        e_msg: req.flash('err')
    });
}else{
    res.redirect('/admin/dashboard');
}
}






/**
 * Save new blog or update the existing blog
 */
exports.saveOrUpdateReport = async function(req, res) {
    if( typeof res.locals.student_enrollment   !=='undefined' && res.locals.student_enrollment   =='Yes'){ 
    var form = new multiparty.Form();
    form.parse(req, async function(err, fields, files) {
        var student_id = fields.student_id[0];
        var report_card = fields.report_card[0];
        var academic_session = fields.academic_session[0];

        if(student_id != '' && academic_session != '') {
            var location = "public/contents/student_reports/";
            var file_name = student_id + "_" + report_card;
            var filenames = await helpers.uploadSingleFile(files, location, false, file_name);
            if(filenames.length > 0) {
                if(report_card == "report1") {
                    await models.StudentClass.update({
                        report1 : filenames[0],
                    },{where:{academic_session:academic_session, student_id: student_id}});
                } else if(report_card == "report2") {
                    await models.StudentClass.update({
                        report2 : filenames[0],
                    },{where:{academic_session:academic_session, student_id: student_id}});
                } else if(report_card == "report3") {
                    await models.StudentClass.update({
                        report3 : filenames[0],
                    },{where:{academic_session:academic_session, student_id: student_id}});
                } else if(report_card == "report4") {
                    await models.StudentClass.update({
                        report4 : filenames[0],
                    },{where:{academic_session:academic_session, student_id: student_id}});
                }
                req.flash('info',"Report uploaded successfully!");
                res.redirect('/admin/each/student/report/'+student_id+'/'+academic_session);
            } else {
                req.flash('err',"Something wrong! Please try again");
                res.redirect('/admin/each/student/report/'+student_id+'/'+academic_session);
            }
        } else {
            req.flash('err',"Please fill all the mandatory fields!");
            return res.redirect('/admin/each/student/list');
        }
    });
}else{
    res.redirect('/admin/dashboard');
}
    
}








/**
 * Upload blog images and the thumbnail image by calling the helper function
 * Update blogImage table by inserting the blog id and the image names
 * @param {*} files 
 * @param {*} student_id 
 */
async function uploadSingleFile(files, student_id) {
    var location = "public/contents/students/";
    var filenames = await helpers.uploadSingleFile(files, location, false, student_id);
    if(filenames.length > 0) {
        await models.Student.update({
            "photo":filenames[0],
        },{where:{student_id: student_id}});
    }
}





/**
 * Generate academic session year
 */
async function academicSessionList() {
    var dt = new Date();
    var date = dt.getDate();
    var month = dt.getMonth() + 1; // Since getMonth() returns month from 0-11
    var year = dt.getFullYear();
    var start_year = year;
    var end_year = 2010;
    var academic_sessions = [];
    if(month >= 4) {
        start_year = year + 1;
    }

    for(var i=start_year; i>end_year; i--) {
        var aca_sess_year = (start_year-1) + "-" + start_year;
        academic_sessions.push(aca_sess_year);
        start_year--;
    }

    return academic_sessions;
}







