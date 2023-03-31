<?php
include 'header.php';
include 'include/connect.php';

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
              <h1>Branches </h1>
            </div>
            <div class="col-sm-6">
              <ol class="breadcrumb float-sm-right">
                <li class="btn btn-default"><a href="manage_branches.php">Home</a></li>&nbsp
                <a href="add-branches.php" class="btn btn-primary">Add Branches</a>
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
                      <label for="exampleInputEmail1">College Name</label>
                      <input type="text" class="form-control" name="collage" id="collage" placeholder="Region ">
                    </div>
                    <div class="form-group">
                      <label for="exampleInputEmail1">Center Name </label>
                      <input type="text" class="form-control" name="center" id="center" placeholder="City ">
                    </div>
                    <div class="form-group">
                      <label for="exampleInputEmail1">Center ID </label>
                      <input type="text" class="form-control" name="centerid" id="centerid" placeholder="Center ID">
                    </div>
                    <div class="form-group">
                      <label for="exampleInputEmail1">City</label>
                      <input type="text" class="form-control" name="city" id="city" placeholder="City">
                    </div>

                    <div class="form-group">
                      <label for="exampleInputEmail1">State</label>
                      <input type="text" class="form-control" name="state" id="state" placeholder="State ">
                    </div>

                    <div class="form-group">
                      <label for="exampleInputPassword1">Year Of Joining</label>
                      <select id="ddlYears" class="form-control" name="year_of_joining"></select>

                    </div>

                    <!-- <div class="form-group">
                      <label for="exampleInputPassword1">No of Members</label>
                      <select class="browser-default custom-select" name="No_of_Members">
                        <option selected>No of Members</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                      </select>

                    </div> -->

                    <!--  <div class="form-group">
                    <label for="exampleInputPassword1">Branches </label>
                     <select class="browser-default custom-select" name="branche">
                     <option selected>Select Branches </option>

                     <?php
                      $sql = "SELECT * FROM `add_members`";
                      $run = mysqli_query($conn, $sql);

                      while ($row = mysqli_fetch_assoc($run)) {
                      ?>
                        <option><?php echo $row['Centre/Branch'] ?></option>


                        <?php
                      }


                        ?>

                      
                   </select>
                   
                  </div> -->

                    <div class="form-group">
                      <label for="exampleFormControlTextarea1">Center Details</label>
                      <textarea class="form-control" rows="3" name="centerhead" id="centerhead" placeholder="Center Story"></textarea>
                    </div>

                  </div>
                  <!-- /.card-body -->

                  <div class="card-footer">
                    <button type="submit" name="branches" class="btn btn-primary">Add Branches</button>
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
  include 'include/connect.php';
  ?>



  <script type="text/javascript">
    window.onload = function() {
      //Reference the DropDownList.
      var ddlYears = document.getElementById("ddlYears");

      //Determine the Current Year.
      var currentYear = (new Date()).getFullYear();

      //Loop and add the Year values to DropDownList.
      for (var i = 2010; i <= currentYear; i++) {
        var option = document.createElement("OPTION");
        option.innerHTML = i;
        option.value = i;
        ddlYears.appendChild(option);
      }
    };
  </script>