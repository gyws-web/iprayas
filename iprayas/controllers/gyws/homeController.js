let models = require("../../models");
const { Op } = require("sequelize");



exports.loadHomePage = async function(req, res, next) {
    /*console.log("YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY");
    console.log(req.session);
    console.log()
    sess = req.session;
    console.log("Setting session data:username=%s and email=%s", sess.user.email, sess.user.username);*/

    var testimonial_list = await models.Testimonial.findAll({where:{active:"Yes"}, limit:4});

    var event_list = '';
    await models.Event.findAll({
        order:[["event_id", "DESC"]],
        where:{active:"Enable"},
        include: [
            { 
                model: models.EventImage, as:"event_images",
                attributes:["image"]
            }
        ]
    }).then(function(result) {
        event_list = result;
    }).catch(error => {
        res.json(error);
    });

    //res.status(200).send({success:true, event_list:event_list});

    res.render('pages/gyws/home/page', {
        title:"Home | GYWS",
        event_list: event_list,
        testimonial_list: testimonial_list
    }); 
}

