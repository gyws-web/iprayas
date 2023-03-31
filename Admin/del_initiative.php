<?php 
include 'include/connect.php';
if (isset($_GET['id'])) 
{
	$id = $_GET['id'];
	$run = "DELETE FROM `initiative` WHERE id = '$id'";
	// echo $sql;exit();
	$result = mysqli_query($conn,$run);
	if ($result) 
	{
	$status = 5;
     header('location:view-event.php?status='.$status);
	}


}


?>