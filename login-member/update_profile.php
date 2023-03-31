<?php
include 'config.php';
session_start();
$user_id = $_SESSION['id'];

if(isset($_POST['update_profile'])){

   $first_name = mysqli_real_escape_string($conn, $_POST['first_name']);
    $last_name = mysqli_real_escape_string($conn, $_POST['last_name']);
     $member_id = mysqli_real_escape_string($conn, $_POST['member_id']);
      $dob = mysqli_real_escape_string($conn, $_POST['dob']);
       $email = mysqli_real_escape_string($conn, $_POST['email']);
        $phone = mysqli_real_escape_string($conn, $_POST['phone']);
         $address = mysqli_real_escape_string($conn, $_POST['address']);
          $city = mysqli_real_escape_string($conn, $_POST['city']);
           $state = mysqli_real_escape_string($conn, $_POST['state']);
            $year_of_joining = mysqli_real_escape_string($conn, $_POST['year_of_joining']);
             $post_designation_year = mysqli_real_escape_string($conn, $_POST['post_designation_year']);
              $centre_branch = mysqli_real_escape_string($conn, $_POST['centre_branch']);
               $about = mysqli_real_escape_string($conn, $_POST['about']);


   mysqli_query($conn, "UPDATE `add_members` SET first_name = '$first_name', last_name = '$last_name', member_id='$member_id', dob='$dob', email='$email', phone='$phone', address='$address', city='$city', state='$state', year_of_joining='$year_of_joining', post_designation_year='$post_designation_year', centre_branch='$centre_branch', about='$about' WHERE id = '$user_id'") or die('query failed');

   $old_pass = $_POST['old_pass'];
   $update_pass = mysqli_real_escape_string($conn, md5($_POST['update_pass']));
   $new_pass = mysqli_real_escape_string($conn, md5($_POST['new_pass']));
   $confirm_pass = mysqli_real_escape_string($conn, md5($_POST['confirm_pass']));

   if(!empty($update_pass) || !empty($new_pass) || !empty($confirm_pass)){
      if($update_pass != $old_pass){
         $message[] = 'old password not matched!';
      }elseif($new_pass != $confirm_pass){
         $message[] = 'confirm password not matched!';
      }else{
         mysqli_query($conn, "UPDATE `add_members` SET password = '$confirm_pass' WHERE id = '$user_id'") or die('query failed');
         $message[] = 'password updated successfully!';
      }
   }

   $update_image = $_FILES['update_image']['name'];
   $update_image_size = $_FILES['update_image']['size'];
   $update_image_tmp_name = $_FILES['update_image']['tmp_name'];
   $update_image_folder = 'uploaded_img/'.$update_image;

   if(!empty($update_image)){
      if($update_image_size > 2000000){
         $message[] = 'image is too large';
      }else{
         $image_update_query = mysqli_query($conn, "UPDATE `add_members` SET image = '$update_image' WHERE id = '$user_id'") or die('query failed');
         if($image_update_query){
            move_uploaded_file($update_image_tmp_name, $update_image_folder);
         }
         $message[] = 'image updated succssfully!';
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
   <title>update profile</title>

   <!-- custom css file link  -->
   <link rel="stylesheet" href="css/style.css">

</head>
<body>
   
<div class="update-profile">

   <?php
      $select = mysqli_query($conn, "SELECT * FROM `add_members` WHERE id = '$user_id'") or die('query failed');
      if(mysqli_num_rows($select) > 0){
         $fetch = mysqli_fetch_assoc($select);
      }
   ?>

   <form action="" method="post" enctype="multipart/form-data">
      <?php
         if($fetch['image'] == ''){
            echo '<img src="images/default-avatar.png">';
         }else{
            echo '<img src="uploaded_img/'.$fetch['image'].'">';
         }
         if(isset($message)){
            foreach($message as $message){
               echo '<div class="message">'.$message.'</div>';
            }
         }
      ?>
      <div class="flex">
         <div class="inputBox">
            <span>First Name :</span>
            <input type="text" name="first_name" value="<?php echo $fetch['First Name']; ?>" class="box">
            <span>Last Name :</span>
            <input type="text" name="last_name" value="<?php echo $fetch['Last Name']; ?>" class="box">
            <span>Member ID :</span>
            <input type="text" name="member_id" value="<?php echo $fetch['Member ID']; ?>" class="box">
            <span>DOB :</span>
            <input type="date" name="dob" value="<?php echo $fetch['DOB']; ?>" class="box">
            <span>Email :</span>
            <input type="email" name="email" value="<?php echo $fetch['phone']; ?>" class="box">
             <span>Phone :</span>
            <input type="text" name="phone" value="<?php echo $fetch['Email']; ?>" class="box">
             <span>Address :</span>
            <input type="text" name="address" value="<?php echo $fetch['Address']; ?>" class="box">
             <span>City :</span>
            <input type="text" name="city" value="<?php echo $fetch['City']; ?>" class="box">
           
          
         </div>
         <div class="inputBox">
             <span>State :</span>
            <input type="text" name="state" value="<?php echo $fetch['State']; ?>" class="box">
             <span>Year of Joining :</span>
            <input type="text" name="year_of_joining" value="<?php echo $fetch['Year Of Joining']; ?>" class="box">
             <span>Post Designation Year :</span>
            <input type="text" name="post_designation_year" value="<?php echo $fetch['Post/ Desgination']; ?>" class="box">
             <span>Centre Branch :</span>
            <select name="centre_branch" class="browser-default custom-select"  id="centre_branch">
                <option>select Centre/Branch</option>
                <?php
                $sql = "SELECT * FROM `add_branches`";
                $run = mysqli_query($conn,$sql);

                while ($row = mysqli_fetch_assoc($run))
                 {
                  ?>

                  <option><?php echo $row['Collage Name'] ?></option>


                  <?php
                }




                 ?>
               
            </select>
            
            <input type="hidden" name="old_pass" value="<?php echo $fetch['password']; ?>">
            <span>old password :</span>
            <input type="password" name="update_pass" placeholder="enter previous password" class="box">
            <span>new password :</span>
            <input type="password" name="new_pass" placeholder="enter new password" class="box">
            <span>confirm password :</span>
            <input type="password" name="confirm_pass" placeholder="cpassword" class="box">
              <span>update your pic :</span>
            <input type="file" name="update_image" accept="image/jpg, image/jpeg, image/png" class="box">
         </div>
      </div>
      <input type="submit" value="update profile" name="update_profile" class="btn">
      <a href="../index.php" class="delete-btn">go back</a>
   </form>

</div>

</body>
</html>