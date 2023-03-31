$(function () {
    $("form[name='event_form']").validate({
        rules: {
            title: {
                required: true
            },
            description: {
                required: true
            },
            thumbnail:{
                required: true
            },
            upload_files:{
                required: true,
                // maxlength: 3,
                // extension: "jpg,jpeg,png"
            },
            tag_id:{
                required: true
            },
            date:{
                required: true
            }
        },
        errorElement: 'span',

        errorPlacement: function (error, element) {
            error.addClass('invalid-feedback');
            element.closest('.form-group').append(error);
        },
        highlight: function (element, errorClass, validClass) {
            $(element).addClass('is-invalid');
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).removeClass('is-invalid');
        },
        onfocusout: function (el) {
            if (!this.checkable(el)) {
                this.element(el);
            }
        },
        submitHandler: function (form) {
            form.submit();
        }
    });
    $("form[name='operator_form']").validate({
        rules: {
            username: {
                required: true
            },
            email: {
                required: true
            },
            password:{
                required: true
            },
            name:{
                required: true,
            },
           
            bio:{
                required: true
            },
            team_id:{
                required: true
            },
            department:{
                required: true
            },
            role_id:{
                required: true
            },
            current_designation_id:{
                required: true
            },
            member_type_id:{
                required: true
            },
            inintiative_id:{
                required: true
            }
        },
        errorElement: 'span',

        errorPlacement: function (error, element) {
            error.addClass('invalid-feedback');
            element.closest('.form-group').append(error);
        },
        highlight: function (element, errorClass, validClass) {
            $(element).addClass('is-invalid');
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).removeClass('is-invalid');
        },
        onfocusout: function (el) {
            if (!this.checkable(el)) {
                this.element(el);
            }
        },
        submitHandler: function (form) {
            form.submit();
        }
    });
    $("form[name='donor_form']").validate({
        rules: {
            name: {
                required: true
            },
            country_code_1: {
                required: true
            },
            contact_no:{
                required: true,
            },
            country:{
                required: true
            },
            state:{
                required: true
            },
            pin:{
                required: true
            },
            address:{
                required: true
            },
            email:{
                required: true
            },
            aadhar:{
                required: true
            },
            pan:{
                required: true
            },
            source:{
                required: true
            },
            member_concerned:{
                required: true
            },
            institute:{
                required: true
            },
            username:{
                required: true
            },
            password:{
                required: true
            },
            donor_category_id:{
                required: true
            },
            
            
        },
        errorElement: 'span',

        errorPlacement: function (error, element) {
            error.addClass('invalid-feedback');
            element.closest('.form-group').append(error);
        },
        highlight: function (element, errorClass, validClass) {
            $(element).addClass('is-invalid');
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).removeClass('is-invalid');
        },
        onfocusout: function (el) {
            if (!this.checkable(el)) {
                this.element(el);
            }
        },
        submitHandler: function (form) {
            form.submit();
        }
    });
    $("form[name='donation-program_form']").validate({
        rules: {
            program_name: {
                required: true
            },
            // program_id: {
            //     required: true
            // },
            donation_category_id:{
                required: true
            },
            program_type:{
                required: true
            },
            amount_type:{
                required: true
            },
            cost:{
                required: true
            },
            donor_signup_required:{
                required: true
            },
            
            
        },
        errorElement: 'span',

        errorPlacement: function (error, element) {
            error.addClass('invalid-feedback');
            element.closest('.form-group').append(error);
        },
        highlight: function (element, errorClass, validClass) {
            $(element).addClass('is-invalid');
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).removeClass('is-invalid');
        },
        onfocusout: function (el) {
            if (!this.checkable(el)) {
                this.element(el);
            }
        },
        submitHandler: function (form) {
            form.submit();
        }
    });

    $("form[name='donation_record_form']").validate({
        rules: {
            name: {
                required: true
            },
            email: {
                required: true
            },
            mobile:{
                required: true
            },
            amount:{
                required: true
            },
            payment_option:{
                required: true
            },
            date:{
                required: true
            },
            defaulter_month:{
                required: true
            },
            payment_received:{
                required: true
            },
            
        },
        errorElement: 'span',

        errorPlacement: function (error, element) {
            error.addClass('invalid-feedback');
            element.closest('.form-group').append(error);
        },
        highlight: function (element, errorClass, validClass) {
            $(element).addClass('is-invalid');
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).removeClass('is-invalid');
        },
        onfocusout: function (el) {
            if (!this.checkable(el)) {
                this.element(el);
            }
        },
        submitHandler: function (form) {
            form.submit();
        }
    });
    $("form[name='expense_form']").validate({
        rules: {
            expense_name: {
                required: true
            },
            amount: {
                required: true
            },
            date:{
                required: true
            },
            
        },
        errorElement: 'span',

        errorPlacement: function (error, element) {
            error.addClass('invalid-feedback');
            element.closest('.form-group').append(error);
        },
        highlight: function (element, errorClass, validClass) {
            $(element).addClass('is-invalid');
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).removeClass('is-invalid');
        },
        onfocusout: function (el) {
            if (!this.checkable(el)) {
                this.element(el);
            }
        },
        submitHandler: function (form) {
            form.submit();
        }
    });
    $("form[name='blog_form']").validate({
        rules: {
            title: {
                required: true
            },
            permalink: {
                required: true
            },
            blog_content:{
                required: true
            },
            active:{
                required: true
            },
            featured_image:{
                required: true
            },
            meta_keywords:{
                required: true
            },
        },
        errorElement: 'span',

        errorPlacement: function (error, element) {
            error.addClass('invalid-feedback');
            element.closest('.form-group').append(error);
        },
        highlight: function (element, errorClass, validClass) {
            $(element).addClass('is-invalid');
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).removeClass('is-invalid');
        },
        onfocusout: function (el) {
            if (!this.checkable(el)) {
                this.element(el);
            }
        },
        submitHandler: function (form) {
            form.submit();
        }
    });
    
    $("form[name='roll_form']").validate({
        rules: {
            title: {
                required: true
            },
            priority: {
                required: true
            },
           
        },
        errorElement: 'span',

        errorPlacement: function (error, element) {
            error.addClass('invalid-feedback');
            element.closest('.form-group').append(error);
        },
        highlight: function (element, errorClass, validClass) {
            $(element).addClass('is-invalid');
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).removeClass('is-invalid');
        },
        onfocusout: function (el) {
            if (!this.checkable(el)) {
                this.element(el);
            }
        },
        submitHandler: function (form) {
            form.submit();
        }
    });
    $("form[name='designation_form']").validate({
        rules: {
            title: {
                required: true
            },
            priority: {
                required: true
            },
           
        },
        errorElement: 'span',

        errorPlacement: function (error, element) {
            error.addClass('invalid-feedback');
            element.closest('.form-group').append(error);
        },
        highlight: function (element, errorClass, validClass) {
            $(element).addClass('is-invalid');
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).removeClass('is-invalid');
        },
        onfocusout: function (el) {
            if (!this.checkable(el)) {
                this.element(el);
            }
        },
        submitHandler: function (form) {
            form.submit();
        }
    });
    $("form[name='member_type_form']").validate({
        rules: {
            title: {
                required: true
            },
            priority: {
                required: true
            },
           
        },
        errorElement: 'span',

        errorPlacement: function (error, element) {
            error.addClass('invalid-feedback');
            element.closest('.form-group').append(error);
        },
        highlight: function (element, errorClass, validClass) {
            $(element).addClass('is-invalid');
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).removeClass('is-invalid');
        },
        onfocusout: function (el) {
            if (!this.checkable(el)) {
                this.element(el);
            }
        },
        submitHandler: function (form) {
            form.submit();
        }
    });
    $("form[name='donation_category_form']").validate({
        rules: {
            title: {
                required: true
            },
            slug: {
                required: true
            },
            priority: {
                required: true
            },
           
        },
        errorElement: 'span',

        errorPlacement: function (error, element) {
            error.addClass('invalid-feedback');
            element.closest('.form-group').append(error);
        },
        highlight: function (element, errorClass, validClass) {
            $(element).addClass('is-invalid');
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).removeClass('is-invalid');
        },
        onfocusout: function (el) {
            if (!this.checkable(el)) {
                this.element(el);
            }
        },
        submitHandler: function (form) {
            form.submit();
        }
    });
    $("form[name='donor_category_form']").validate({
        rules: {
            title: {
                required: true
            },
            priority: {
                required: true
            },
           
        },
        errorElement: 'span',

        errorPlacement: function (error, element) {
            error.addClass('invalid-feedback');
            element.closest('.form-group').append(error);
        },
        highlight: function (element, errorClass, validClass) {
            $(element).addClass('is-invalid');
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).removeClass('is-invalid');
        },
        onfocusout: function (el) {
            if (!this.checkable(el)) {
                this.element(el);
            }
        },
        submitHandler: function (form) {
            form.submit();
        }
    });

    $("form[name='team_form']").validate({
        rules: {
            title: {
                required: true
            },
            priority: {
                required: true
            },
           
        },
        errorElement: 'span',

        errorPlacement: function (error, element) {
            error.addClass('invalid-feedback');
            element.closest('.form-group').append(error);
        },
        highlight: function (element, errorClass, validClass) {
            $(element).addClass('is-invalid');
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).removeClass('is-invalid');
        },
        onfocusout: function (el) {
            if (!this.checkable(el)) {
                this.element(el);
            }
        },
        submitHandler: function (form) {
            form.submit();
        }
    });
    $("form[name='initiatives_form']").validate({
        rules: {
            title: {
                required: true
            },
        },
        errorElement: 'span',

        errorPlacement: function (error, element) {
            error.addClass('invalid-feedback');
            element.closest('.form-group').append(error);
        },
        highlight: function (element, errorClass, validClass) {
            $(element).addClass('is-invalid');
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).removeClass('is-invalid');
        },
        onfocusout: function (el) {
            if (!this.checkable(el)) {
                this.element(el);
            }
        },
        submitHandler: function (form) {
            form.submit();
        }
    });
    $("form[name='testimonial_form']").validate({
        rules: {
            name: {
                required: true
            },
            designation: {
                required: true
            },
            testimonial: {
                required: true
            },
        },
        errorElement: 'span',

        errorPlacement: function (error, element) {
            error.addClass('invalid-feedback');
            element.closest('.form-group').append(error);
        },
        highlight: function (element, errorClass, validClass) {
            $(element).addClass('is-invalid');
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).removeClass('is-invalid');
        },
        onfocusout: function (el) {
            if (!this.checkable(el)) {
                this.element(el);
            }
        },
        submitHandler: function (form) {
            form.submit();
        }
    });
    $("form[name='donor_student_form']").validate({
        rules: {
            session: {
                required: true
            },
            standard: {
                required: true
            },
            section: {
                required: true
            },
            gender: {
                required: true
            },
            donor_ids: {
                required: true
            },
            donation_program_id: {
                required: true
            },
        },
        errorElement: 'span',

        errorPlacement: function (error, element) {
            error.addClass('invalid-feedback');
            element.closest('.form-group').append(error);
        },
        highlight: function (element, errorClass, validClass) {
            $(element).addClass('is-invalid');
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).removeClass('is-invalid');
        },
        onfocusout: function (el) {
            if (!this.checkable(el)) {
                this.element(el);
            }
        },
        submitHandler: function (form) {
            form.submit();
        }
    });
    $("form[name='student_class_form']").validate({
        rules: {
            session: {
                required: true
            },
            standard: {
                required: true
            },
            section: {
                required: true
            },
            gender: {
                required: true
            },
           
        },
        errorElement: 'span',

        errorPlacement: function (error, element) {
            error.addClass('invalid-feedback');
            element.closest('.form-group').append(error);
        },
        highlight: function (element, errorClass, validClass) {
            $(element).addClass('is-invalid');
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).removeClass('is-invalid');
        },
        onfocusout: function (el) {
            if (!this.checkable(el)) {
                this.element(el);
            }
        },
        submitHandler: function (form) {
            form.submit();
        }
    });

    $("form[name='student_list_form']").validate({
        rules: {
            session: {
                required: true
            },
            standard: {
                required: true
            },
            section: {
                required: true
            },
            gender: {
                required: true
            },
           
        },
        errorElement: 'span',

        errorPlacement: function (error, element) {
            error.addClass('invalid-feedback');
            element.closest('.form-group').append(error);
        },
        highlight: function (element, errorClass, validClass) {
            $(element).addClass('is-invalid');
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).removeClass('is-invalid');
        },
        onfocusout: function (el) {
            if (!this.checkable(el)) {
                this.element(el);
            }
        },
        submitHandler: function (form) {
            form.submit();
        }
    });
    $("form[name='impact_report_form']").validate({
        rules: {
            title: {
                required: true
            },
            year: {
                required: true
            },
            thumbnail: {
                required: true
            },
            month: {
                required: true
            },
           
        },
        errorElement: 'span',

        errorPlacement: function (error, element) {
            error.addClass('invalid-feedback');
            element.closest('.form-group').append(error);
        },
        highlight: function (element, errorClass, validClass) {
            $(element).addClass('is-invalid');
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).removeClass('is-invalid');
        },
        onfocusout: function (el) {
            if (!this.checkable(el)) {
                this.element(el);
            }
        },
        submitHandler: function (form) {
            form.submit();
        }
    });


    $("form[name='memberReg_form']").validate({
        rules: {
            appli_for: {
                required: true
            },
            name: {
                required: true
            },
            dob: {
                required: true
            },
            age: {
                required: true
            },
            mrt_st: {
                required: true
            },
            gen_st: {
                required: true
            },
            edu_st: {
                required: true
            },
            f_name: {
                required: true
            },
            card_no: {
                required: true
            },
            address: {
                required: true
            },
            mobile: {
                required: true
            },
            email: {
                required: true
            },
            photo:{
                required: true,
                extension: "jpg,jpeg,png"
            },
            soc_fam_name:{
                required: true
            },
            soc_rl_name:{
                required: true
            },
            soc_rl_eml:{
                required: true
            },
            soc_cnn_name:{
                required: true
            },
            soc_rl_con:{
                required: true
            },
            soc_cnn_eml:{
                required: true
            }
           
        },
        errorElement: 'span',

        errorPlacement: function (error, element) {
            error.addClass('invalid-feedback');
            element.closest('.form-group').append(error);
        },
        highlight: function (element, errorClass, validClass) {
            $(element).addClass('is-invalid');
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).removeClass('is-invalid');
        },
        onfocusout: function (el) {
            if (!this.checkable(el)) {
                this.element(el);
            }
        },
        submitHandler: function (form) {
            form.submit();
        }
    });

    
    
    
    
});
