<?php
include 'include/connect.php';

if (isset($_GET['id'])) {
	$id=$_GET['id'];

	$deletequery="delete from admin_user where id=$id";
	$run=mysqli_query($conn,$deletequery);
	if ($run) {
		echo "<script>alert('Deleted successfully')</script>";
		echo "<script>window:location='view-credentials.php'</script>";
	}else{
		echo "<script>alert('Not Deleted')</script>";
		echo "<script>window:location='view-credentials.php'</script>";
	}

}
?>