<?php include 'include/head.php'; ?>
    <body>
 <?php include 'include/header.php'; ?>
        
        <div class="header-height"></div>
        
        <div class="pager-header">
            <div class="container">
                <div class="page-content">
                    <h2>
Jagriti Vidya Mandir</h2>
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="index.php">Home</a></li>
                        <li class="breadcrumb-item active">
Jagriti Vidya Mandir</li>
                    </ol>
                </div>
            </div>
        </div><!-- /Page Header -->
        
       
        

            <section class="promo-section-2 padding bd-bottom ">
               <div class="container">
                 <div class="section-heading text-center mb-40">
                    <h2>Jagriti Vidya Mandir</h2>
                    <span class="heading-border"></span>
                    <p>Help today because tomorrow you may be the one who <br> needs more helping!</p>
                </div><!-- /Section Heading -->
                    <div class="row">
                        <div class="col-md-4 col-sm-6 xs-padding">
                            <div class="promo-content">
                                <img src="https://gyws.org/gyws/assets/img/124.png" style="height: 70px;">
                             
                                <p>JVM was established in April, 2008.
Its Main motto is ❝ To educate each and every child for a better tommorow ❞.</p>
                                
                            </div>
                        </div>
                        <div class="col-md-4 col-sm-6 xs-padding">
                            <div class="promo-content">
                                <img src="https://gyws.org/gyws/assets/img/131.png" alt="prmo icon" style="height: 70px;">
                              
                                <p>It is located in Tangasool village,
1.5 kilometers from Salua Air Force Station
which in turn is 5 kilometers away from IIT campus.</p>
                                
                            </div>
                        </div>
                        <div class="col-md-4 col-sm-6 xs-padding">
                            <div class="promo-content">
                                <img src="https://gyws.org/gyws/assets/img/125.png" alt="prmo icon" style="height: 70px;">
                             
                                <p>
At present, school is up to 5th standard
and 240+ students are enrolled
from nursery to 5th standard and 11+
teachers.</p>
                                
                            </div>
                        </div>
                    </div>
                </div>
               <div class="container">
       
            <div class="col-md-12 text-center mt-40">
                <a href="#" class="default-btn">Donate Now</a>
            </div>
      
    </div>
        </section><!-- /Promo Section -->

             <section class="about-section bd-bottom shape circle padding">
            <div class="container">
                <div class="row">
                   <div class="col-md-4 xs-padding">
                        <div class="profile-wrap">
                            <img class="profile" src="https://gyws.org/gyws/assets/img/future.png" alt="profile">
                           
                            
                        </div>
                    </div>
                    <div class="col-md-8" style="text-align: justify;">
                        <h3> Future plans</h3>
                                <p>
                                   JVM aspires to be a residential full-fledged school for students of under privileged families offering a variety of courses at +2 level, vocational training and career guidance. We seek to take Jagriti Vidya Mandir to beyond its current primary level to complete school cum hostel Catering to the needs of over 500 students. The facility will not only provide education up to 12th grade, but will also take responsibility for ensuring that its students settle in their professional or educational lives before they leave.</p>
                               
                       
                    </div>
                </div>
            </div>
        </section><!-- /Causes Section -->
        

    <section class="gallery-section bg-grey bd-bottom padding">
            <div class="container">
                <div class="section-heading text-center mb-40">
                    <h2>Events</h2>
                    <span class="heading-border"></span>
                    <p>Help today because tomorrow</p>
                </div>
                <div class="gallery-items row">
                      <?php
                            include 'include/connect.php';
                            $result =mysqli_query($conn, "SELECT * FROM events");
                            while ($data =mysqli_fetch_array($result)) {
                                
                           
                        ?>
                    <div class="col-lg-3 col-sm-6 single-item branding design">
                        <div class="gallery-wrap">
                            <img src="dashboard/image/<?php echo $data['img'] ?>" alt="gallery">
                            <div class="hover">
                                <a class="img-popup" data-gall="galleryimg" href="https://gyws.org/gyws/assets/img/jvm/IMG_2381.JPG"><i class="ti-image"></i>

                                </a>

                            </div>
                            <h3 style="background: #fff; padding: 20px;"><?php echo $data['title'] ?></h3>
                        </div>
                    </div><!-- /Item-1 -->
             
                  <?php } ?>
                  
                </div>
            </div>
        </section><!-- /Gallery Section -->
     
        <section class="blog-section padding">
            <div class="container">
                <div class="section-heading text-center mb-40">
                    <h2>Survey Status</h2>
                    <span class="heading-border"></span>
                    <p>Help today because tomorrow</p>
                </div>  
                <div class="row">
                    <div class="col-lg-12 xs-padding">
                        <div class="blog-items grid-list row">
                            <div class="col-md-3 padding-15 text-center">
                                <div class="blog-post">
                                   
                                    <div class="blog-content">
                                        
                                        <h3><a href="#">25</a></h3>
                                        <p>teacher training sessions conducted.</p>
                                        <span class="date"><i class="fa fa-clock-o"></i> <?php
