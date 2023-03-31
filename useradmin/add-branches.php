<?php 
include 'include/head.php';
include 'include/connect.php';

 ?>

<body class="hold-transition sidebar-mini">
<!-- Site wrapper -->
<div class="wrapper">
  <!-- Navbar -->
<?php include 'include/side_bar.php'; ?>
  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>Branches </h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">Branches</li>
            </ol>
          </div>
        </div>
      </div><!-- /.container-fluid -->
    </section>

  
       <!-- Main content -->
    <section class="content">
      <div class="container">
        <div class="row">
          <div class="col-md-3"></div>
          <!-- left column -->
          <div class="col-md-6">
            <!-- general form elements -->
            <div class="card card-primary">
              <div class="card-header">
                <h3 class="card-title">Add Branches</h3>
              </div>
              <!-- /.card-header -->
              <!-- form start -->
              <form method="POST" action="branches.php">
                <div class="card-body">
               <div class="form-group">
                    <label for="exampleInputEmail1">Collage Name</label>
                    <input type="text" class="form-control" name="collage" id="collage" placeholder="Region ">
                  </div>
                  <div class="form-group">
                    <label for="exampleInputEmail1">Center Name </label>
                    <input type="text" class="form-control" name="center" id="center" placeholder="City ">
                  </div>
                   <div class="form-group">
                    <label for="exampleInputEmail1">Center ID </label>
                    <input type="text" class="form-control" name="centerid" id="centerid" placeholder="Branch ID  ">
                  </div>
                  <div class="form-group">
                    <label for="exampleInputEmail1">City</label>
                    <input type="text" class="form-control" name="city" id="city" placeholder="City">
                  </div>

                   <div class="form-group">
                    <label for="exampleInputEmail1">State</label>
                    <input type="text" class="form-control" name="state" id="state" placeholder="date ">
                  </div>
                  
                   <div class="form-group">
                    <label for="exampleInputPassword1">Year Of Joining</label>
                     <select id="ddlYears"  class="form-control" name="year_of_joining"></select>
                   
                  </div>

                  <div class="form-group">
                    <label for="exampleInputPassword1">No of Members</label>
                    <select class="form-select" class="form-control">
                     <option>1</option>
                     <option>2</option>
                      <option>3</option>
                     <option>4</option>
                       </select>
                   
                  </div>
                  
                   <div class="form-group">
                    <label for="exampleInputPassword1">Branches </label>
                     <select class="browser-default custom-select" name="branche">
                     <option selected>Select Branches </option>

                     <?php 
                      $sql = "SELECT * FROM `add_members`";
                      $run = mysqli_query($conn,$sql);

                      while ($row = mysqli_fetch_assoc($run)) 
                      {
                        ?>
                        <option><?php echo $row['Centre/Branch'] ?></option>


                        <?php
                      }


                      ?>

                      
                   </select>
                   
                  </div>
                  
                    <div class="form-group">
                    <label for="exampleInputPassword1">Center Head</label>
                     <select class="browser-default custom-select" name="head">
                     <option selected>Add center story </option>
                      <?php 
                      $sql = "SELECT * FROM `add_members`";
                      $run = mysqli_query($conn,$sql);

                      while ($row = mysqli_fetch_assoc($run)) 
                      {
                        ?>
                        <option><?php echo $row['City'] ?></option>


                        <?php
                      }


                      ?>
                   </select>
                   
                  </div>
                  
                   <div class="form-group">
                    <label for="exampleInputPassword1">Center Coordinator</label>
                      <input type="text" class="form-control" name="coodinoter" id="coodinoter" placeholder="Center Coordinator">
                   
                  </div>
                  
                 
                
                </div>
                <!-- /.card-body -->

                <div class="card-footer">
                  <button type="submit" name="branche" class="btn btn-primary">Add Branches</button>
                </div>
              </form>
            </div>
            <!-- /.card -->


          </div>
          <!--/.col (left) -->
        <div class="col-md-3"></div>

           
         
          </div>
          <!--/.col (right) -->
        </div>
        <!-- /.row -->
      </div><!-- /.container-fluid -->
    </section>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->
 <?php include 'include/footer.php' ?>
 <?php
include 'include/connect.php';
?>

<?php
error_reporting(0);
?>
<?php
  $msg = "";
  
  // If upload button is clicked ...
  if (isset($_POST['upload'])) {
    $region = $_POST['region'];
    $city = $_POST['city'];
    $branch_id = $_POST['branch_id'];
    $listing_date = $_POST['listing_date'];
    $content = $_POST['content'];

  
        // Get all the submitted data from the form
        $sql = "INSERT INTO branches (region,city,branch_id,listing_date,content) VALUES ('$region','$city','$branch_id','$listing_date','$content')";
  
        // Execute query
        $result=mysqli_query($conn, $sql);
          
        // Now let's move the uploaded image into the folder: image
        if ($result)  {
            echo "<script>alert('Sucessfully Added Branch')</script>";
        }else{
             echo "<script>alert('Please try again latter')</script>";
      }
  }
?>

<script type="text/javascript">
    window.onload = function () {
        //Reference the DropDownList.
        var ddlYears = document.getElementById("ddlYears");
 
        //Determine the Current Year.
        var currentYear = (new Date()).getFullYear();
 
        //Loop and add the Year values to DropDownList.
        for (var i = 1950; i <= currentYear; i++) {
            var option = document.createElement("OPTION");
            option.innerHTML = i;
            option.value = i;
            ddlYears.appendChild(option);
        }
    };
</script>