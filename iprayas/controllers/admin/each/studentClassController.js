let models = require("../../../models");
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
 * Return the list of the all records based on the get parameters
 */
exports.list = async function(req, res, next) {
    if( typeof res.locals.student_class   !=='undefined' && res.locals.student_class   =='Yes'){ 
    var session  = (typeof req.query.session !== "undefined" && req.query.session != '' ? req.query.session : '');
    var standard = (typeof req.query.standard !== "undefined" && req.query.standard != '' ? req.query.standard : '');
    var section  = (typeof req.query.section !== "undefined" && req.query.section != '' ? req.query.section : '');
    var gender   = (typeof req.query.gender !== "undefined" && req.query.gender != '' ? req.query.gender : '');

    var student_list = [];
    if(session != '' && standard != '') {
        var where = '';
        if(session != '')  where += " b.academic_session='"+session+"' and";
        if(standard != '') where += " b.standard='"+standard+"' and";
        if(section != '')  where += " b.section='"+section+"' and";
        if(gender != '')   where += " a.gender='"+gender+"' and";

        where = where.substring(0, where.length-3);
        if(where != '') {
            student_list = await sequelize.query("select a.student_id, a.name, a.father_name, a.contact_no, a.photo, a.gender, "+
                                                    "b.academic_session, b.standard, b.section, b.roll " +
                                                    "from students as a left join studentclasses as b on b.student_id=a.student_id "+
                                                    "where "+where, { type: sequelize.QueryTypes.SELECT });
        } 
    }

    res.render('pages/admin/each/student_class/list', 
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
 * Load the new/edit form
 */
exports.load = async function(req, res, next) {
    if( typeof res.locals.student_class   !=='undefined' && res.locals.student_class   =='Yes'){ 
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
 * Save new or update the existing record
 */
exports.saveOrUpdate = async function(req, res) {
    if( typeof res.locals.student_class   !=='undefined' && res.locals.student_class   =='Yes'){ 

    var student_ids = req.body.student_id;
    var student_rolls = req.body.roll;
    var academic_session = req.body.H_session;
    var standard = req.body.H_standard;
    var section  = req.body.H_section;
    var pass_or_fail = req.body.pass_or_fail;

    //academic-session 2020-2021 => 2021-2022
    academic_session = academic_session.split("-");
    academic_session = (parseInt(academic_session[0])+1) + "-" + (parseInt(academic_session[1])+1);

    if(typeof student_ids !== 'undefined' && student_ids != '' && standard != '') {
        var total_ids = student_ids.length;
        var row_count = 0;
        for(var i=0; i<total_ids; i++) {
            await models.StudentClass.create({
                standard: (parseInt(standard)+1), 
                section: section,
                roll: student_rolls[i],
                academic_session: academic_session,
                pass_or_fail: pass_or_fail,
                student_id: student_ids[i],
                createdBy: 1
            });
            row_count += 1;
        }

        req.flash("info", 'Total ' + row_count + ' student(s) status updated as "' + pass_or_fail + '"');
        res.redirect('back');
    } else {
        req.flash("err", "Something wrong! Please try again");
        res.redirect('back');
    }
}else{
    res.redirect('/admin/dashboard');
}
}









/**
 * Delete record one at a time
 */
exports.delete = async function(req, res, next) {
    if( typeof res.locals.student_class   !=='undefined' && res.locals.student_class   =='Yes'){ 
    var student_id = req.body.student_id;
  
    if(typeof student_id !== 'undefined' && student_id > 0) {
        try {
            var student = await models.Student.findOne({attributes:["photo"],where:{student_id:student_id}});
            if(student) {
                await models.Student.destroy({where:{student_id:student_id}});
                await models.StudentClass.destroy({where:{student_id:student_id}});
                if(student.photo != '') helpers.removeDir("public/contents/students/2020-2021/"+student.photo);
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
 * Upload blog images and the thumbnail image by calling the helper function
 * Update blogImage table by inserting the blog id and the image names
 * @param {*} files 
 * @param {*} student_id 
 */
async function uploadSingleFile(files, student_id) {
    var location = "public/contents/students/2020-2021/";
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







