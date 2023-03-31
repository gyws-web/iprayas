<?php 
include 'include/connect.php';
if (isset($_POST['member'])) 
{
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
   $image = $_FILES['image']['name'];
   $image_tmp_name = $_FILES['image']['tmp_name'];
    $image_folder = 'members_pic/'.$image;


    $result = "INSERT INTO `add_members`(`First Name`, `Last Name`, `Member ID`, `DOB`, `phone`, `Email`, `Address`, `City`, `State`, `Year Of Joining`, `Post/ Desgination`, `CentreBranch`, `image`) 
    VALUES ('$first_name','$last_name','$member_id','$dob','$phone','$email','$address','$city','$state',
      '$year_of_joining','$post_designation_year','$centre_branch','$image')";
   // echo  $result;exit();
    $run = mysqli_query($conn,$result);
    if ($run) 
    {
      move_uploaded_file($image_tmp_name, $image_folder);
      $status = 1;
     header('location:manage_members.php?status='.$status);
    }else{

      echo "not register";
    }




}



?>