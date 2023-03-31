var fs = require("fs");
var nodemailer = require('nodemailer');

/* const mail_username = 'mitrajit.samanta@gmail.com';'gywstest@gmail.com
const mail_password = 'bbugnjowpwaulrcp'; */

const mail_username = 'gywstest@gmail.com';
const mail_password = 'GywsTest@333';

module.exports = {

    /**
     * This function returns the base path of this js file
     * Returns - E:\Projects\BH\outcry\
     */
    sendTextMail: async function(to, subject, message, attachment, attachment_title, report_list='') {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: mail_username,
                pass: mail_password
            }
        });

        /* var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'each@gyws.org',
                pass: 'gywstest@12'
            }
        }); */

        /* let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: 'each@gyws.org', // generated ethereal user
                pass: 'gywstest@12', // generated ethereal password
            },
        }); */

        var attachments = [];
        if(report_list != '') {
            if(report_list.report1 != '' && report_list.report1 != null) {
                attachments.push({filename: report_list.report1, path: "./public/contents/student_reports/"+report_list.report1});
            }
            if(report_list.report2 != '' && report_list.report2 != null) {
                attachments.push({filename: report_list.report2, path: "./public/contents/student_reports/"+report_list.report2});
            }
            if(report_list.report3 != '' && report_list.report3 != null) {
                attachments.push({filename: report_list.report3, path: "./public/contents/student_reports/"+report_list.report3});
            }
            if(report_list.report4 != '' && report_list.report4 != null) {
                attachments.push({filename: report_list.report4, path: "./public/contents/student_reports/"+report_list.report4});
            }
        } else {
            if(attachment != '') {
                attachments.push({filename: attachment_title, path: attachment});
            }
        }
        
        var mailOptions = {
            from: 'mitrajit.samanta@gmail.com',
            to: to,   //'myfriend@yahoo.com, myotherfriend@yahoo.com',  -- Multiple
            subject: subject,
            //text: "hbhhhhhhg",
            html: message,
            //attachments: attachments
            /* attachments:[
                {
                    filename: attachment_title,
                    path: attachment,
                    //content: fs.createReadStream('file.txt')
                }
            ] */
        };
        
        return transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
                return "Failed";
            } else {
                console.log('Email sent: ' + info.response);
                return "Sent";
            }
        });
    },






    /**
     * This function returns the base path of this js file
     * Returns - E:\Projects\BH\outcry\
     */
    sendPaymentConfirmationEmail: async function(to, subject, message, attachment, attachment_title) {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: mail_username,
                pass: mail_password
            }
        });

        var attachments = [];
        if(attachment != '') {
            attachments.push({filename: attachment_title, path: attachment});
        }
        
        var mailOptions = {
            from: 'mitrajit.samanta@gmail.com',
            to: to,   //'myfriend@yahoo.com, myotherfriend@yahoo.com',  -- Multiple
            subject: subject,
            //text: "hbhhhhhhg",
            html: message,
            attachments: attachments
            /* attachments:[
                {
                    filename: attachment_title,
                    path: attachment,
                    //content: fs.createReadStream('file.txt')
                }
            ] */
        };
        
        return transporter.sendMail(mailOptions, function(error, info){
            var msg = '';
            if (error) {
                //console.log(error);
                msg = "Failed";
            } else {
                //console.log('Email sent: ' + info.response);
                msg = "Sent";
            }

            try {
                fs.unlinkSync(attachment);
            } catch(err) {
                console.error(err)
            }

            return msg;
        });
    },

};