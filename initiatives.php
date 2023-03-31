<?php include 'include/head.php'; ?>

<body>
    <?php
    include 'include/header.php';
    include 'include/connect.php';

    ?>
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

    <div class="header-height"></div>

    <div class="pager-header">
        <div class="container">
            <div class="page-content">
                <h2>Initiatives</h2>
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="#">Home</a></li>
                    <li class="breadcrumb-item active">Initiatives</li>
                </ol>
            </div>
        </div>
    </div><!-- /Page Header -->


    
    <section class="team-section bg-grey bd-bottom circle shape padding">
        <div class="container">
            <div class="section-heading text-center ">
                <h2><strong>Educate a Child (EaCh)</strong></h2>
                <span class="heading-border"></span>
            </div><!-- /Section Heading -->

            <div class="team-wrapper row">
                <div class="col-md-7 col-sm-6 xs-padding">
                    <div id="testimonial-carousel" class="testimonial-carousel owl-carousel">
                        <a href="#">
                            <div class="testimonial-item">
                                <img src="gopali-img/Picture1.jpg" alt="profile">
                            </div>
                        </a>
                        <a href="#">
                            <div class="testimonial-item">
                                <img src="gopali-img/Picture2.jpg" alt="profile">
                            </div>
                        </a>
                        <a href="#">
                            <div class="testimonial-item">
                                <img src="gopali-img/samavesh2.jpg" alt="profile">
                            </div>
                        </a>
                        <a href="#">
                            <div class="testimonial-item">
                                <img src="gopali-img/samavesh3.jpg" alt="profile">
                            </div>
                        </a>
                        <a href="#">
                            <div class="testimonial-item">
                                <img src="gopali-img/samavesh4.jpg" alt="profile">
                            </div>
                        </a>
                        <a href="#">
                            <div class="testimonial-item">
                                <img src="gopali-img/samavesh5.jpg" alt="profile">
                            </div>
                        </a>
                        <a href="#">
                            <div class="testimonial-item">
                                <img src="gopali-img/samavesh6.jpg" alt="profile">
                            </div>
                        </a>
                    </div>
                </div>
                <div class="col-lg-5 sm-padding">
                    <h3>We currently educate around 240 underprivileged students from nursery to Class 5. We have always envisaged providing a holistic and inclusive education for the students of Jagriti Vidya Mandir in the form of cultural activities, sports events and regular multimedia presentations on weekends. We also have around 10 permanent teachers hired to educate these students regularly.</h3>
                    <div class="row">
            <div class="col-lg-12 mt-30">
                <center>
                    <a href="each.php" class="default-btn">Each Students</a>
                </center>
            </div>
        </div>
                </div>
            </div>
        </div>
    </section><!-- /Team Section -->

    <section class="events-section bg-white bd-bottom padding">
        <div class="container">
            <div class="section-heading text-center mb-40">
                <h2>Featured Events</h2>
                <!-- <span class="heading-border"></span>
                    <p>Help today because tomorrow you may be the one who <br> needs more helping!</p> -->
            </div><!-- /Section Heading -->
            <div id="event-carousel" class="events-wrap owl-Carousel">
                <div class="events-item">
                    <div class="event-thumb">
                        <img src="gopali-img/rise.jpg" alt="events" >
                    </div>
                    <div class="event-details">
                        <strong>RISE Workshop</strong>

                        <div class="event-info">
                            <p><i class="ti-calendar"></i>No of schools attended workshop: 15+</p>
                            <p><i class="ti-calendar"></i>No of teachers who participated in workshop: 51+</p>
                        </div>
                        <br>
                        <p>The workshop aimed to transform the existing teacher-centric model into a student-centric model of education. </p>
                        <!-- <a href="#" class="default-btn">Read More</a> -->
                    </div>
                </div><!-- Event-1 -->
                <div class="events-item">
                    <div class="event-thumb">
                        <img src="gopali-img/ccp.jpg" alt="events" >
                    </div>
                    <div class="event-details">
                        <strong>Career Counselling Program</strong>

                        <div class="event-info">
                            <p><i class="ti-calendar"></i>No of Mentees attended: 250+</p>
                            <p><i class="ti-calendar"></i>No of sessions between mentors and mentees: 280+</p>
                        </div>
                        <br>
                        <br>
                        <p>This program was aimed to connect students of class 9-12th with college students of different fields as per their interests.</p>
                        <!-- <a href="#" class="default-btn">Read More</a> -->
                    </div>
                </div><!-- Event-2 -->
                <div class="events-item">
                    <div class="event-thumb">
                        <img src="gopali-img/cleanliness.jpg" >
                    </div>
                    <div class="event-details">
                        <strong>Cleanliness Drive</strong>

                        <div class="event-info">
                            <p><i class="ti-calendar"></i>No of volunteers who participated in the drive: 150+</p>
                            <p><i class="ti-calendar"></i>No of regions covered in the event: 11+</p>
                        </div>
                        <p>Cleanliness Drive was a nationwide event at various centres aimed to mark the launch of Swachh Bharat Mission from PRAYAS </p>
                        <!-- <a href="#" class="default-btn">Read More</a> -->
                    </div>
                </div><!-- Event-3 -->
                <div class="events-item">
                    <div class="event-thumb">
                        <img src="gopali-img/thatipur.jpg" >
                    </div>
                    <div class="event-details">
                        <strong>PRAYAS Gwalior Thatipur</strong>

                        <div class="event-info">
                            <p><i class="ti-calendar"></i>Total Number of Children benefited: 250+</p>
                            <p><i class="ti-calendar"></i>Total funds raised in the event : 5848</p>
                        </div>
                        <p>"The event was conducted to raise money to help underprivileged students and school by distributing blackboards, dustbins and waterfilter."</p>
                        <!-- <a href="#" class="default-btn">Read More</a> -->
                    </div>
                </div><!-- Event-4 -->
                <div class="events-item">
                    <div class="event-thumb">
                        <img src="gopali-img/sindrievent.jpg" >
                    </div>
                    <div class="event-details">
                        <strong>PRAYAS Sindri Event</strong>

                        <div class="event-info">
                            <p><i class="ti-calendar"></i>Number of Teachers Attended : 40+</p>
                            <p><i class="ti-calendar"></i>Total Benefeciaries including students: 70+</p>
                        </div>
                        <p>The event was based on Quality education and the strategies to tackle the challanges in current education system.</p>
                        <!-- <a href="#" class="default-btn">Read More</a> -->
                    </div>
                </div><!-- Event-5 -->
                <div class="events-item">
                    <div class="event-thumb">
                        <img src="gopali-img/Wardha.jpg" >
                    </div>
                    <div class="event-details">
                        <strong>PRAYAS Wardha Event </strong>

                        <div class="event-info">
                            <p><i class="ti-calendar"></i>No of volunteers who participated in the drive: 150+</p>
                            
                            <p><i class="ti-calendar"></i>No of regions covered in the event: 11+</p>
                        </div>
                        <p>This event was conducted to raise funds to provide clean water facilities to children in Sankalp Orphanage in Wardha.</p>
                        <!-- <a href="#" class="default-btn">Read More</a> -->
                    </div>
                </div><!-- Event-6 -->
                <div class="events-item">
                    <div class="event-thumb">
                        <img src="gopali-img/Raipur.jpg" >
                    </div>
                    <div class="event-details">
                        <strong>PRAYAS Raipur Event</strong>

                        <div class="event-info">
                            <p><i class="ti-calendar"></i>Total Number of Children benefited: 100+</p>
                            <p><i class="ti-calendar"></i>Total funds raised in the event : 6771</p>
                        </div>
                        <p>This event was conducted to raise money to donate water cooler and table fans to Kopal Vani Child Welfare Organisation in Raipur.</p>
                        <!-- <a href="#" class="default-btn">Read More</a> -->
                    </div>
                </div><!-- Event-7 -->
                <div class="events-item">
                    <div class="event-thumb">
                        <img src="gopali-img/Samvedna.jpg" >
                    </div>
                    <div class="event-details">
                        <strong>PRAYAS Samvedna Event</strong>

                        <div class="event-info">
                            <p><i class="ti-calendar"></i>Total Number of Children Benefited : 25</p>

                            <p><i class="ti-calendar"></i>Total funds raised in the event : 12,500</p>
                        </div>
                        <p>The program focused on providing school uniforms to the children of Bhagwaan Baba Balika Ashram Orphanage.</p>
                        <!-- <a href="#" class="default-btn">Read More</a> -->
                    </div>
                </div><!-- Event-8 -->
                <div class="events-item">
                    <div class="event-thumb">
                        <img src="gopali-img/akolaevent.jpg" >
                    </div>
                    <div class="event-details">
                        <strong>PRAYAS Akola Event</strong>

                        <div class="event-info">
                            <p><i class="ti-calendar"></i>Total Number of Children Benefited : 500+</p>
                            <p><i class="ti-calendar"></i>Total funds raised in the event : 8,125</p>
                        </div>
                        <p>The event was conducted to raise money to provide a Volleyball court, and books for the library of a school named Dr. S R Patil School.</p>
                        <!-- <a href="#" class="default-btn">Read More</a> -->
                    </div>
                </div><!-- Event-9 -->
            </div>
        </div>
    </section><!-- Events Section -->


    <!-- Testimonial Section -->
    <section class="team-section bg-grey bd-bottom padding">
        <div class="container-fluid" id="filter">
            <div class="section-heading text-center ">
                <h2>All Events</h2>
                <span class="heading-border"></span>
            </div><!-- /Section Heading -->

            <form action="" method="POST" class="form-horizontal">
                <div class="form-group colum-row row">
                    <!-- <div class="col-sm-2">
                        <div class="form-group">
                            <select class="browser-default custom-select" name="No_of_Members" id="insative" onchange="serchinc()">
                                <option selected>Branches</option>
                                <?php
                                $sql = "SELECT DISTINCT 'branchs' FROM `initiative`";
                                $run = mysqli_query($conn, $sql);
                                while ($row = mysqli_fetch_assoc($run)) {
                                ?>
                                    <option value="<?php echo $row['branchs']; ?>"><?php echo $row['branchs'] ?></option>
                                <?php
                                } ?>
                            </select>
                        </div>
                    </div> -->


                    <div class="col-sm-2">
                        <select class="browser-default custom-select" name="No_of_Members" id="insative" onchange="serchinc()">
                            <option selected>Branches</option>
                            <?php
                            $sql = "SELECT DISTINCT `branchs` FROM `initiative`";
                            $run = mysqli_query($conn, $sql);

                            while ($row = mysqli_fetch_assoc($run)) {
                            ?>
                                <option value="<?php echo $row['branchs'] ?>"><?php echo $row['branchs'] ?></option>
                            <?php } ?>
                        </select>
                    </div>

                    <div class="col-sm-2">
                        <select class="browser-default custom-select" name="No_of_Members" id="SDG" onchange="SDGfilter()">
                            <option selected>SDGs</option>
                            <?php
                            $sql = "SELECT  DISTINCT `catagury` FROM `initiative`";
                            $run = mysqli_query($conn, $sql);

                            while ($row = mysqli_fetch_assoc($run)) {
                            ?>
                                <option value="<?php echo $row['catagury'] ?>"><?php echo $row['catagury'] ?></option>
                            <?php } ?>
                        </select>
                    </div>



                    <!-- <div class="col-sm-2">
                        <select class="browser-default custom-select" name="No_of_Members" id="newserch" onchange="Datewise()">
                            <option selected>Year</option>
                            <?php
                            $sql = "SELECT  DISTINCT `year` FROM `initiative`";
                            $run = mysqli_query($conn, $sql);

                            while ($row = mysqli_fetch_assoc($run)) {
                            ?>
                                <option value="<?php echo $row['year'] ?>"><?php echo $row['year'] ?></option>
                            <?php } ?>
                        </select>
                    </div> -->


                    <div class="col-sm-2">
                        <button id="submit" name="submit" class="default-btn" type="submit">Reset</button>
                    </div>

                    <div id="serchdata">

                    </div>



                    <div class="col-sm-6">

                    </div>


                </div>
            </form>
            <!-- <div class="team-wrapper row">

                <div class="col-lg-12 sm-padding">

                    <div class="team-wrap row" id="new">
                        <p id="loding" style="display:none;"></p>

                        <?php

                        $sql = "SELECT * FROM `initiative` WHERE status = 0";
                        $rsult = mysqli_query($conn, $sql);
                        while ($data = mysqli_fetch_assoc($rsult)) {
                        ?>

                            <div class="col-md-3 xs-padding">
                                <a href="initiatives-data.php?id=<?php echo $data['id'] ?>">
                                    <div class="team-details">
                                        <img src="./Admin/Initiative_image/<?php echo $data['image'] ?>" alt="team" style="height: 250px; cursor: pointer;">
                                        <div class="hover">

                                        </div>
                                    </div>
                                </a>
                                <p style="background: #fff; font-size: 20px; font-weight: 700; text-align: center; padding: 20px;"><?php echo $data['first_title'] ?></p>
                            </div>
                        <?php
                        }
                        ?>
                    </div>
                </div>
            </div> -->

            <div class="team-wrapper row">

                <div class="col-lg-12 sm-padding">

                    <div class="team-wrap row" id="new">
                        <p id="loding" style="display:none;"></p>

                        <?php

                        $sql = "SELECT * FROM `initiative` WHERE status = 0 LIMIT 10";
                        $rsult = mysqli_query($conn, $sql);
                        while ($data = mysqli_fetch_assoc($rsult)) {
                        ?>


                            <div class="col-md-6 col-lg-6 col-xxl-4 xs-padding" style="padding: 20px;">
                                <div class="events-item" >
                                    <div>
                                        <div class="event-thumb">
                                            <img src="./Admin/Initiative_image/<?php echo $data['image'] ?>" alt="events" >
                                        </div>
                                        <div class="event-details">
                                            <strong><?php echo $data['first_title'] ?></strong>

                                            <div class="event-info">
                                                <p><i class="ti-calendar"></i><?php echo $data['text1'] ?></p>
                                                <p><i class="ti-calendar"></i><?php echo $data['text2'] ?></p>
                                            </div>
                                            <br>
                                            <p style="font-size: 12px;"><?php echo $data['secound_title'] ?></p>
                                            <!-- <a href="#" class="default-btn">Read More</a> -->
                                        </div>
                                    </div>
                                </div>
                            </div><!-- Event-1 -->
                        <?php
                        }
                        ?>
                    </div>
                </div>
            </div>
        </div>
    </section>





    <!-- <section class="testimonial-section bd-bottom padding">
        <div class="container">
            <div class="section-heading text-center mb-40">
                <h2>Samavesh</h2>
                <span class="heading-border"></span>

            </div>
            <div id="testimonial-carousel" class="testimonial-carousel owl-carousel">
                <a href="#">
                    <div class="testimonial-item">
                        <div class="testi-footer">
                            <img src="https://t4.ftcdn.net/jpg/03/02/95/11/360_F_302951156_67zLyUmcc25HOaOWjX8PCOjse3xENeSK.jpg" alt="profile">
                            <h4>Youth Empowerment </h4>
                        </div>
                        <br>
                        <p>Our Compain "Youth Empowerment" aims at training and up scalling the youth between the age of 18-32 years for employment and empowering them with a secure livelihood.</p>

                    </div>
                </a>
                <a href="#">
                    <div class="testimonial-item">
                        <div class="testi-footer">
                            <img src="https://seedworld.com/site/wp-content/uploads/2019/10/nature-3289812_1920-696x464.jpg" alt="profile">
                            <h4>Come togather to feed the future.</h4>
                        </div>
                        <br>
                        <p>Our Comapaign is an attempt to words adequate nutrition as it is important to have them eat regular nutritious meals in a day.</p>

                    </div>
                </a>
                <a href="#">
                    <div class="testimonial-item">
                        <div class="testi-footer">
                            <img src="https://www.unicef.org/india/sites/unicef.org.india/files/styles/hero_desktop/public/UNI341047.jpg" alt="profile">
                            <h4>Providing health care for one million children and families.</h4>
                        </div>
                        <br>
                        <p>Our Campaign "Health cannot wait" aims at providing people from the under - privileged sections with access to affordable health care, preventive medicine and support at their door step. </p>

                    </div>
                </a>
            </div>
        </div>
    </section> -->




    <!-- /Team Section -->
    <?php include 'include/footer.php'; ?>

    <!-- <script type="text/javascript">
        function Datewise() {
            var x = document.getElementById("newserch").value;
            $.ajax({

                url: "Datewise.php",
                method: "POST",
                data: {

                    id: x
                },

                success: function(data) {

                    $("#new").html(data);

                }


            });
        }
    </script> -->


    <script type="text/javascript">
        function SDGfilter() {
            var x = document.getElementById("insative").value;
            var y = document.getElementById("SDG").value;
            $.ajax({

                url: "SDGfilter.php",
                method: "POST",
                data: {

                    idx: x,idy: y
                },

                success: function(data) {

                    $("#new").html(data);

                }


            });
        }
    </script>

    <script type="text/javascript">
        function serchinc() {
            var x = document.getElementById("insative").value;
            $.ajax({

                url: "insaserch.php",
                method: "POST",
                data: {

                    id: x
                },

                success: function(data) {

                    $("#new").html(data);

                }


            });
        }
    </script>
    <!-- 
    <script>
        $(document).ready(function() {
                    $('#fetchval').change(function() {
                            var sttd = $('#fetchval').val();
                            $.ajax({

                                    url: 'insaserch.php',
                                    type: 'POST',
                                    data: {
                                        id: sttd
                                    },
                                    success: function(response) {

                                        $('#loding').css('display', 'block');
                                        setTimeout(function()

                                        }

                                    })


                            });


                    });
    </script> -->