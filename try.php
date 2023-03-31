<?php include 'include/head.php'; ?>
    <body>
 <?php
  include 'include/header.php'; 
  include 'include/connect.php';

 ?>
 <style>
     .team-sec-bg {
    background-color: #b9c2b2;
    
}
h2.team-heading {
    font-size: 26px;
    text-align: center;
}
.team-box {
    height: 400px;
    background-color: #fff;
    border-radius: 30px;
    margin: auto;
    width: 368px;
    box-shadow: rgba(0, 0, 0, 0.45) 0px 25px 20px -20px;
}
.img-sec {
    border-radius: 100px;
    overflow: hidden;
    height: 150px;
    width: 150px;
    position: relative;
    margin: auto;
    top: -60px;
    border: 8px solid #00000030;
}
h2.name-heading {
    font-size: 32px;
    font-weight: 600;
    color: #333;
    text-align: center;
}
h4.name-p {
    font-size: 13px;
    color: #18d26e;
    letter-spacing: 1px;
    text-align: center;
    padding-top: 10px;
}
.icons {
    text-align: center;
}
.icons li {
    display: inline-block;
    border: 1px solid #18d26e;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    padding-top: 11px;
    color: #18d26e;

}
ul.icon-list {
    margin-top: 22px;
}
 </style>
        
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


 <section class="team-sec-bg">
    <div class="container pt-5 pb-5">
        <h2 class="mt-5 text-center mb-5">Branches Members</h2>
        <div class="row pt-5">
            <div class="col-md-4">
                <div class="team-box">
                    <?php 

                    if (isset($_GET['branche'])) 
                    {
                       $branche = $_GET['branche'];
                 $sql = "SELECT * FROM `add_members` WHERE `CentreBranch` = '$branche'";
                 $rsult = mysqli_query($conn,$sql);

                 while ($row = mysqli_fetch_assoc($rsult)) 
                 {
                     ?>

                     <div class="img-sec">
                         <img src="../gopali/Admin/members_pic/<?php echo $row['image'] ?>" alt="team" style="height: 250px; cursor: pointer;">
                    </div>

                <h2 class="name-heading">Name:<?php echo $row['First Name'] ?></h2>
                 <h2 class="name-heading">Member ID:<?php echo $row['Member ID'] ?></h2>
                 <h2 class="name-heading">Phone:<?php echo $row['phone'] ?></h2>
                      <h2 class="name-heading">Email:<?php echo $row['Email'] ?></h2>
                       <h2 class="name-heading">CentreBranch:<?php echo $row['CentreBranch'] ?></h2>
                     <h2 class="name-heading">City:<?php echo $row['City'] ?></h2>


                   


                     <?php
                 }

                    }

                    ?>

                    
                </div>
            </div>
          
           

    <div class="container pt-5 pb-5">
         <h2 class="mt-5 text-center mb-5">Branches  Initiative</h2>
        <div class="row pt-5">
            <div class="col-md-4">
                
                <?php

                if (isset($_GET['branche'])) 
                {
                   $branche = $_GET['branche'];
                    $sql = "SELECT * FROM `initiative` WHERE `branchs` = '$branche'";
                    $rsult = mysqli_query($conn,$sql);

                    while ($row = mysqli_fetch_assoc($rsult)) 
                    {
                       ?>

                       <div class="team-box">
                    <div class="img-sec">
                       <img src="../gopali/Admin/Initiative_image/<?php echo $row['image'] ?>" alt="team" style="height: 250px; cursor: pointer;">
                    </div>
                 <h2 class="name-heading">Title:<?php echo $row['first_title'] ?></h2>
                 <h2 class="name-heading">Socund Title:<?php echo $row['secound_title'] ?></h2>
                 <h2 class="name-heading">Branchs:<?php echo $row['branchs'] ?></h2>
                   
                    
                </div>


                       <?php
                    }
                }



                 ?>
                
            </div>
            
           
     
 </section>       

<?php include 'include/footer.php'; ?>

