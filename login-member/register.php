<?php

include 'config.php';

if(isset($_POST['submit'])){

   $first_name = mysqli_real_escape_string($conn, $_POST['first_name']);
   $email = mysqli_real_escape_string($conn, $_POST['email']);
   $pass = mysqli_real_escape_string($conn, md5($_POST['password']));
   $cpass = mysqli_real_escape_string($conn, md5($_POST['cpassword']));
   $image = $_FILES['image']['name'];
   $image_size = $_FILES['image']['size'];
   $image_tmp_name = $_FILES['image']['tmp_name'];
   $image_folder = 'uploaded_img/'.$image;

   $select = mysqli_query($conn, "SELECT * FROM `add_members` WHERE email = '$email' AND password = '$pass'") or die('query failed');

   if(mysqli_num_rows($select) > 0){
      $message[] = 'user already exist'; 
   }else{
      if($pass != $cpass){
         $message[] = 'confirm password not matched!';
      }elseif($image_size > 2000000){
         $message[] = 'image size is too large!';
      }else{
         $insert = mysqli_query($conn, "INSERT INTO `add_members`(`First Name`, `Email`, `password`, `cpassword`, `image`) VALUES ('$first_name','$email','$pass','$cpass','$image')") or die('query failed');

         if($insert){
            move_uploaded_file($image_tmp_name, $image_folder);
            $message[] = 'registered successfully!';
            header('location:login.php');
         }else{
            $message[] = 'registeration failed!';
         }
      }
   }

}

?>
<!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="UTF-8">
   <meta http-equiv="X-UA-Compatible" content="IE=edge">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>register</title>

   <!-- custom css file link  -->
   <link rel="stylesheet" href="css/style.css">

</head>
<body>
   
<div class="form-container">

   <form action="" method="post" enctype="multipart/form-data">
      <h3>Register now</h3>
      <?php
      if(isset($message)){
         foreach($message as $message){
            echo '<div class="message">'.$message.'</div>';
         }
      }
      ?>
      <input type="text" name="first_name" placeholder="First Name" class="box" required>
     <!--  <input type="text" name="last_name" placeholder="Last Name" class="box" required> -->
      <!-- <input type="text" name="member_id" placeholder="Member id" class="box" required> -->
      <!-- <input type="date" name="dob" placeholder="DOB" class="box" required> -->
      <input type="email" name="email" placeholder="Email" class="box" required>
      <!-- <input type="text" name="phone" placeholder="Phone" class="box" required minlength="10"maxlength="10"> -->
      <!-- <input type="text" name="address" placeholder="Address" class="box" required> -->
      <!-- <input type="text" name="city" placeholder="City" class="box" required> -->
      <!-- <input type="text" name="state" placeholder="State" class="box" required> -->
      <!-- <input type="text" name="year_of_joining" placeholder="Year of Joining" class="box" required> -->
      <!-- <input type="text" name="post_designation_year" placeholder="Post Designation Year" class="box" required> -->
      <!-- <input type="text" name="centre_branch" placeholder="Centre/Branch" class="box" required>
      <input type="text" name="about" placeholder="About - (100 Words)" class="box" required> -->
      <input type="password" name="password" placeholder="Enter Password" class="box" required>
      <input type="password" name="cpassword" placeholder="Confirm Password" class="box" required>
      <input type="file" name="image" class="box" accept="image/jpg, image/jpeg, image/png, image/pdf">
      <input type="submit" name="submit" value="Register now" class="btn">
      <p>Already have an account? <br><a href="login.php">Login now</a></p>
   </form>

</div>

</body>
</html>