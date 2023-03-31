let models = require("../../models");
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




/**
 * Return the list of the specific report type
 */
exports.load = async function(req, res, next) { 
    
    var blog_list = await models.Blog.findAll({where:{active:"Publish"}, order:[["blog_id","desc"]]});
    var event_list = await models.Event.findAll({
                        order:[["event_id", "DESC"]],
                        where:{active:"Enable"},
                        include: [
                            { 
                                model: models.EventImage, as:"event_images",
                                attributes:["image"]
                            }
                        ]
                    });

                    
    res.render('pages/gyws/media/page', 
    {
        title:"GYWS | Media",
        blog_list: blog_list,
        event_list:event_list,
        s_msg: req.flash('info'),
        e_msg: req.flash('err')
    });
}




/**
 * Return the particular blog details 
 */
exports.articleDetails = async function(req, res, next) { 
    var slug = req.params.slug;
    var article = '';

    if(slug != '') {
        article = await models.Blog.findOne({
            where:{permalink:slug},
            include:[{
                model: models.BlogTags, as: "blog_tags",
                attributes:["tag","permalink"]
            }]
        });

        if(article.title != '') {
            var f_img_path = (article.featured_image != '' ? (req.app.locals.baseurl + "contents/blogs/" + article.blog_id + "/" + article.featured_image) : '');
            
            res.render('pages/gyws/media/blog/page', 
            {
                title:"GYWS | Blog",
                article: article,
                featured_image: f_img_path,
                s_msg: req.flash('info'),
                e_msg: req.flash('err')
            });
        } else {
            res.redirect('back');
        }
    } else {
        res.redirect('back');
    }
}





