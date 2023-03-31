let models = require("../../models");
const http = require('http'),
Razorpay = require("razorpay");
var fs = require("fs");
let express = require("express");
let app = express();
let ejs = require("ejs");
let pdf = require("html-pdf");
let path = require("path");
var nodemailer = require('nodemailer');
var moment = require("moment");

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


exports.getAllPayments = async function(req, res, next) {
    //res.status(200).send({success:true, details: "ok"});
    var instance = new Razorpay({
        key_id: 'rzp_test_f2b2DLqSUxorSo',
        key_secret: 'Z89HiZRnKFJlEQGZkoZl7DZC'
    });


    instance.payments.all({
        from: '2020-05-09',
        to: '2016-06-30'
      }).then((response) => {
        // handle success
        res.status(200).send({success:true, details: response});
      }).catch((error) => {
        // handle error
        res.status(200).send({success:true, errors: error});
    });


};




exports.createOrder = async function(req, res, next) {
    /* console.log("MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM");
    params = req.body;
    console.log(params);
    var donor_id = params['donor_id'];
    delete params['donor_id'];
    console.log(donor_id);
    console.log(params); */
    //res.status(200).send({success:true, details: "ok"});

    var instance = new Razorpay({
        key_id: 'rzp_test_f2b2DLqSUxorSo',
        key_secret: 'Z89HiZRnKFJlEQGZkoZl7DZC'
    });


    //donor_id: params.donor_id,
    params = req.body;
    var donor_id = params['donor_id'];
    var donation_programs = params['donation_programs'];
    console.log("+>+>+>+>+>+>+>+>+>+>+>+>+>+>+>+>+>+>+>+>"+donation_programs);
    delete params['donor_id'];
    delete params['donation_programs'];

	instance.orders.create(params).then(async function (data) {
        //res.send({"sub":data,"status":"success"});
        console.log("**********************************************");
        console.log(data);
        console.log(params.donor_id);
        console.log("**********************************************");
        //donor_id : (typeof req.session.donor.donor_id !== 'undefined' ? req.session.donor.donor_id : req.session.temp_donor.donor_id),
        await models.DonationHistory.create({
            receipt: params.receipt,
            currency: params.currency,
            amount: params.amount,
            razorpay_receipt: data.receipt,
            razorpay_amount: data.amount,
            razorpay_order_id: data.id,
            razorpay_entity: data.entity,
            razorpay_status: data.status,
            razorpay_notes: data.notes.toString(),
            razorpay_created_at: data.created_at,
            donor_id: donor_id,
            renewal: 'New',
            createdBy: 1
        }).then(async function(dh_instance) {
            if(dh_instance) {
                for(var i=0; i<donation_programs.length; i++) {
                    if(donation_programs[i].amount > 0) {
                        await models.DonatedProgramRecords.create({
                            donation_program_id: donation_programs[i].program_id,
                            count: donation_programs[i].count,
                            amount: donation_programs[i].amount,
                            razorpay_order_id: dh_instance.razorpay_order_id
                        })
                    }
                }
                res.send({"sub":data,"status":"success"});
            } else {
                res.send({"sub":data,"status":"failed"});
            }

            /* jsonObj: [
                { program_id: '4', count: 2, amount: 20000 },
                { program_id: '5', count: 1, amount: 9999 },
                { program_id: '3', count: 2, amount: 300000 }
              ] */

        }).catch(function(error) {
            console.log(error);
            //res.status(200).send({status:false, message:"Something wrong! Please try again."})
        });
	}).catch((error) => {
		res.send({"sub":error,"status":"failed"});
	});
};

