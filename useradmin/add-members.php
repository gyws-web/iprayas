<?php include 'include/connect.php'; ?>

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
            <h1 class="text-center text-info">Add Our Members</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="btn btn-default"><a href="manage_members.php">Home</a></li>&nbsp &nbsp
              <li class="btn btn-primary">Add Members</li>
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
                <h3 class="card-title">Add Members</h3>
              </div>
              <!-- /.card-header -->
              <!-- form start -->
              <form method="POST" action="member.php" enctype="multipart/form-data">
                <div class="card-body">
                     <div class="form-group">
                    <label for="exampleInputFile">Profile Picture</label>
                    <div class="input-group">
                      <div class="custom-file">
                        
                        <input type="file" name="image" class="box" accept="image/jpg, image/jpeg, image/png, image/pdf" class="form-control">
                      </div>
                     
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="exampleInputEmail1">First Name </label>
                    <input type="text" class="form-control" name="first_name" id="exampleInputEmail1" placeholder="Full Name">
                  </div>
                  <div class="form-group">
                    <label for="exampleInputPassword1">Last Name</label>
                    <input type="text" class="form-control" name="last_name" id="exampleInputPassword1" placeholder="Last Name">
                  </div>
                   <div class="form-group">
                    <label for="exampleInputPassword1">Member ID</label>
                    <input type="text" class="form-control" name="member_id" id="exampleInputPassword1" placeholder="Member ID">
                  </div>
                     <div class="form-group">
                    <label for="exampleInputPassword1">DOB</label>
                    <input type="date" class="form-control" name="dob" id="exampleInputPassword1" placeholder="DOB">
                  </div>
                   <div class="form-group">
                      <label for="exampleInputPassword1">Email</label>
                      <input type="text" class="form-control" name="email" id="email" placeholder="Phone">
                    </div>
                    <div class="form-group">
                      <label for="exampleInputPassword1">Phone</label>
                      <input type="text" class="form-control" name="phone" id="exampleInputPassword1" placeholder="Email">
                    </div>
                     <div class="form-group">
                    <label for="exampleInputPassword1">Address</label>
                    <input type="text" class="form-control" name="address" id="exampleInputPassword1" placeholder="Address">
                  </div>
                     <div class="form-group">
                    <label for="exampleInputPassword1">City</label>
                    <input type="text" class="form-control" name="city" id="exampleInputPassword1" placeholder="City">
                  </div>
                  <div class="form-group">
                    <label for="exampleInputPassword1">State</label>
                    <input type="text" class="form-control" name="state" id="state" placeholder="State">
                  </div>
                  
                 

                   <div class="form-group">
                    <label for="exampleInputPassword1">Year Of Joining</label>
                     <select id="ddlYears"class="form-control" name="year_of_joining"></select>
                   
                  </div>

                   <div class="form-group">
                    <label for="exampleInputPassword1">Post/ Desgination</label>
                    <input type="text" class="form-control" name="post_designation_year" id="exampleInputPassword1" placeholder="Post Desgination Year">
                  </div>

           <div class="form-group">
            <label for="exampleInputPassword1">Centre/Branch</label>
          <select name="centre_branch" class="browser-default custom-select"  id="centre_branch">
                <option>select Centre/Branch</option>
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

                

                 
                
                </div>
                <!-- /.card-body -->

                <div class="card-footer">
                  <button type="submit" name="member" class="btn btn-primary">Add Members</button>
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

<?php include 'include/footer.php'; ?> 


<script type="text/javascript">
    window.onload = function () {
        //Reference the DropDownList.
        var ddlYears = document.getElementById("ddlYears");
 
        //Determine the Current Year.
        var currentYear = (new Date()).getFullYear();
 
        //Loop and add the Year values to DropDownList.
        for (var i = 1950; i <= currentYear; i++) {
            var option = document.createElement("OPTION");
            option.innerHTML = i;
            option.value = i;
            ddlYears.appendChild(option);
        }
    };
</script>
