<?php 
include 'include/connect.php';
if (isset($_GET['id'])) 
{
	$id = $_GET['id'];
	$sql = "DELETE FROM `each_students` WHERE id ='$id'";
	$runs = mysqli_query($conn,$sql);

	if ($runs) 
	{
		$status = 2;

		header('location:manage_each_students.php?status='.$status);
		
	}else{

		echo 'not delite';
	}

}


?>