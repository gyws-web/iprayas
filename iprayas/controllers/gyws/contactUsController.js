let models = require("../../models");




/**
 * Load the page
 */
exports.loadPage = async function(req, res, next) {  

    var operator_list = await models.Operator.findAll({
        attributes:["name", "mobile","photo","linkedin_link","facebook_link"],
        //where: {member_type:"Governing Body"}, 
        where: {member_type_id:1}, 
        order:[["operator_id", "asc"]],
        include: [{
            model: models.Designation, as: "designation_details",
            attributes:["title"]
            }
        ]
    });

    //return res.status(200).send({success:true, operator_list:operator_list});

    res.render('pages/gyws/contact/page', 
    {
        title:"GYWS | Contact Us",
        operator_list:operator_list,
        s_msg: req.flash('info'),
        e_msg: req.flash('err')
    });
}




/**
 * Save the message from the contact us page
 */
exports.save = async function(req, res, next) { 
    
    var name = req.body.name;
    var email = req.body.email;
    var contact_number = req.body.contact_number;
    var message = req.body.message;

    if(name != "" && email != "" && contact_number != "" && message != "") {
        await models.ContactUs.create({
            name: name,
            email: email,
            contact_number: contact_number,
            message: message
        }).catch(function(error) {
            /* req.flash("err", "Something wrong! Please try again");
            res.redirect('/contact'); */
            console.log(error);
        });

        req.flash("info", "Thank you very much for contacting us! We will contact you soon.");
        res.redirect('/contact');
    }

    
}






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
        return res.back();
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
        start_year: 2010,
        end_year: date.getFullYear(),
        s_msg: req.flash('info'),
        e_msg: req.flash('err')
    });
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









