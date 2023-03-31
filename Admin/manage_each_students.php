<?php include 'header.php'; ?>
<?php include 'sidebar.php';
include 'include/connect.php';
?>

<body class="hold-transition sidebar-mini">
    <div class="wrapper">
        <!-- Content Wrapper. Contains page content -->
        <span>
            <?php

            if (isset($_GET['status'])) {
                $status = $_GET['status'];
                if ($status == 5) {
            ?>
                    <div class="alert alert-success" role="alert">
                        Approval
                    </div>
            <?php
                }
            }
            ?>
        </span>
        <div class="content-wrapper">
            <!-- Content Header (Page header) -->
            <section class="content-header">
                <?php
                if (isset($_GET['status'])) {
                    $status = $_GET['status'];
                    if ($status == 1) {
                ?>
                        <div class="alert alert-success">
                            <strong>Success!</strong> Update Success...
                        </div>
                <?php
                    }
                }
                ?>
                <div class="container-fluid">
                    <?php
                    if (isset($_GET['status'])) {
                        $status = $_GET['status'];
                        if ($status == 2) {
                    ?>
                            <div class="alert alert-danger">
                                <strong></strong> Delete Success!...
                            </div>
                    <?php
                        }
                    }
                    ?>
                    <div class="row mb-2">
                        <div class="col-sm-6">
                            <h1>Each Students</h1>
                        </div>
                        <div class="col-sm-6">
                            <ol class="breadcrumb float-sm-right">
                                <li class="breadcrumb-item"><a href="#">Home</a></li>
                                <li class="breadcrumb-item active">Each</li>
                                <li class="breadcrumb-item"> <a href="add_each_students.php" class="btn btn-primary">Add Each Student</a></li>
                            </ol>
                        </div>
                    </div>
                </div><!-- /.container-fluid -->
            </section>

            <!-- Main content -->
            <section class="content">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-12">
                            <!-- /.card -->
                            <div class="card">
                                <div class="card-header">
                                    <h3 class="card-title">View Each Students</h3>
                                </div>
                                <!-- /.card-header -->
                                <div class="card-body">
                                    <table id="example1" class="table table-bordered table-striped">
                                        <thead>
                                            <tr>
                                                <th>SN</th>
                                                <th>First Name</th>
                                                <th>Centre/Branch</th>
                                                <th>Standard</th>
                                                <th>Action</th>
                                                <th>Image</th>
                                                <th>School Name</th>
                                                <th>Each ID</th>
                                                <th>Sponsored By</th>
                                                <th>Student Since</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <?php
                                            $a = 1;
                                            $sql = "SELECT * FROM `each_students` ORDER BY `id` ASC";
                                            $run = mysqli_query($conn, $sql);
                                            while ($row = mysqli_fetch_assoc($run)) {
                                            ?>
                                                <tr>
                                                    <td><?php echo $a++ ?></td>
                                                    <td><?php echo $row['first_name']; ?></td>
                                                    <td><?php echo $row['CentreBranch'] ?></td>
                                                    <td><?php echo $row['standard'] ?></td>
                                                    <td>
                                                        <a href="edit_each.php?id=<?php echo $row['id']; ?>">
                                                            <i class='far fa-edit' style='font-size:24px;color:green'></i></a>
                                                        <a href="delite_each.php?id=<?php echo $row['id'] ?>"><i class='fas fa-trash-alt' style='font-size:24px;color:red'></i></a>
                                                        <!-- <i class='far fa-eye' style='font-size:24px;color:red'></i> -->
                                                    </td>
                                                    <td><img src="each_pic/<?php echo $row['image'] ?>" height="80" width="70" /></td>
                                                    <td><?php echo $row['school'] ?></td>
                                                    <td><?php echo $row['each_id'] ?></td>
                                                    <td><?php echo $row['sponsored_by'] ?></td>
                                                    <td><?php echo $row['Year Of Joining'] ?></td>
                                                </tr>
                                            <?php
                                            }
                                            ?>
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <th>SN</th>
                                                <th>First Name</th>
                                                <th>Centre/Branch</th>
                                                <th>Standard</th>
                                                <th>Action</th>
                                                <th>Image</th>
                                                <th>School Name</th>
                                                <th>Each ID</th>
                                                <th>Sponsored By</th>
                                                <th>Student Since</th>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                                <!-- /.card-body -->
                            </div>
                            <!-- /.card -->
                        </div>
                        <!-- /.col -->
                    </div>
                    <!-- /.row -->
                </div>
                <!-- /.container-fluid -->
            </section>
            <!-- /.content -->
        </div>
        <!-- /.content-wrapper -->

        <?php
        include 'footer.php';
        ?>

        <!-- Control Sidebar -->
        <aside class="control-sidebar control-sidebar-dark">
            <!-- Control sidebar content goes here -->
        </aside>
        <!-- /.control-sidebar -->
    </div>
    <!-- ./wrapper -->

    <!-- jQuery -->
    <script src="plugins/jquery/jquery.min.js"></script>
    <!-- Bootstrap 4 -->
    <script src="plugins/bootstrap/js/bootstrap.bundle.min.js"></script>
    <!-- DataTables  & Plugins -->
    <script src="plugins/datatables/jquery.dataTables.min.js"></script>
    <script src="plugins/datatables-bs4/js/dataTables.bootstrap4.min.js"></script>
    <script src="plugins/datatables-responsive/js/dataTables.responsive.min.js"></script>
    <script src="plugins/datatables-responsive/js/responsive.bootstrap4.min.js"></script>
    <script src="plugins/datatables-buttons/js/dataTables.buttons.min.js"></script>
    <script src="plugins/datatables-buttons/js/buttons.bootstrap4.min.js"></script>
    <script src="plugins/jszip/jszip.min.js"></script>
    <script src="plugins/pdfmake/pdfmake.min.js"></script>
    <script src="plugins/pdfmake/vfs_fonts.js"></script>
    <script src="plugins/datatables-buttons/js/buttons.html5.min.js"></script>
    <script src="plugins/datatables-buttons/js/buttons.print.min.js"></script>
    <script src="plugins/datatables-buttons/js/buttons.colVis.min.js"></script>
    <!-- AdminLTE App -->
    <!-- <script src="dist/js/adminlte.min.js"></script> -->
    <!-- AdminLTE for demo purposes -->
    <script src="dist/js/demo.js"></script>
    <!-- Page specific script -->
    <script>
        $(function() {
            $("#example1").DataTable({
                "responsive": true,
                "lengthChange": true,
                "autoWidth": true,
                "info": true,
                "ordering": true,
                "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
            }).buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)');

            $('#example2').DataTable({
                "paging": true,
                "lengthChange": false,
                "searching": false,
                "ordering": true,
                "info": true,
                "autoWidth": false,
                "responsive": true,
            });
        });
    </script>




</body>



</html>