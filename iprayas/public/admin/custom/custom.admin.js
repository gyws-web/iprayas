$(document).ready(function() {

    /**
     * Assign the record id in the modal's data-del-id attribute for record deleting purpose
     */
    $(".gyws-btn-del").click(function(e) {
        var del_id = $(this).attr("data-del-id");
        $(".modal button.gyws-del-yes").attr("data-del-id", del_id);
    });


    /**
     * It submits the delete form
     */
    $(".modal button.gyws-del-yes").click(function(e) {
        var del_id = $(this).attr("data-del-id");
        $(".modal button.gyws-del-yes").attr("data-del-id", del_id);
        $("form#del_form_" + del_id).submit();
    });




    /**
     * It submits the passfail form
     */
    $(".modal button.gyws-passfail-yes").click(function(e) {
        $("form#passFailForm").submit();
    });




    /**
     * Open the file dialod browser 
     */
    $(".photo-upload-icon").click(function(e) {
        //alert("ss");
        $("#upload-pp").click();
    });


    /**
     * Select all checkboxes at once
     */
    $(".selectAll").click(function() {
        $(".selectAll").prop("checked", $(this).prop("checked"));
        $(".checkbox").prop("checked", $(this).prop("checked"));
    });
    
    /**
     * Uncheck selectAll class checkboxes if one .checkbox is unchecked
     */
    $(".checkbox").click(function() {
        if (!$(this).prop("checked")) {
            $(".selectAll").prop("checked", false);
        }
    });




    /**
     * Image preview before upload
     */
    $("#upload-pp").change(function () {
        var regex_pattern = /^([a-zA-Z0-9\s_\\.\-:])+(.png|.gif|.jpeg|.jpg)$/;
        if (regex_pattern.test($(this).val().toLowerCase())) {
            if (this.files && this.files[0]) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    $("#preview").attr("src", e.target.result);
                };
                reader.readAsDataURL(this.files[0]);
            }
        } else {
            alert("Please upload a valid image.");
        }
    });




    
});