
<?php include 'include/head.php'; ?>
<?php

  include 'include/connect.php';

    if (isset($_GET['id'])) {
        $id=$_GET['id'];

        $selquery="select * from branches where id=$id";
        $runquery=mysqli_query($conn,$selquery);
        $row=mysqli_num_rows($runquery);
        $arr=mysqli_fetch_array($runquery);
    }

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
            <h1>Update Branches </h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">Update Branches</li>
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
                <h3 class="card-title">Update Branches</h3>
              </div>
              <!-- /.card-header -->
              <!-- form start -->
                  <form method="POST" action="">
                <div class="card-body">
               <div class="form-group">
                    <label for="exampleInputEmail1">Region </label>
                    <input type="text" class="form-control" name="region" id="exampleInputEmail1" value="<?php echo $arr['region'] ?>">
                  </div>
                  <div class="form-group">
                    <label for="exampleInputEmail1">City </label>
                    <input type="text" class="form-control" name="city" id="exampleInputEmail1" placeholder="City" value="<?php echo $arr['city'] ?>">
                  </div>
                   <div class="form-group">
                    <label for="exampleInputEmail1">Branch ID </label>
                    <input type="text" class="form-control" name="branch_id" id="exampleInputEmail1" placeholder="Branch ID" value="<?php echo $arr['branch_id'] ?>">
                  </div>
                  <div class="form-group">
                    <label for="exampleInputEmail1">Listing Date </label>
                    <input type="date" class="form-control" name="listing_date" id="exampleInputEmail1" placeholder="date" value="<?php echo $arr['listing_date'] ?>">
                  </div>

                   <div class="form-group">
                    <label for="exampleInputEmail1">Description </label>
                    <textarea class="form-control" name="content"><?php echo $arr['content'] ?></textarea>
                  </div>
                  
                 
                
                </div>
                <!-- /.card-body -->

                <div class="card-footer">
                  <button type="submit" name="upload" class="btn btn-primary">Update Branches</button>
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
    $region=$_POST['region'];
    $city=$_POST['city'];
    $branch_id=$_POST['branch_id'];
    $listing_date=$_POST['listing_date'];
     $content=$_POST['content'];


  
        // Get all the submitted data from the form
        $sql = "update branches set region='$region', city='$city', branch_id='$branch_id', listing_date='$listing_date', content='$content' where id=$id";
  
        // Execute query
        $result=mysqli_query($conn, $sql);
          
        // Now let's move the uploaded image into the folder: image
        if ($result)  {
            echo "<script>alert('Updated Sucessfully')</script>";
            echo "<script>window:location='view-our-branches.php'</script>";
        }else{
             echo "<script>alert('Please try again latter')</script>";
             echo "<script>window:location='view-our-branches.php'</script>";
      }
  }
?>