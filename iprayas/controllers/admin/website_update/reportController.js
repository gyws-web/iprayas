let models = require("../../../models");
const { Op } = require("sequelize");
const multiparty = require('multiparty'); 
const fs = require("fs-extra");
const Sequelize = require('sequelize');
const helpers = require("../../../helpers/helper_functions");
const email_func = require("../../../helpers/email_functions");



/**
 * Return the list of the specific report type
 */
exports.list = async function(req, res, next) {  
    var report_type = req.params.report_type;
    var report_list = '';

    try {
        report_list = await models.Report.findAll({
            attributes:["report_id", "report_type", "title", "year", "month", [Sequelize.fn('date_format', Sequelize.col('createdAt'), '%d-%m-%Y'), 'createdAt'],[Sequelize.fn('concat', 'contents/reports/'+report_type+'/', '', Sequelize.col('file')), 'file']], where:{"report_type":report_type}, order:[["report_id","desc"]]});
    } catch (error) {
        console.log(error);
        req.flash("err", "Something wrong! Please try again");
        return res.back()
    }

    res.render('pages/admin/website_update/report/list', 
    {
        title:"Report List | GYWS",
        report_list: report_list,
        report_type:report_type,
        s_msg: req.flash('info'),
        e_msg: req.flash('err')
    });
}




/**
 * Load the report form
 * Create new or update existing report
 */
exports.load = async function(req, res, next) {
    var report_type = req.params.report_type;
    var report_id = req.params.report_id;
    var report_details = '';
    var date = new Date();

    if(typeof report_id !== 'undefined' && report_id > 0) {
        report_details = await models.Report.findOne({where:{report_id:report_id}});
    }

    res.render('pages/admin/website_update/report/form', 
    {
        title:"Report | GYWS",
        report_type: report_type,
        report_details: report_details,
		financial_session_list: await financialSessionList(),
        start_year: 2010,
        end_year: date.getFullYear(),
        s_msg: req.flash('info'),
        e_msg: req.flash('err')
    });
}




/**
 * Save new report or update the existing report
 */
exports.saveOrUpdate = async function(req, res) {
    var form = new multiparty.Form();
    form.parse(req, async function(err, fields, files) {
        var report_id = fields.report_id[0];
        var report_type = fields.report_type[0];
        var title = fields.title[0];
        var year = fields.year[0];
        var month = fields.month[0];
        var active = fields.active[0];

        if(title != '' && year != '') {
            if(report_id == '') {  //Insert new record
                try {
                    var is_report_exists = await models.Report.findOne({where:{report_type:report_type, year:year, month:month}});
                    if(!is_report_exists) {
                        await models.Report.create({
                            report_type : report_type,
                            title : title,
                            year : year,
                            month : month,
                            file : "",
                            active : active,
                            createdBy: 1
                        }).then(async function(report) {
                            if(report) {
                                //If thumbnail and images are selected
                                await uploadSingleFile(files, report.report_id, report_type);                  
                                req.flash('info', capitalize(report_type) + " report successfully created");
                                return res.redirect('/admin/website-update/report/'+report_type+'/list');
                            } else {
                                req.flash('err',"Failed to create "+report_type+" report! Please try again");
                                return res.redirect('/admin/website-update/report/'+report_type+'/form');
                            }
                        }).catch(function(error) {
                            return res.send(error);
                        });
                    } else {
                        req.flash('err',"Duplicate "+report_type+" report!");
                        return res.redirect('/admin/website-update/report/'+report_type+'/form');
                    }
                } catch (error) {
                    console.log(error);
                }
            } else { //Update existing record
                var is_report_exists = await models.Report.findOne({where:{report_type:report_type, year:year, month:month, report_id:{[Op.ne]:report_id}}});
                if(!is_report_exists) {
                    await models.Report.update({
                        report_type : report_type,
                        title : title,
                        year : year,
                        month : month,
                        active : active,
                        updatedBy: 1
                    },{where:{report_id:report_id}})
                    .then(async function(affected_rows) {
                        if(affected_rows > 0) {
                            //If report has been selected for upload
                            await uploadSingleFile(files, report_id, report_type);                  
                            req.flash('info', capitalize(report_type) + " report successfully updated");
                        } else {
                            req.flash('err',"Failed to update "+report_type+" report! Please try again");
                        }
                        return res.redirect('/admin/website-update/report/'+report_type+'/list');
                    }).catch(function(error) {
                        return res.send(error);
                    })
                } else {
                    req.flash('err',"Duplicate "+report_type+" report!");
                    return res.back();
                }
            }
        } else {
            req.flash('err',"Fill all the mandatory fields");
            return res.redirect('/admin/website-update/report/'+report_type+'/form'); 
        }
    });
    
}








/**
 * Delete report record one at a time
 */