exports.createSubOrder = async function(req, res, next) {
    //res.status(200).send({success:true, details: "ok"});
    var instance = new Razorpay({
        key_id: 'rzp_test_f2b2DLqSUxorSo',
        key_secret: 'Z89HiZRnKFJlEQGZkoZl7DZC'
    });


    params = req.body;
    var donation_programs = params['donation_programs'];
    // console.log("yyyyyyyyyyyyyyyyyyyyyyyyyyyy"+donation_programs.interval);
    // var interval = params['donation_programs'];
    // var term = params['donation_programs'];
    // delete params['donor_id'];
    delete params['donation_programs'];
    console.log(params);
	instance.plans.create(params).then(async function (data) {
       
       await models.DonationHistory.create({
        razorpay_amount: (data.item.amount)/100,
        razorpay_order_id: data.id,
        razorpay_entity: data.entity,
        razorpay_status: "plan created",
        razorpay_created_at: data.created_at,
        receipt : '',
        currency : data.item.currency,
        amount:(data.item.amount)/100,
        renewal : 'New',
         donor_id : req.session.donor.donor_id,
        //  interval: data.interval,
        //  period : data.period,
        createdBy: 1
       }).then(async function(dh_instance) {
           console.log("------------------------"+data.id);
           if(dh_instance) {
                for(var i=0; i<donation_programs.length; i++) {
                    if(donation_programs[i].amount > 0) {
                        console.log("oooooooooooooooooooooooooooooooooo")
                        await models.DonatedProgramRecords.create({
                            donation_program_id: donation_programs[i].program_id,
                            count: donation_programs[i].count,
                            amount: donation_programs[i].amount,
                            razorpay_order_id: dh_instance.razorpay_order_id,
                            interval : params.interval,
                            period : params.period
                        }).catch(function(error) {
                            console.log(0,error);
                        });
                    }
                }
               res.send({"sub":data,"status":"success"});
           } else {
               res.send({"sub":data,"status":"failed"});
           }
       }).catch(function(error) {
           console.log(1,error);
           res.status(200).send({status:false, message:"Something wrong! Please try again."})
       });
	}).catch((error) => {
        console.log(2,error);
		res.send({"sub":error,"status":"failed"});
	})
};


exports.createSubScription = async function(req, res, next) {
    //res.status(200).send({success:true, details: "ok"});
    var instance = new Razorpay({
        key_id: 'rzp_test_f2b2DLqSUxorSo',
        key_secret: 'Z89HiZRnKFJlEQGZkoZl7DZC'
    });

    params = req.body;
    console.log("++++++++++++++++++++++++++++++++++++"+params);
	instance.subscriptions.create(params).then(async function (data) {
	console.log(data);
            await models.DonationHistory.update({
            razorpay_order_id: data.id,
            razorpay_status: 'Subcription created'
        }, {where:{razorpay_order_id:data.plan_id}}).then(async function(dh_instance) {
           if(dh_instance) {
            await models.DonatedProgramRecords.update({
                razorpay_order_id: data.id
            }, {where:{razorpay_order_id:data.plan_id}});
               res.send({"sub":data,"status":"success"});
           } else {
               res.send({"sub":data,"status":"failed"});
           }
       }).catch(function(error) {
           res.status(200).send({status:false, message:"Something wrong! Please try again."})
       });
        
	}).catch((error) => {
		res.send({"sub":error,"status":"failed"});
	})
};


// subscription status update

