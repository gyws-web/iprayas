var express = require('express');
const Sequelize = require("sequelize");
const sequelize = new Sequelize('mysql://root:@localhost:3306/gyws');
var router = express.Router();

var authController = require('../controllers/admin/authController');
var dashboardController = require('../controllers/admin/dashboardController');
var eventController = require('../controllers/admin/website_update/eventController');
var operatorController = require('../controllers/admin/website_update/operatorController');
var donorController = require('../controllers/admin/website_update/donorController');
var reportController = require('../controllers/admin/website_update/reportController');
var blogController = require('../controllers/admin/website_update/blogController');
var donationProgramController = require('../controllers/admin/website_update/donationProgramController');
var studentController = require('../controllers/admin/each/studentController');
var studentClassController = require('../controllers/admin/each/studentClassController');
var donorStudentController = require('../controllers/admin/each/donorStudentController');
var testimonialController = require('../controllers/admin/website_update/testimonialController');
var mediaLinksController = require('../controllers/admin/website_update/mediaLinksController');

var memberTypeController = require('../controllers/admin/masters/memberTypeController');
var donationCategoryController = require('../controllers/admin/masters/donationCategoryController');
var roleController = require('../controllers/admin/masters/roleController');
var designationController = require('../controllers/admin/masters/designationController');


/**
 * If operator is not logged in then it will redirects every page to the admin login page
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function checkOperatorLogin(req, res, next) {
    var sess = req.session.operator;
    console.log(req.session.email);
    try {
        if(!sess.email) {
            res.redirect("/admin/login");
        }
    } catch(err) {
        res.redirect("/admin/login");
    }
    next();
}




/**
 * This function checks whether any operator is logged in or not
 * If logged in then it will redirects login page to the dashboard
 */
function checkLoggedInOperator(req, res, next) {
    try {
        if(req.session.operator) {
            res.redirect("/admin/dashboard");
        }
    } catch(err) {
        res.redirect("/admin/logout");
    }
    next();
}




/**
 * This function will provide session data to each and every page
 * by using res.locals variable
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
async function middleHandler(req,res,next) {

    if(typeof req.session.operator !== 'undefined') {
        console.log("---------------------------------------------------");
        console.log(req.session.operator);
        console.log("---------------------------------------------------");

        var role = await sequelize.query("select title from roles where role_id="+req.session.operator.role_id,{type: sequelize.QueryTypes.SELECT });

        res.locals.operator_id = req.session.operator.operator_id;
        res.locals.operator_name = req.session.operator.name;
        res.locals.operator_photo = req.session.operator.photo;
        res.locals.operator_role = role[0].title;
    } 

    next();
}




/*********************************** Login and registration *******************************/
router.get('/login', checkLoggedInOperator, authController.loadLoginPage);
router.post('/login', checkLoggedInOperator, authController.checkLogin);
router.get('/logout', authController.logout);

router.get('/dashboard', checkOperatorLogin, middleHandler, dashboardController.loadDashboardPage);

router.get('/masters/member-type/list', checkOperatorLogin, middleHandler, memberTypeController.list);
router.get('/masters/member-type/form', checkOperatorLogin, middleHandler, memberTypeController.load);
router.post('/masters/member-type/form', checkOperatorLogin, middleHandler, memberTypeController.saveOrUpdate);
router.get('/masters/member-type/form/:member_type_id', checkOperatorLogin, middleHandler, memberTypeController.load);
router.post('/masters/member-type/form/:member_type_id', checkOperatorLogin, middleHandler, memberTypeController.saveOrUpdate);
router.post('/masters/member-type/delete', checkOperatorLogin, middleHandler, memberTypeController.delete);



router.get('/masters/donation-category/list', checkOperatorLogin, middleHandler, donationCategoryController.list);
router.get('/masters/donation-category/form', checkOperatorLogin, middleHandler, donationCategoryController.load);
router.post('/masters/donation-category/form', checkOperatorLogin, middleHandler, donationCategoryController.saveOrUpdate);
router.get('/masters/donation-category/form/:donation_category_id', checkOperatorLogin, middleHandler, donationCategoryController.load);
router.post('/masters/donation-category/form/:donation_category_id', checkOperatorLogin, middleHandler, donationCategoryController.saveOrUpdate);
router.post('/masters/donation-category/delete', checkOperatorLogin, middleHandler, donationCategoryController.delete);


