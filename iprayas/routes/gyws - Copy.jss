var express = require('express');
var router = express.Router();

var homeController = require('../controllers/gyws/homeController');
var donorController = require('../controllers/gyws/donorController');
var paymentGatewayController = require('../controllers/gyws/paymentGatewayController');
var contactUsController = require('../controllers/gyws/contactUsController');
var reportController = require('../controllers/admin/website_update/reportController');
var operatorController = require('../controllers/admin/website_update/operatorController');
var donateController = require('../controllers/gyws/donateController');
var mediaController = require('../controllers/gyws/mediaController');
var initiativesController = require('../controllers/gyws/initiativesController');
var cmsController = require('../controllers/gyws/cmsController');


function checkLoginDonor(req, res, next) {
    try {
        if(!req.session.donor) {
            res.redirect("/donor/login");
        }
    } catch(err) {
        res.redirect("/donor/login");
    }
    next();
}


function checkLoggedInDonor(req, res, next) {
    try {
        if(req.session.donor) {
            res.redirect("/donor/dashboard");
        }
    } catch(err) {
        //res.redirect("/donor/login");
    }
    next();
}



function middleHandler(req,res,next) {
    /* models.admin_users.findOne({ where: {username: (req.session.passport.user)} }).then(async function(user) {
        if(user)
        {
            res.locals.userfullname = user.name;
            res.locals.profilePicId = user.id;
            res.locals.timezone = req.cookies.timezone;
            var roletitle = await sequelize.query("SELECT title FROM `roles` LEFT join admin_users as au on au.role=roles.role_id where au.id="+user.id+"",{ type: Sequelize.QueryTypes.SELECT });
            if(roletitle.length > 0){
                res.locals.roletitle = roletitle[0].title;
            }else{
                res.locals.roletitle = '';
            }
            
            next();
        }else{
            req.logout();
            res.redirect('/auth/signin');
        } 
    });*/

    if(typeof req.session.donor !== 'undefined') {
        console.log("---------------------------------------------------");
        console.log(req.session.donor);
        console.log("---------------------------------------------------");

        res.locals.donor_id = req.session.donor.donor_id;
        res.locals.donor_name = req.session.donor.name;
        res.locals.donor_contact_no = req.session.donor.contact_no;
        //next();
    } 

    next();
}




/*********************************** Home Page *******************************/
router.get('/', homeController.loadHomePage);
router.get('/donor/login', checkLoggedInDonor, donorController.loginPage);
router.post('/donor/login', donorController.loginCheck);
router.get('/donor/registration', checkLoggedInDonor, donorController.loadRegistrationPage);
router.post('/donor/registration', checkLoggedInDonor, donorController.saveOrUpdate);
router.get('/donor/dashboard', checkLoginDonor, middleHandler, donorController.dashboard);
router.get('/donor/profile', checkLoginDonor, middleHandler, donorController.profile);
router.post('/donor/profile', checkLoginDonor, middleHandler, donorController.saveOrUpdate);
router.get('/donor/alloted-students', checkLoginDonor, middleHandler, donorController.allotedStudents);
router.get('/donor/passbook', checkLoginDonor, middleHandler, donorController.passbook);
router.get('/donor/logout', function(req, res){
    if(req.session){
        req.session.destroy((error)=>{
           if(error){
             console.log(error);
           }
        });
     }
    res.redirect('/donor/login');
});



/*********************************** Payment Gateway *******************************/
router.get('/payment/fetch-all', middleHandler, paymentGatewayController.getAllPayments);
router.post('/payment/create-order', middleHandler, paymentGatewayController.createOrder);
router.get('/payment/fetch-all-orders', middleHandler, paymentGatewayController.fetchAllOrder);
router.post('/payment/payment-verify', middleHandler, paymentGatewayController.paymentVerify);


router.get('/resources/:slug?', middleHandler, reportController.getFinancialReportList);
router.get('/contact', middleHandler, contactUsController.loadPage);
router.post('/contact', middleHandler, contactUsController.save);
router.get('/members', middleHandler, operatorController.getOperatorListMemberWise);
router.post('/operator-list-member-type-wise', middleHandler, operatorController.ajax_getOperatorListMemberWise);
router.get('/donate', middleHandler, donateController.getDonationCategoryList);
router.get('/donate/:slug?', middleHandler, donateController.getCategoryWiseDonationProgramList);
router.get('/media', middleHandler, mediaController.load);
router.get('/blog/:slug?', middleHandler, mediaController.articleDetails);
/*********************************  Initiatives routs ********************************/
router.get('/jvm', middleHandler, initiativesController.jvm);
router.get('/prayas', middleHandler, initiativesController.prayas);
router.get('/udyat', middleHandler, initiativesController.udyat);
router.get('/pfp', middleHandler, initiativesController.aarohan);
router.get('/kbc', middleHandler, initiativesController.kbc);

/******************************* CMS PAGE ROUTES *************************************/
router.get('/about', middleHandler, cmsController.about);


module.exports = router;

