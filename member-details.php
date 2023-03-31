<?php

 include 'include/connect.php';

    if (isset($_GET['id'])) {
        $id=$_GET['id'];

        $selquery="SELECT * FROM `add_members` WHERE `id` = '$id' ";
        $runquery=mysqli_query($conn,$selquery);
        $row=mysqli_num_rows($runquery);
        $arr=mysqli_fetch_array($runquery);
    }

    ?>

        <?php include 'include/head.php'; ?>
            <body>
         <?php include 'include/header.php'; ?>

        <div class="header-height"></div>
        
        <div class="pager-header">
            <div class="container">
                <div class="page-content">
                    <h2>Member Details</h2>
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="index.php">Home</a></li>
                        <li class="breadcrumb-item active">Member Details</li>
                    </ol>
                </div>
            </div>
        </div><!-- /Page Header -->


          <section class="about-section bg-grey bd-bottom padding">
            <div class="container">
                <div class="row about-wrap">
                    <div class="col-md-6 xs-padding">
                        <div class="about-image">
                            <!-- <img src="Admin/members_pic/ <?php echo $arr['image'] ?>" alt="about image"> -->
                            <img src="Admin/members_pic/<?php echo $arr['image'] ?>" />
                        </div>
                    </div>
                    <div class="col-md-6 xs-padding">
                        <div class="about-content">
                            <h3 style="color: grey;">Member Details</h3>
                           <h2 style="font-weight: 800;"><?php echo $arr['First Name'].' '.$arr['Last Name'] ?></h2>
                                <b>
                                    Member id : PRAYAS/<?php echo $arr['Year Of Joining'] ?>/<?php echo $arr['id'] ?>
                                </b>    
                                <br>
                                <b>
                                    DOB : <?php echo $arr['DOB'] ?>
                                </b>
                                 <br>
                                <b>
                                    Email : <?php echo $arr['Email'] ?>
                                </b>
                                 <br>
                                <b>
                                    Phone : <?php echo $arr['phone'] ?>
                                </b>
                                 <br>
                                <b>
                                    Address : <?php echo $arr['Address'] ?>
                                </b>
                                 <br>
                                <b>
                                    City : <?php echo $arr['City'] ?>
                                </b>
                                 <br>
                                <b>
                                    State : <?php echo $arr['State'] ?>
                                </b>
                                 <br>
                                <b>
                                    Year of Joining : <?php echo $arr['Year Of Joining'] ?>
                                </b>
                                 <br>
                                <b>
                                    Post Designation Year : <?php echo $arr['Post/ Desgination'] ?>
                                </b>
                                 <br>
                                <b>
                                    Zone : <?php echo $arr['CentreBranch'] ?>
                                </b>
                                <br><br>
                                 <b>About</b>
                                <p><?php echo $arr['about']; ?></p>
                              <div class="share-wrap">
                                <h4>Connect at</h4>
                                <ul class="share-icon">
                                    <li><a href="<?php echo $data['facebook'] ?>"><i class="ti-facebook"></i> Facebook</a></li>
                                    <!-- <li><a href="#"><i class="ti-twitter"></i> Twitter</a></li> -->
                                    <li><a href="<?php echo $data['instagram'] ?>"><i class="ti-instagram"></i> Instagram</a></li>
                                    <li><a href="<?php echo $data['LinkedIn'] ?>"><i class="ti-linkedin"></i> Linkedin</a></li>
                                </ul>
                            </div><!-- Share Wrap -->
                    
                        </div>
                    </div>
                </div>
            </div>
        </section>
       <?php include 'include/footer.php'; ?>