$test1='2010-04-19 18:31:27';
echo date('d/m/Y',strtotime($test1));
?></span>
                                    </div>
                                </div>
                            </div><!-- Post 1 -->
                          <div class="col-md-3 padding-15 text-center">
                                <div class="blog-post">
                                   
                                    <div class="blog-content">
                                        
                                        <h3><a href="#">410</a></h3>
                                        <p>Students <br> Conducted.</p>
                                        <span class="date"><i class="fa fa-clock-o"></i> <?php
$test1='2010-04-19 18:31:27';
echo date('d/m/Y',strtotime($test1));
?></span>
                                    </div>
                                </div>
                            </div><!-- Post 1 -->
                           <div class="col-md-3 padding-15 text-center">
                                <div class="blog-post">
                                   
                                    <div class="blog-content">
                                        
                                        <h3><a href="#">10</a></h3>
                                        <p>udents rescued from child labour.</p>
                                        <span class="date"><i class="fa fa-clock-o"></i> <?php
$test1='2010-04-19 18:31:27';
echo date('d/m/Y',strtotime($test1));
?></span>
                                    </div>
                                </div>
                            </div><!-- Post 1 -->
                            <div class="col-md-3 padding-15 text-center">
                                <div class="blog-post">
                                   
                                    <div class="blog-content">
                                        
                                        <h3><a href="#">100</a></h3>
                                        <p>people attended the computer workshop.</p>
                                        <span class="date"><i class="fa fa-clock-o"></i> <?php
$test1='2010-04-19 18:31:27';
echo date('d/m/Y',strtotime($test1));
?></span>
                                    </div>
                                </div>
                            </div><!-- Post 1 -->
                            <div class="col-md-3 padding-15 text-center">
                                <div class="blog-post">
                                   
                                    <div class="blog-content">
                                        
                                        <h3><a href="#">25</a></h3>
                                        <p>Cycles <br>Donated.</p>
                                        <span class="date"><i class="fa fa-clock-o"></i> <?php
$test1='2010-04-19 18:31:27';
echo date('d/m/Y',strtotime($test1));
?></span>
                                    </div>
                                </div>
                            </div><!-- Post 1 -->
                           <div class="col-md-3 padding-15 text-center">
                                <div class="blog-post">
                                   
                                    <div class="blog-content">
                                        
                                        <h3><a href="#">110</a></h3>
                                        <p>women attended a tailoring workshop.</p>
                                        <span class="date"><i class="fa fa-clock-o"></i> <?php
$test1='2010-04-19 18:31:27';
echo date('d/m/Y',strtotime($test1));
?></span>
                                    </div>
                                </div>
                            </div><!-- Post 1 -->
                             <div class="col-md-3 padding-15 text-center">
                                <div class="blog-post">
                                   
                                    <div class="blog-content">
                                        
                                        <h3><a href="#">1000</a></h3>
                                        <p>potential blood donors database.</p>
                                        <span class="date"><i class="fa fa-clock-o"></i> <?php
$test1='2010-04-19 18:31:27';
echo date('d/m/Y',strtotime($test1));
?></span>
                                    </div>
                                </div>
                            </div><!-- Post 1 -->
                             <div class="col-md-3 padding-15 text-center">
                                <div class="blog-post">
                                   
                                    <div class="blog-content">
                                        
                                        <h3><a href="#">11</a></h3>
                                        <p>Education <br> Centres.</p>
                                        <span class="date"><i class="fa fa-clock-o"></i> <?php
$test1='2010-04-19 18:31:27';
echo date('d/m/Y',strtotime($test1));
?></span>
                                    </div>
                                </div>
                            </div><!-- Post 1 -->

                        </div>
                      
                    </div><!-- Blog Posts -->
                </div>
            </div>
        </section><!-- /Blog Section -->
<?php include 'include/footer.php'; ?>