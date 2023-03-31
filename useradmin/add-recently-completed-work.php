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
            <h1> Recently Completed Work</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">Recently Completed Work</li>
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
                <h3 class="card-title">Add Recently Completed Work</h3>
              </div>
              <!-- /.card-header -->
              <!-- form start -->
     <!-- form start -->
              <form method="POST" action="" enctype="multipart/form-data">
                <div class="card-body">
                  <div class="form-group">
                    <label for="exampleInputEmail1">First Title </label>
                    <input type="text" class="form-control" name="first_title" id="exampleInputEmail1" placeholder="First Title ">
                  </div>
                  <div class="form-group">
                    <label for="exampleInputPassword1">Secound Title</label>
                    <input type="text" class="form-control" name="secound_title" id="exampleInputPassword1" placeholder="Secound Title">
                  </div>
                  <div class="form-group">
                    <label for="exampleInputFile">File input</label>
                    <div class="input-group">
                      <div class="custom-file">
                        <input type="file" class="custom-file-input" name="uploadfile" id="exampleInputFile">
                        <label class="custom-file-label" name="uploadfile" for="exampleInputFile">Choose file</label>
                      </div>
                     
                    </div>
                  </div>
                
                </div>
                <!-- /.card-body -->

                <div class="card-footer">
                  <button type="submit" name="upload" class="btn btn-primary">Upload</button>
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
    $first_title=$_POST['first_title'];
    $secound_title=$_POST['secound_title'];

    $filename = $_FILES["uploadfile"]["name"];
    $tempname = $_FILES["uploadfile"]["tmp_name"];    
    $folder = "image/".$filename;
  
        // Get all the submitted data from the form
        $sql = "INSERT INTO recently_completed_work (first_title,secound_title,img) VALUES ('$first_title','secound_title','$filename')";
  
        // Execute query
        mysqli_query($conn, $sql);
          
        // Now let's move the uploaded image into the folder: image
        if (move_uploaded_file($tempname, $folder))  {
            echo "<script>alert('Sucessfully Uploaded')</script>";
        }else{
             echo "<script>alert('Please try again latter')</script>";
      }
  }
?>