exports.updateSubScription = async function(req, res, next) {
    razorpay_subscription_id = req.body.razorpay_subscription_id;
    var crypto = require("crypto");
    var status = '';

    /*var expectedSignature = crypto.createHmac('sha256', 'Z89HiZRnKFJlEQGZkoZl7DZC')
                                    .update(razorpay_subscription_id.toString())
                                    .digest('hex');
                                    console.log("sig"+req.body.razorpay_signature);
                                    console.log("sig"+expectedSignature);
    var response = {"status":"failure"}
    if(expectedSignature === req.body.razorpay_signature) {
		console.log(req.body.razorpay_subscription_id);
		console.log('success');
		razorpay_subscription_id = req.body.razorpay_subscription_id;
        response={"status":"success"}
        status = "succeed";
    } else {
        status = "failed";
    }*/
    response={"status":"success"}
    status = "succeed";
	console.log(status);
    await models.DonationHistory.update({
        razorpay_status: status,
    },{where:{razorpay_order_id: razorpay_subscription_id}}).then(async function(upd){
        var donor_id = res.locals.donor_id;
        var donor = await models.Donor.findOne({where:{donor_id: donor_id}});
        var paymentDetails = await sequelize.query("select dcat.title,dp.program_name as donation_purpose,dpr.count,(dpr.amount/dpr.count) as amount, dpr.amount AS total_amount, dpr.`interval`,dpr.period FROM donatedprogramrecords as dpr "+
        "left join donationprograms as dp on dpr.donation_program_id = dp.donation_program_id "+
        "left join donationhistories as dh on dh.razorpay_order_id = dpr.razorpay_order_id "+
        "left join donationcategories as dcat on dcat.donation_category_id = dp.donation_category_id "+
        "where dh.donor_id ="+donor_id+" and dh.razorpay_order_id='"+razorpay_subscription_id+"'",{ type: sequelize.QueryTypes.SELECT })
        var donor_details =[];
        var arrPaymentDetails =[];
        var otherDetails = [];
        donor_details.push({
            name: donor.name,
            address: donor.address,
            city: donor.city,
            country: donor.country
        });
        
        paymentDetails.forEach(function(pay){
            otherDetails.push({
                interval : pay.interval,
                period : pay.period
            })
        })
        paymentDetails.forEach(function(pay){
            arrPaymentDetails.push({
                title : pay.title,
                donation_purpose : pay.donation_purpose,
                qty : pay.count,
                amount : pay.amount,
                total : pay.total_amount
            })
        })
        var date = new Date().toJSON().slice(0,10).replace(/-/g,'-');
        var filename = Date.now()+".pdf";
        if(status == "succeed" ){
            res.render('pages/invoice.ejs', {
                date:date,
                donor_details: donor_details,
                otherDetails:otherDetails ? otherDetails :'', 
                arrPaymentDetails : arrPaymentDetails,
                razorpay_order_id:razorpay_subscription_id
            }, (err, data) => {
                if (err) {
                      console.log(err);
                } else {
                    let options = {
                        "height": "11.25in",
                        "width": "8.5in",
                        "header": {
                            "height": "20mm"
                        },
                        "footer": {
                            "height": "20mm",
                        },
                    };
                    // pdf.create(data, { orientation: 'landscape', type: 'pdf', timeout: '200000' })
    
                    pdf.create(data, options).toFile("temp_invoice/"+filename,  function (err, data) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log("File created successfully");
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
                                html : 'Thank you very much for joining with us.',
                                attachments: [
                                    {
                                      filename: 'invoice.pdf',
                                      path: "temp_invoice/"+filename
                                    }
                                  ]
                            };                         
                            mailTransporter.sendMail(mailDetails, function(err, data) { 
                                if(!err) { 
                                    console.log('Email sent successfully'); 
                                    try {
                                        fs.unlinkSync("./temp_invoice/"+filename)
                                    } catch(err) {
                                        console.error(err)
                                    }
                                } else { 
                                    console.log('Error Occurs'); 
                                } 
                            }); 
                        }
                    });
                    
                }
            });
        }
       
    })
    res.send(response);
};

//////end /////


exports.paymentVerify = async function(req, res, next) {
    body = req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;
    var crypto = require("crypto");
    var status = '';

    var expectedSignature = crypto.createHmac('sha256', 'Z89HiZRnKFJlEQGZkoZl7DZC')
                                    .update(body.toString())
                                    .digest('hex');
                                    console.log("sig"+req.body.razorpay_signature);
                                    console.log("sig"+expectedSignature);
    var response = {"status":"failure"}
    if(expectedSignature === req.body.razorpay_signature) {
		console.log(req.body.razorpay_order_id);
		console.log(req.body.razorpay_payment_id);
		console.log('success');
		razorpay_order_id = req.body.razorpay_order_id;
        response={"status":"success"}
        status = "succeed";
    } else {
        status = "failed";
    }
	console.log(status);
    await models.DonationHistory.update({
        razorpay_status: status,
    },{where:{razorpay_order_id: razorpay_order_id}}).then(async function(upd){
        var donor_id = res.locals.donor_id;
        var donor = await models.Donor.findOne({where:{donor_id: donor_id}});
        var paymentDetails = await sequelize.query("select dcat.title,dp.program_name as donation_purpose,dpr.count,(dpr.amount/dpr.count) as amount, dpr.amount AS total_amount FROM donatedprogramrecords as dpr "+
        "left join donationprograms as dp on dpr.donation_program_id = dp.donation_program_id "+
        "left join donationhistories as dh on dh.razorpay_order_id = dpr.razorpay_order_id "+
        "left join donationcategories as dcat on dcat.donation_category_id = dp.donation_category_id "+
        "where dh.donor_id ="+donor_id+" and dh.razorpay_order_id='"+razorpay_order_id+"'",{ type: sequelize.QueryTypes.SELECT })
        var donor_details =[];
        var arrPaymentDetails =[];
        donor_details.push({
            name: donor.name,
            address: donor.address,
            city: donor.city,
            country: donor.country
        });
        paymentDetails.forEach(function(pay){
            arrPaymentDetails.push({
                title : pay.title,
                donation_purpose : pay.donation_purpose,
                qty : pay.count,
                amount : pay.amount,
                total : pay.total_amount
            })
        })
        var date = new Date().toJSON().slice(0,10).replace(/-/g,'-');
        var filename = Date.now()+".pdf";
        if(status == "succeed" ){
            res.render('pages/invoice.ejs', {
                date:date,
                donor_details: donor_details, 
                arrPaymentDetails : arrPaymentDetails,
                razorpay_order_id:razorpay_order_id,
                otherDetails:'', 
            }, (err, data) => {
                if (err) {
                      console.log(err);
                } else {
                    let options = {
                        "height": "11.25in",
                        "width": "8.5in",
                        "header": {
                            "height": "20mm"
                        },
                        "footer": {
                            "height": "20mm",
                        },
                    };
                    // pdf.create(data, { orientation: 'landscape', type: 'pdf', timeout: '200000' })
    
                    pdf.create(data, options).toFile("temp_invoice/"+filename,  function (err, data) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log("File created successfully");
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
                                html : 'Thank you very much for joining with us.',
                                attachments: [
                                    {
                                      filename: "invoice.pdf",
                                      path: "temp_invoice/"+filename
                                    }
                                  ]
                            };                         
                            mailTransporter.sendMail(mailDetails, function(err, data) { 
                                if(!err) { 
                                    console.log('Email sent successfully'); 
                                    try {
                                        fs.unlinkSync("./temp_invoice/"+filename)
                                    } catch(err) {
                                        console.error(err)
                                    }                                    
                                } else { 
                                    console.log('Error Occurs'); 
                                } 
                            }); 
                        }
                    });
                    
                }
            });
        }
       
    })
    res.send(response);
};

