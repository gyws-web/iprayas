<?php
include 'include/connect.php';


$kx = $_POST['idx'];
$ky = $_POST['idy'];

$kx = trim($kx);
$ky = trim($ky);

$sql = "SELECT * FROM `add_members` WHERE (CentreBranch = '$kx' AND `Year Of Joining` = '$ky')";
$rsult = mysqli_query($conn, $sql);

while ($data = mysqli_fetch_assoc($rsult)) {
?>

<div class="col-md-3 xs-padding">
                                <div class="speaker-layout3">
                                    <img src="./Admin/members_pic/<?php echo $data['image'] ?>" alt="speaker" class="img-fluid">
                                    <div class="item-title">
                                        <h3 class="title title-bold color-Light hover-yellow">
                                        <a href="member-details.php?id=<?php echo $data['id'] ?>"><?php echo $data['First Name'] ?>
                                            </a>
                                        </h3>
                                        <div class="title-Light size-md text-left color-Light"><?php echo $data['Post/ Desgination'] ?></div>
                                    </div>
                                    <div class="item-social">
                                        <ul>
                                            <li>
                                                <a href="#" title="facebook">
                                                    <i class="fa fa-facebook" aria-hidden="true"></i>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" title="twitter">
                                                    <i class="fa fa-twitter" aria-hidden="true"></i>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" title="linkedin">
                                                    <i class="fa fa-linkedin" aria-hidden="true"></i>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" title="pinterest">
                                                    <i class="fa fa-pinterest" aria-hidden="true"></i>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div><!-- /Team-1 -->


<?php
}


?>