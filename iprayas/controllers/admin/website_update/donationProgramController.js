let models = require("../../../models");
const multiparty = require('multiparty'); 
const helpers = require("../../../helpers/helper_functions");
const fs = require('fs');
var path = require('path');
const ejs = require('ejs');
const pdf = require('html-pdf');
var nodemailer = require('nodemailer');
const express = require("express");
const app = express();

var wkhtmltopdf = require('wkhtmltopdf');
/**
 * Return the list of the donation programs
 */
exports.list = async function(req, res, next) {
    if( typeof res.locals.donation_program  !=='undefined' && res.locals.donation_program  =='Yes'){
        var donation_program_list = await models.DonationProgram.findAll({attributes:["donation_program_id", "program_name","program_id", "program_type", "cost", "active"],order:[["donation_program_id","DESC"]]});
        res.render('pages/admin/website_update/donation_program/list', 
        {
            title:"Donation Program List | GYWS",
            donation_program_list: donation_program_list,
            s_msg: req.flash('info'),
            e_msg: req.flash('err')
        });
    }else{
        res.redirect('/admin/dashboard');
    }
}




/**
 * Load the blog form
 * Create new or update existing blog
 */
exports.load = async function(req, res, next) {
    if( typeof res.locals.donation_program  !=='undefined' && res.locals.donation_program  =='Yes'){
    var donation_program_id = req.params.donation_program_id;

    var donation_category_list = await models.DonationCategory.findAll({
        attributes:["donation_category_id","title"],
        where:{active:"Yes"}, 
        order:[["priority","asc"]]
    });
    
    var donation_program_details = '';
    if(typeof donation_program_id !== 'undefined' && donation_program_id > 0) {
        try {
            donation_program_details = await models.DonationProgram.findOne({
                attributes:{exclude:["createdAt", "createdBy", "updatedAt", "updatedBy"]},
                where: {donation_program_id:donation_program_id},
                include: [
                    {
                        model: models.DonationCategory, as: "donation_category",
                        attributes:["donation_category_id","title"]
                    }
                ]
            });
            if(donation_program_details == null) {
                req.flash('err',"Something wrong! Please try again");
                return res.redirect("/admin/website-update/donation-program/list");
            }
        } catch(error) {
            return res.send(error);
        }
    }

    res.render('pages/admin/website_update/donation_program/form', 
    {
        title:"Donation Program | GYWS",
        donation_category_list: donation_category_list,
        donation_program_details: donation_program_details,
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
    if( typeof res.locals.donation_program  !=='undefined' && res.locals.donation_program  =='Yes'){
    var form = new multiparty.Form();
    form.parse(req, async function(err, fields, files) {
        var donation_program_id = fields.donation_program_id[0];
        var donation_category_id = fields.donation_category_id[0];
        var program_name = fields.program_name[0];
        var program_type = fields.program_type[0];
        var amount_type = fields.amount_type[0];
        var cost = fields.cost[0];
        var tax_benifit = fields.tax_benifit[0];
        var description = fields.description[0];
        var donor_signup_required = fields.donor_signup_required[0];
        var active = fields.active[0];

        if(program_name != '' && donation_category_id != '' && active != '') {
            if(donation_program_id == '') {  //Insert new record
                
                await models.DonationProgram.create({
                    program_name: program_name,
                    program_type: program_type,
                    donation_category_id: donation_category_id, 
                    amount_type: amount_type,
                    cost: cost, 
                    tax_benifit: tax_benifit,
                    description: description,
                    photo:'',  
                    donor_signup_required: donor_signup_required,
                    active: active,
                    createdBy: 1
                }).then(async function(donation_program) {
                    if(donation_program) {
                        var program_id = '';
                        if(donation_program.donation_program_id < 10) program_id = "DP0000" + donation_program.donation_program_id;
                        else if(donation_program.donation_program_id < 100) program_id = "DP000" + donation_program.donation_program_id;
                        else if(donation_program.donation_program_id < 1000) program_id = "DP00" + donation_program.donation_program_id;
                        else if(donation_program.donation_program_id < 10000) program_id = "DP0" + donation_program.donation_program_id;

                        await models.DonationProgram.update({
                            program_id: program_id
                        },{where:{donation_program_id: donation_program.donation_program_id}});

                        uploadSingleFile(files, donation_program.donation_program_id);  
                        
                        req.flash('info',"Donation program successfully created");
                        return res.redirect('/admin/website-update/donation-program/list');
                    } else {
                        req.flash('err',"Failed to create donation program! Please try again");
                        return res.redirect('/admin/website-update/donation-program/form');
                    }
                }).catch(function(error) {
                    return res.send(error);
                });
            } else { //Update existing record
                await models.DonationProgram.update({
                    program_name: program_name, 
                    program_type: program_type,
                    donation_category_id: donation_category_id,
                    amount_type: amount_type,
                    cost: cost, 
                    tax_benifit: tax_benifit,  
                    description: description,
                    donor_signup_required: donor_signup_required,
                    active: active,
                    updatedBy: 1
                },{where:{donation_program_id:donation_program_id}})
                .then(async function(affected_rows) {
                    if(affected_rows > 0) {
                        uploadSingleFile(files, donation_program_id); 
                        req.flash('info',"Donation program successfully updated");
                        return res.redirect('/admin/website-update/donation-program/list'); 
                    } else {
                        req.flash('err',"Failed to update donation program. Please try again");
                        return res.redirect('/admin/website-update/donation-program/form/'+donation_program_id); 
                    }   
                }).catch(function(error) {
                    return res.send(error);
                })
            }
        } else {
            req.flash('err',"Please fill all the mandatory fields!");
            return res.redirect('/admin/website-update/donation-program/form');
        }
    });
}else{
    res.redirect('/admin/dashboard');
}
    
}









/**
 * Delete blog record one at a time
 */
exports.delete = async function(req, res, next) {
    if( typeof res.locals.donation_program  !=='undefined' && res.locals.donation_program  =='Yes'){
    var donation_program_id = req.body.donation_program_id;
  
    if(typeof donation_program_id !== 'undefined' && donation_program_id > 0) {
        try {
            await models.DonationProgram.destroy({where:{donation_program_id:donation_program_id}});
            req.flash('info', "Donation program successfully deleted")
        } catch(error) {
            req.flash('err', "Failed to delete donation program! Please try again");
        }
        return res.redirect('/admin/website-update/donation-program/list');
    } else {
        req.flash('err', "Something wrong! Please try again")
        return res.redirect('/admin/website-update/donation-program/list');
    }
}else{
    res.redirect('/admin/dashboard');
}
}









/**
 * Return the list of the additional donations
 */
exports.additionalDonationList = async function(req, res, next) {
    var type = req.params.type;
    var title = '';
    if(type == "external") {
        title = "External Donation Record";
    } else if(type == "si") {
        title = "SI Form Record";
    } else if(type == "csr") {
        title = "CSR Record";
    } else {
        req.flash('err', "Something wrong! Please try again")
        res.redirect('/admin/website-update/donation/donation-record/list/external');
    }

    var add_donation_list = await models.AdditionalDonationRecord.findAll({where:{type:type},order:[["add_don_record_id","DESC"]]});
    res.render('pages/admin/website_update/donation/additional_donaton_list', 
    {
        title: title +" | GYWS",
        type:type,
        add_donation_list:add_donation_list,
        s_msg: req.flash('info'),
        e_msg: req.flash('err')
    });
}






/**
 * Load the additional donation record form
 * Create new or update existing
 */
exports.additionalDonationLoad = async function(req, res, next) {
    var add_don_record_id = req.params.add_don_record_id;
    var type = req.params.type;
    var title = '';
    if(type == "external") {
        title = "External Donation Record";
    } else if(type == "si") {
        title = "SI Form Record";
    } else if(type == "csr") {
        title = "CSR Record";
    } else {
        req.flash('err', "Something wrong! Please try again")
        res.redirect('/admin/website-update/donation/donation-record/list/external');
    }

    var donation_details = '';
    if(typeof add_don_record_id !== 'undefined' && add_don_record_id > 0) {
        try {
            donation_details = await models.AdditionalDonationRecord.findOne({
                attributes:{exclude:["createdAt", "createdBy", "updatedAt", "updatedBy"]},
                where: {add_don_record_id:add_don_record_id}
            });
            if(donation_details == null) {
                req.flash('err',"Something wrong! Please try again");
                return res.redirect("/admin/website-update/donation-program/list");
            }
        } catch(error) {
            return res.send(error);
        }
    }

    res.render('pages/admin/website_update/donation/additional_donaton_form', 
    {
        title: title +" Record | GYWS",
        type: type,
        donation_details: donation_details,
        s_msg: req.flash('info'),
        e_msg: req.flash('err')
    });
}







/**
 * Save new blog or update the existing blog
 */
exports.additionalDonationSaveOrUpdate = async function(req, res) {
    var type = req.params.type;
    if(type != "external" && type != "si" && type != "csr") {
        res.redirect("/admin/dashboard");
    }
    var form = new multiparty.Form();
    form.parse(req, async function(err, fields, files) {
        var add_don_record_id = fields.add_don_record_id[0];
        var name = fields.name[0];
        var email = fields.email[0];
        var mobile = fields.mobile[0];
        var defaulter_month = (typeof fields.defaulter_month !== 'undefined' ? fields.defaulter_month[0] : '');
        var amount = fields.amount[0];
        var date = fields.date[0];
        var payment_option = fields.payment_option[0];
        var transaction_id = (typeof fields.transaction_id !== 'undefined' ? fields.transaction_id[0] : '');
        var renewal = (typeof fields.renewal !== 'undefined' ? fields.renewal[0] : '');
        var payment_received = (typeof fields.payment_received !== 'undefined' ? fields.payment_received[0] : null);

        if(type != '' && name != '' && amount != '') {
            if(add_don_record_id == '') {  //Insert new record
                
                await models.AdditionalDonationRecord.create({
                    type: type,
                    name: name, 
                    amount: amount,
                    mobile: mobile, 
                    email: email,
                    date: date,
                    payment_option: payment_option,
                    defaulter_month:defaulter_month,  
                    transaction_id: transaction_id,
                    renewal: renewal,
                    payment_received: payment_received,
                    createdBy: 1
                }).then(async function(donation) {
                    if(donation) {
                        req.flash('info',"Successfully created");
                        return res.redirect('/admin/website-update/donation/donation-record/list/'+type);
                    } else {
                        req.flash('err',"Failed to create! Please try again");
                        return res.redirect('/admin/website-update/donation/donation-record/form/'+type);
                    }
                }).catch(function(error) {
                    return res.send(error);
                });
            } else { //Update existing record
                await models.AdditionalDonationRecord.update({
                    type: type,
                    name: name, 
                    amount: amount,
                    mobile: mobile, 
                    email: email,
                    date: date,
                    payment_option: payment_option,
                    defaulter_month:defaulter_month,  
                    transaction_id: transaction_id,
                    renewal: renewal,
                    payment_received: payment_received,
                    createdBy: 1
                },{where:{add_don_record_id:add_don_record_id}})
                .then(async function(affected_rows) {
                    if(affected_rows > 0) {
                        req.flash('info',"Successfully updated");
                        return res.redirect('/admin/website-update/donation/donation-record/list/'+type); 
                    } else {
                        req.flash('err',"Failed to update! Please try again");
                        return res.redirect('/admin/website-update/donation/donation-record/form/'+add_don_record_id); 
                    }   
                }).catch(function(error) {
                    return res.send(error);
                })
            }
        } else {
            req.flash('err',"Please fill all the mandatory fields!");
            return res.redirect('/admin/website-update/donation/donation-record/form/'+type);
        }
    });
    
}






/**
 * Delete donation record one at a time
 */
exports.additionalDonationDelete = async function(req, res, next) {
    var add_don_record_id = req.body.add_don_record_id;
    var type = req.body.type;
  
    if(typeof add_don_record_id !== 'undefined' && add_don_record_id > 0) {
        try {
            await models.AdditionalDonationRecord.destroy({where:{add_don_record_id:add_don_record_id}});
            req.flash('info', "Successfully deleted")
        } catch(error) {
            req.flash('err', "Failed to delete! Please try again");
        }
    } else {
        req.flash('err', "Something wrong! Please try again")
    }

    res.redirect('/admin/website-update/donation/donation-record/list/'+type);
}










/**
 * Upload blog images and the thumbnail image by calling the helper function
 * Update blogImage table by inserting the blog id and the image names
 * @param {*} files 
 * @param {*} donation_program_id 
 */
async function uploadSingleFile(files, donation_program_id) {
    var location = "public/contents/donation_programs/";
    var filenames = await helpers.uploadSingleFile(files, location, true, '');
    if(filenames.length > 0) {
        await models.DonationProgram.update({
            "photo":filenames[0],
        },{where:{donation_program_id: donation_program_id}});
    }
}




exports.sendMail = async function(req,res){
   var bseurl = req.app.locals.baseurl;
    var reciver_mail = req.body.reciver_mail;
    var reciver_name =  req.body.reciver_name;
    var reciver_amount = req.body.reciver_amount;
    var reciver_date =  req.body.reciver_date;
    var reciver_mob = req.body.reciver_mob;
    var data_opt = req.body.data_opt;
    var data_Tra = req.body.data_Tra;
    var data_id = req.body.data_id;
    var filename = Date.now()+".pdf";
    if(reciver_mail !='' && reciver_name !='' && reciver_amount !='' && reciver_date !='' && reciver_mob !=''){
        try {
            const filePathName = path.resolve('./views/pages/admin/website_update/donation/invoice.ejs');
            const htmlString = fs.readFileSync(filePathName).toString();
            let  options = { 
                timeout: '500000',
                "height": "11.25in",
                "width": "8.5in",
                "header": {
                    "height": "20mm"
                },
                "footer": {
                    "height": "20mm",
                }, 
            };
            const ejsData = ejs.render(htmlString, {
                bseurl : bseurl,
                reciver_mail : reciver_mail,
                reciver_name : reciver_name, 
                reciver_amount: reciver_amount, 
                reciver_date : reciver_date, 
                reciver_mob : reciver_mob,
                data_opt : data_opt,
                data_Tra : data_Tra,
                data_id : data_id
            });
            await pdf.create(ejsData, options).toFile('temp_invoice/donation/'+filename,(err, response) => {
                if (err) {
                    console.log(err);
                } else{
                    console.log("File created successfully");
                    let mailTransporter = nodemailer.createTransport({ 
                        service: 'gmail', 
                        auth: { 
                            user: 'npdevind@gmail.com',
                            pass: '#Archana123'
                        } 
                    });      
                    let mailDetails = { 
                        from: 'npdevind@gmail.com', 
                        to: reciver_mail, 
                        subject: 'GYWS TEAM', 
                        html : 'Thank you very much for joining with us.',
                        attachments: [
                            {
                                filename: 'invoice.pdf',
                                path: "temp_invoice/donation/"+filename
                            }
                        ]
                    };                         
                    mailTransporter.sendMail(mailDetails, function(err, data) { 
                        if(err) { 
                            console.log('Error Occurs'); 
                            res.send({
                                success : true,
                                message : "Something worng! Please try again."
                            })
                        } else { 
                            console.log('Email sent successfully'); 
                            try {
                                fs.unlinkSync("./temp_invoice/donation/"+filename)
                            } catch(err) {
                                console.error(err)
                            }
                            res.send({
                                success : true,
                                message : "Email sent successfully."
                            })
                        } 
                    });
                }
                // return response;
                
            });
            
        } catch (err) {
            console.log("Error processing request: " + err);
        }
    }else{
        res.send({
            message : "Same fields are missing."
        })
    }
   
}

// exports.sendMail = async function(req,res){
//      var reciver_mail = req.body.reciver_mail;
//      var reciver_name =  req.body.reciver_name;
//      var reciver_amount = req.body.reciver_amount;
//      var reciver_date =  req.body.reciver_date;
//      var reciver_mob = req.body.reciver_mob;
//      var data_opt = req.body.data_opt;
//      var data_Tra = req.body.data_Tra;
//      var data_id = req.body.data_id;
     
//      if(reciver_mail !='' && reciver_name !='' && reciver_amount !='' && reciver_date !='' && reciver_mob !=''){
//          if(data_Tra !=''){
//             var dataTraHtml = 
//             '<span class="inline" style="font-size: 15px;padding: 218px;">'+
//             '<strong> Receipt No:'+data_Tra+'</strong>'+
//             '<strong style="margin: 42px;">Receipt Date:'+reciver_date+'</strong>'+
//             '</span>'
//          }else{
//             var dataTraHtml = 
//            ' <span class="inline" style="font-size: 15px;padding: 218px;">'+
//             '<strong> Receipt No: #'+data_id+'</strong>'+
//             '<strong style="margin: 42px;">Receipt Date: '+reciver_date+'</strong>'+
//            ' </span>'
//          }
        
//         let mailTransporter = nodemailer.createTransport({ 
//             service: 'gmail', 
//             auth: { 
//                 user: 'npdevind@gmail.com',
//                 pass: '#Archana123'
//             } 
//         });      
//         let mailDetails = { 
//             from: 'npdevind@gmail.com', 
//             to: reciver_mail, 
//             subject: 'GYWS TEAM', 
//             html : 'Thank you very much for joining with us.'+
//             '<style>'+
//                 'body {"height": "11.25in","width": "8.5in", "header": { "height": "20mm"},"footer": {"height": "20mm" }}'+
//            '</style>'+
//            '<body>'+
//             '<div style="width: 85%; margin: 0 7.5%;">'+
//             '<div style="text-align: center; padding-left: 50px;">'+
//                 '<img src="'+req.app.locals.baseurl+'invoic_logo.png" style="height: 150px; width: 150px;">'+
//                 '<h3>Gopali Youth Welfare Society</h3>'+
//                 '<p>'+
//                    ' <h4>(also known as One of the largest student run NGO by IIT Kharagpur students) </h4>'+
//                     'Gopali (No Shooting Area), P.O. - Salua, District - Pashchimi Midinipur, </br> Kharagpur Railway'+
//                     'Settlement, 721145, </br> West Bengal, India'+
//                 '</p>'+
//             '</div>'+
    
//             '<span class="inline">'+
//                ' <strong style="padding: 100px;"> Tel. No: 03222296537 </strong>'+
//                 '<strong style="padding: 45px;"> gywsociety@gmail.com </strong>'+
//                 '<strong style="padding: 45px;"> PAN #: AAAAG5236D </strong>'+
//             '</span>'+
    
//             '<center style="position: relative; margin-top: 25px;margin-bottom: 21px;">'+
//                ' <strong>DONATION RECEIPT</strong>'+
//             '</center>'+
    
//             dataTraHtml+
            
    
//             '<p> Received with thanks from: </p>'+ 
//                 '<strong style="font-size: 15px;position: relative;left: 170px;bottom: 33px;"> <span> '
//                     +reciver_name+
//                     '</span> | <span> '
//                     +reciver_mob+
//                 '</span></br>'+
//             '</strong>'+
            
//             '<p>through <strong>'+data_opt+'</strong> for the following:</p>'+
    
//             '<table style="font-family: arial,sans-serif;border-collapse: collapse;width: 75%;border: 3px solid #dddddd;text-align: center;padding: 8px;">'+
//                 '<thead>'+
//                     '<tr>'+
//                         '<th>Cost (Rs.)</th>'+
//                         '<th>Qty</th>'+
//                         '<th>Amount (Rs.)</th>'+
//                     '</tr>'+
//                 '</thead>'+
//                 '<tbody>'+
//                     '<tr>'+
//                         '<td>'+reciver_amount+'</td>'+
//                         '<td>1</td>'+
//                         '<td>'+reciver_amount+'</td>'+
//                     '</tr>'+
//                 '</tbody>'+
//                 '<tfoot>'+
//                     '<tr>'+
//                         '<th>Total</th> '+
//                         '<th></th>' +                     
//                         '<th>'+reciver_amount+'</th>'+
//                     '</tr>'+
//                 '</tfoot>'+
//             '</table>'+
    
//             '<p style="font-size: 10px;">'+
//                 'This receipt is exempt from revenue stamp vide Exemption b Article 53, Schedule I of the Indian Stamp Act, 1899. Donations to One of the largest'+
//                 'student run NGO by IIT Kharagpur students qualify for deduction u/s 80G(5) of the Income Tax Act, 1961 vide certificate of exemption no. 80GG Y W S/CIT, K-XIX/Kol/10-11/3932 issued on 17-02-2011. All approvals existing on or after Oct 1, 2009 are deemed to have been extended in'+
//                 'perpetuity unless specifically withdrawn. The Government order can be seen here. This receipt is invalid in case of non-realization of the money'+
//                 'instrument or reversal of the credit card charge or reversal of donation amount for any reason.'+    
//             '</p>'+
//         '</div>'+
//         '</body>'
//     };                         
//         mailTransporter.sendMail(mailDetails, function(err, data) { 
//             if(err) { 
//                 console.log('Error Occurs :'+ err); 
//                 res.send({
//                     success : true,
//                     message : "Something worng! Please try again."
//                 })
//             } else { 
//                 console.log('Email sent successfully'); 
//                 res.send({
//                     success : true,
//                     message : "Email sent successfully."
//                 })
//             } 
//         });
//     }
    
//  }