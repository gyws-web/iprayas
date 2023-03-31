<?php

include 'include/connect.php';

if (isset($_GET['id'])) {
  $id = $_GET['id'];

  $sql = "SELECT * FROM `each_students` WHERE id = '$id'";
  $run = mysqli_query($conn, $sql);

  while ($row = mysqli_fetch_assoc($run)) {
    $first_name = $row['first_name'];
    $each_id = $row['each_id'];
    $dob = $row['dob'];
    $email = $row['Email'];
    $phone = $row['contact'];
    $address = $row['address'];
    $father = $row['father'];
    $mother = $row['mother'];
    $standard = $row['standard'];
    $sponsored_by = $row['sponsored_by'];
    $year_of_joining = $row['Year Of Joining'];
    $school = $row['school'];
    $centre_branch = $row['CentreBranch'];
    $image = $row['image'];
  }
}
?>
<?php include 'header.php'; ?>


<?php
if (isset($_POST['update'])) {
  $first_name = $_POST['first_name'];
  $each_id = $_POST['each_id'];
  $dob = $_POST['dob'];
  $email = $_POST['email'];
  $phone = $_POST['phone'];
  $address = $_POST['address'];
  $father = $_POST['father'];
  $mother = $_POST['mother'];
  $standard = $_POST['standard'];
  $sponsored_by = $_POST['sponsored_by'];
  $year_of_joining = $_POST['year_of_joining'];
  $school = $_POST['school'];
  $centre_branch = $_POST['centre_branch'];
  $newimage = $_FILES['image']['name'];
  $image_tmp_name = $_FILES['image']['tmp_name'];
  $image_folder = '../Admin/each_pic/' . $image;

  if ($newimage != "") {
    move_uploaded_file($_FILES['image']['tmp_name'], '../Admin/each_pic/' . $newimage);
  } else {
    $newimage = $image;
  }

  $update = "UPDATE `each_students` SET `first_name`='$first_name',`each_id`='$each_id',`dob`='$dob',`contact`='$phone',`Email`='$email',`address`='$address',`father`='$father',`mother`='$mother',`Year Of Joining`='$year_of_joining',`school`='$school',`image`='$newimage', `CentreBranch` = '$centre_branch' WHERE id = '$id'";
  $result = mysqli_query($conn, $update);
  if ($result) {
    $status = 1;
    header('location:manage_each_students.php?status=' . $status);
  } else {
    echo "not update";
  }
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
              <h1 class="text-center text-info">Update Each Student</h1>
            </div>
            <div class="col-sm-6">
              <ol class="breadcrumb float-sm-right">
                <li class="btn btn-default"><a href="manage_each_students.php">Back</a></li>&nbsp &nbsp

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
                  <h3 class="card-title">Update</h3>
                </div>
                <!-- /.card-header -->
                <!-- form start -->

                <form method="POST" action="#" enctype="multipart/form-data">
                  <div class="card-body">
                    <div class="form-group">
                      <!--  <label for="exampleInputFile">Profile Picture</label> -->
                      <div class="input-group">
                        <div class="custom-file">



                          <!--  <input type="file" name="image" class="form-control" class="box" accept="image/jpg, image/jpeg, image/png, image/pdf" > -->
                        </div>


                      </div>
                    </div>
                    <div class="form-group">
                      <label for="exampleInputEmail1">Full Name </label>
                      <input type="text" class="form-control" name="first_name" id="first_name" value="<?php echo $first_name; ?>">
                    </div>
                    <div class="form-group">
                      <div class="form-group">
                        <label for="exampleInputPassword1">Each ID</label>
                        <input type="text" class="form-control" name="each_id" id="each_id" value="<?php echo $each_id; ?>">
                      </div>
                      <div class="form-group">
                        <div class="form-group">
                          <label for="exampleInputPassword1">DOB</label>
                          <input type="date" class="form-control" name="dob" id="dob" value="<?php echo $dob; ?>">
                        </div>
                        <div class="form-group">
                          <label for="exampleInputPassword1">Email</label>
                          <input type="text" class="form-control" name="email" id="email" value="<?php echo $email; ?>">
                        </div>
                        <div class="form-group">
                          <label for="exampleInputPassword1">Phone</label>
                          <input type="text" class="form-control" name="phone" id="phone" value="<?php echo $phone ?>">
                        </div>
                        <div class="form-group">
                          <label for="exampleInputPassword1">Address</label>
                          <input type="text" class="form-control" name="address" id="address" value="<?php echo $address  ?>">
                        </div>
                        <div class="form-group">
                          <label for="exampleInputPassword1">Mother's Name</label>
                          <input type="text" class="form-control" name="mother" id="mother" value="<?php echo $mother ?>">
                        </div>

                        <div class="form-group">
                          <label for="exampleInputPassword1">Father's Name</label>
                          <input type="text" class="form-control" name="father" id="exampleInputPassword1" value="<?php echo $father; ?>">
                        </div>

                        <div class="form-group">
                          <label for="exampleInputPassword1">School Name</label>
                          <input type="text" class="form-control" name="school" id="exampleInputPassword1" value="<?php echo $school; ?>">
                        </div>

                        <div class="form-group">
                          <label for="exampleInputPassword1">Student Since</label>
                          <select id="ddlYears" class="form-control" name="year_of_joining">
                            <option selected><?php echo $year_of_joining; ?></option>

                          </select>

                        </div>

                        <div class="form-group">
                          <label for="exampleInputPassword1">Standard</label>
                          <select name="standard" class="browser-default custom-select" id="exampleInputPassword1">
                            <option selected><?php echo $standard; ?></option>
                            <option>Nursery</option>
                            <option>KG</option>
                            <option>Std. I</option>
                            <option>Std. II</option>
                            <option>Std. III</option>
                            <option>Std. IV</option>
                            <option>Std. V</option>
                            <option>Std. VI</option>
                            <option>Std. VII</option>
                            <option>Std. VIII</option>
                            <option>Std. IX</option>
                            <option>Std. X</option>

                          </select>
                        </div>




                        <div class="form-group">
                          <label for="exampleInputPassword1">Centre/Branch</label>
                          <select class="browser-default custom-select" name="centre_branch" id="centre">
                            <option selected><?php echo $centre_branch; ?></option>
                            <?php

                            $sql = "SELECT * FROM `add_branches`";
                            $run = mysqli_query($conn, $sql);

                            while ($row = mysqli_fetch_assoc($run)) {
                            ?>
                              <option><?php echo $row['Center Name'] ?></option>
                            <?php
                            }
                            ?>
                          </select>
                        </div>


                        <div class="form-group">
                          <label for="exampleInputPassword1">Sponsor</label>
                          <select name="sponsored_by" class="browser-default custom-select" id="sponsored_by">
                            <option selected><?php echo $sponsored_by; ?></option>
                            <?php
                            $sql = "SELECT * FROM `add_branches`";
                            $run = mysqli_query($conn, $sql);
                            while ($row = mysqli_fetch_assoc($run)) {
                            ?>
                              <option><?php echo $row['Center Name'] ?></option>
                            <?php
                            }
                            ?>
                          </select>
                        </div>

                        <div class="input-group">
                          <input type="file" name="image" class="box" accept="image/jpg, image/jpeg, image/png, image/pdf" class="form-control" value="<?php echo $image ?>">
                          <span>
                            <td><img src="../Admin/each_pic/<?php echo $image ?>" height="80" width="100" /></td>
                          </span>
                        </div>
                      </div>


                      <!-- /.card-body -->

                      <div class="card-footer">
                        <button type="submit" name="update" class="btn btn-primary">Update</button>
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



  <script type="text/javascript">
    window.onload = function() {
      //Reference the DropDownList.
      var ddlYears = document.getElementById("ddlYears");

      //Determine the Current Year.
      var currentYear = (new Date()).getFullYear();

      //Loop and add the Year values to DropDownList.
      for (var i = 2010; i <= currentYear; i++) {
        var option = document.createElement("OPTION");
        option.innerHTML = [i + '-' + (i + 1)];
        option.value = [i + '-' + (i + 1)];
        ddlYears.appendChild(option);
      }
    };
  </script>