<?php 
include 'include/connect.php';

$k = $_POST['id'];
$k = trim($k);

$sql = "SELECT * FROM `initiative` WHERE branchs = '$k'";
// $sql = "SELECT DISTINCT * FROM `initiative` WHERE branchs = '$k'";
$rsult = mysqli_query($conn,$sql);

while ($data = mysqli_fetch_assoc($rsult)) 
{
  ?>
                            <div class="col-md-6 xs-padding" style="padding: 20px;">
                                <div class="events-item" >
                                    <div>
                                        <div class="event-thumb">
                                            <img src="./Admin/Initiative_image/<?php echo $data['image'] ?>" alt="events" style="height: auto;">
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