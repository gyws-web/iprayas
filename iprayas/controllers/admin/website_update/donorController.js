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
    
    if( typeof res.locals.donor  !=='undefined' && res.locals.donor  =='Yes'){
        var donor_list = '';
        try {
            var donor_list = await models.Donor.findAll({
                attributes:["donor_id","name","country_code_1","contact_no","email", "photo"],
                order:[["donor_id","DESC"]]
            });
        } catch(error) {
            donor_list = [];
        }
        
        res.render('pages/admin/website_update/donor/list', 
        {
            title:"Donor List | GYWS",
            donor_list: donor_list,
            s_msg: req.flash('info'),
            e_msg: req.flash('err')
        });
    }else{
        res.redirect('/admin/dashboard');
    }
}




/**
 * Load the event form
 * Create new or update existing event
 */
exports.load = async function(req, res, next) {
    if( typeof res.locals.donor  !=='undefined' && res.locals.donor  =='Yes'){
        var donor_id = req.params.donor_id;
        var donor_details = '';

        if(typeof donor_id !== 'undefined' && donor_id > 0) {
            await models.Donor.findOne({
                where: {donor_id:donor_id},
                /* include: [
                    { model: models.Role, as:"role_details"},
                    { model: models.Designation, as: "designation_details"}
                ] */
            }).then(result => {
                donor_details = result;
            }).catch(error => {
                res.json(error);
            });
        }


        //Get the role and designation list
        var role_list = await models.Role.findAll({attributes:["role_id","title"], where:{active: "Yes"}, order:[["title","ASC"]]});
        var designation_list = await models.Designation.findAll({attributes:["designation_id","title"], where:{active: "Yes"}, order:[["title","ASC"]]});
        var operator_list = await models.Operator.findAll({attributes:['operator_id','name'], where:{active:'Enable'}, order:[['name','asc']]});
        var donor_list = await models.DonorCategory.findAll({ where:{active:'Yes'}});

        res.render('pages/admin/website_update/donor/form', 
        {
            title:"Donor | GYWS",
            role_list: role_list,
            designation_list: designation_list,
            donor_details: donor_details,
            operator_list: operator_list,
            donor_list:donor_list,
            s_msg: req.flash('info'),
            e_msg: req.flash('err')
        });
    }else{
        res.redirect('/admin/dashboard');
    }
}




/**
 * Save new donor or update the existing donor
 */
