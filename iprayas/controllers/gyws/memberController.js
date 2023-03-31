let models = require("../../models");
const express = require("express");
const app = express();
const { Op } = require("sequelize");
const multiparty = require('multiparty'); 
const bcrypt = require("bcrypt");
const helpers = require("../../helpers/helper_functions");
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


exports.register = async function(req,res){
    var id = req.params.id ? req.params.id :'';
    if(id !=''){
        var memeberTempDetails =await models.Operator.findOne({where:{operator_id:id}});
        var sociaList = await models.MemberSocialConnect.findAll({where:{member_id:id}});
        console.log("----------------"+sociaList[0].fm_name);
    }
    return res.render('pages/gyws/members/reg_page', 
    {
        title:"GYWS | Member",
        memeberTempDetails : memeberTempDetails ? memeberTempDetails : '',
        sociaList : sociaList ? sociaList :'',
        s_msg: req.flash('info'),
        e_msg: req.flash('err')
    });
}

exports.saveRegister = async function(req,res){
    var form = new multiparty.Form();
    
    form.parse(req, async function(err, fields, files) {
        bcrypt.hash(fields.password[0], 10, async function(err, hash) {
            models.Operator.create({
                appli_for : fields.appli_for[0],
                name : fields.name[0],
                dob : fields.dob[0],
                age : fields.age[0],
                mrt_st : fields.mrt_st[0],
                gen_st : fields.gen_st[0],
                edu_st : fields.edu_st[0],
                dependants : fields.dependants[0],
                b_grp: fields.b_grp[0],
                f_name : fields.f_name[0],
                card_no : fields.card_no[0],
                address : fields.address[0],
                pin_code : fields.pin_code[0],
                city : fields.city[0],
                landmark : fields.landmark[0],
                telephone : fields.telephone[0],
                mobile : fields.mobile[0],
                email : fields.email[0],
                photo : '',
                username : fields.username[0],
                password : hash
            }).then(async function(crt){
            if(crt){
                await uploadSingleFile(files, crt.operator_id); 
                var soc_fam_name = JSON.parse(JSON.stringify(fields.soc_fam_name));
                var soc_rl_name = JSON.parse(JSON.stringify(fields.soc_rl_name)) ;
                var soc_rl_eml = JSON.parse(JSON.stringify(fields.soc_rl_eml));   
                var soc_cnn_name = JSON.parse(JSON.stringify(fields.soc_cnn_name));
                var soc_rl_con = JSON.parse(JSON.stringify(fields.soc_rl_con));
                var soc_cnn_eml = JSON.parse(JSON.stringify(fields.soc_cnn_eml)); 
                for(var i=0; i<soc_fam_name.length; i++){  
                    if(soc_fam_name[i] !=''){
                        models.MemberSocialConnect.create({
                            member_id : crt.operator_id,
                            fm_name : soc_fam_name[i],
                            fm_rel : soc_rl_name[i],
                            fm_eml : soc_rl_eml[i],
                            so_name : soc_cnn_name[i],
                            so_rel : soc_rl_con[i],
                            so_eml : soc_cnn_eml[i],
                        });
                    }     
                }       
                req.flash('info',"Successfully Registered. Thankyou for joining with us.");
                return res.redirect('/member/register/'+crt.operator_id);
                }
            });
        });
    })
}

async function uploadSingleFile(files, operator_id) {
    var location = "public/contents/operators/";
    var filenames = await helpers.uploadSingleFile(files, location, false, operator_id);
    if(filenames.length > 0) {
        await models.Operator.update({
            "photo":filenames[0],
        },{where:{operator_id: operator_id}});
    }
    
}

// exports.saveSocial = async function(req,res){
//     var type = req.params.type;
//     var form = new multiparty.Form();
//     form.parse(req, async function(err, fields, files) {
//         var mem_fm_id = fields.mem_fm_id ? fields.mem_fm_id[0] :'';
//         var mem_soc_id = fields.mem_soc_id ? fields.mem_soc_id[0] : '';
//         if(type == "fm"){
//             var soc_fam_name = JSON.parse(JSON.stringify(fields.soc_fam_name));
//             var soc_rl_name = JSON.parse(JSON.stringify(fields.soc_rl_name)) ;
//             var soc_rl_eml = JSON.parse(JSON.stringify(fields.soc_rl_eml));
//             for(var i=0; i<soc_fam_name.length; i++){
//                 if(soc_fam_name[i] !=''){
//                     models.MemberSocialConnect.create({
//                         member_id : mem_fm_id,
//                         name : soc_fam_name[i],
//                         rel : soc_rl_name[i],
//                         eml : soc_rl_eml[i],
//                         type : "fm"
//                     });
//                 }
//             }
//             req.flash('info',"Successfully added.");
//             return res.redirect('/member/register/'+mem_fm_id);
//         }else if(type == "sc"){
//             var soc_cnn_name = JSON.parse(JSON.stringify(fields.soc_cnn_name));
//             var soc_rl_con = JSON.parse(JSON.stringify(fields.soc_rl_con));
//             var soc_cnn_eml = JSON.parse(JSON.stringify(fields.soc_cnn_eml));
//             for(var i=0; i<soc_cnn_name.length; i++){
//                 if(soc_cnn_name[i] !=''){
//                     models.MemberSocialConnect.create({
//                         member_id : mem_soc_id,
//                         name : soc_cnn_name[i],
//                         rel : soc_rl_con[i],
//                         eml : soc_cnn_eml[i],
//                         type : "sc"
//                     });
//                 }
//             }
//             req.flash('info',"Successfully added.");
//             return res.redirect('/member/register/'+mem_soc_id);
//         }
        
//     });
// }