exports.delete = async function(req, res, next) {
    var report_id = req.body.report_id;
    var report_type = req.body.report_type;
  
    if(typeof report_id !== 'undefined' && report_id > 0) {
        try {
            var report_details = await models.Report.findOne({attributes:["file"], where:{report_id:report_id}});
            if(report_details) {
                await models.Report.destroy({where:{report_id:report_id}});
                await helpers.removeDir("public/contents/reports/"+report_type+"/"+report_details.file);
                req.flash('info', capitalize(report_type) + " report successfully deleted")
            } else {
                req.flash('err', "Something wrong! Please try again")
                return res.redirect('/admin/website-update/report/'+report_type+'/list');
            }
        } catch(error) {
            return res.send(error);
            req.flash('err', "Failed to delete "+report_type+" report! Please try again");
        }
        return res.redirect('/admin/website-update/report/'+report_type+'/list');
    } else {
        req.flash('err', "Something wrong! Please try again")
        return res.redirect('/admin/website-update/report/'+report_type+'/list');
    }
}








/**
 * Upload event images and the thumbnail image by calling the helper function
 * Update EventImage table by inserting the event id and the image names
 * @param {*} files 
 * @param {*} report_id 
 */
async function uploadSingleFile(files, report_id, report_type) {
    var location = "public/contents/reports/"+report_type+"/";
    var filenames = await helpers.uploadSingleFile(files, location);
    
    if(filenames) {
        try {
            await models.Report.update({
                file: filenames[0]
            },{where:{report_id:report_id}}).catch(function(error) {
                console.log(error);
            });
        } catch(error) {
            console.log(error);
        }
    }
}










/**
 * Capitalize the only first letter of the given string
 * @param {*} string 
 */
function capitalize(string) { 
    return string.charAt(0).toUpperCase() + string.slice(1); 
}











/*******************************************  FOR FRONTEND ***********************************/
/**
 * Return the list of the specific report type
 */
exports.getFinancialReportList = async function(req, res, next) {  
    var report_type = req.params.slug;
    var newsletter_list = '';
    var report_list = '';


    if(report_type != '') {
        if(report_type == "newsletters") {
            newsletter_list = await models.Report.findAll({
                attributes:["title", "year", "month", [Sequelize.fn('concat', 'contents/reports/finance/', '', Sequelize.col('file')), 'file']], 
                where:{report_type:"newsletter"}, order:[["year","desc"]]
            });

            res.render('pages/gyws/fin/newsletter', 
            {
                title:"Newsletters | GYWS",
                newsletter_list: newsletter_list,
                s_msg: req.flash('info'),
                e_msg: req.flash('err')
            });
        } else if(report_type == "reports") {
            report_list = await models.Report.findAll({
                attributes:["title", "year", "month", "report_type", [Sequelize.fn('concat', 'contents/reports/finance/', '', Sequelize.col('file')), 'file']], 
                where:{[Op.or]: [{report_type: "finance"}, {report_type: 'impact'}, {report_type: 'annual'}]}, 
                order:[["year","desc"]]
            });

            //res.status(200).send({success:true, report_list: report_list});

            res.render('pages/gyws/fin/report', 
            {
                title:"GYWS | Reports",
                report_list: report_list,
                s_msg: req.flash('info'),
                e_msg: req.flash('err')
            });
        }
    } else {
        //TODO:
    }


    /* const todaysDate = new Date()
    const currentYear = todaysDate.getFullYear()

    var report_list = '';

    try {
        report_list = await models.Report.findAll({
            attributes:["title", "year", "month", [Sequelize.fn('concat', 'contents/reports/finance/', '', Sequelize.col('file')), 'file']], 
            where:{report_type:"", year:currentYear}, order:[["report_id","asc"]]});
    } catch (error) {
        console.log(error);
        req.flash("err", "Something wrong! Please try again");
        return res.back()
    }

    res.render('pages/gyws/fin/page', 
    {
        title:"Financial Report List of " + currentYear + " | GYWS",
        report_list: report_list,
        s_msg: req.flash('info'),
        e_msg: req.flash('err')
    }); */
}

async function financialSessionList() {
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

    for(var i=start_year; i>end_year; i--) {
        var aca_sess_year = (start_year-1) + "-" + start_year;
        academic_sessions.push(aca_sess_year);
        start_year--;
    }

    return academic_sessions;
}

exports.sendEmail = async function(req, res) {

    var subject = req.body.subject;
    var message = req.body.message;
    var rattach = req.body.rattach;
    var attachment_title = req.body.rtitle;

    var donor_list = await models.Donor.findAll({
        attributes:[[Sequelize.fn('GROUP_CONCAT', Sequelize.col('email')), 'email']],
        where:{'active':'Yes'},
        order: [["name","asc"]]
    });
    
    if(donor_list[0].email != '') {
        var status = await email_func.sendTextMail(donor_list[0].email, subject, message, "./public/"+rattach, attachment_title);
    }

    res.redirect('back');
}