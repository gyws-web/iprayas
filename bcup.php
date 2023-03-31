<?php include 'include/head.php'; ?>
    <body>
 <?php
  include 'include/header.php'; 
  include 'include/connect.php';

 ?>
        
        <div class="header-height"></div>
        
        <div class="pager-header">
            <div class="container">
                <div class="page-content">
                    <h2>Branches</h2>
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#">Home</a></li>
                        <li class="breadcrumb-item active">Branches</li>
                    </ol>
                </div>
            </div>
        </div><!-- /Page Header -->


        
        <section class="events-section bg-white bd-bottom padding">
           <div class="container">
                <div class="section-heading text-center mb-40">
                    <h2>Upcoming Events</h2>
                    <span class="heading-border"></span>
                        
                </div><!-- /Section Heading -->
                <div id="event-carousel" class="events-wrap owl-Carousel">
                    <div class="events-item">
                        <div class="event-thumb">
                           <img src="https://akm-img-a-in.tosshub.com/indiatoday/images/story/201810/education4-650.jpeg" alt="events" style="height: 400px;">
                        </div>
                        <div class="event-details">
                            <h3>Better Access to Quality Education</h3>
                            <div class="event-info">
                                <p><i class="ti-calendar"></i>Started On: 12:00 PM.</p>
                                <p><i class="ti-location-pin"></i>Grand Mahal, Dubai 2100.</p>
                            </div>
                            <p>The new goal seeks to ensure “inclusive, equitable, free and quality primary and secondary education” </p>
                           
                        </div>
                    </div><!-- Event-1 -->
                    <div class="events-item">
                        <div class="event-thumb">
                           <img src="https://www.helpguide.org/wp-content/uploads/womans-hand-cutting-a-peanut-butter-and-jelly-sandwich-768.jpg" alt="events" style="height: 400px;">
                        </div>
                        <div class="event-details">
                            <h3>Refined Health & Nutrition</h3>
                            <div class="event-info">
                                <p><i class="ti-calendar"></i>Started On: 12:00 PM.</p>
                                <p><i class="ti-location-pin"></i>Grand Mahal, Dubai 2100.</p>
                            </div>
                            <p>Refined grain intake is widely assumed to be associated with adverse health outcomes, including increased risk. </p>
                           
                        </div>
                    </div><!-- Event-2 -->
                    <div class="events-item">
                        <div class="event-thumb">
                           <img src="https://www.waldenu.edu/-/media/walden/images/seo-article/seo-801-bs-216472102-1200x675.jpg" alt="events" style="height: 400px;">
                        </div>
                        <div class="event-details">
                            <h3>Enhanced Child Protection </h3>
                            <div class="event-info">
                                <p><i class="ti-calendar"></i>Started On: 12:00 PM.</p>
                                <p><i class="ti-location-pin"></i>Grand Mahal, Dubai 2100.</p>
                            </div>
                            <p>We work to ensure the realization of children's rights to grow up in a family environment.</p>
                           
                        </div>
                    </div><!-- Event-3 -->
                </div>
           </div>
        </section><!-- Events Section -->

           <section class="testimonial-section bd-bottom padding">
            <div class="container">
                <div class="section-heading text-center mb-40">
                    <h2>Featured Initiatives</h2>
                    <span class="heading-border"></span>
                    
                </div><!-- /Section Heading -->
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
        </section><!-- Testimonial Section -->

       <section class="team-section bg-grey bd-bottom padding">

            <div class="container">
                            <form action="" method="post" class="form-horizontal">
                                <div class="form-group colum-row row">
                                    <div class="col-sm-2">
                                        <select style="height: 48px;" class="form-control">
                                            <option>Select Filter</option>
                                            <option>Branchwise</option>
                                        </select>
                                    </div>

                                    <div class="col-sm-2">
                                          <div class="form-group">
                    <select class="browser-default custom-select" name="No_of_Members" id="filter"  onclick="newfilter()">
                      <option selected>Select Branches</option>

                      <?php 
                      $sql = "SELECT * FROM `initiative`";
                      $run = mysqli_query($conn,$sql);

                      while ($row = mysqli_fetch_assoc($run)) 
                      {
                        ?>
                         <option value="<?php echo $row['branchs'] ?>"><?php echo $row['branchs'] ?></option>

                        <?php
                      }

                      ?>
                      
                     </select>
                   
                  </div>                          
                          <div class="col-sm-6">
                                      
                                    </div>
                                  <!--   <div class="col-sm-2">
                                       <a href="#" class="default-btn">Join Us</a>
                                    </div> -->
                                   
                                </div>
                            </form>


                              <div class="team-wrapper row">

                    <div class="col-lg-12 sm-padding">

                        <div class="team-wrap row" id="new">
                            <?php

                            $sql = "SELECT * FROM `initiative` WHERE status = 0";
                            $rsult = mysqli_query($conn,$sql);

                            while ($row = mysqli_fetch_assoc($rsult)) 
                              {
                              ?>

                              <div class="col-md-2.5 xs-padding">
                                <a href="initiatives-data.php?id=<?php echo $row['id'] ?>">
                               <div class="about-image">
                            <img src="/work/gopali/Admin/Initiative_image/<?php echo $row['image'] ?>" alt="team" style="height: 250px; cursor: pointer;">
                        </div>
                                </div>
                            </a>
                                 <p style="background: #fff; font-size: 20px; font-weight: 700; text-align: center; padding: 20px;"><?php echo $row['first_title'].' '.$row['secound_title'] ?></p>
                            </div><!-- /Team-1 -->


  <?php
}


?>

                  
                        </div>
                    </div>
                </div>
            </div>


<section style="background-color: #f2f2f2; margin-top:100px;">
    <div class="container">
        <form action="" method="post" class="form-horizontal">
                                <div class="form-group colum-row row">
                                    <div class="col-sm-2">
                                        <select style="height: 37px;" class="form-control">
                                            <option>Select Filter</option>
                                            <option>Branchwise</option>
                                        </select>
                                    </div>

                                    <div class="col-sm-2">
                                          <div class="form-group">
                    <select class="browser-default custom-select" name="No_of_Members" id="filter"  onclick="newfilter()">
                      <option selected>Select Branches</option>

                      <?php 
                      $sql = "SELECT * FROM `initiative`";
                      $run = mysqli_query($conn,$sql);

                      while ($row = mysqli_fetch_assoc($run)) 
                      {
                        ?>
                         <option value="<?php echo $row['branchs'] ?>"><?php echo $row['branchs'] ?></option>

                        <?php
                      }

                      ?>
                      
                     </select>
                   
                  </div>                          
                          <div class="col-sm-6">
                                      
                                    </div>
                                  <!--   <div class="col-sm-2">
                                       <a href="#" class="default-btn">Join Us</a>
                                    </div> -->
                                   
                                </div>
                            </form>
        
    </div>
    <div class="container">
        <div class="row">
            <div class="col-md-4">
                
            </div>
            <div class="col-md-4">
                
            </div>
            <div class="col-md-4">
                
            </div>
        </div>
    </div>
    
</section>






<?php include 'include/footer.php'; ?>

<script type="text/javascript">
    
    function newfilter()
    {
        var x = document.getElementById("filter").value;

        $.ajax({

            url: "serch.php",
            method: "POST",
            data:{

                id: x
            },

            success: function(data)
            {

                $("#new").html(data);

            }


        });
    }

</script>