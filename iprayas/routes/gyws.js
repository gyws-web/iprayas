var express = require("express");
var router = express.Router();

var homeController = require("../controllers/gyws/homeController");
var donorController = require("../controllers/gyws/donorController");
var paymentGatewayController = require("../controllers/gyws/paymentGatewayController");
var contactUsController = require("../controllers/gyws/contactUsController");
var reportController = require("../controllers/admin/website_update/reportController");
var operatorController = require("../controllers/admin/website_update/operatorController");
var donateController = require("../controllers/gyws/donateController");
var mediaController = require("../controllers/gyws/mediaController");
var initiativesController = require("../controllers/gyws/initiativesController");
var cmsController = require("../controllers/gyws/cmsController");
//var nepController = require('../controllers/gyws/nepController');
var memberController = require("../controllers/gyws/memberController");
var aboutUsController = require("../controllers/gyws/aboutUsController");

function checkLoginDonor(req, res, next) {
  try {
    if (!req.session.donor) {
      res.redirect("/donor/login");
    }
  } catch (err) {
    res.redirect("/donor/login");
  }
  next();
}

function checkLoggedInDonor(req, res, next) {
  try {
    if (req.session.donor) {
      res.redirect("/donor/dashboard");
    }
  } catch (err) {
    //res.redirect("/donor/login");
  }
  next();
}

function middleHandler(req, res, next) {
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

  if (typeof req.session.donor !== "undefined") {
    console.log("---------------------------------------------------");
    console.log(req.session.donor);
    console.log("---------------------------------------------------");
    res.locals.donor_email = req.session.donor.email;
    res.locals.donor_id = req.session.donor.donor_id;
    res.locals.donor_name = req.session.donor.name;
    res.locals.donor_username = req.session.donor.username;
    res.locals.donor_contact_no = req.session.donor.contact_no;
  } else if (typeof req.session.temp_donor !== "undefined") {
    console.log("---------------------------------------------------");
    console.log(req.session.temp_donor);
    console.log("---------------------------------------------------");
    res.locals.donor_email = req.session.temp_donor.email;
    res.locals.temp_donor_id = req.session.temp_donor.donor_id;
    res.locals.temp_donor_name = req.session.temp_donor.name;
    res.locals.temp_donor_contact_no = req.session.temp_donor.contact_no;
  }

  next();
}

/*********************************** Home Page *******************************/
router.get("/", homeController.loadHomePage);
router.get(
  "/donor/login/:category_slug?/:program_type?",
  donorController.loginPage
);
router.post(
  "/donor/login/:category_slug?/:program_type?",
  donorController.loginCheck
);
router.get("/donor/registration", donorController.loadRegistrationPage);
router.post("/donor/registration", donorController.saveOrUpdate);
router.post("/donor/registration-modal", donorController.saveOrUpdateAjax);
router.get(
  "/donor/dashboard",
  checkLoginDonor,
  middleHandler,
  donorController.dashboard
);
router.get(
  "/donor/profile",
  checkLoginDonor,
  middleHandler,
  donorController.profile
);
router.post(
  "/donor/profile",
  checkLoginDonor,
  middleHandler,
  donorController.saveOrUpdate
);
router.get(
  "/donor/alloted-students",
  checkLoginDonor,
  middleHandler,
  donorController.allotedStudents
);
router.get(
  "/donor/passbook",
  checkLoginDonor,
  middleHandler,
  donorController.passbook
);
// router.get('/helpingHands', initiativesController.helpingHands);
router.get("/donor/logout", function (req, res) {
  if (req.session) {
    req.session.destroy((error) => {
      if (error) {
        console.log(error);
      }
    });
  }
  res.redirect("/donor/login");
});

/*********************************** Payment Gateway *******************************/
router.get(
  "/payment/fetch-all",
  middleHandler,
  paymentGatewayController.getAllPayments
);
router.post(
  "/payment/create-order",
  middleHandler,
  paymentGatewayController.createOrder
);
router.post(
  "/payment/create-sub-order",
  middleHandler,
  paymentGatewayController.createSubOrder
);
router.post(
  "/subscribe/subscribe-create",
  middleHandler,
  paymentGatewayController.createSubScription
);
router.post(
  "/subscribe/subscribe-update",
  middleHandler,
  paymentGatewayController.updateSubScription
);

router.get(
  "/payment/fetch-all-orders",
  middleHandler,
  paymentGatewayController.fetchAllOrder
);
router.post(
  "/payment/payment-verify",
  middleHandler,
  paymentGatewayController.paymentVerify
);

router.get(
  "/resources/:slug?",
  middleHandler,
  reportController.getFinancialReportList
);
router.get("/contact", middleHandler, contactUsController.loadPage);
router.post("/contact", middleHandler, contactUsController.save);
router.get(
  "/members/:type?/:id?",
  middleHandler,
  operatorController.getOperatorListMemberWise
);
router.post(
  "/operator-list-member-type-wise",
  middleHandler,
  operatorController.ajax_getOperatorListMemberWise
);
router.get("/donate", middleHandler, donateController.getDonationCategoryList);
router.get(
  "/donate/:slug?",
  middleHandler,
  donateController.getCategoryWiseDonationProgramList
);
router.get("/media", middleHandler, mediaController.load);
router.get("/blog/:slug?", middleHandler, mediaController.articleDetails);
/*********************************  Initiatives routs ********************************/
router.get("/jvm", middleHandler, initiativesController.jvm);
router.get("/skill_development", middleHandler, initiativesController.prayas);
//router.get("/udyat", middleHandler, initiativesController.udyat);
router.get("/pfp", middleHandler, initiativesController.aarohan);
//router.get("/kbc", middleHandler, initiativesController.kbc);

/******************************* CMS PAGE ROUTES *************************************/
//router.get("/about", middleHandler, cmsController.about);
//router.get('/nep', middleHandler, nepController.nep);

router.get("/member/register/:id?", middleHandler, memberController.register);
router.post("/member/save/reg", middleHandler, memberController.saveRegister);

//router.get('/alt/danamojo', function(req, res) {  res.render('pages/gyws/donate_alt/donate_danamojo');});
router.get("/hostel", function (req, res) {
  res.render("pages/gyws/donate_alt/hostel");
});
router.get("/pp", function (req, res) {
  res.render("pages/gyws/pp/pp");
});
//router.get('/mobile_collection', function(req, res) {  res.render('pages/gyws/donate_alt/donate_mobile');});
router.get("/each_jvm", function (req, res) {
  res.render("pages/gyws/donate_alt/each_jvm");
});
//router.get("/helpingHands", function (req, res) {
//  res.render("pages/gyws/donate_alt/helpingHands");
//});

router.get("/quiz", function (req, res) {
  res.render("pages/gyws/nep/quiz");
});

router.get("/adhhyayan", function (req, res) {
  res.render("pages/gyws/nep/nep");
});
//router.get('/gen_donation', function(req, res) {  res.render('pages/gyws/donate_alt/GD-razpay');});

module.exports = router;

router.get("/fest", function (req, res) {
  res.render("pages/gyws/nep/fest");
});

router.get('/about', aboutUsController.load);