router.get('/masters/role/list', checkOperatorLogin, middleHandler, roleController.list);
router.get('/masters/role/form', checkOperatorLogin, middleHandler, roleController.load);
router.post('/masters/role/form', checkOperatorLogin, middleHandler, roleController.saveOrUpdate);
router.get('/masters/role/form/:role_id', checkOperatorLogin, middleHandler, roleController.load);
router.post('/masters/role/form/:role_id', checkOperatorLogin, middleHandler, roleController.saveOrUpdate);
router.post('/masters/role/delete', checkOperatorLogin, middleHandler, roleController.delete);


router.get('/masters/designation/list', checkOperatorLogin, middleHandler, designationController.list);
router.get('/masters/designation/form', checkOperatorLogin, middleHandler, designationController.load);
router.post('/masters/designation/form', checkOperatorLogin, middleHandler, designationController.saveOrUpdate);
router.get('/masters/designation/form/:designation_id', checkOperatorLogin, middleHandler, designationController.load);
router.post('/masters/designation/form/:designation_id', checkOperatorLogin, middleHandler, designationController.saveOrUpdate);
router.post('/masters/designation/delete', checkOperatorLogin, middleHandler, designationController.delete);



router.get('/website-update/event/list', checkOperatorLogin, middleHandler, eventController.list);
router.get('/website-update/event/form', checkOperatorLogin, middleHandler, eventController.load);
router.post('/website-update/event/form', checkOperatorLogin, middleHandler, eventController.saveOrUpdate);
router.get('/website-update/event/form/:event_id?', checkOperatorLogin, middleHandler, eventController.load);
router.post('/website-update/event/form/:event_id?', checkOperatorLogin, middleHandler, eventController.saveOrUpdate);
router.post('/website-update/event/delete', checkOperatorLogin, middleHandler, eventController.delete);


router.get('/website-update/testimonial/list', checkOperatorLogin, middleHandler, testimonialController.list);
router.get('/website-update/testimonial/form', checkOperatorLogin, middleHandler, testimonialController.load);
router.post('/website-update/testimonial/form', checkOperatorLogin, middleHandler, testimonialController.saveOrUpdate);
router.get('/website-update/testimonial/form/:testimonial_id?', checkOperatorLogin, middleHandler, testimonialController.load);
router.post('/website-update/testimonial/form/:testimonial_id?', checkOperatorLogin, middleHandler, testimonialController.saveOrUpdate);
router.post('/website-update/testimonial/delete', checkOperatorLogin, middleHandler, testimonialController.delete);



router.get('/website-update/operator/list', checkOperatorLogin, middleHandler, operatorController.list);
router.get('/website-update/operator/form', checkOperatorLogin, middleHandler, operatorController.load);
router.post('/website-update/operator/form', checkOperatorLogin, middleHandler, operatorController.saveOrUpdate);
router.get('/website-update/operator/form/:operator_id?', checkOperatorLogin, middleHandler, operatorController.load);
router.post('/website-update/operator/form/:operator_id?', checkOperatorLogin, middleHandler, operatorController.saveOrUpdate);
router.post('/website-update/operator/delete', checkOperatorLogin, middleHandler, operatorController.delete);



router.get('/website-update/donor/list', checkOperatorLogin, middleHandler, donorController.list);
router.get('/website-update/donor/form', checkOperatorLogin, middleHandler, donorController.load);
router.post('/website-update/donor/form', checkOperatorLogin, middleHandler, donorController.saveOrUpdate);
router.get('/website-update/donor/form/:donor_id?', checkOperatorLogin, middleHandler, donorController.load);
router.post('/website-update/donor/form/:donor_id?', checkOperatorLogin, middleHandler, donorController.saveOrUpdate);
router.post('/website-update/donor/delete', checkOperatorLogin, middleHandler, donorController.delete);



router.get('/website-update/report/:report_type?/list', checkOperatorLogin, middleHandler, reportController.list);
router.get('/website-update/report/:report_type?/form', checkOperatorLogin, middleHandler, reportController.load);
router.post('/website-update/report/:report_type?/form', checkOperatorLogin, middleHandler, reportController.saveOrUpdate);
router.get('/website-update/report/:report_type?/form/:report_id', checkOperatorLogin, middleHandler, reportController.load);
router.post('/website-update/report/:report_type?/form/:report_id', checkOperatorLogin, middleHandler, reportController.saveOrUpdate);
router.post('/website-update/report/:report_type?/delete', checkOperatorLogin, middleHandler, reportController.delete);



