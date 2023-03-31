let models = require("../../../models");




/**
 * Return the list of the media links
 */
exports.list = async function(req, res, next) {
    if( typeof res.locals.media_links  !=='undefined' && res.locals.media_links  =='Yes'){ 
    var media_link_list = await models.MediaLink.findAll({});
    
    res.render('pages/admin/website_update/media_links/list', 
    {
        title:"Media Link List | GYWS",
        media_link_list: media_link_list,
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
    if( typeof res.locals.media_links  !=='undefined' && res.locals.media_links  =='Yes'){ 
    /* var media_link_id = req.params.media_link_id;
    
    var donation_program_details = '';
    if(typeof media_link_id !== 'undefined' && media_link_id > 0) {
        try {
            donation_program_details = await models.DonationProgram.findOne({
                attributes:{exclude:["createdAt", "createdBy", "updatedAt", "updatedBy"]},
                where: {media_link_id:media_link_id},
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
    } */


    var media_links_details = await models.MediaLink.findOne({});


    res.render('pages/admin/website_update/media_links/form', 
    {
        title:"Media Link | GYWS",
        media_links_details: media_links_details,
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
    if( typeof res.locals.media_links  !=='undefined' && res.locals.media_links  =='Yes'){ 
    var facebook = req.body.facebook;
    var youtube = req.body.youtube;
    var linkedin = req.body.linkedin;

    /* console.log("--------------------------------------------------");
    console.log(facebook+" ----- " + youtube + " ----- " + linkedin);
    console.log("--------------------------------------------------"); */

    await models.MediaLink.update({
        facebook: facebook, 
        youtube: youtube,
        linkedin: linkedin, 
        updatedBy: 1
    },{where:{media_link_id:1}}).then(async function(affected_rows) {
        if(affected_rows > 0) {
            req.flash('info',"Media links successfully updated");
        } else {
            req.flash('err',"Failed to update media links. Please try again");
        }   
        return res.redirect('/admin/website-update/media-links/form'); 
    }).catch(function(error) {
        return res.send(error);
    })
}else{
    res.redirect('/admin/dashboard');
}
            
}









/**
 * Delete blog record one at a time
 */
exports.delete = async function(req, res, next) {
    if( typeof res.locals.media_links  !=='undefined' && res.locals.media_links  =='Yes'){ 
    var media_link_id = req.body.media_link_id;
  
    if(typeof media_link_id !== 'undefined' && media_link_id > 0) {
        try {
            await models.DonationProgram.destroy({where:{media_link_id:media_link_id}});
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
 * Upload blog images and the thumbnail image by calling the helper function
 * Update blogImage table by inserting the blog id and the image names
 * @param {*} files 
 * @param {*} media_link_id 
 */
async function uploadSingleFile(files, media_link_id) {
    var location = "public/contents/donation_programs/";
    var filenames = await helpers.uploadSingleFile(files, location, true, '');
    if(filenames.length > 0) {
        await models.DonationProgram.update({
            "photo":filenames[0],
        },{where:{media_link_id: media_link_id}});
    }
}











