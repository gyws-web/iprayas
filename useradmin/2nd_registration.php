
<?php include 'include/head.php'; ?>
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
            <h1>Access Account  </h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">Access Account </li>
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
                <h3 class="card-title">Access Account</h3>
              </div>
              <!-- /.card-header -->
              <!-- form start -->
              <form method="POST" action="" enctype="multipart/form-data">
                <div class="card-body">
               <div class="form-group">
                    <label for="exampleInputEmail1">Username </label>
                    <input type="text" class="form-control" name="username" id="exampleInputEmail1" placeholder="Username">
                  </div>
                  <div class="form-group">
                    <label for="exampleInputEmail1">Password </label>
                    <input type="text" class="form-control" name="password" id="exampleInputEmail1" placeholder="Password ">
                  </div>
                  
                  
                 
                
                </div>
                <!-- /.card-body -->

                <div class="card-footer">
                  <button type="submit" name="upload" class="btn btn-primary">Create Account</button>
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
    $username = $_POST['username'];
    $password = $_POST['password'];
   

  
        // Get all the submitted data from the form
        $sql = "INSERT INTO admin_user (username,password) VALUES ('$username','$password')";
  
        // Execute query
        $result=mysqli_query($conn, $sql);
          
        // Now let's move the uploaded image into the folder: image
        if ($result)  {
            echo "<script>alert('Sucessfully Create Account')</script>";
        }else{
             echo "<script>alert('Please try again latter')</script>";
      }
  }
?>