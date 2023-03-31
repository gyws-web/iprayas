
<?php include 'include/head.php'; ?>
<?php

  include 'include/connect.php';

    if (isset($_GET['id'])) {
        $id=$_GET['id'];

        $selquery="select * from user where id=$id";
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
            <h1>Update User Details </h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">Update User Details</li>
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
                <h3 class="card-title">Update User Details</h3>
              </div>
              <!-- /.card-header -->
              <!-- form start -->
              <form method="POST" action="" enctype="multipart/form-data">
                <div class="card-body">
                  <div class="form-group">
                    <label for="exampleInputEmail1">Name </label>
                    <input type="text" class="form-control" name="name" id="exampleInputEmail1" value="<?php echo $arr['name'] ?>">
                  </div>
                  <div class="form-group">
                    <label for="exampleInputPassword1">Username</label>
                    <input type="text" class="form-control" name="username" id="exampleInputPassword1" value="<?php echo $arr['username'] ?>">
                  </div>
                  <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" class="form-control" name="password" id="exampleInputPassword1" value="<?php echo $arr['password'] ?>">
                  </div>
                  
                
                </div>
                <!-- /.card-body -->

                <div class="card-footer">
                  <button type="submit" name="upload" class="btn btn-primary">Update</button>
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
    $name=$_POST['name'];
    $username=$_POST['username'];
    $password=$_POST['password'];

  
        // Get all the submitted data from the form
        $sql = "update user set name='$name', username='$username', password='$password'";
  
        // Execute query
        $run=mysqli_query($conn, $sql);
          
        // Now let's move the uploaded image into the folder: image
        if ($run)  {
            echo "<script>alert('Updated Sucessfully')</script>";
            echo "<script>window:location='user-details.php'</script>";
        }else{
             echo "<script>alert('Please try again latter')</script>";
             echo "<script>window:location='updateuser.php'</script>";
      }
  }
?>