exports.saveOrUpdate = async function(req, res) {
    if( typeof res.locals.donor  !=='undefined' && res.locals.donor  =='Yes'){
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
            var city = fields.city[0];
            var username = fields.username[0];
            var password = fields.password[0];
            var email = fields.email[0];
            var source = fields.source[0];
            var member_concerned = fields.member_concerned[0];
            var institute = fields.institute[0];
            var active = fields.active[0];
            var aadhar = fields.aadhar[0];
            var pan = fields.pan[0];
            var donor_category_id = fields.donor_category_id;

            if(name != '' && email != '' && country != '' && state != '' && username != '' && password != '') {
                if(donor_id == '') {  //Insert new record
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
                                return res.redirect('/admin/website-update/donor/form');
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
                                    source : source,
                                    member_concerned : member_concerned,
                                    institute : institute,
                                    active : active,
                                    aadhar : aadhar,
                                    pan : pan,
                                    donor_category_id:donor_category_id,
                                    createdBy: 1
                                }).then(function(donor) {
                                    if(donor) {
                                        uploadSingleFile(files, donor.donor_id);                  
                                        req.flash('info',"Donor successfully created");
                                        return res.redirect('/admin/website-update/donor/list');
                                    } else {
                                        req.flash('err',"Failed to create donor! Please try again");
                                        return res.redirect('/admin/website-update/donor/form');
                                    }
                                }).catch(function(error) {
                                    return res.send(error);
                                });
                            }
                        });
                    } else {
                        req.flash('err',"Duplicate username/email address!");
                        return res.redirect('/admin/website-update/donor/form');
                    }
                } else { //Update existing record
                //var is_email_exists = await models.Donor.findOne({where:{email:email, donor_id:{[Op.ne]:donor_id}}});
                console.log("____________________");
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
                    console.log("____________________"+is_email_username_exists);
                    if(!is_email_username_exists) {
                        await models.Donor.update({
                            name : name,
                            email : email,
                            username : username,
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
                            source : source,
                            member_concerned : member_concerned,
                            institute : institute,
                            active : active,
                            aadhar : aadhar,
                            pan : pan,
                            donor_category_id:donor_category_id,
                            updatedBy: 1
                        },{where:{donor_id:donor_id}})
                        .then(async function(affected_rows) {
                            if(affected_rows > 0) {
                                //If thumbnail and images are selected
                                uploadSingleFile(files, donor_id);                  
                                req.flash('info',"Donor successfully updated");
                            } else {
                                req.flash('err',"Failed to update donor! Please try again");
                            }
                            return res.redirect('/admin/website-update/donor/list');
                        }).catch(function(error) {
                            return res.send(error);
                        })
                    } else {
                        req.flash('err',"Duplicate username/email address!");
                        return res.redirect('back');
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
 * Delete donor record one at a time
 */
exports.delete = async function(req, res, next) {
    if( typeof res.locals.donor  !=='undefined' && res.locals.donor  =='Yes'){
        var donor_id = req.body.donor_id;
    
        if(typeof donor_id !== 'undefined' && donor_id > 0) {
            try {
                var donor = await models.Donor.findOne({attributes:["photo"],where:{donor_id:donor_id}});
                if(donor) {
                    await models.Donor.destroy({where:{donor_id:donor_id}});
                    if(donor.photo != '') helpers.removeDir("public/contents/donors/"+donor.photo);
                    req.flash('info', "Donor successfully deleted");
                } else {
                    req.flash('err', "Failed to delete donor! Please try again");
                }
            } catch(error) {
                req.flash('err', "Failed to delete donor! Please try again");
            }
        } else {
            req.flash('err', "Something wrong! Please try again")
        }
        return res.redirect('/admin/website-update/donor/list');
    }else{
        res.redirect('/admin/dashboard');
    }
}






exports.donationHistory = async function(req, res, next) {

    var payment_list = '';
	
	payment_list = await sequelize.query("select a.donation_history_id, a.receipt, a.currency, a.amount, a.razorpay_order_id, a.razorpay_order_id, "+
                                               "a.razorpay_status, a.razorpay_created_at, b.name, b.donor_id "+
                                               "from donationhistories as a "+
                                               "left join donors as b on b.donor_id = a.donor_id " +
                                               "order by a.razorpay_created_at desc",{ type: sequelize.QueryTypes.SELECT });
    
    res.render('pages/admin/website_update/payment/list', 
    {
        title:"Payment List | GYWS",
        payment_list: payment_list,
        s_msg: req.flash('info'),
        e_msg: req.flash('err')
    });
}




/**
 * Get the etails of the payments details
 */
exports.paymentHistoryLoad = async function(req, res, next) {
    
    var payment_details = '';
    var donation_history_id = req.params.donation_history_id;
    if(typeof donation_history_id !== 'undefined' && donation_history_id != '') {
        payment_details = await sequelize.query(
            "select a.donation_history_id, a.receipt, a.currency, a.amount, a.razorpay_order_id, a.razorpay_order_id, "+
            "a.razorpay_status, a.razorpay_created_at, a.renewal, b.name, b.donor_id, a.renewal "+
            "from donationhistories as a "+
            "left join donors as b on b.donor_id = a.donor_id " +
            "where a.donation_history_id="+donation_history_id +
            " order by a.razorpay_created_at desc ", { type: sequelize.QueryTypes.SELECT });
        
        res.render('pages/admin/website_update/payment/payment-details', 
        {
            title:"Payment Details | GYWS",
            payment_details: payment_details[0],
            s_msg: req.flash('info'),
            e_msg: req.flash('err')
        });
        
    }
}





/**
 * Update payment details (renewal only)
 */
exports.updatePaymentDetails = async function(req, res, next) {

    var donation_history_id = req.body.donation_history_id;
    var renewal = req.body.renewal;


    if(donation_history_id != '' && renewal != '') {
        await models.DonationHistory.update({
            renewal: renewal
        }, {where:{donation_history_id: donation_history_id}})
        .then(function(affected_rows) {
            if(affected_rows > 0) {
                req.flash('info', "Payment details successfully updated");
            } else {
                req.flash('err', "Failed to update payment details. Please try again");
            }

            return res.redirect('back');
        })
        .catch(function(error) {
            console.log(error);
        })
    }
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



