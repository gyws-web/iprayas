<?php include 'include/head.php'; ?>
    <body>
 <?php include 'include/header.php'; ?>
        
        <div class="header-height"></div>
        
        <div class="pager-header">
            <div class="container">
                <div class="page-content">
                    <h2>
Social Enterprise</h2>
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="index.html">Home</a></li>
                        <li class="breadcrumb-item active">
Prayas</li>
                    </ol>
                </div>
            </div>
        </div><!-- /Page Header -->
        
       
        

            <section class="promo-section-2 padding bd-bottom ">
               <div class="container">
                 <div class="section-heading text-center mb-40">
                    <h2>Our Objectives </h2>
                    <span class="heading-border"></span>
                    <p>We setup social enterprises and provide individuals with a platform to ensure the 

 <br> fulfillment of Sustainable Development Goals.</p>
                </div><!-- /Section Heading -->
                    <div class="row">
                        <div class="col-md-4 col-sm-6 xs-padding">
                            <div class="promo-content">
                                <img src="https://www.pngkey.com/png/full/873-8730101_established-professionals-circle-handshake-icon.png" style="height: 50px;">
                             <h3>Support</h3>
                                <p>To support the other initiatives of Gopali Youth Welfare Society financially.

</p>
                                
                            </div>
                        </div>
                        <div class="col-md-4 col-sm-6 xs-padding">
                            <div class="promo-content">
                                <img src="https://icon-library.com/images/Light-bulb-icon-transparent/Light-bulb-icon-transparent-6.jpg" alt="prmo icon" style="height: 50px;">
                              <h3>Start</h3>
                                <p>To start programs aiming at the socio-economic development of the areas.</p>
                                
                            </div>
                        </div>
                        <div class="col-md-4 col-sm-6 xs-padding">
                            <div class="promo-content">
                                <img src="https://www.shareicon.net/data/512x512/2016/07/09/118411_user_512x512.png" alt="prmo icon" style="height: 50px;">
                             <h3>
Generate</h3>
                                <p>
To generate local employment.</p>
                                
                            </div>
                        </div>
                    </div>
                </div>
        </section><!-- /Promo Section -->


            <section class="promo-section-2 padding bd-bottom ">
               <div class="container">
                
                    <div class="row">
                        <div class="col-md-4 col-sm-6 xs-padding">
                            <div class="promo-content">
                                <img src="https://www.nicepng.com/png/full/412-4125238_customers-users-png.png" style="height: 50px;">
                             <h3>Coordinate</h3>
                                <p>Coordinating with government and local administration.

</p>
                                
                            </div>
                        </div>
                        <div class="col-md-4 col-sm-6 xs-padding">
                            <div class="promo-content">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Mitropa_Cup_Trophy.png/431px-Mitropa_Cup_Trophy.png" alt="prmo icon" style="height: 50px;">
                              <h3>Setup</h3>
                                <p>Set up institutions, enterprises, and awareness programs in the interest of the development of the community.</p>
                                
                            </div>
                        </div>
                        <div class="col-md-4 col-sm-6 xs-padding">
                            <div class="promo-content">
                                <img src="https://library.kissclipart.com/20180829/vlq/kissclipart-market-research-clipart-market-research-clip-art-28cce1a54347d6ed.png" alt="prmo icon" style="height: 50px;">
                             <h3>
Research</h3>
                                <p>
To conduct case studies and researches on social aspects</p>
                                
                            </div>
                        </div>
                    </div>
                </div>
                 <div class="col-md-12 text-center mt-40">
                <a href="donate.php" class="default-btn">Donate Now</a>
            </div>
        </section><!-- /Promo Section -->
  
    
      <section class="gallery-section bg-grey bd-bottom padding">
            <div class="container">
                <div class="section-heading text-center mb-40">
                    <h2>Gallery</h2>
                    <span class="heading-border"></span>
                    <p>Help today because tomorrow</p>
                </div>
                
            </div>
            <div class="row">
                <?php 
                    include 'include/connect.php';
                    $result =mysqli_query($conn,"SELECT * FROM gallery LIMIT 3");
                    while($data = mysqli_fetch_array($result)){
                ?>
                 <div class="col-lg-4 col-sm-6 single-item wordpress design branding">
                        <div class="gallery-wrap">
                            <img src="dashboard/image/<?php echo $data['img'] ?>" alt="gallery">
                            <div class="hover">
                                <a class="img-popup" data-gall="galleryimg" href="gallery/g1.jpg"><i class="ti-image"></i></a> 
                            </div>
                          
                        </div>
                    </div><!-- /Item-3 -->
             <?php } ?>
            </div>
            <br>
              <div class="row">
                <?php 
                    include 'include/connect.php';
                    $result =mysqli_query($conn,"SELECT * FROM gallery LIMIT 3, 12");
                    while($data = mysqli_fetch_array($result)){
                ?>
                 <div class="col-lg-4 col-sm-6 single-item wordpress design branding">
                        <div class="gallery-wrap">
                            <img src="dashboard/image/<?php echo $data['img'] ?>" alt="gallery">
                            <div class="hover">
                                <a class="img-popup" data-gall="galleryimg" href="gallery/g1.jpg"><i class="ti-image"></i></a> 
                            </div>
                          
                        </div>
                    </div><!-- /Item-3 -->
             <?php } ?>
            </div>
        </section><!-- /Gallery Section -->
        
        <div class="sponsor-section bd-bottom">
            <div class="container">
                      <div class="section-heading text-center mb-40">
                        <h2>Clientele</h2>
                        <span class="heading-border"></span>
                        <p>Help today because tomorrow you may be the one who <br> needs more helping!</p>
                    </div><!-- /Section Heading -->
                <ul id="sponsor-carousel" class="sponsor-items owl-carousel">
                    <?php 
                        $result =mysqli_query($conn,"SELECT * FROM brand");
                        while($data =mysqli_fetch_array($result)){

                     ?>
                    <li class="sponsor-item">
                        <img src="dashboard/image/<?php echo $data['img'] ?>" alt="sponsor-image">
                    </li>
                 <?php } ?>
                </ul>
            </div>
        </div><!-- ./Sponsor Section -->


     
       
<?php include 'include/footer.php'; ?>