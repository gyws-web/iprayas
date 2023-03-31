<?php 
include 'include/connect.php';
if (isset($_GET['id'])) 
{
	$id = $_GET['id'];
	$run = "DELETE FROM `add_branches` WHERE id = '$id'";
	// echo $sql;exit();
	$result = mysqli_query($conn,$run);
	if ($result) 
	{
	$status = 5;
     header('location:manage_branches.php?status='.$status);
	}


}


?>