
<?php include 'include/head.php'; ?>
<?php

  include 'include/connect.php';

    if (isset($_GET['id'])) {
        $id=$_GET['id'];

        $selquery="select * from admin_user where id=$id";
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
            <h1>Update </h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">Update</li>
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
                <h3 class="card-title">Update </h3>
              </div>
              <!-- /.card-header -->
              <!-- form start -->
             <form method="POST" action="" enctype="multipart/form-data">
                <div class="card-body">
               <div class="form-group">
                    <label for="exampleInputEmail1">Username </label>
                    <input type="text" class="form-control" name="username" id="exampleInputEmail1" placeholder="username" value="<?php echo $arr['username'] ?>">
                  </div>
                  <div class="form-group">
                    <label for="exampleInputEmail1">Password </label>
                    <input type="text" class="form-control" name="password" id="exampleInputEmail1" placeholder="password" value="<?php echo $arr['password'] ?>">
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
    $username=$_POST['username'];
    $password=$_POST['password'];
  


  
        // Get all the submitted data from the form
        $sql = "update admin_user set username='$username', password='$password' where id=$id";
  
        // Execute query
        $result=mysqli_query($conn, $sql);
          
        // Now let's move the uploaded image into the folder: image
        if ($result)  {
            echo "<script>alert('Updated Sucessfully')</script>";
            echo "<script>window:location='view-credentials.php'</script>";
        }else{
             echo "<script>alert('Please try again latter')</script>";
             echo "<script>window:location='update-admin.php'</script>";
      }
  }
?>