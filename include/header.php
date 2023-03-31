 <?php

include 'login-member/config.php';
session_start();

//  $user_id = $_SESSION['id'];

error_reporting(0)
?>
        <header id="header" class="header-section">
            <!-- <div class="top-header">
                <div class="container">
                    <div class="top-content-wrap row">
                        <div class="col-sm-12">
                             
                            <ul class="left-info">

                                <?php
                                

                                 $select = mysqli_query($conn, "SELECT * FROM `add_members` WHERE id = '$user_id'") or die('query failed');
                                 if(mysqli_num_rows($select) > 0){
                                    $fetch = mysqli_fetch_assoc($select);
                                 }
                                 if($fetch['image'] == '' ){
                                  
                                 }else{
                                    echo '<li><a href="login-member/update_profile.php"><img src="login-member/uploaded_img/'.$fetch['image'].'" style="height: 25px; border-radius: 40px;"></a>';

                                    
                                 }
                              ?>

                                
                               <a href="login-member/update_profile.php"><?php echo $_SESSION['First_Name']; ?></a>
                              

                            </a></li>
                               
                                <li><a href="#"><i class="ti-mobile"></i>+91 8957557713</a></li>
                                 <?php
                                    if (!isset($_SESSION['id'])) {
                                        echo " <li style='float: right;'><a href='login-member/register.php'>Login / Registration</a></li>";
                                    }else{
                                        echo "<li style='float: right; font-weight: bold;'><a href='login-member/logout.php?logout=$user_id'><button>Logout</a></li></button>";
                                    }
                                 ?>
                              

                            </ul>
                        </div>
                        
                    </div>
                </div>
            </div> -->
            <div class="bottom-header">
                <div class="container">
                    <div class="bottom-content-wrap row">
                        <div class="col-sm-4">
                            <div class="site-branding">
                                <a href="#"><img src="img/logo.png" alt="Brand" style="height: 75px;"></a>
                            </div>
                        </div>
                       <div class="col-sm-8 text-right">
                           <ul id="mainmenu" class="nav navbar-nav nav-menu">
                                <li class="active"> <a href="index.php">Home</a>
                                  
                                </li>
                                <li><a href="about.php">About Us</a></li>
                              
                                <!-- <li><a href="branches.php">Centers</a></li> -->
                                <li><a href="initiatives.php">Initiatives</a> 
                                   <!--  <ul>
                                       <li><a href="jagrithi-vidya-madir.php">Jagriti Vidya Mandir </a></li>
                                       <li><a href="Light.php">Light</a></li>
                                       <li><a href="#">Light</a></li>
                                       <li><a href="covid.php">COVID-19</a></li>
                                    </ul> -->
                                </li>
                                  
                                    
                                    <li><a href="network.php">Join Us</a></li>
                                    <li><a href="members.php">Members</a></li>
                                         
                                </li>
                                <li> <a href="contact.php">Contact Us</a></li>
                            </ul>
                            <a href="donate.php" class="default-btn">Donate Now</a>
                            <!-- <a href="https://www.gyws.org/Light_Donate" target="blank" class="default-btn">Donate Now</a> -->
                       </div>
                    </div>
                </div>
            </div>
        </header><!-- /Header Section -->