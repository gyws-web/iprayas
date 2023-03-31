<?php 
include 'include/connect.php';

if (isset($_POST['branche'])) 
{
   $collage = mysqli_real_escape_string($conn, $_POST['collage']);
   $center = mysqli_real_escape_string($conn, $_POST['center']);
   $centerid = mysqli_real_escape_string($conn, $_POST['centerid']);
   $city = mysqli_real_escape_string($conn, $_POST['city']);
   $state = mysqli_real_escape_string($conn, $_POST['state']);
   $year_of_joining = mysqli_real_escape_string($conn, $_POST['year_of_joining']);
   $branche = mysqli_real_escape_string($conn, $_POST['branche']);
   $head = mysqli_real_escape_string($conn, $_POST['head']);
   $coodinoter = mysqli_real_escape_string($conn, $_POST['coodinoter']);
   //var_dump($_POST);

   $sql = "INSERT INTO `add_branches`(`Collage Name`, `Center Name`, `Center ID`, `City`, `State`, `Year Of Joining`, `Branches`, `Center Head`, `Center Coordinator`) VALUES ('$collage','$center','$centerid','$city','$state','$year_of_joining','$branche','$head','$coodinoter')";

   $run = mysqli_query($conn,$sql);

   if ($run) 
   {
       echo "your data in insert";
   }else{

    echo "not store mismatch";
   }


}


?>