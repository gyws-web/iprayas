<?php include 'include/head.php'; ?>
    <body>
     
     
        
       <?php include 'include/header.php' ?>
        
        <div class="header-height"></div>
        
        <div class="pager-header">
            <div class="container">
                <div class="page-content">
                    <h2>Contact With Us</h2>
                    <p>Help today because tomorrow you may be the one who <br>needs more helping!</p>
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="index.php">Home</a></li>
                        <li class="breadcrumb-item active">Contact</li>
                    </ol>
                </div>
            </div>
        </div><!-- /Page Header -->
        
        <section class="contact-section padding" style="margin-bottom: 100px;">
            <div id="google_map"></div><!-- /#google_map -->
            <div class="container">
                <div class="row contact-wrap">
                    <div class="col-md-6 xs-padding">
                        <div class="contact-info">
                            <h3>Get in touch</h3>
                           
                            <ul>
                                <li><i class="ti-location-pin"></i>  Gopali (No-shooting Area), P.O. - Salua, Dist. - Paschim Medinipur, West Bengal, Pin-721145.</li>
                                <li><i class="ti-mobile"></i> +91 9123192841</li>
                                <li><i class="ti-email"></i> gywsociety@gmail.com</li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-md-6 xs-padding">
                        <div class="contact-form">
                            <h3>Query Here</h3>
                            <br>
                            <form action="" method="post" class="form-horizontal">
                                <div class="form-group colum-row row">
                                    <div class="col-sm-6">
                                        <input type="text" id="name" name="name" class="form-control" placeholder="Name" required>
                                    </div>
                                    <div class="col-sm-6">
                                        <input type="email" id="email" name="email" class="form-control" placeholder="Email" required>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-md-12">
                                        <textarea id="message" name="message" cols="30" rows="5" class="form-control message" placeholder="Message" required></textarea>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-md-12">
                                        <button id="submit" name="submit" class="default-btn" type="submit">Send Message</button>
                                    </div>
                                </div>
                            
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section><!-- /Contact Section -->
      
                   
        <?php include 'include/dynemic-map.php'; ?>
                    

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