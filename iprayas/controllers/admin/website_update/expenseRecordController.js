let models = require("../../../models");
const { Op } = require("sequelize");




/**
 * Return the list of the Expense
 */
exports.list = async function(req, res, next) {  
    if( typeof res.locals.expense_record  !=='undefined' && res.locals.expense_record  =='Yes'){  
    var expense_list = await models.Expense.findAll({order: [["date","desc"]]});
    res.render('pages/admin/website_update/expense/list', 
    {
        title:"GYWS | Expense Record List",
        expense_list: expense_list,
        s_msg: req.flash('info'),
        e_msg: req.flash('err')
    });
}else{
    res.redirect('/admin/dashboard');
}
}




/**
 * Load the form
 * Create new or update existing record
 */
exports.load = async function(req, res, next) {
    if( typeof res.locals.expense_record  !=='undefined' && res.locals.expense_record  =='Yes'){
    var expense_id = req.params.expense_id;
    var expense_details = '';

    if(typeof expense_id !== 'undefined' && expense_id > 0) {
        expense_details = await models.Expense.findOne({where: {expense_id:expense_id}});
    }

    res.render('pages/admin/website_update/expense/form', 
    {
        title:"GYWS | Expense Record",
        expense_details: expense_details,
        s_msg: req.flash('info'),
        e_msg: req.flash('err')
    });
}else{
    res.redirect('/admin/dashboard');
}
}




/**
 * Save new Expense or update the existing Expense
 */
exports.saveOrUpdate = async function(req, res) {
    if( typeof res.locals.expense_record  !=='undefined' && res.locals.expense_record  =='Yes'){
    var expense_id = req.body.expense_id;
    var expense_name = req.body.expense_name;
    var amount = req.body.amount;
    var date = req.body.date;

    if(expense_name != '' && amount != '') {
        if(expense_id == '') {  //Insert new record
            models.Expense.create({
                expense_name : expense_name,
                amount : amount,
                date : date,
                createdBy: 1
            }).then(function(data) {
                if(data) {
                    req.flash('info',"Expense record successfully created");
                    return res.redirect('/admin/website-update/expense-record/list');
                } else {
                    req.flash('err',"Failed to create expense record! Please try again");
                    return res.redirect('/admin/website-update/expense-record/form');
                }
            }).catch(function(error) {
                return res.send(error);
            });
        } else { //Update existing record
            models.Expense.update({
                expense_name : expense_name,
                amount : amount,
                date : date,
                updatedBy: 1
            },{where:{expense_id:expense_id}})
            .then(async function(affected_rows) {
                if(affected_rows > 0) {
                    req.flash('info',"Expense record successfully updated");
                } else {
                    req.flash('err',"Failed to update expense record! Please try again");
                }
                return res.redirect('/admin/website-update/expense-record/list');
            }).catch(function(error) {
                return res.send(error);
            });
        }
    } else {
        req.flash('err',"Fill all the mandatory fields");
        return res.redirect('/admin/website-update/expense-record/form'); 
    }
}else{
    res.redirect('/admin/dashboard');
}
    
}








/**
 * Delete record one at a time
 */
exports.delete = async function(req, res, next) {
    if( typeof res.locals.expense_record  !=='undefined' && res.locals.expense_record  =='Yes'){
    var expense_id = req.body.expense_id;
  
    if(typeof expense_id !== 'undefined' && expense_id > 0) {
        try {
            await models.Expense.destroy({where:{expense_id:expense_id}});
            req.flash('info', "Expense record successfully deleted")
        } catch(error) {
            req.flash('err', "Failed to delete expense record! Please try again");
        }
    } else {
        req.flash('err', "Something wrong! Please try again")
    }

    res.redirect('/admin/website-update/expense-record/list');
}else{
    res.redirect('/admin/dashboard');
}
}



/************************************* FRONTEND FUNCTIONS *************************************/


