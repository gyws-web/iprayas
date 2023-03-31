let models = require("../../models");
const { Op } = require("sequelize");
const multiparty = require('multiparty'); 
const bcrypt = require("bcrypt");
const helpers = require("../../helpers/helper_functions");
const express = require("express");
const app = express();
/*const Sequelize = require("sequelize");
const sequelize = new Sequelize('mysql://root:@localhost:3306/gyws');*/



var config = require('../../config/config.json');
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
var nodemailer = require('nodemailer');


/**
 * Load the login page of the Donor
 */
exports.loginPage= async function(req, res, next) {
    res.render('pages/gyws/auth/page', {
        title:"Donor Login | GYWS",
        s_msg: req.flash('info'),
        e_msg: req.flash('err')
    }); 
}




/**
 * Check login of the Donor
 */
exports.loginCheck = async function(req, res, next) {
    /* var username = req.body.username;
    var password = req.body.password;

    if(username != '' && password != '') {
        var donor = await models.Donor.findOne({where:{[Op.or]: [{ email: username }, { username: username }], password:password, active:"Yes"}});
        if(donor) {
            req.session.donor = donor;            
            return res.redirect('/donor/dashboard');
        } else {
            res.render('pages/gyws/auth/page', {title:"Donor Login | GYWS", success:false, message: "Invalid username and password!"});
        }
    } else {
        res.status(200).send({success:false, message:"All fields are mandatary"});
    } */

    var username = req.body.username;
    var password = req.body.password;
    var program_type = req.params.program_type;
    var category_slug = req.params.category_slug;
    
    if(username != '' && password != '') {
        var donor = await models.Donor.findOne({where:{[Op.or]: [{ email: username }, { username: username }],active:"Yes"}});
        if(donor) {
            bcrypt.compare(password, donor.password, function(err, result) {
                if(err) {
                    res.render('pages/gyws/auth/page', {title:"Donor Login | GYWS", success:false, message: "Invalid username and passwordo!"});
                } 
                
                if(result) {
                    req.session.donor = donor; 
                    if(typeof program_type !== 'undefined' && program_type !=''){
                        res.redirect(req.app.locals.baseurl+'donate/'+category_slug+'?program_type='+program_type); 
                    }else{
                        return res.redirect('/donor/profile');
                    }                    
                } else {
                    res.render('pages/gyws/auth/page', {title:"Donor Login | GYWS", success:false, message: "Invalid username and passwordoo!"});
                }
            });
        } else {
            res.render('pages/gyws/auth/page', {title:"Donor Login | GYWS", success:false, message: "Invalid username and password!"});
        }
    } else {
        res.status(200).send({success:false, message:"All fields are mandatory"});
    }        
}




/**
 * Load the registration page of the Donor
 */
exports.loadRegistrationPage= async function(req, res, next) {
    res.render('pages/gyws/auth/registration', {
        title:"Donor Registration | GYWS",
        s_msg: req.flash('info'),
        e_msg: req.flash('err')
    }); 
}





/**
 * Save new donor or update the existing donor
 */