router.get('/website-update/blog/list', checkOperatorLogin, middleHandler, blogController.list);
router.get('/website-update/blog/form', checkOperatorLogin, middleHandler, blogController.load);
router.post('/website-update/blog/form', checkOperatorLogin, middleHandler, blogController.saveOrUpdate);
router.get('/website-update/blog/form/:blog_id', checkOperatorLogin, middleHandler, blogController.load);
router.post('/website-update/blog/form/:blog_id', checkOperatorLogin, middleHandler, blogController.saveOrUpdate);
router.post('/website-update/blog/delete', checkOperatorLogin, middleHandler, blogController.delete);



router.get('/website-update/donation-program/list', checkOperatorLogin, middleHandler, donationProgramController.list);
router.get('/website-update/donation-program/form', checkOperatorLogin, middleHandler, donationProgramController.load);
router.post('/website-update/donation-program/form', checkOperatorLogin, middleHandler, donationProgramController.saveOrUpdate);
router.get('/website-update/donation-program/form/:donation_program_id', checkOperatorLogin, middleHandler, donationProgramController.load);
router.post('/website-update/donation-program/form/:donation_program_id', checkOperatorLogin, middleHandler, donationProgramController.saveOrUpdate);
router.post('/website-update/donation-program/delete', checkOperatorLogin, middleHandler, donationProgramController.delete);


//router.get('/website-update/media-links/list', mediaLinksController.list);
router.get('/website-update/media-links/form', checkOperatorLogin, middleHandler, mediaLinksController.load);
router.post('/website-update/media-links/form', checkOperatorLogin, middleHandler, mediaLinksController.saveOrUpdate);
//router.get('/website-update/media-links/form/:blog_id', mediaLinksController.load);
//router.post('/website-update/media-links/form/:blog_id', mediaLinksController.saveOrUpdate);
//router.post('/website-update/media-links/delete', mediaLinksController.delete);



router.get('/each/student/list', checkOperatorLogin, middleHandler, studentController.list);
router.get('/each/student/form', checkOperatorLogin, middleHandler, studentController.load);
router.post('/each/student/form', checkOperatorLogin, middleHandler, studentController.saveOrUpdate);
router.get('/each/student/form/:student_id', checkOperatorLogin, middleHandler, studentController.load);
router.post('/each/student/form/:student_id', checkOperatorLogin, middleHandler, studentController.saveOrUpdate);
router.get('/each/student/report/:student_id/:session', checkOperatorLogin, middleHandler, studentController.loadReport);
router.post('/each/student/report/:student_id/:session', checkOperatorLogin, middleHandler, studentController.saveOrUpdateReport);
router.post('/each/student/delete', checkOperatorLogin, middleHandler, studentController.delete);



router.get('/each/student-class/list', checkOperatorLogin, middleHandler, studentClassController.list);
router.get('/each/student-class/form', checkOperatorLogin, middleHandler, studentClassController.load);
router.post('/each/student-class/form', checkOperatorLogin, middleHandler, studentClassController.saveOrUpdate);
router.get('/each/student-class/form/:student_id', checkOperatorLogin, middleHandler, studentClassController.load);
router.post('/each/student-class/form/:student_id', checkOperatorLogin, middleHandler, studentClassController.saveOrUpdate);
router.post('/each/student-class/pass-fail', checkOperatorLogin, middleHandler, studentClassController.saveOrUpdate);



router.get('/each/donor-student/list', checkOperatorLogin, middleHandler, donorStudentController.list);
router.get('/each/donor-student/form', checkOperatorLogin, middleHandler, donorStudentController.load);
router.post('/each/donor-student/form', checkOperatorLogin, middleHandler, donorStudentController.saveOrUpdate);
router.post('/each/donor-student/send-email', checkOperatorLogin, middleHandler, donorStudentController.sendEmail);
/*router.get('/each/donor-student/form/:student_id', donorStudentController.load);
router.post('/each/donor-student/form/:student_id', donorStudentController.saveOrUpdate);
router.post('/each/donor-student/pass-fail', donorStudentController.saveOrUpdate); */





module.exports = router;