exports.success = async function(req, res, next) {
    //res.status(200).send({success:true, details: "ok"});
    var instance = new Razorpay({
        key_id: 'rzp_test_f2b2DLqSUxorSo',
        key_secret: 'Z89HiZRnKFJlEQGZkoZl7DZC'
    });
	console.log(res);
      
};

exports.fetchAllOrder = async function(req, res, next) {
    //res.status(200).send({success:true, details: "ok"});
    var instance = new Razorpay({
        key_id: 'rzp_test_f2b2DLqSUxorSo',
        key_secret: 'Z89HiZRnKFJlEQGZkoZl7DZC'
    });


    var options = {
        from: "01-0-2020",  // amount in the smallest currency unit
        to: "30-06-2020",
        receipt: "order_rcptid_11",
      };

      instance.orders.all(options, function(err, order) {
        console.log(order);
        res.status(200).send({success:true, order: order});
    });
};









/* exports.createSubOrder = async function(req, res, next) {
    //res.status(200).send({success:true, details: "ok"});
    var instance = new Razorpay({
        key_id: 'rzp_test_f2b2DLqSUxorSo',
        key_secret: 'Z89HiZRnKFJlEQGZkoZl7DZC'
    });


    params = req.body;
    // var donation_programs = params['donation_programs'];
    console.log("+>+>+>+>+>+>+>+>+>+>+>+>+>+>+>+>+>+>+>+>"+params.item);
	instance.plans.create(params).then(async function (data) {
        console.log(data);
       models.DonationHistory.create({
           razorpay_amount: data.item.amount,
           razorpay_order_id: data.id,
           razorpay_entity: data.entity,
           razorpay_status: "plan created",
           razorpay_created_at: data.created_at,
           receipt : '',
           currency : data.item.currency,
           amount:data.item.amount,
           renewal : 'New',
            donor_id : req.session.donor.donor_id,
            interval: data.interval,
            period : data.period,
           createdBy: 1
       }).then(async function(dh_instance) {
           if(dh_instance) {
            // for(var i=0; i<donation_programs.length; i++) {
            //     if(donation_programs[i].amount > 0) {
            // await models.DonatedProgramRecords.create({
            //     donation_program_id: dh_instance.program_id,
            //     count: donation_programs[i].count,
            //     amount: donation_programs[i].amount,
            //     razorpay_order_id: dh_instance.razorpay_order_id
            // })
            //     }
            // }
               res.send({"sub":data,"status":"success"});
           } else {
               res.send({"sub":data,"status":"failed"});
           }
       }).catch(function(error) {
           console.log(1,error);
           res.status(200).send({status:false, message:"Something wrong! Please try again."})
       });
	}).catch((error) => {
        console.log(2,error);
		res.send({"sub":error,"status":"failed"});
	})
}; */