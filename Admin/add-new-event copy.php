 <?php
include 'include/connect.php';
?>
<?php include 'header.php'; ?>
<body class="hold-transition sidebar-mini">
<!-- Site wrapper -->
<div class="wrapper">
  <!-- Navbar -->
<?php include 'sidebar.php'; ?>
  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>Add Our Initiative </h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="add-new-event.php">Home</a></li>
                <li class="breadcrumb-item"><a href="view-event.php">add Initiative</a></li>
              
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
                <h3 class="card-title">Add Initiative</h3>
              </div>
              <!-- /.card-header -->
              <!-- form start -->
              <form method="POST" action="" enctype="multipart/form-data">
                <div class="card-body">

                   <div class="form-group">
                    <label for="exampleInputEmail1">image</label>
                    <input type="file" class="form-control" name="image" id="image">
                  </div>


                  <div class="form-group">
                    <label for="exampleInputEmail1">Title </label>
                    <input type="text" class="form-control" name="first_title" id="first_title" placeholder="First Title">
                  </div>
                   <div class="form-group">
                    <label for="exampleInputEmail1">text</label>
                   
                   <textarea class="form-control" name="secound_title" id="secound_title"></textarea>
                  </div>

                  <div class="form-group">
                    <label for="exampleInputPassword1">Branches</label>
                     <select class="browser-default custom-select" name="branche">
                     <option selected>Select Branches </option>

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
                  </div>
                   <div class="form-group">
                    <label for="exampleInputEmail1">Listing Date </label>
                    <input type="date" class="form-control" name="listing_date" id="listing_date">
                  </div>
                </div>
                <!-- /.card-body -->

                <div class="card-footer">
                  <button type="submit" name="upload" class="btn btn-primary">Add Initiative</button>
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

 <?php include 'footer.php' ?>

<?php
error_reporting(0);
?>
<?php
  $msg = "";
  
  // If upload button is clicked ...
  if (isset($_POST['upload'])) {
    $first_title=$_POST['first_title'];
    $secound_title=$_POST['secound_title'];
    $branche = $_POST['branche'];
    $image = $_FILES['image']['name'];
    $image_tmp_name = $_FILES['image']['tmp_name'];
    $listing_date=$_POST['listing_date'];
    $image_folder = 'Initiative_image/'.$image;
        // Get all the submitted data from the form
        $sql = "INSERT INTO `initiative`(`first_title`, `secound_title`, `branchs`, `image`) VALUES ('$first_title','$secound_title','$branche','$image')";
        // Execute query
        $result=mysqli_query($conn, $sql); 
        // Now let's move the uploaded image into the folder: image

        if ($result)  {
          move_uploaded_file($image_tmp_name, $image_folder);
            $status = 1;
            header('location:view-event.php?status='.$status);
        }else{
             echo "<script>alert('Please try again latter')</script>";
      }
  }
?>