exports.saveOrUpdate = async function(req, res) {
    var form = new multiparty.Form();
    form.parse(req, async function(err, fields, files) {
        var donor_id = fields.donor_id[0];
        var name = fields.name[0];
        var country_code_1 = fields.country_code_1[0];
        var contact_no = fields.contact_no[0];
        var country_code_2 = fields.country_code_2[0];
        var alt_contact_no = fields.alt_contact_no[0];
        var country = fields.country[0];
        var state = fields.state[0];
        var city = fields.city[0];
        var pin = fields.pin[0];
        var address = fields.address[0];
        var username = fields.username[0];
        var password = fields.password[0];
        var email = fields.email[0];

        if(name != '' && email != '' && country != '' && state != ' ' && username != '' && password != '' && 
           country_code_1 != '' && contact_no != '' && city != '' && pin != '' && address != '') {
            if(donor_id == '') {
                var is_email_username_exists = await models.Donor.findOne({
                    where:{
                        [Op.or]: [
                            { email: email },
                            { username: username }
                        ]
                    },
                    attributes:["username","email"]
                });

                if(!is_email_username_exists) {
                    bcrypt.hash(password, 10, async function(err, hash) {
                        if(err) {
                            req.flash('err',"Something wrong! Please try again");
                            return res.redirect('/donor/registration');
                        } else {
                            await models.Donor.create({
                                name : name,
                                email : email,
                                username : username,
                                password : hash,
                                country_code_1 : country_code_1,
                                contact_no : contact_no,
                                country_code_2 : country_code_2,
                                alt_contact_no : alt_contact_no,
                                country : country,
                                state : state,
                                city : city,
                                pin : pin,
                                address : address,
                                photo : '',
                                createdBy: 'self',
                                active : 'Yes'
                            }).then(function(donor) {
                                if(donor) {
                                    uploadSingleFile(files, donor.donor_id);                  
                                    req.flash('info',"Registration successfull! Thank you very much for joining with us");
                                    return res.redirect('/donor/registration');
                                } else {
                                    req.flash('err',"Registration failed! Please try again");
                                    return res.redirect('/donor/registration');
                                }
                            }).catch(function(error) {
                                return res.send(error);
                            });
                        }
                    })
                } else {
                    req.flash('err',"Duplicate username/email address!");
                    return res.redirect('/donor/registration');
                }
            } else {
                var is_email_username_exists = await models.Donor.findOne({
                    where:{
                        [Op.or]: [
                            { email: email },
                            { username: username }
                        ],
                        donor_id:{
                            [Op.ne]:donor_id
                        }
                    },
                    attributes:["username","email"]
                });

                if(!is_email_username_exists) {
                    await models.Donor.update({
                        name : name,
                        password : password,
                        country_code_1 : country_code_1,
                        contact_no : contact_no,
                        country_code_2 : country_code_2,
                        alt_contact_no : alt_contact_no,
                        country : country,
                        state : state,
                        city : city,
                        pin : pin,
                        address : address,
                        updatedBy: 'self'
                    },{where:{donor_id:donor_id}})
                    .then(async function(affected_rows) {
                        if(affected_rows > 0) {
                            //If thumbnail and images are selected
                            uploadSingleFile(files, donor_id);                  
                            req.flash('info',"Profile successfully updated");
                        } else {
                            req.flash('err',"Failed to update profile! Please try again");
                        }
                        return res.redirect('/donor/profile');
                    }).catch(function(error) {
                        //return res.send(error);
                        req.flash('err',"Something wrong! Please try again");
                    })
                } else {
                    req.flash('err',"Duplicate username/email address!");
                    return res.back();
                }
            }
        } else {
            req.flash('err',"Fill all the mandatary fields");
            return res.redirect('/donor/registration'); 
        }
    });
    
}







/**
 * Save new donor or update the existing donor
 */
exports.saveOrUpdateAjax = async function(req, res) {

    /* var operator_list = await models.Operator.findAll({});
    console.log("-----------------------------------------");
    console.log(operator_list);
    console.log("-----------------------------------------");
    res.status(200).send({success:"true", operator_list:operator_list}); */
    
    var form = new multiparty.Form();
    form.parse(req, async function(err, fields, files) {
        //var donor_id = fields.donor_id[0];
        var name = fields.name[0];
        var country_code_1 = fields.country_code_1[0];
        var contact_no = fields.contact_no[0];
        var country_code_2 = fields.country_code_2[0];
        var alt_contact_no = fields.alt_contact_no[0];
        var country = fields.country[0];
        var state = fields.state[0];
        var city = fields.city[0];
        var pin = fields.pin[0];
        var address = fields.address[0];
        var email = fields.email[0];

        //res.status(200).send({success:true, operator_details:name});

        if(name != '' && email != '' && country != '' && state != '' && country_code_1 != '' && contact_no != '' && city != '' && pin != '' && address != '') {
            await models.Donor.create({
                name : name,
                email : email,
                country_code_1 : country_code_1,
                contact_no : contact_no,
                country_code_2 : country_code_2,
                alt_contact_no : alt_contact_no,
                country : country,
                state : state,
                city : city,
                pin : pin,
                address : address,
                photo : '',
                createdBy: 'self',
                active : 'Yes'
            }).then(async function(donor) {
                if(donor) {
                    if(files !='' && files !=null){ uploadSingleFile(files, donor.donor_id);} 
                    var checkDonor = await models.Donor.findOne({where:{donor_id:  donor.donor_id }});                      
                    req.session.temp_donor = checkDonor;
                    console.log("++++++++++++++++++++++"+checkDonor.email);                    
                    var mob = (donor.contact_no).slice(-4);
                    var username = (donor.name).replace(/ +/g, "").toLowerCase().substring(0, 4)+mob;
                    var password = Math.random().toString(36).slice(2);
                    var hashPass =  bcrypt.hashSync(password, 10);
                    await models.Donor.update({
                        username : username,
                        password : hashPass,
                        updatedBy : "self"
                    },{where:{donor_id:donor.donor_id}}).then(function(upd){
                        
                        let mailTransporter = nodemailer.createTransport({ 
                            service: 'gmail', 
                            auth: { 
                                user: 'gywstest@gmail.com',
                                pass: 'GywsTest@333'
                            } 
                        });                         
                        let mailDetails = { 
                            from: 'gywstest@gmail.com', 
                            to: donor.email, 
                            subject: 'GYWS TEAM', 
                            html : 'Thank you very much for joining with us. <br> Your Username is <b>'+username+'</b> and the password is <b>'+password+'</b>. <br>Please do not share your information with anyone.'
                        };                         
                        mailTransporter.sendMail(mailDetails, function(err, data) { 
                            if(err) { 
                                console.log('Error Occurs'); 
                            } else { 
                                console.log('Email sent successfully'); 
                            } 
                        }); 
                    }) .catch(function(error) {
                        console.log("Error is here: "+error)
                    });    
                    res.status(200).send({success:true, donor_details: donor, message:"Thank you very much for joining with us"});
                } else {
                    res.status(200).send({success:false, message:"Something wrong! Please try again1"});
                }
            }).catch(function(error) {
                res.status(200).send({success:false, message:error});
                //res.status(200).send({success:false, message:error.responseText});
            });
        } else {
            res.status(200).send({success:false, message:"Please fill all the mandatory fields"});
        }
    });
    
}







