<?php include 'header.php'; ?>

<body class="hold-transition sidebar-mini">
    <!-- Site wrapper -->
    <div class="wrapper">
        <!-- Navbar -->
        <?php include 'sidebar.php'; ?>
        <?php include 'include/connect.php'; ?>

        <!-- Content Wrapper. Contains page content -->
        <div class="content-wrapper">
            <!-- Content Header (Page header) -->
            <section class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <div class="col-sm-6">
                            <h1 class="text-center text-info">Add Each Students</h1>
                        </div>
                        <div class="col-sm-6">
                            <ol class="breadcrumb float-sm-right">
                                <li class="btn btn-default"><a href="manage_each_students.php">Home</a></li>&nbsp &nbsp
                                <li class="btn btn-primary">Add Each Student</li>
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
                                    <h3 class="card-title">Add Each Student</h3>
                                </div>
                                <!-- /.card-header -->
                                <!-- form start -->
                                <form method="POST" action="each_student.php" enctype="multipart/form-data">
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
                                            <label for="exampleInputEmail1">Full Name </label>
                                            <input type="text" class="form-control" name="first_name" id="exampleInputEmail1" placeholder="Full Name">
                                        </div>
                                        <div class="form-group">
                                            <label for="exampleInputPassword1">Each ID</label>
                                            <input type="text" class="form-control" name="each_id" id="exampleInputPassword1" placeholder="Each ID">
                                        </div>
                                        <div class="form-group">
                                            <label for="exampleInputPassword1">DOB</label>
                                            <input type="date" class="form-control" name="dob" id="exampleInputPassword1" placeholder="DOB">
                                        </div>
                                        <div class="form-group">
                                            <label for="exampleInputPassword1">Email</label>
                                            <input type="text" class="form-control" name="email" id="email" placeholder="Email">
                                        </div>
                                        <div class="form-group">
                                            <label for="exampleInputPassword1">Phone</label>
                                            <input type="text" class="form-control" name="contact" id="exampleInputPassword1" placeholder="Parent Phone">
                                        </div>
                                        <div class="form-group">
                                            <label for="exampleInputPassword1">Address</label>
                                            <input type="text" class="form-control" name="address" id="exampleInputPassword1" placeholder=" Address">
                                        </div>
                                        <div class="form-group">
                                            <label for="exampleInputPassword1">Mother's Name</label>
                                            <input type="text" class="form-control" name="mother" id="exampleInputPassword1" placeholder="Mother name">
                                        </div>
                                        <div class="form-group">
                                            <label for="exampleInputPassword1">Father's Name</label>
                                            <input type="text" class="form-control" name="father" id="exampleInputPassword1" placeholder="Father name">
                                        </div>
                                        <div class="form-group">
                                            <label for="exampleInputPassword1">School Name</label>
                                            <input type="text" class="form-control" name="school" id="exampleInputPassword1" placeholder="School Name">
                                        </div>
                                        <!-- 
                                            <div class="form-group">
                                            <label for="exampleInputPassword1">Facebook Link</label>
                                            <input type="text" class="form-control" name="city" id="exampleInputPassword1" placeholder="Full @fb link with http ">
                                            </div>
                                            <div class="form-group">
                                            <label for="exampleInputPassword1">LinkedIn Link</label>
                                            <input type="text" class="form-control" name="state" id="state" placeholder="Full @In link with http">
                                            </div> 
                                        -->
                                        <div class="form-group">
                                            <label for="exampleInputPassword1">Student Since</label>
                                            <select id="ddlYears" class="form-control" name="year_of_joining"></select>
                                        </div>
                                        <div class="form-group">
                                            <label for="exampleInputPassword1">Standard</label>
                                            <select name="standard" class="browser-default custom-select" id="exampleInputPassword1">
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
                                            <select name="centre_branch" class="browser-default custom-select" id="centre_branch">
                                                <option>select Centre/Branch</option>
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
                                                <option>Sponsored by</option>
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
                                    </div>
                                    <!-- /.card-body -->
                                    <div class="card-footer">
                                        <button type="submit" name="student" class="btn btn-primary">Add Each Student</button>
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


</body>



</html>