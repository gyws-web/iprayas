let models = require("../../models");


/**
 * Return the list of the all donation category for the donation page
 */
exports.getDonationCategoryList = async function(req, res, next) {
    var program_type = req.query.program_type;
    var donation_category_list = await models.DonationCategory.findAll({order: [["priority","asc"]]});
    
    res.render('pages/gyws/donate/page', {
        title:"GYWS | Donate",
        donation_category_list: donation_category_list,
        program_type: program_type
    }); 
}




/**
 * Return the list of the category wise donation schemes
 */
exports.getCategoryWiseDonationProgramList = async function(req, res, next) {
    var program_type = req.query.program_type;
    var category_slug = req.params.slug;
    var fixed_donation_program_list = [];
    var flexible_donation_program_list = [];
    var message = '';
    var donor_name = res.locals.donor_name ? res.locals.donor_name : res.locals.temp_donor_name ;
    var donor_email = res.locals.email ? res.locals.email : res.locals.temp_email ;
    var donor_contact_no = res.locals.donor_contact_no ? res.locals.donor_contact_no : res.locals.temp_donor_contact_no ;

    if(category_slug != '') {
        fixed_donation_program_list = await models.DonationProgram.findAll({
            attributes: ["donation_program_id", "amount_type", "program_name", "program_id", "photo", "tax_benifit", "cost", "description", "donation_category_id", "donor_signup_required"],
            where:{program_type:program_type, amount_type:"Fixed",active: "Yes"},
            include:[
                {
                    model: models.DonationCategory, as: "donation_category",
                    where:{ slug: category_slug},
                    attributes:[]
                }
            ]
        });


        console.log("--------------------------------------------");
        console.log(fixed_donation_program_list.length);
        console.log("--------------------------------------------");


        flexible_donation_program_list = await models.DonationProgram.findAll({
            attributes: ["donation_program_id", "amount_type", "program_name", "program_id", "photo", "tax_benifit", "cost", "description", "donation_category_id", "donor_signup_required"],
            where:{program_type:program_type, amount_type:"Flexible",active: "Yes"},
            include:[
                {
                    model: models.DonationCategory, as: "donation_category",
                    where:{ slug: category_slug},
                    attributes:[]
                }
            ]
        });


        console.log("--------------------------------------------");
        console.log(flexible_donation_program_list.length);
        console.log("--------------------------------------------");
    }

    //res.status(200).send({message:true, donation_program_list:donation_program_list});
    
    if(fixed_donation_program_list.length == 0 && flexible_donation_program_list.length == 0) message = "No data found!";
    res.render('pages/gyws/donate/donation_program_page', {
        title:"GYWS | Donate",
        fixed_donation_program_list: fixed_donation_program_list,
        flexible_donation_program_list: flexible_donation_program_list,
        program_type:program_type,
        category_slug : category_slug,
        message: message,
        donor_name:donor_name,
        donor_email:donor_email,
        donor_contact_no:donor_contact_no
    }); 
}

