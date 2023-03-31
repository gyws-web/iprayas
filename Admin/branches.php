<?php 
error_reporting(0);
include 'include/connect.php';

if (isset($_POST['branches'])) 
{
	$collage = addslashes($_POST['collage']);
	$center = $_POST['center'];
	$centerid = $_POST['centerid'];
	$city = $_POST['city'];
	$state = $_POST['state'];
	$year_of_joining = $_POST['year_of_joining'];
	$No_of_Members = $_POST['No_of_Members'];
	$branche = $_POST['branche'];
	$head = addslashes($_POST['head']);
	$coodinoter = $_POST['coodinoter'];

	$sql = "INSERT INTO `add_branches`(`Collage Name`, `Center Name`, `Center ID`, `City`, `State`, `Year Of Joining`, `No_Members`, `catagury`, `Center Head`, `Center Coordinator`) VALUES ('$collage','$center','$centerid','$city','$state','$year_of_joining','$No_of_Members','$catagury','$head','$coodinoter')";

	$run = mysqli_query($conn,$sql);

	if ($run) 
	{
		$status = 1;
		header('location:add-branches.php?status='.$status);
	}else{

		$status = 2;
		
	}
}


?>