<?php
include 'include/connect.php';
include  'header.php';
?>
<?php
include 'sidebar.php';
?>

<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
  <!-- Content Header (Page header) -->
  <section class="content-header">
    <div class="container-fluid">
      <div class="row mb-2">
        <div class="col-sm-6">
          <h1>View All Branches</h1>
        </div>
        <div class="col-sm-6">
          <ol class="breadcrumb float-sm-right">
            <li class="breadcrumb-item"><a href="#">Home</a></li>
            <li class="breadcrumb-item active">View All Branches</li>
          </ol>
        </div>
      </div>
    </div><!-- /.container-fluid -->
  </section>

  <?php

  if (isset($_GET['status'])) {

    $status = $_GET['status'];
    if ($status == 10) {
  ?>

      <div class="alert alert-success">
        <strong>Your!</strong> Data Upadate..
      </div>

  <?php
    }
  }



  ?>

  <!-- Main content -->
  <section class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">View All Branches</h3>
              <?php

              if (isset($_GET['status'])) {

                $status = $_GET['status'];
                if ($status == 5) {
              ?>

                  <div class="alert alert-danger">
                    <strong>Your!</strong> Remove Branches..
                  </div>

              <?php
                }
              }



              ?>
            </div>
            <!-- /.card-header -->
            <div class="card-body">
              <table id="example2" class="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th>Sn..</th>
                    <th>College Name</th>
                    <th>Center Name</th>
                    
                    <th>City</th>
                    <!-- <th>State</th> -->
                    <th>Year Of Joining</th>
                    <!-- <th>No of Members</th> -->
                    <!-- <th>Category</th> -->
                    <th>Center Story</th>
                    <th>Center Coordinator</th>
                    <th>Action</th>
                    <th>Center ID</th>
                  </tr>
                </thead>

                <?php
                $a = 1;
                $sql = "SELECT * FROM `add_branches`";
                $result = mysqli_query($conn, $sql);

                while ($row = mysqli_fetch_assoc($result)) {
                ?>

                  <tbody>
                    <tr>
                      <td><?php echo $a++; ?></td>
                      <td><?php echo $row['Collage Name'] ?></td>
                      <td><?php echo $row['Center Name'] ?></td>
                      
                      <td><?php echo $row['City'] ?></td>
                      <!-- <td><?php echo $row['State'] ?></td> -->
                      <td><?php echo $row['Year Of Joining'] ?></td>
                      <!-- <td><?php echo $row['No_Members'] ?></td> -->
                      <!-- <td><?php echo $row['category'] ?></td> -->
                      <td><?php echo $row['Center Head'] ?></td>
                      <td><?php echo $row['Center Coordinator'] ?></td>

                      <td class="project-actions text-right">
                        <a class="btn btn-primary btn-sm" href="view.php?id=<?php echo $row['id']; ?>">
                          <i class="fas fa-folder">
                          </i>
                          View
                        </a>
                        <a class="btn btn-info btn-sm" href="update.php?id=<?php echo $row['id']; ?>">
                          <i class="fas fa-pencil-alt">
                          </i>
                          Edit
                        </a>
                        <a class="btn btn-danger btn-sm" href="del.php?id=<?php echo $row['id']; ?>">
                          <i class="fas fa-trash">
                          </i>
                          Delete
                        </a>
                      </td>
                      <td><?php echo $row['Center ID'] ?></td>

                    </tr>

                  </tbody>




                <?php
                }




                ?>


              </table>
            </div>
            <!-- /.card-body -->
          </div>
          <!-- /.card -->

          <!-- /.content-wrapper -->

          <!-- Control Sidebar -->

          <?php
          include 'footer.php';

          ?>


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
              "lengthChange": false,
              "autoWidth": false,
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