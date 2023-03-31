<?php include 'header.php'; ?>
<?php

include 'include/connect.php';

if (isset($_GET['id'])) {
  $id = $_GET['id'];

  $selquery = "select * from initiative where id=$id";
  $runquery = mysqli_query($conn, $selquery);
  $row = mysqli_num_rows($runquery);
  $arr = mysqli_fetch_array($runquery);
}

?>

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
              <h1>Update Initiative </h1>
            </div>
            <div class="col-sm-6">
              <ol class="breadcrumb float-sm-right">
                <li class="breadcrumb-item"><a href="#">Home</a></li>
                <li class="breadcrumb-item active">Update Initiative</li>
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
                  <h3 class="card-title">Update Initiative</h3>
                </div>
                <!-- /.card-header -->
                <!-- form start -->
                <form method="POST" action="" enctype="multipart/form-data">
                  <div class="card-body">
                    <div class="form-group">
                      <label for="exampleInputEmail1">First Title </label>
                      <input type="text" class="form-control" name="first_title" id="exampleInputEmail1" placeholder="Region" value="<?php echo $arr['first_title'] ?>">
                    </div>


                    <div class="form-group">
                      <label for="exampleInputEmail1">Text 1</label>
                      <input type="text" class="form-control" name="text1" id="exampleInputEmail1" placeholder="Pointer 1" value="<?php echo $arr['text1'] ?>">
                    </div>


                    <div class="form-group">
                      <label for="exampleInputEmail1">Text 2</label>
                      <input type="text" class="form-control" name="text2" id="exampleInputEmail1" placeholder="Pointer 2" value="<?php echo $arr['text2'] ?>">
                    </div>

                    <div class="form-group">
                       <label for="exampleInputEmail1">More Details</label>
                       <textarea class="form-control" name="secound_title" rows='3' id="exampleInputEmail1"><?php echo $arr['secound_title'] ?></textarea>
                     </div>

                    <div class="form-group">
                      <label for="exampleInputPassword1">Center</label>
                      <select name="branchs" class="browser-default custom-select" id="branchs">
                        <option><?php echo $arr['branchs'] ?></option>
                        <?php
                        $sql = "SELECT * FROM `add_branches`";
                        $run = mysqli_query($conn, $sql);

                        while ($row = mysqli_fetch_assoc($run)) {
                        ?>
                          <option><?php echo $row['Center Name'] ?></option>
                        <?php   }   ?>

                      </select>
                    </div>

                    <div class="form-group">
                      <label for="exampleInputPassword1">SDGs</label>
                      <select name="catagury" class="browser-default custom-select" id="catagury">
                        <option><?php echo $arr['catagury'] ?></option>
                        <option>Quality Education</option>
                        <option>Clean Water and sanitation</option>
                        <option>Good health and well being</option>
                        <option>Life on land</option>
                        <option>Ecology</option>

                      </select>
                    </div>


                    <div class="form-group">
                      <label for="exampleInputPassword1">Year</label>
                      <select id="ddlYears" class="form-control" name="year"></select>
                      

                    </div>


                    <!-- <div class="form-group">
                      <label for="exampleInputEmail1">image</label>
                      <input type="file" class="form-control" name="image" id="image" value="<?php echo $arr['image'] ?>">
                      <span>
                        <td><img src="../Admin/Initiative_image/<?php echo $arr['image'] ?>" height="80" width="100" /></td>
                      </span>
                    </div> -->

                    <div class="input-group">

                      <!-- <div class="invalid-feedback">Example invalid custom file feedback</div> -->
                      <span>
                        <input type="file" class="box" id="validatedCustomFile" name="image" id="image" value="<?php echo $arr['image'] ?>">
                        <!-- <label class="custom-file-label" for="validatedCustomFile">Update image...</label> -->
                        <td><img src="../Admin/Initiative_image/<?php echo $arr['image'] ?>" height="80" width="100" /></td>
                      </span>
                    </div>


                  </div>




              </div>
              <!-- /.card-body -->



              <div class="card-footer">
                <button type="submit" name="upload" class="btn btn-primary">Update Initiatives</button>
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

  </div><!-- /.container-fluid -->
  </section>
  <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->

  <?php include 'footer.php' ?>
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
    $first_title = $_POST['first_title'];
    $text1 = $_POST['text1'];
    $text2 = $_POST['text2'];
    $secound_title = $_POST['secound_title'];
    $listing_date = $_POST['listing_date'];
    $branchs = $_POST['branchs'];
    $year = $_POST['year'];
    $catagury = $_POST['catagury'];
    $newimage = $_FILES['image']['name'];
    $image_tmp_name = $_FILES['image']['tmp_name'];

    // $image_folder = 'Initiative_image/' . $image;

    $image_folder = '../Admin/Initiative_image/' . $image;

    if($newimage!="") {
      move_uploaded_file($_FILES['image']['tmp_name'],'../Admin/Initiative_image/'.$newimage);
    } else {
    $newimage = $arr['image'];
    }

    // Get all the submitted data from the form
    $sql = "UPDATE `initiative` SET `first_title`='$first_title',`text1`='$text1',`text2`='$text2',`secound_title`='$secound_title',`branchs`= '$branchs',`catagury`= '$catagury',`year`= '$year',`image`='$newimage' WHERE id = '$id'";
    // Execute query
    $result = mysqli_query($conn, $sql);
    // Now let's move the uploaded image into the folder: image
    if ($result) {
      echo "<script>alert('Updated Successfully')</script>";
      echo "<script>window:location='view-event.php'</script>";
    } else {
      echo "<script>alert('Please try again later')</script>";
      echo "<script>window:location='update-initiatives.php'</script>";
    }
  }
  ?>
  <script type="text/javascript">
    window.onload = function() {
      //Reference the DropDownList.
      var ddlYears = document.getElementById("ddlYears");

      //Determine the Current Year.
      var currentYear = (new Date()).getFullYear();

      //Loop and add the Year values to DropDownList.
      for (var i = 2018; i <= currentYear; i++) {
        var option = document.createElement("OPTION");
        option.innerHTML = i;
        option.value = i;
        ddlYears.appendChild(option);
      }
    };
  </script>