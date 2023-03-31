<?php
include 'include/connect.php';

if (isset($_GET['id'])) {
	$id=$_GET['id'];

	$deletequery="delete from client_logo where id=$id";
	$run=mysqli_query($conn,$deletequery);
	if ($run) {
		echo "<script>alert('Deleted successfully')</script>";
		echo "<script>window:location='view-our-client-logo.php'</script>";
	}else{
		echo "<script>alert('Not Deleted')</script>";
		echo "<script>window:location='view-our-client-logo.php'</script>";
	}

}
?>