/**
 * Load the dashboard page of the Donor
 */
exports.dashboard= function(req, res, next) {

    return res.render('pages/gyws/donor/dashboard', {
        title:"Donor Dashboard | GYWS",
    }); 
}









/**
 * Load the profile page of the Donor
 */
exports.profile = async function(req, res, next) {

    var donor_id = req.session.donor.donor_id;
    if(typeof donor_id !== 'undefined' && donor_id != '') {
        var donor = await models.Donor.findOne({where:{donor_id:donor_id}});
        if(donor) {
            return res.render('pages/gyws/donor/profile', {
                title:"Donor Profile | GYWS",
                donor: donor,
                s_msg: req.flash('info'),
                e_msg: req.flash('err')
            });
        } else {
            res.redirect("/donor/logout");
        }
    }  else {
        res.redirect("/donor/logout");
    }
}






/**
 * Load the registration page of the Donor
 */
exports.allotedStudents= async function(req, res, next) {
    var donor_id = req.session.donor.donor_id;
    if(typeof donor_id !== 'undefined' && donor_id != '') {
        student_list = await sequelize.query("select a.createdAt, a.academic_session, c.student_id, c.name, c.photo, "+
                                                "d.standard, d.report1, d.report2, d.report3, d.report4, e.program_name, e.donation_program_id "+
                                                "from donorstudents as a "+
                                                "left join donors as b on b.donor_id = a.donor_id " +
                                                "left join students as c on c.student_id = a.student_id "+
                                                "left join donationprograms as e on e.donation_program_id = a.donation_program_id "+
                                                "left join studentclasses as d on d.student_id = c.student_id and d.academic_session=a.academic_session " +
                                                "where a.donor_id="+donor_id,{ type: sequelize.QueryTypes.SELECT });

        //res.status(200).send({success:true, student_list: student_list});

        console.log(student_list);

        res.render('pages/gyws/donor/alloted_students', {
            title:"Student Details | GYWS",
            student_list: student_list,
            s_msg: req.flash('info'),
            e_msg: req.flash('err')
        });
    } else {
        res.redirect("/donor/logout");
    }
}






/**
 *  Load the passbook page
 */
exports.passbook= async function(req, res, next) {
    var donor_id = req.session.donor.donor_id;
    if(typeof donor_id !== 'undefined' && donor_id != '') {
        payment_list = await sequelize.query("select a.createdAt, a.amount, a.razorpay_order_id, a.razorpay_status "+
                                                "from donationhistories as a "+
                                                "where a.donor_id="+donor_id,{ type: sequelize.QueryTypes.SELECT });

        //res.status(200).send({success:true, student_list: student_list});


        res.render('pages/gyws/donor/passbook', {
            title:"Passbook Details | GYWS",
            payment_list: payment_list,
            s_msg: req.flash('info'),
            e_msg: req.flash('err')
        });
    } else {
        res.redirect("/donor/logout");
    }
}







/**
 * Load the dashboard page of the Donor
 */
exports.logout= function(req, res, next) {
    return res.render('pages/gyws/donor/dashboard', {
        title:"Donor Dashboard | GYWS",
    }); 
}



/**
 * Upload thumbnail image of the donor
 * @param {*} files 
 * @param {*} donor_id 
 */
async function uploadSingleFile(files, donor_id) {
    var location = "public/contents/donors/";
    var filenames = await helpers.uploadSingleFile(files, location, false, donor_id);
    if(filenames.length > 0) {
        await models.Donor.update({
            "photo":filenames[0],
        },{where:{donor_id: donor_id}});
    }
}






