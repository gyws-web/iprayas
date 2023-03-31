<?php 
include 'include/connect.php';

$k = $_POST['id'];
$k = trim($k);
$sql = "SELECT * FROM `initiative` WHERE branchs = '$k'";
$rsult = mysqli_query($conn,$sql);

while ($row = mysqli_fetch_assoc($rsult)) 
{
  ?>
                              <div class="col-md-2.5 xs-padding">
                                <a href="#.php?id=<?php echo $row['id'] ?>">
                                <div class="team-details">
                                   <img src="/work/gopali/Admin/Initiative_image/<?php echo $row['image'] ?>" alt="team" style="height: 250px; cursor: pointer;">
                                    <div class="hover">
                                       
                                    </div>
                                </div>
                            </a>
                                 <p style="background: #fff; font-size: 20px; font-weight: 700; text-align: center; padding: 20px;"><?php echo $row['first_title'].' '.$row['secound_title'] ?></p>
                            </div><!-- /Team-1 -->


  <?php
}


?>