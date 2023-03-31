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
        key_id: 'rzp_live_T261HdyQr0X9hE',
        key_secret: 'xukwp4ertBUfeAy93yeHb530'
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
        key_id: 'rzp_live_T261HdyQr0X9hE',
        key_secret: 'xukwp4ertBUfeAy93yeHb530'
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
        key_id: 'rzp_live_T261HdyQr0X9hE',
        key_secret: 'xukwp4ertBUfeAy93yeHb530'
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
        key_id: 'rzp_live_T261HdyQr0X9hE',
        key_secret: 'xukwp4ertBUfeAy93yeHb530'
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

    /*var expectedSignature = crypto.createHmac('sha256', 'G5EBp7lzaRIA458XgigCKOY2')
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
        if(status == "succeed" ){
            let mailTransporter = nodemailer.createTransport({ 
                service: 'gmail', 
                auth: { 
                    user: 'gywstest@gmail.com',
                    pass: 'GywsTest@333'
                } 
            });      

            var html1 = '';
            var html2 = '';
            var grand_total ='';
            otherDetails.forEach(function(vall){
                html1 = html1 + '<p><strong>Interval : </strong> '+vall.interval+'</p><p><strong>Period :</strong> '+vall.period+'</p>';
            })

            arrPaymentDetails.forEach(pay => {
                html2 = html2 +'<tr>'+
                    '<td>'+pay.title+' - '+pay.donation_purpose+'</td>'+
                    '<td>'+pay.amount+'</td>'+
                    '<td>'+pay.qty+'</td>'+
                    '<td>'+pay.total+'</td>'+
                '</tr>';
                grand_total += parseInt(pay.total);
            })


            let mailDetails = { 
                from: 'gywstest@gmail.com', 
                to: donor.email, 
                subject: 'GYWS TEAM', 
                html : 'Thank you very much for joining with us.'+
                '<body>'+
                '<div style="width: 85%; margin: 0 7.5%;">'+
                    '<div style="text-align: center; padding-left: 50px;">'+
                        '<img src="'+req.app.locals.baseurl+'invoic_logo.png" style="height: 150px; width: 150px;">'+
                        '<h3>Gopali Youth Welfare Society</h3>'+
                        '<p>'+
                            '<h4>(also known as One of the largest student run NGO by IIT Kharagpur students) </h4>'+
                            'Gopali (No Shooting Area), P.O. - Salua, District - Pashchimi Midinipur, </br> Kharagpur Railway'+
                            'Settlement, 721145, </br> West Bengal India'+
                        '</p>'+
                    '</div>'+

                '<span class="inline">'+
                    '<strong style="padding: 100px;"> Tel. No: 03222296537 </strong>'+
                    '<strong style="padding: 45px;"> gywsociety@gmail.com </strong>'+
                    '<strong style="padding: 30px;"> PAN #: AAAAG5236D </strong>'+
                '</span>'+

                '<center style="position: relative; margin-top: 25px;margin-bottom: 21px;"><strong>DONATION RECEIPT</strong></center>'+

                '<span class="inline" style="font-size: 15px;position: relative;left: 170px;bottom: 33px;">'+
                    '<strong> Receipt No: '+razorpay_subscription_id+'</strong>'+
                    '<strong style="margin: 125px;">Receipt Date: '+date+'</strong>'+
                '</span>'+

                '<p> Received with thanks from: </p>'+
                '<strong style="position: relative;left: 189px;bottom: 33px; font-size: 13px;">'+
                    '<span>'+donor.name+'</span><br>'+
                    '<span>'+donor.address+'</span><br>'+
                    '<span>'+donor.city+'</span><br>'+
                    '<span>'+donor.country+'</span>'+
                '</strong>'+
                html1 +
                '<p>through <strong> Bank Transfer</strong> for the following:</p>'+

                '<table style="font-family: arial,sans-serif;border-collapse: collapse;width: 75%;border: 3px solid #dddddd;text-align: center;padding: 8px;">'+
                    '<thead>'+
                        '<tr>'+
                            '<th>Donation Purpose</th>'+
                            '<th>Cost (Rs.)</th>'+
                            '<th>Qty</th>'+
                            '<th>Amount (Rs.)</th>'+
                        '</tr>'+
                    '</thead>'+
                    '<tbody>'+
                        html2 +
                    '</tbody>'+
                    '<tfoot>'+
                        '<tr>'+
                            '<th>Total</th> '+
                            '<th></th>'+
                            '<th></th>'+                  
                            '<th>'+grand_total+'</th>'+
                        '</tr>'+
                    '</tfoot>'+
                '</table>'+

                '<p style="font-size: 10px;">'+
                    'This receipt is exempt from revenue stamp vide Exemption b Article 53, Schedule I of the Indian Stamp Act, 1899. Donations to One of the largest'+
                    'student run NGO by IIT Kharagpur students qualify for deduction u/s 80G(5) of the Income Tax Act, 1961 vide certificate of exemption no. 80GG Y W S/CIT, K-XIX/Kol/10-11/3932 issued on 17-02-2011. All approvals existing on or after Oct 1, 2009 are deemed to have been extended in'+
                    'perpetuity unless specifically withdrawn. The Government order can be seen here. This receipt is invalid in case of non-realization of the money'+
                    'instrument or reversal of the credit card charge or reversal of donation amount for any reason.'+
               ' </p>'+
            ' </div>'+
        '</body>'
                
            };                         
            mailTransporter.sendMail(mailDetails, function(err, data) { 
                if(err) { 
                    console.log('Error Occurs'); 
                } else { 
                    console.log('Email sent successfully'); 
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

    var expectedSignature = crypto.createHmac('sha256', 'G5EBp7lzaRIA458XgigCKOY2')
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
        if(status == "succeed" ){
            let mailTransporter = nodemailer.createTransport({ 
                service: 'gmail', 
                auth: { 
                    user: 'gywstest@gmail.com',
                    pass: 'GywsTest@333'
                } 
            }); 
            var html2 = '';
            var grand_total = 0;
            
            arrPaymentDetails.forEach(pay => {
                html2 = html2 +'<tr>'+
                    '<td>'+pay.title+' - '+pay.donation_purpose+'</td>'+
                    '<td>'+pay.amount+'</td>'+
                    '<td>'+pay.qty+'</td>'+
                    '<td>'+pay.total+'</td>'+
                '</tr>';
                grand_total += parseInt(pay.total);
            })
     
            let mailDetails = { 
                from: 'gywstest@gmail.com', 
                to: donor.email, 
                subject: 'GYWS TEAM', 
                html : 'Thank you very much for joining with us.'+
                '<body>'+
                '<div style="width: 85%; margin: 0 7.5%;">'+
                    '<div style="text-align: center; padding-left: 50px;">'+
                        '<img src="'+req.app.locals.baseurl+'invoic_logo.png" style="height: 150px; width: 150px;">'+
                        '<h3>Gopali Youth Welfare Society</h3>'+
                        '<p>'+
                            '<h4>(also known as One of the largest student run NGO by IIT Kharagpur students) </h4>'+
                            'Gopali (No Shooting Area), P.O. - Salua, District - Pashchimi Midinipur, </br> Kharagpur Railway'+
                            'Settlement, 721145, </br> West Bengal India'+
                        '</p>'+
                    '</div>'+

                '<span class="inline">'+
                    '<strong style="padding: 100px;"> Tel. No: 03222296537 </strong>'+
                    '<strong style="padding: 45px;"> gywsociety@gmail.com </strong>'+
                    '<strong style="padding: 30px;"> PAN #: AAAAG5236D </strong>'+
                '</span>'+

                '<center style="position: relative; margin-top: 25px;margin-bottom: 21px;"><strong>DONATION RECEIPT</strong></center>'+

                '<span class="inline" style="font-size: 15px;position: relative;left: 170px;bottom: 33px;">'+
                    '<strong> Receipt No: '+razorpay_order_id+'</strong>'+
                    '<strong style="margin: 125px;">Receipt Date: '+date+'</strong>'+
                '</span>'+

                '<p> Received with thanks from: </p>'+
                '<strong style="position: relative;left: 189px;bottom: 33px; font-size: 13px;">'+                
                    '<span>'+donor.name+'</span><br>'+
                    '<span>'+donor.address+'</span><br>'+
                    '<span>'+donor.city+'</span><br>'+
                    '<span>'+donor.country+'</span>'+
                '</strong>'+
                '<p>through <strong> Bank Transfer</strong> for the following:</p>'+

                '<table style="font-family: arial,sans-serif;border-collapse: collapse;width: 75%;border: 3px solid #dddddd;text-align: center;padding: 8px;">'+
                    '<thead>'+
                        '<tr>'+
                            '<th>Donation Purpose</th>'+
                            '<th>Cost (Rs.)</th>'+
                            '<th>Qty</th>'+
                            '<th>Amount (Rs.)</th>'+
                        '</tr>'+
                    '</thead>'+
                    '<tbody>'+
                    html2+
                    '</tbody>'+
                    '<tfoot>'+
                        '<tr>'+
                            '<th>Total</th> '+
                            '<th></th>'+
                            '<th></th>'+                  
                            '<th>'+grand_total+'</th>'+
                        '</tr>'+
                    '</tfoot>'+
                '</table>'+

                '<p style="font-size: 10px;">'+
                    'This receipt is exempt from revenue stamp vide Exemption b Article 53, Schedule I of the Indian Stamp Act, 1899. Donations to One of the largest'+
                    'student run NGO by IIT Kharagpur students qualify for deduction u/s 80G(5) of the Income Tax Act, 1961 vide certificate of exemption no. 80GG Y W S/CIT, K-XIX/Kol/10-11/3932 issued on 17-02-2011. All approvals existing on or after Oct 1, 2009 are deemed to have been extended in'+
                    'perpetuity unless specifically withdrawn. The Government order can be seen here. This receipt is invalid in case of non-realization of the money'+
                    'instrument or reversal of the credit card charge or reversal of donation amount for any reason.'+
               ' </p>'+
            ' </div>'+
        '</body>'
                
            };                         
            mailTransporter.sendMail(mailDetails, function(err, data) { 
                if(err) { 
                    console.log('Error Occurs'); 
                } else { 
                    console.log('Email sent successfully'); 
                } 
            });
        }
       
    })
    res.send(response);
};

exports.success = async function(req, res, next) {
    //res.status(200).send({success:true, details: "ok"});
    var instance = new Razorpay({
        key_id: 'rzp_live_T261HdyQr0X9hE',
        key_secret: 'xukwp4ertBUfeAy93yeHb530'
    });
	console.log(res);
      
};

exports.fetchAllOrder = async function(req, res, next) {
    //res.status(200).send({success:true, details: "ok"});
    var instance = new Razorpay({
        key_id: 'rzp_live_T261HdyQr0X9hE',
        key_secret: 'xukwp4ertBUfeAy93yeHb530'
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
        key_id: 'rzp_live_T261HdyQr0X9hE',
        key_secret: 'xukwp4ertBUfeAy93yeHb530'
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