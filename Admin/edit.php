<?php

include 'include/connect.php';

if (isset($_GET['id'])) {
  $id = $_GET['id'];

  $sql = "SELECT * FROM `add_members` WHERE id = '$id'";
  $run = mysqli_query($conn, $sql);

  while ($row = mysqli_fetch_assoc($run)) {
    $first_name = $row['First Name'];
    $last_name = $row['Last Name'];
    $member_id = $row['Member ID'];
    $phone = $row['phone'];
    $email = $row['Email'];
    $city  = $row['instagram'];
    $state = $row['LinkedIn'];
    $dob = $row['DOB'];
    $year_of_joining = $row['Year Of Joining'];
    $postd = $row['Post/ Desgination'];
    $centre = $row['CentreBranch'];
    $image = $row['image'];
    $address = $row['facebook'];
  }
}
?>
<?php include 'header.php'; ?>


<?php

if (isset($_POST['update'])) {
  $first_name = $_POST['first_name'];
  $last_name = $_POST['last_name'];
  $member_id = $_POST['member_id'];
  $email = $_POST['email'];
  $phone = $_POST['phone'];
  $city = addslashes($_POST['city']);
  $state = addslashes($_POST['state']);
  $dob  = $_POST['dob'];
  $post_designation_year = $_POST['post_designation_year'];
  $centre = $_POST['centre'];
  $address = addslashes($_POST['address']);
  $year_of_joining = $_POST['year_of_joining'];
  $newimage = $_FILES['image']['name'];
  $image_tmp_name = $_FILES['image']['tmp_name'];
  $image_folder = 'members_pic/' . $image;

  if($newimage!="") {
    chmod($image_folder, 777);
    move_uploaded_file($_FILES['image']['tmp_name'],'members_pic/'.$newimage);
  } else {
  $newimage = $image;
  }

  $update = "UPDATE `add_members` SET `First Name`='$first_name',`Last Name`='$last_name',`Member ID`='$member_id',`DOB`='$dob',`phone`='$phone',`Email`='$email',`instagram`='$address',`facebook`='$city',`LinkedIn`='$state',`Year Of Joining`='$year_of_joining',`Post/ Desgination`='$postd',`image`='$newimage', `CentreBranch` = '$centre' WHERE id = '$id'";
  $result = mysqli_query($conn, $update);
  if ($result) {
    $status = 1;
    header('location:manage_members.php?status=' . $status);
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
              <h1 class="text-center text-info">Update Members</h1>
            </div>
            <div class="col-sm-6">
              <ol class="breadcrumb float-sm-right">
                <li class="btn btn-default"><a href="manage_members.php">Home</a></li>&nbsp &nbsp

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
                  <h3 class="card-title">Update User</h3>
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
                      <label for="exampleInputEmail1">First Name </label>
                      <input type="text" class="form-control" name="first_name" id="first_name" value="<?php echo $first_name; ?>">
                    </div>
                    <div class="form-group">
                      <label for="exampleInputPassword1">Last Name</label>
                      <input type="text" class="form-control" name="last_name" id="last_name" value="<?php echo $last_name; ?>">
                    </div>
                    <div class="form-group">
                      <label for="exampleInputPassword1">Member ID</label>
                      <input type="text" class="form-control" name="member_id" id="member_id" value="<?php echo $member_id; ?>">
                    </div>
                    <div class="form-group">
                      <label for="exampleInputPassword1">Email</label>
                      <input type="text" class="form-control" name="email" id="email" value="<?php
                                                                                              echo $email ?>">
                    </div>
                    <div class="form-group">
                      <label for="exampleInputPassword1">Phone</label>
                      <input type="text" class="form-control" name="phone" id="phone" value="<?php echo $phone ?>">
                    </div>
                    <div class="form-group">
                      <label for="exampleInputPassword1">Facebook Link</label>
                      <input type="text" class="form-control" name="city" id="city" value="<?php echo $city  ?>">
                    </div>
                    <div class="form-group">
                      <label for="exampleInputPassword1">LinkedIn Link</label>
                      <input type="text" class="form-control" name="state" id="state" value="<?php echo $state ?>">
                    </div>

                    <div class="form-group">
                      <label for="exampleInputPassword1">Instagram Link</label>
                      <input type="text" class="form-control" name="address" id="exampleInputPassword1" value="<?php echo $address; ?>">
                    </div>

                    <div class="form-group">
                      <label for="exampleInputPassword1">DOB</label>
                      <input type="datetime" class="form-control" name="dob" id="exampleInputPassword1" value="<?php echo $dob; ?>">
                    </div>

                    <div class="form-group">
                      <label for="exampleInputPassword1">Year Of Joining</label>
                      <select id="ddlYears" class="form-control" name="year_of_joining">
                        <option selected><?php echo $year_of_joining; ?></option>

                      </select>

                    </div>




                    <div class="form-group">
                      <label for="exampleInputPassword1">Post/ Desgination</label>
                      <select name="post_designation_year" class="browser-default custom-select" id="exampleInputPassword1">
                        <option selected><?php echo $postd; ?></option>
                        <option>Center Coordinator</option>
                        <option>Core Team Member</option>
                        <option>Associate Member</option>
                        <option>Social Strategy Development Head</option>
                        <option>Sponsorship Head</option>
                        <option>Design Head</option>
                        <option>Media and Publicity Head</option>
                        <option>WebD Head</option>
                        <option>Chief Executive Officer,PRAYAS</option>
                        <option>PRAYAS Coordinator </option>
                        <option>Public Relations and Marketing Head</option>
                        <option>Social Strategy Development Head</option>
                        <option>Senior Executive Member</option>
                        <option>HR Head</option>
                        <option>HR Officer</option>
                        <option>PR Officer</option>
                        <option>SSD Officer</option>
                        <option>Expansion Officer</option>

                      </select>
                    </div>




                    <div class="form-group">
                      <label for="exampleInputPassword1">Centre/Branch</label>
                      <select class="browser-default custom-select" name="centre" id="centre">
                        <option selected><?php echo $centre; ?></option>
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
                        <td><img src="../Admin/members_pic/<?php echo $image ?>" height="80" width="100" /></td>
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