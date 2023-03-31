let models = require("../../../models");
//const Sequelize = require("sequelize");
//const sequelize = new Sequelize('mysql://root:@localhost:3306/gyws');
//const sequelize = require("../../../config/sequelizeConnect");

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


const email_func = require("../../../helpers/email_functions");




/**
 * Return the list of the all records based on the get parameters
 */
exports.list = async function(req, res, next) {
    if( typeof res.locals.donor_student_allotment   !=='undefined' && res.locals.donor_student_allotment   =='Yes'){  
    donor_student_list = await sequelize.query("select a.createdAt, DATEDIFF(CURDATE(),a.createdAt) as diff, b.donor_id, b.name 'donor_name', b.photo 'donor_photo', b.email 'donor_email', c.student_id, "+
                                               "c.name 'student_name', c.photo 'student_photo', d.standard, e.program_name, e.donation_program_id "+
                                               "from donorstudents as a "+
                                               "left join donors as b on b.donor_id = a.donor_id " +
                                               "left join students as c on c.student_id = a.student_id "+
                                               "left join donationprograms as e on e.donation_program_id = a.donation_program_id "+
                                               "left join studentclasses as d on d.student_id = c.student_id and d.academic_session=a.academic_session ",{ type: sequelize.QueryTypes.SELECT });
    
    res.render('pages/admin/each/donor_student/list', 
    {
        title:"Donor-Student Allotment List | GYWS",
        donor_student_list: donor_student_list,
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
    if( typeof res.locals.donor_student_allotment   !=='undefined' && res.locals.donor_student_allotment   =='Yes'){  
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
    
    var donor_list = await models.Donor.findAll({where:{'active':'Yes'},order: [["name","asc"]]});
    var donation_program_list = await models.DonationProgram.findAll({where:{'active':'Yes'},order: [["program_name","asc"]]})
    var donor_student_details = '';

    res.render('pages/admin/each/donor_student/form', {
        title:"Donor-Student Allotment | GYWS",
        donor_list: donor_list,
        student_list: student_list,
        donation_program_list: donation_program_list,
        donor_student_details: donor_student_details,
        academic_session_list: await academicSessionList(true), //only_current_session = true
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
 * Save new or update the existing record
 */
exports.saveOrUpdate = async function(req, res) {
    if( typeof res.locals.donor_student_allotment   !=='undefined' && res.locals.donor_student_allotment   =='Yes'){  

    var donor_ids = req.body.H_donor_ids;
    donor_ids = donor_ids.split(",");
    var donation_program_id = req.body.H_donation_program_id;
    var student_ids = req.body.H_student_ids;
    student_ids = student_ids.split(",");
    var academic_session = req.body.H_academic_session;
    var standard = req.body.H_standard;
    
    if(student_ids != '' && donor_ids != '' && academic_session != '' && standard != '') {
        for(var i=0; i<donor_ids.length; i++) {
            for(var j=0; j<donor_ids.length; j++) {
                await models.DonorStudent.create({ 
                    academic_session: academic_session,
                    donor_id: donor_ids[i],
                    donation_program_id: donation_program_id,
                    student_id: student_ids[j],
                    createdBy: 1
                });
            }
        }

        req.flash("info", "Donor-Student allotment successfully updated");
        res.redirect('/admin/each/donor-student/list');
    } else {
        req.flash("err", "Something wrong! Please try again");
        res.redirect('back');
    }
}else{
    res.redirect('/admin/dashboard');
}
}






/**
 * Send email to the donor
 */
exports.sendEmail = async function(req, res) {
    if( typeof res.locals.donor_student_allotment   !=='undefined' && res.locals.donor_student_allotment   =='Yes'){  

    var recipient_id = req.body.recipient_id;
    var recipient_name = req.body.recipient_name;
    var recipient_email = req.body.recipient_email;
    var recipient_type = req.body.recipient_type;
    var email_type = req.body.emailtype;
    var stu_id = req.body.st_id;
    var stu_class = req.body.st_class;
    var subject = req.body.subject;
    var message = req.body.message;

    var report_list = await sequelize.query(
        "select report1, report2, report3, report4 from studentclasses "+
        "where student_id="+stu_id+ " and standard='"+stu_class+"' "+
        "order by sc_id desc limit 1",{ type: sequelize.QueryTypes.SELECT });

    
    await email_func.sendTextMail(recipient_email, subject, message, '', '', report_list[0]);
    status = "Sent";
    console.log("--------------------------------------------------------");
    console.log(report_list[0]);
    console.log("--------------------------------------------------------");

    if(recipient_email != '' && subject != '' && message != '') {
        await models.EmailHistory.create({ 
            recipient_id: recipient_id,
            recipient_name: recipient_name,
            recipient_email: recipient_email,
            recipient_type: recipient_type,
            sender_id: "1",
            sender_type: 'Admin',
            subject: subject,
            message: message,
            status: status
        }).catch(function(err) {
            console.log(err);
            req.flash("err", "Failed to send email! Please try again");
        })
        req.flash("info", "Email sent successfully");
    } else {
        req.flash("err", "Something wrong! Please try again");
    }

    res.redirect("/admin/each/donor-student/list");
}else{
    res.redirect('/admin/dashboard');
}
}


/**
 * Fetch template
 */
exports.fetchTemplate = async function(req, res) {
    if( typeof res.locals.donor_student_allotment   !=='undefined' && res.locals.donor_student_allotment   =='Yes'){  
//    console.log(req.data);
    var email_type = req.body.type;
    var stname = req.body.stname;
    var stclass = req.body.stclass;
    console.log(email_type);


    if(typeof email_type !== 'undefined' && email_type > 0) {
        await models.Email.findOne({
            attributes:{exclude:["createdAt", "updatedAt"]},
            where: {type_id:email_type},
        }).then(result => {
            body = result.body;
            body = body.replace('**Student Name**', stname);
            body = body.replace('**Student Class**', stclass);
            res.send({"body":body, "subject":result.subject});
        }).catch(error => {
            res.json(error);
        });
    }
}else{
    res.redirect('/admin/dashboard');
}

}





/**
 * Generate academic session year
 */
async function academicSessionList(only_current_session = false) {
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

    if(only_current_session) {
        var aca_sess_year = (start_year-1) + "-" + start_year;
        academic_sessions.push(aca_sess_year);
    } else {
        for(var i=start_year; i>end_year; i--) {
            var aca_sess_year = (start_year-1) + "-" + start_year;
            academic_sessions.push(aca_sess_year);
            start_year--;
        }
    }

    return academic_sessions;
}




