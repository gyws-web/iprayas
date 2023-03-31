<?php 
include 'include/connect.php';

$k = $_POST['id'];
$k = trim($k);

$sql = "SELECT * FROM `add_branches` WHERE `Year Of Joining` = '$k'";
$rsult = mysqli_query($conn,$sql);

while ($data = mysqli_fetch_assoc($rsult)) 
{
  ?>

  <div class="col-lg-12 xs-padding">
                        <div class="blog-items grid-list row">
                            
                            
                            <div class="col-md-2 padding-15 text-center">
                                <div class="blog-post">
                                   <a href="branches-data.php?id=<?php echo $data['id'] ?>">
                                    <div class="blog-content">
                                        
                                        <h3><?php echo $data['Collage Name'] ?></h3>
                                        <h4></i><?php echo $data['State'] ?></h4>
                                       
                                            
                                       
                                    </div>
                                </a>
                                </div>
                            </div><!-- Post 1 -->
                   
     


  <?php
}


?>