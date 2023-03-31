<?php 
include 'include/connect.php';
$id = $_GET['id'];
$status = $_GET['status'];

$sql = "UPDATE `add_members` SET status='$status' WHERE id = '$id'";
$run = mysqli_query($conn,$sql);

if ($run) 
{
  
$status = 5;

header('location:manage_members.php?status='.$status);

}else{

	echo "not intrstted";
}




?>

