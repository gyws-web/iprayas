let models = require("../../../models");
const { Op } = require("sequelize");
const multiparty = require('multiparty'); 
const fs = require("fs-extra");
const Sequelize = require('sequelize');
const helpers = require("../../../helpers/helper_functions");




/**
 * Return the list of the all blogs
 */
exports.list = async function(req, res, next) {
    if( typeof res.locals.media_blog   !=='undefined' && res.locals.media_blog   =='Yes'){
    var blog_list = await models.Blog.findAll({attributes:["blog_id", "title", "active", [Sequelize.fn('date_format', Sequelize.col('createdAt'), '%d-%m-%Y'), 'createdAt'],],order:[["blog_id","DESC"]]});
    res.render('pages/admin/website_update/blog/list', 
    {
        title:"Blog List | GYWS",
        blog_list: blog_list,
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
    if( typeof res.locals.media_blog   !=='undefined' && res.locals.media_blog   =='Yes'){
    var blog_id = req.params.blog_id;
    var blog_details = '';
    if(typeof blog_id !== 'undefined' && blog_id > 0) {
        try {
            blog_details = await models.Blog.findOne({
                attributes:{exclude:["createdAt", "createdBy", "updatedAt", "updatedBy"]},
                where: {blog_id:blog_id},
                include:[{
                    model: models.BlogTags, as: 'blog_tags',
                    attributes: ["blog_tag_id","tag"]
                }]
            });
            //return res.status(200).send({blog_details:blog_details});
            if(blog_details == null) {
                req.flash('err',"Something wrong! Please try again");
                return res.redirect("/admin/website-update/blog/list");
            }
        } catch(error) {
            return res.send(error);
        }
    }

    res.render('pages/admin/website_update/blog/form', 
    {
        title:"Blog | GYWS",
        blog_details: blog_details
    });
}else{
    res.redirect('/admin/dashboard');
}
}




/**
 * Save new blog or update the existing blog
 */
exports.saveOrUpdate = async function(req, res) {
    if( typeof res.locals.media_blog   !=='undefined' && res.locals.media_blog   =='Yes'){
    var form = new multiparty.Form();
    form.parse(req, async function(err, fields, files) {
        var blog_id = fields.blog_id[0];
        var title = fields.title[0];
        var permalink = fields.permalink[0];
        var blog_content = fields.blog_content[0];
        var tags = fields.tags[0];
        var meta_description = fields.meta_description[0];
        var meta_keywords = fields.meta_keywords[0];
        var H_remove_tag_ids = fields.H_remove_tag_ids[0];
        var active = fields.active[0];

        if(title != '' && blog_content != '' && permalink != '' && active != '') {
            if(blog_id == '') {  //Insert new record
                await getUniquePermalink(permalink, '').then(function(result) {
                    permalink = result;
                });
                
                await models.Blog.create({
                    title: title, 
                    permalink: permalink, 
                    blog_content: blog_content, 
                    featured_image: '',  
                    meta_description: meta_description,
                    meta_keywords: meta_keywords,
                    active: active,
                    createdBy: 1
                }).then(async function(blog) {
                    if(blog) {
                        if(tags) {
                            tags = tags.split(',');
                            for(var i=0; i<tags.length; i++) {
                                await models.BlogTags.create({
                                    tag: tags[i], 
                                    permalink: await helpers.replaceSpaceWithHyphen(tags[i]),
                                    blog_id: blog.blog_id,  
                                    createdBy: 1
                                });
                            }
                        }

                        uploadSingleFile(files, blog.blog_id);  
                        
                        req.flash('info',"Blog successfully created");
                        return res.redirect('/admin/website-update/blog/list');
                    } else {
                        req.flash('err',"Failed to create blog! Please try again");
                        return res.redirect('/admin/website-update/blog/form');
                    }
                }).catch(function(error) {
                    return res.send(error);
                });
            } else { //Update existing record
                //permalink = await getUniquePermalink(permalink, blog_id);
                await getUniquePermalink(permalink, blog_id).then(function(result) {
                    permalink = result;
                });
            
                await models.Blog.update({
                    title: title, 
                    permalink: permalink, 
                    blog_content: blog_content,   
                    meta_description: meta_description,
                    meta_keywords: meta_keywords,
                    active: active,
                    updatedBy: 1
                },{where:{blog_id:blog_id}})
                .then(async function(affected_rows) {
                    if(affected_rows > 0) {
                        if(tags) {
                            tags = tags.split(',');
                            for(var i=0; i<tags.length; i++) {
                                await models.BlogTags.create({
                                    tag: tags[i], 
                                    permalink: await helpers.replaceSpaceWithHyphen(tags[i]), 
                                    blog_id: blog_id,  
                                    createdBy: 1
                                });
                            }
                        }

                        if(H_remove_tag_ids != '') {
                            remove_tag_ids = H_remove_tag_ids.split(",");
                            for(var i=0; i<remove_tag_ids.length; i++) {
                                await models.BlogTags.destroy({where:{blog_tag_id: remove_tag_ids[i], blog_id: blog_id}});
                            }
                        }
                    } else {
                        req.flash('err',"Failed to update blog! Please try again");
                        return res.redirect('/admin/website-update/blog/form');
                    }
                })
                .then(async function() {
                    //console.log(files);
                    //If thumbnail and images are selected
                    uploadSingleFile(files, blog_id);                  
                    req.flash('info',"Blog successfully updated");
                    return res.redirect('/admin/website-update/blog/list');
                }).catch(function(error) {
                    return res.send(error);
                })
            }
        } else {
            req.flash('err',"Please fill all the mandatory fields!");
            return res.redirect('/admin/website-update/blog/form');
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
    if( typeof res.locals.media_blog   !=='undefined' && res.locals.media_blog   =='Yes'){
    var blog_id = req.body.blog_id;
  
    if(typeof blog_id !== 'undefined' && blog_id > 0) {
        try {
            await models.blog.destroy({where:{blog_id:blog_id}});
            req.flash('info', "blog successfully deleted")
        } catch(error) {
            req.flash('err', "Failed to delete blog! Please try again");
        }
        return res.redirect('/admin/website-update/blog/list');
    } else {
        req.flash('err', "Something wrong! Please try again")
        return res.redirect('/admin/website-update/blog/list');
    }
}else{
    res.redirect('/admin/dashboard');
}
}








/**
 * Upload blog images and the thumbnail image by calling the helper function
 * Update blogImage table by inserting the blog id and the image names
 * @param {*} files 
 * @param {*} blog_id 
 */
async function uploadSingleFile(files, blog_id) {
    var location = "public/contents/blogs/"+blog_id+"/";
    var filenames = await helpers.uploadSingleFile(files, location, false);
    if(filenames.length > 0) {
        await models.Blog.update({
            "featured_image":filenames[0],
        },{where:{blog_id: blog_id}});
    }
}









/**
 * Get the unique permalink for each blog post
 * @param {*} permalink 
 * @param {*} blog_id 
 */
async function getUniquePermalink(permalink, blog_id) {
    var is_exists = '';
    if(blog_id) {
        is_exists = await models.Blog.findOne({where:{permalink:permalink, blog_id:{[Op.ne]:blog_id}}});
    } else {
        is_exists = await models.Blog.findOne({where:{permalink:permalink}});
    }

    if(is_exists) {
        var append_str = Math.floor(Math.random() * 99999);
        permalink = permalink + "-" + append_str;
        return await getUniquePermalink(permalink, blog_id);
    } else {
        return permalink;
    }
}







