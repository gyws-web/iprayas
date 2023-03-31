let models = require("../../../models");
const { Op } = require("sequelize");
const multiparty = require('multiparty'); 
const fs = require("fs-extra");
const helpers = require("../../../helpers/helper_functions");




/**
 * Return the list of the all events
 */
exports.list = async function(req, res, next) {
    /*console.log("YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY");
    console.log(req.session);
    console.log()
    sess = req.session;
    console.log("Setting session data:username=%s and email=%s", sess.user.email, sess.user.username);*/


    /*var event_list = '';
    await models.Event.findAll({
        include:[{
            model: models.EventImage, as: 'event_images'
        }]
    }).then(result => {
        //return res.status(200).send({result});
        console.log("+++++++++++++++++++++++++++++++++++++++++++++++");
        event_list = result;
    }).catch(error => {
        res.json(error);
    });*/
    if( typeof res.locals.event !=='undefined' && res.locals.event =='Yes'){
        var event_list = await models.Event.findAll({order:[["event_id","DESC"]]});
        res.render('pages/admin/website_update/event/list', 
        {
            title:"Event List | GYWS",
            event_list: event_list,
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
    if( typeof res.locals.event !=='undefined' && res.locals.event =='Yes'){
        var event_id = req.params.event_id;
        var event_details = '';
        if(typeof event_id !== 'undefined' && event_id > 0) {
            //event_details = await models.Event.findOne({where:{event_id:event_id}});
            await models.Event.findOne({
                where: {event_id:event_id},
                include:[{
                    model: models.EventImage, as: 'event_images'
                }]
            }).then(result => {
                event_details = result;
                //res.json(event_details);
            }).catch(error => {
                res.json(error);
            });
        }

        //Get the tag list
        var tag_list = await models.Tag.findAll({attributes:["tag_id","title"], where:{active: "Yes"}, order:[["title","ASC"]]});

        res.render('pages/admin/website_update/event/form', 
        {
            title:"Event | GYWS",
            tag_list: tag_list,
            event_details: event_details
        });
    }else{
        res.redirect('/admin/dashboard');
    }
}




/**
 * Save new event or update the existing event
 */
exports.saveOrUpdate = async function(req, res) {
    if( typeof res.locals.event !=='undefined' && res.locals.event =='Yes'){
        var form = new multiparty.Form();
        form.parse(req, async function(err, fields, files) {
            var event_id = fields.event_id[0];
            var title = fields.title[0];
            var description = fields.description[0];
            var date = fields.date[0];
            var tag_id = fields.tag_id[0];
            var active = fields.active[0];

            if(title != '' && description != '' && date != '' && tag_id != '') {
                if(event_id == '') {  //Insert new record
                    await models.Event.create({
                        title: title, 
                        description: description, 
                        date: date, 
                        tag_id: tag_id, 
                        active: active,
                        createdBy: 1
                    }).then(async function(event) {
                        if(event) {
                            //If thumbnail and images are selected
                            uploadAndInsertEventImages(files, event.event_id);                  
                            req.flash('info',"Event successfully created");
                            return res.redirect('/admin/website-update/event/list');
                        } else {
                            req.flash('err',"Failed to create event! Please try again");
                            return res.redirect('/admin/website-update/event/form');
                        }
                    }).catch(function(error) {
                        return res.send(error);
                    });
                } else { //Update existing record
                    await models.Event.update({
                        title: title, 
                        description: description, 
                        date: date, 
                        tag_id: tag_id, 
                        active: active,
                        updatedBy: 1
                    },{where:{event_id:event_id}})
                    .then(async function(affected_rows) {
                        if(affected_rows > 0) {
                            //If thumbnail and images are selected
                            uploadAndInsertEventImages(files, event_id);                  
                            req.flash('info',"Event successfully updated");
                        } else {
                            req.flash('err',"Failed to update event! Please try again");
                        }
                        return res.redirect('/admin/website-update/event/list');
                    }).catch(function(error) {
                        return res.send(error);
                    })
                }
            } else {
                req.flash('err',"Please fill all the mandatory fields");
                return res.back();
            }
        });
    }else{
        res.redirect('/admin/dashboard');
    }
    
}








/**
 * Delete event record one at a time
 */
exports.delete = async function(req, res, next) {
    if( typeof res.locals.event !=='undefined' && res.locals.event =='Yes'){
        var event_id = req.body.event_id;
    
        if(typeof event_id !== 'undefined' && event_id > 0) {
            try {
                await models.Event.destroy({where:{event_id:event_id}});
                req.flash('info', "Event successfully deleted")
            } catch(error) {
                req.flash('err', "Failed to delete event! Please try again");
            }
            return res.redirect('/admin/website-update/event/list');
        } else {
            req.flash('err', "Something wrong! Please try again")
            return res.redirect('/admin/website-update/event/list');
        }
    }else{
        res.redirect('/admin/dashboard');
    }
}






/**
 * Upload event images and the thumbnail image by calling the helper function
 * Update EventImage table by inserting the event id and the image names
 * @param {*} files 
 * @param {*} event_id 
 */
async function uploadAndInsertEventImages(files, event_id) {
    var filenames = await helpers.uploadEventImages(files, event_id);
    for(var i=0; i<filenames.length; i++) {
        var index = filenames[i].indexOf("thumbnail");
        if(index == -1) {
            await models.EventImage.create({
                "event_id":event_id,
                "image":filenames[i],
                "createdBy": 1
            }).catch(function(error) {
                //Do nothing
            });
        } else {
            await models.Event.update({
                thumbnail: filenames[i]
            },{where:{event_id:event_id}}).catch(function(error) {
                //Do nothing
            })
        }
    } 
    
    return filenames;
}




