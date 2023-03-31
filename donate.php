<?php include 'include/head.php'; ?>
    <body>
     
     
        
       <?php include 'include/header.php' ?>
        
        <div class="header-height"></div>
        
        <div class="pager-header">
            <div class="container">
                <div class="page-content">
                    <h2>Donate Now</h2>
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="index.php">Home</a></li>
                        <li class="breadcrumb-item active">donate</li>
                    </ol>
                </div>
            </div>
        </div><!-- /Page Header -->
        
        <section class="contact-section padding" style="margin-bottom: 100px;">
           
            <div class="container">
                <div class="row">
                    <div style="margin:0px auto;">
                        <!‐‐BEGIN danamojo code‐‐>
					    <style>
                            .row{display: flex;}
                            .fa {font: normal normal normal 14px/1 FontAwesome !important; }
                        </style>
                        <script>
                        setTimeout(function(){ $( ".slicknav_btn" ).click(function() { $(".slicknav_nav").toggle(); $(".slicknav_nav").toggleClass("slicknav_hidden"); });}, 3000);
                        </script>  
                        <script src="https://danamojo.org/dm/js/widget.js" type="text/javascript"></script>
                        <script> setTimeout(function(){ if(document.getElementById("ngoContentContainer").innerHTML.length < 40){ document.getElementById("ngoContentContainer").innerHTML="<center> <p style='color:#a94442;'>we are sorry that our systems are down. we will be up shortly. apologies for the inconvenience.</p></center>";}},20000); </script>
                        <div id="dmScriptContainer" style="display:none;"><a href="#">Donate Now</a></div>
                        <div id="ngoContentContainer" iNGOId="1061" oDisplay="product" oDisplayTab="once,monthly" oQRCode="YES" ><center><img alt="please wait..." src="https://danamojo.org/dm/css/images/loading.gif"/></center></div>
                        
                        <!‐‐END danamojo code‐‐>
                    </div>    
                </div>
            </div>
        </section><!-- /Contact Section -->
                   

    <?php include 'include/footer.php' ?>

    <?php
if (isset($_POST['submit'])) {
    $message=$_POST['message'];
    $name=$_POST['name'];
    $email=$_POST['email'];
    $message=$_POST['message'];
    
    
    $to='gywsociety@gmail.com';
    $subject='User SMS: ';
    $message="Message: ".$message." Name: "." ".$name." Email: "." ".$email;
    $headers="From: ".$email;
    if (mail($to, $subject, $message, $headers)) {
      echo "<script>alert('Your Query has been sent')</script>";
      echo "<script>window:location='index.php'</script>";
    }
    else{
      echo "<script>alert('Please try again latter')</script>";
      echo "<script>window:location='index.php'</script>";
    }
}

?>