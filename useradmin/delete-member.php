<?php
include 'include/connect.php';

if (isset($_GET['id'])) {
	$id=$_GET['id'];

	$deletequery="delete from members where id=$id";
	$run=mysqli_query($conn,$deletequery);
	if ($run) {
		echo "<script>alert('Deleted successfully')</script>";
		echo "<script>window:location='view-members.php'</script>";
	}else{
		echo "<script>alert('Not Deleted')</script>";
		echo "<script>window:location='view-our-recently-project.php'</script>";
	}

}
?>