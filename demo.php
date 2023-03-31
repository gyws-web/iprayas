
<?php 
include 'include/head.php';
include 'include/connect.php';
 ?>
    <body>
 <?php include 'include/header.php'; ?>
        
        <div class="header-height"></div>
        
        <div class="pager-header">
            <div class="container">
                <div class="page-content">
                    <h2>Branches Details</h2>
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="index.php">Home</a></li>
                        <li class="breadcrumb-item active">Branches Members</li>
                    </ol>
                </div>
            </div>
        </div><!-- /Page Header -->
        
       
       <section>
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <h2 class="mt-5 text-center mb-5">Branches Members</h2>
                        </div>
                    </div>
                </div>
            </section>


        <section class="about-section bd-bottom shape circle padding">
            <div class="container">
                <div class="row">
                    <div class="col-md-12 xs-padding"></div>
                   <div class="col-md-3 xs-padding">

                    <?php 
                    //$conn=mysqli_connect("localhost","root","","gysm");

                    if (isset($_GET['branche']))
                     {
                        $branche = $_GET['branche'];

                        //var_dump($branche);exit();

                    $sql = "SELECT * FROM `add_members` WHERE `CentreBranch` = '$branche'";
                        $rsult = mysqli_query($conn,$sql);

                        while ($row = mysqli_fetch_assoc($rsult)) 
                        {
                            ?>

                            <div class="profile-wrap">
                            <img class="profile" src="../gopali/Admin/members_pic/<?php echo $row['image'] ?>" alt="profile">
                            <h3>Name<h4><?php echo $row['First Name'] ?></h4></h3>
                            <h3>Member ID<h4><?php echo $row['Member ID'] ?></h4></h3>
                            <h3>Phone<h4><?php echo $row['phone'] ?></h4></h3>
                            <h3>Email<h4><?php echo $row['Email'] ?></h4></h3>
                            <h3>City<h4><?php echo $row['City'] ?></h4></h3>
                            <h3>City<h4><?php echo $row['CentreBranch'] ?></h4></h3>

                            
                            
                        </div>


                            <?php
                        }



                    }




                    ?>
                       
                    </div>

                  

                   
                    <div class="col-md-3 xs-padding"></div>
                   
                </div>
            </div>
        </section><!-- /Causes Section -->

         <section>
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <h2 class="mt-5 text-center mb-5">Branches  initiative</h2>
                        </div>
                    </div>
                </div>
            </section>


        <section class="about-section bd-bottom shape circle padding">
            <div class="container">
                <div class="row">
                    <div class="col-md-12 xs-padding"></div>
                   <div class="col-md-3 xs-padding">

                    <?php 
                    //$conn=mysqli_connect("localhost","root","","gysm");

                    if (isset($_GET['branche']))
                     {
                        $branche = $_GET['branche'];

                        //var_dump($branche);exit();

                    $sql = "SELECT * FROM `initiative` WHERE `branchs` = '$branche'";
                        $rsult = mysqli_query($conn,$sql);

                        while ($row = mysqli_fetch_assoc($rsult)) 
                        {
                            ?>

                            <div class="profile-wrap">
                            <img class="profile" src="/work/gopali/Admin/Initiative_image/<?php echo $row['image'] ?>" alt="profile">
                            <h3>first_title<h4><?php echo $row['first_title'] ?></h4></h3>
                            <h3>secound_title<h4><?php echo $row['secound_title'] ?></h4></h3>
                            <h3>branchs<h4><?php echo $row['branchs'] ?></h4></h3>


                            
                            
                        </div>


                            <?php
                        }



                    }




                    ?>
                       
                    </div>

                  

                   
                    <div class="col-md-3 xs-padding"></div>
                   
                </div>
            </div>
        </section><!-- /Causes Section -->



        
<?php include 'include/footer.php'; ?>