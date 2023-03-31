<?php
include 'include/connect.php';

if (isset($_GET['id']))
 {
	$id = $_GET['id'];

	$sql = "SELECT * FROM `user` WHERE id = '$id'";
	$run = mysqli_query($conn,$sql);

	while ($row = mysqli_fetch_assoc($run)) 
	{
	  $name = $row['name'];
	  $user = $row['username'];
	  $password = $row['password'];
	}

}

?>

<?php

if (isset($_POST['updatesup']))
 {
	$name = $_POST['name'];
	$user = $_POST['user'];
	$password = $_POST['paass'];

	$sql = "UPDATE `user` SET `name`='$name',`username`='$user',`password`='$password' WHERE id ='$id'";
	$sql = mysqli_query($conn,$sql);
	if ($sql) 
	{
		header('location:sbranch.php');
	}

}



 ?>

  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>

  <div class="container-fluid">
  	<div class="row">
  		<div class="col-sm-6">

  			<form method="POST">
  				<label>Name</label>
  				<input type="text" name="name" class="form-control" value="<?php echo $name ?>">

  				<label>User Id</label>
  				<input type="text" name="user" class="form-control" value="<?php echo $user ?>">

  				<label>Password</label>
  				<input type="text" name="paass" class="form-control" value="<?php echo $password ?>"><br>

  				<input type="submit" name="updatesup" class="btn btn-primary">

  				
  			</form>
  			
  		</div>
  		
  	</div>
  	
  </div>	
         
  