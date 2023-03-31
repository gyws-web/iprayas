<?php 
include 'include/connect.php';
if (isset($_POST['student'])) 
{
   $first_name = mysqli_real_escape_string($conn, $_POST['first_name']);
   $each_id= mysqli_real_escape_string($conn, $_POST['each_id']);
   $dob = mysqli_real_escape_string($conn, $_POST['dob']);
   $email = mysqli_real_escape_string($conn, $_POST['email']);
   $phone = mysqli_real_escape_string($conn, $_POST['contact']);
   $address = mysqli_real_escape_string($conn, $_POST['address']);
   $father= mysqli_real_escape_string($conn, $_POST['father']);
   $mother = mysqli_real_escape_string($conn, $_POST['mother']);
   $standard = mysqli_real_escape_string($conn, $_POST['standard']);
   $sponsored_by = mysqli_real_escape_string($conn, $_POST['sponsored_by']);
   $year_of_joining = mysqli_real_escape_string($conn, $_POST['year_of_joining']);
   $school = mysqli_real_escape_string($conn, $_POST['school']);
   $centre_branch = mysqli_real_escape_string($conn, $_POST['centre_branch']);
   $image = $_FILES['image']['name'];
   $image_tmp_name = $_FILES['image']['tmp_name'];
   $image_folder = '../Admin/each_pic/'.$image;
   $result = "INSERT INTO `each_students`(`first_name`, `each_id`, `dob`, `contact`, `Email`, `address`, `father`, `mother`,`standard`, `Year Of Joining`,`school`,`sponsored_by`, `CentreBranch`, `image`) 
    VALUES ('$first_name','$each_id','$dob','$phone','$email','$address','$father','$mother','$standard', '$year_of_joining', '$school','$sponsored_by','$centre_branch','$image')";
   // echo  $result;exit();
   $run = mysqli_query($conn,$result);
    if ($run) 
    {
      move_uploaded_file($image_tmp_name, $image_folder);
      chmod($image_folder, 0755);
      $status = 1;
     header('location:manage_each_students.php?status='.$status);
    }else{
      echo "not register / check duplicate entry";
    }
}
?>



