let models = require("../../models");
const { Op } = require("sequelize");

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



exports.loadDashboardPage = async function(req, res, next) {
    
    var total_no_of_students = await models.Student.count();
    var no_of_alloted_students = await sequelize.query("SELECT COUNT(distinct student_id) 'no_of_alloted_students' from donorstudents",{ type: sequelize.QueryTypes.SELECT });
    var no_of_not_alloted_students = total_no_of_students - no_of_alloted_students[0].no_of_alloted_students;

    var d = new Date();
    var m_start_date = d.getFullYear()+"-"+(d.getMonth() + 1)+"-01";
    var m_end_date = d.getFullYear()+"-"+(d.getMonth() + 1)+"-31";

    var current_month_donor_donation = await sequelize.query(
        "select IFNULL(sum(razorpay_amount), 0) 'current_month_donation', count(*) 'cur_month_number_of_donation' "+
        "from donationhistories where createdAt between '"+ m_start_date + "' and '" + m_end_date + "' and "+
        "razorpay_status='succeed'", { type: sequelize.QueryTypes.SELECT });
    //var cur_month_number_of_donation = current_month_donor_donation[0].cur_month_number_of_donation;

    var current_month_addt_donor_donation = await sequelize.query(
        "select IFNULL(sum(amount), 0) 'current_month_addt_donation', count(*) 'cur_month_number_of_addt_donation' "+
        "from additionaldonationrecord where createdAt between '"+ m_start_date + "' and '" + m_end_date + "' and "+
        "(payment_received='Yes' or renewal = 'New')", { type: sequelize.QueryTypes.SELECT });
    //var cur_month_number_of_donation = current_month_addt_donor_donation[0].cur_month_number_of_donation;

    var current_month_total_donation_amount = parseInt(current_month_donor_donation[0].current_month_donation) + parseInt(current_month_addt_donor_donation[0].current_month_addt_donation)
    var no_of_cur_month_donations = parseInt(current_month_donor_donation[0].cur_month_number_of_donation) + parseInt(current_month_addt_donor_donation[0].cur_month_number_of_addt_donation)





    var y_start_date = d.getFullYear() + "-01-01";
    var y_end_date = d.getFullYear() + "-12-31";
    var current_year_donation = await sequelize.query(
        "select IFNULL(sum(razorpay_amount), 0) 'current_year_donation', count(*) 'cur_year_number_of_donation' "+
        "from donationhistories where createdAt between '"+ y_start_date + "' and '" + y_end_date + "' and "+
        "razorpay_status='succeed'", { type: sequelize.QueryTypes.SELECT });
    //var cur_year_number_of_donation = current_year_donation[0].cur_year_number_of_donation;
    /* Number of donations */
    //var no_of_donations = await sequelize.query("select count(*) 'no_of_donations' from donationhistories where razorpay_status='succeed'", { type: sequelize.QueryTypes.SELECT });


    var current_year_addt_donation = await sequelize.query(
        "select IFNULL(sum(amount), 0) 'current_year_addt_donation', count(*) 'cur_year_number_of_addt_donation' "+
        "from additionaldonationrecord where createdAt between '"+ y_start_date + "' and '" + y_end_date + "' and "+
        "(payment_received='Yes' or renewal='New')", { type: sequelize.QueryTypes.SELECT });
    //var cur_year_number_of_donation = current_year_donation[0].cur_year_number_of_donation;

    var current_year_total_donation_amount = parseInt(current_year_donation[0].current_year_donation) + parseInt(current_year_addt_donation[0].current_year_addt_donation)
    var no_of_cur_year_donations = parseInt(current_year_donation[0].cur_year_number_of_donation) + parseInt(current_year_addt_donation[0].cur_year_number_of_addt_donation)






    /* New/Renewal/Donated-Not Last Year donation amount program wise */
    var cur_month_new_donation_amount_program_wise = await sequelize.query(
        "select IFNULL(sum(b.amount), 0) 'total_amount', c.program_name, count(*) 'number_of_cur_month_new_donation_program_wise' from donationhistories as a, donatedprogramrecords as b, donationprograms as c " +
        "where a.createdAt between '"+ m_start_date + "' and '" + m_end_date + "' and a.razorpay_status='succeed' and a.renewal='New' "+
        "and b.razorpay_order_id = a.razorpay_order_id " +
        "and c.donation_program_id = b.donation_program_id " +
        "group by b.donation_program_id ",
        { type: sequelize.QueryTypes.SELECT });

    var cur_month_renewal_donation_amount_program_wise = await sequelize.query(
        "select IFNULL(sum(b.amount), 0) 'total_amount', c.program_name, count(b.donation_program_id) 'no_of_cur_month_renewal_donation_program_wise' from donationhistories as a, donatedprogramrecords as b, donationprograms as c " +
        "where a.createdAt between '"+ m_start_date + "' and '" + m_end_date + "' and a.razorpay_status='succeed' and a.renewal='Renewal' "+
        "and b.razorpay_order_id = a.razorpay_order_id " +
        "and c.donation_program_id = b.donation_program_id " +
        "group by b.donation_program_id ",
        { type: sequelize.QueryTypes.SELECT });

    var cur_month_donated_donation_amount_program_wise = await sequelize.query(
        "select IFNULL(sum(b.amount), 0) 'total_amount', c.program_name, count(b.donation_program_id) 'no_of_cur_month_donated_donation_program_wise' from donationhistories as a, donatedprogramrecords as b, donationprograms as c " +
        "where a.createdAt between '"+ m_start_date + "' and '" + m_end_date + "' and a.razorpay_status='succeed' and a.renewal='Donated-Not Last Year' "+
        "and b.razorpay_order_id = a.razorpay_order_id " +
        "and c.donation_program_id = b.donation_program_id " +
        "group by b.donation_program_id ",
        { type: sequelize.QueryTypes.SELECT });


    var cur_year_donation_amount_program_wise = await sequelize.query(
        "select IFNULL(sum(amount), 0) 'total_amount', count(*) 'cur_year_donation_amount_program_wise' from donationhistories as a " +
        "where a.createdAt between '"+ y_start_date + "' and '" + y_end_date + "' and a.razorpay_status='succeed' ",
        { type: sequelize.QueryTypes.SELECT });

    

    var cur_month_total_new_donation_amount = await sequelize.query(
        "select IFNULL(sum(amount), 0) 'total_amount', IFNULL(count(*), 0) 'total_donation' from donationhistories as a " +
        "where a.createdAt between '"+ m_start_date + "' and '" + m_end_date + "' and a.razorpay_status='succeed' and a.renewal='New' ",
        { type: sequelize.QueryTypes.SELECT });

    var cur_month_total_new_additional_donation_amount = await sequelize.query(
        "select IFNULL(sum(amount), 0) 'total_amount', IFNULL(count(*), 0) 'total_donation' from additionaldonationrecord as a " +
        "where a.createdAt between '"+ m_start_date + "' and '" + m_end_date + "' and (a.renewal='New' or a.payment_received='Yes') ",
        { type: sequelize.QueryTypes.SELECT });

    var total_new_donation_amount_current_month = parseInt(cur_month_total_new_donation_amount[0].total_amount) + parseInt(cur_month_total_new_additional_donation_amount[0].total_amount);
    var number_of_new_donations_current_month = parseInt(cur_month_total_new_donation_amount[0].total_donation) + parseInt(cur_month_total_new_additional_donation_amount[0].total_donation);
    
    
    
    var cur_month_total_renewal_donation_amount = await sequelize.query(
        "select IFNULL(sum(amount), 0) 'total_amount', IFNULL(count(*), 0) 'total_donation' from donationhistories as a " +
        "where a.createdAt between '"+ m_start_date + "' and '" + m_end_date + "' and a.razorpay_status='succeed' and a.renewal='Renewal' ",
        { type: sequelize.QueryTypes.SELECT });

    var cur_month_total_renewal_additional_donation_amount = await sequelize.query(
        "select IFNULL(sum(amount), 0) 'total_amount', IFNULL(count(*), 0) 'total_donation' from additionaldonationrecord as a " +
        "where a.createdAt between '"+ m_start_date + "' and '" + m_end_date + "' and a.renewal='Renewal' ",
        { type: sequelize.QueryTypes.SELECT });
        
    var total_renewal_donation_amount_current_month = parseInt(cur_month_total_renewal_donation_amount[0].total_amount) + parseInt(cur_month_total_renewal_additional_donation_amount[0].total_amount);
    var number_of_renewal_donations_current_month = parseInt(cur_month_total_renewal_donation_amount[0].total_donation) + parseInt(cur_month_total_renewal_additional_donation_amount[0].total_donation);

    
    
    var cur_month_total_donated_donation_amount = await sequelize.query(
        "select IFNULL(sum(amount), 0) 'total_amount' from donationhistories as a " +
        "where a.createdAt between '"+ m_start_date + "' and '" + m_end_date + "' and a.razorpay_status='succeed' and a.renewal='Donated-Not Last Year' ",
        { type: sequelize.QueryTypes.SELECT });

    var cur_month_total_donated_additional_donation_amount = await sequelize.query(
        "select IFNULL(sum(amount), 0) 'total_amount' from additionaldonationrecord as a " +
        "where a.createdAt between '"+ m_start_date + "' and '" + m_end_date + "' and a.renewal='Donated-Not Last Year' ",
        { type: sequelize.QueryTypes.SELECT });
        
    var total_donated_donation_amount_current_month = parseInt(cur_month_total_donated_donation_amount[0].total_amount) + parseInt(cur_month_total_donated_additional_donation_amount[0].total_amount);


    
    

    var cur_year_total_new_donation_amount = await sequelize.query(
        "select IFNULL(sum(amount), 0) 'total_amount', IFNULL(count(*), 0) 'total_donation' from donationhistories as a " +
        "where a.createdAt between '"+ y_start_date + "' and '" + y_end_date + "' and a.razorpay_status='succeed' and a.renewal='New' ",
        { type: sequelize.QueryTypes.SELECT });

    var cur_year_total_new_additional_donation_amount = await sequelize.query(
        "select IFNULL(sum(amount), 0) 'total_amount', IFNULL(count(*), 0) 'total_donation' from additionaldonationrecord as a " +
        "where a.createdAt between '"+ y_start_date + "' and '" + y_end_date + "' and a.renewal='New' ",
        { type: sequelize.QueryTypes.SELECT });

    var total_new_donation_amount_current_year = parseInt(cur_year_total_new_donation_amount[0].total_amount) + parseInt(cur_year_total_new_additional_donation_amount[0].total_amount);
    var total_new_donations_current_year = parseInt(cur_year_total_new_donation_amount[0].total_donation) + parseInt(cur_year_total_new_additional_donation_amount[0].total_donation);
    
    
    
    var cur_year_total_renewal_donation_amount = await sequelize.query(
        "select IFNULL(sum(amount), 0) 'total_amount', IFNULL(count(*), 0) 'total_donation' from donationhistories as a " +
        "where a.createdAt between '"+ y_start_date + "' and '" + y_end_date + "' and a.razorpay_status='succeed' and a.renewal='Renewal' ",
        { type: sequelize.QueryTypes.SELECT });

    var cur_year_total_renewal_additional_donation_amount = await sequelize.query(
        "select IFNULL(sum(amount), 0) 'total_amount', IFNULL(count(*), 0) 'total_donation' from additionaldonationrecord as a " +
        "where a.createdAt between '"+ y_start_date + "' and '" + y_end_date + "' and a.renewal='Renewal' ",
        { type: sequelize.QueryTypes.SELECT });
        
    var total_renewal_donation_amount_current_year = parseInt(cur_year_total_renewal_donation_amount[0].total_amount) + parseInt(cur_year_total_renewal_additional_donation_amount[0].total_amount);
    var total_renewal_donations_current_year = parseInt(cur_year_total_renewal_donation_amount[0].total_donation) + parseInt(cur_year_total_renewal_additional_donation_amount[0].total_donation);

    
    
    var cur_year_total_donated_donation_amount = await sequelize.query(
        "select IFNULL(sum(amount), 0) 'total_amount' from donationhistories as a " +
        "where a.createdAt between '"+ y_start_date + "' and '" + y_end_date + "' and a.razorpay_status='succeed' and a.renewal='Donated-Not Last Year' ",
        { type: sequelize.QueryTypes.SELECT });

    var cur_year_total_donated_additional_donation_amount = await sequelize.query(
        "select IFNULL(sum(amount), 0) 'total_amount' from additionaldonationrecord as a " +
        "where a.createdAt between '"+ y_start_date + "' and '" + y_end_date + "' and a.renewal='Donated-Not Last Year' ",
        { type: sequelize.QueryTypes.SELECT });
        
    var total_donated_donation_amount_current_year = parseInt(cur_year_total_donated_donation_amount[0].total_amount) + parseInt(cur_year_total_donated_additional_donation_amount[0].total_amount);



    var total_additional_amount_current_month = await sequelize.query(
        "select IFNULL(sum(amount), 0) 'total_amouont', type from additionaldonationrecord " +
        "where createdAt between '"+ m_start_date + "' and '" + m_end_date + "' and payment_received='Yes' group by type ",{ type: sequelize.QueryTypes.SELECT });


    var total_additional_amount_current_year = await sequelize.query(
        "select IFNULL(sum(amount), 0) 'total_amouont', type from additionaldonationrecord " +
        "where createdAt between '"+ y_start_date + "' and '" + y_end_date + "' and payment_received='Yes' group by type ",{ type: sequelize.QueryTypes.SELECT });
    

    /* Institute of fund received */
    var institute_wise_fund_received = await sequelize.query(
        "select IFNULL(sum(a.amount), 0) 'total_amount', b.institute, count(b.institute) 'no_of_inst_wise_fund_recv' from donationhistories as a " +
        "left join donors as b on b.donor_id = a.donor_id " +
        "where a.razorpay_status = 'succeed' and a.createdAt between '"+ y_start_date + "' and '" + y_end_date + "' and b.institute != '' group by b.institute ",{ type: sequelize.QueryTypes.SELECT });



    /* External/CSR/SI record */
    var cur_month_ces_record = await sequelize.query(
        "select IFNULL(sum(amount), 0) 'current_month_ces_donation', type, count(*) 'cur_month_number_of_ces_donation' "+
        "from additionaldonationrecord where createdAt between '"+ m_start_date + "' and '" + m_end_date + "' and "+
        "(payment_received='Yes' or renewal = 'New') group by type", { type: sequelize.QueryTypes.SELECT });


    var cur_year_ces_record = await sequelize.query(
        "select IFNULL(sum(amount), 0) 'current_year_ces_donation', type, count(*) 'cur_year_number_of_ces_donation' "+
        "from additionaldonationrecord where createdAt between '"+ m_start_date + "' and '" + m_end_date + "' and "+
        "(payment_received='Yes' or renewal = 'New') group by type", { type: sequelize.QueryTypes.SELECT });




    /* Expenes month wise */
    //SELECT YEAR(createdAt) AS y, MONTH(createdAt) AS m, amount FROM expenses GROUP BY y, m
    var expense_month_wise = await sequelize.query(
        "SELECT MONTH(date) AS month, IFNULL(sum(amount), 0) 'total_amount', count(*) 'no_of_total_donation' FROM expenses "+
        "where createdAt between '"+ y_start_date + "' and '" + y_end_date + "' GROUP BY month ",{ type: sequelize.QueryTypes.SELECT });
      
    /* Current year Expenes */
    var current_year_expense = await sequelize.query(
        "SELECT IFNULL(sum(amount), 0) 'total_amount' FROM expenses "+
        "where createdAt between '"+ y_start_date + "' and '" + y_end_date + "' ",{ type: sequelize.QueryTypes.SELECT });
          
    
    
    
    /* Number of new donation */

    
    /* institute wise funds */
    //var institute_wise_fund_list = await sequelize.query("select sum()

    /* New donation amount program wise */
    //var new_donation_amount_program_wise = await sequelize.query("select *")

    /* res.status(200).send({
        success:true, 
        total_no_of_students: total_no_of_students,
        no_of_alloted_students: (no_of_alloted_students[0].no_of_alloted_students >=0 ? no_of_alloted_students[0].no_of_alloted_students : 0),
        no_of_not_alloted_students: no_of_not_alloted_students,
        current_month_donation: current_month_donation[0].current_month_donation,
        cur_month_number_of_donation: cur_month_number_of_donation,
        current_year_donation: current_year_donation[0].current_year_donation,
        cur_year_number_of_donation: cur_year_number_of_donation,
        no_of_donations: no_of_donations[0].no_of_donations,

        cur_month_new_donation_amount_program_wise: cur_month_new_donation_amount_program_wise,
        cur_month_renewal_donation_amount_program_wise: cur_month_renewal_donation_amount_program_wise,
        cur_month_donated_donation_amount_program_wise: cur_month_donated_donation_amount_program_wise,
        cur_year_donation_amount_program_wise: cur_year_donation_amount_program_wise[0].total_amount,

        total_new_donation_amount_current_month: total_new_donation_amount_current_month,
        total_renewal_donation_amount_current_month: total_renewal_donation_amount_current_month,
        total_donated_donation_amount_current_month: total_donated_donation_amount_current_month,
        number_of_new_donations_current_month: number_of_new_donations_current_month,
        number_of_renewal_donations_current_month: number_of_renewal_donations_current_month,

        total_new_donation_amount_current_year: total_new_donation_amount_current_year,
        total_renewal_donation_amount_current_year: total_renewal_donation_amount_current_year,
        total_donated_donation_amount_current_year: total_donated_donation_amount_current_year,
        total_new_donations_current_year: total_new_donations_current_year,
        total_renewal_donations_current_year: total_renewal_donations_current_year,

        total_additional_amount_current_month: total_additional_amount_current_month,
        total_additional_amount_current_year: total_additional_amount_current_year,

        institute_wise_fund_received: institute_wise_fund_received,

        expense_month_wise: expense_month_wise,
        current_year_expense: current_year_expense[0].total_amount

    }); */

    res.render('pages/admin/dashboard/page', {
        title:"Dashboard | GYWS",
        total_no_of_students: total_no_of_students,
        no_of_alloted_students: (no_of_alloted_students[0].no_of_alloted_students >=0 ? no_of_alloted_students[0].no_of_alloted_students : 0),
        no_of_not_alloted_students: no_of_not_alloted_students,

        current_month_donation: current_month_total_donation_amount,
        cur_month_number_of_donation: no_of_cur_month_donations,

        current_year_donation: current_year_total_donation_amount,
        no_of_cur_year_donations: no_of_cur_year_donations,
        //no_of_donations: no_of_donations[0].no_of_donations,

        cur_month_new_donation_amount_program_wise: cur_month_new_donation_amount_program_wise,
        cur_month_renewal_donation_amount_program_wise: cur_month_renewal_donation_amount_program_wise,
        cur_month_donated_donation_amount_program_wise: cur_month_donated_donation_amount_program_wise,
        cur_year_donation_amount_program_wise: cur_year_donation_amount_program_wise[0].total_amount,
        no_of_cur_year_donation_program_wise: cur_year_donation_amount_program_wise[0].cur_year_donation_amount_program_wise,

        total_new_donation_amount_current_month: total_new_donation_amount_current_month,
        total_renewal_donation_amount_current_month: total_renewal_donation_amount_current_month,
        total_donated_donation_amount_current_month: total_donated_donation_amount_current_month,
        number_of_new_donations_current_month: number_of_new_donations_current_month,
        number_of_renewal_donations_current_month: number_of_renewal_donations_current_month,

        total_new_donation_amount_current_year: total_new_donation_amount_current_year,
        total_renewal_donation_amount_current_year: total_renewal_donation_amount_current_year,
        total_donated_donation_amount_current_year: total_donated_donation_amount_current_year,
        total_new_donations_current_year: total_new_donations_current_year,
        total_renewal_donations_current_year: total_renewal_donations_current_year,

        total_additional_amount_current_month: total_additional_amount_current_month,
        total_additional_amount_current_year: total_additional_amount_current_year,

        institute_wise_fund_received: institute_wise_fund_received,

        cur_month_ces_record: cur_month_ces_record,
        cur_year_ces_record: cur_year_ces_record,

        expense_month_wise: expense_month_wise,
        current_year_expense: current_year_expense[0].total_amount
    });
}

