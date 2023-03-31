<?php 

include 'include/connect.php';

$id = $_GET['id'];
$status = $_GET['status'];
$sql = "UPDATE `initiative` SET status='$status' WHERE id = '$id'";
$run = mysqli_query($conn,$sql);
if ($run) 
{
	$status = 1;

	header('location:view-event.php?status='.$status);
}else{

	echo "not";
}





?>