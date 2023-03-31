<?php include 'include/head.php'; 
  include 'include/connect.php';
   include 'include/side_bar.php';
   ?>
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>Branches</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="btn btn-default"><a href="manage_members.php">Home</a></li>&nbsp
              <a href="add-members.php" class="btn btn-primary">Add Member</a>
            </ol>
          </div>
        </div>
      </div>
    </section>


    <!-- Main content -->
    <section class="content">
        
                     
      <div class="container-fluid">

        <div class="row">
          <div class="col-12">
    
            <!-- /.card -->

            <div class="card">
              <div class="card-header">
                <h3 class="card-title">View Member</h3>
              </div>
              <div class="card-body" style="overflow-x:auto;">
                <table id="example" class="table table-bordered table-striped">
                  <thead>
                  <tr>
                    <th>SN..</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Member ID</th>
                    <th>DOB</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>City</th>
                    <th>State</th>
                    <th>Year Of Joining</th>
                    <th>Post/ Desgination</th>
                    <th>Centre/Branch</th>
                    
                   

                  </tr>
                  </thead>
                  <tbody>
                    <?php
                    $a = 1;
                    $sql = "SELECT * FROM `add_members`";
                    $run = mysqli_query($conn,$sql);
                    while ($row = mysqli_fetch_assoc($run)) 
                    {
                      ?>
                      <tr>
                     <td><?php echo $a++ ?></td>   
                    <td><?php echo $row['First Name']; ?></td>
                    <td><?php echo $row['Last Name']; ?></td>
                     <td><?php echo $row['Member ID'] ?></td>
                      <td><?php echo $row['DOB'] ?></td>
                       <td><?php echo $row['phone'] ?></td>
                       <td><?php echo $row['Email'] ?></td>
                       <td><?php echo $row['Address'] ?></td>
                       <td><?php echo $row['City'] ?></td>
                       <td><?php echo $row['State'] ?></td>
                       <td><?php echo $row['Year Of Joining'] ?></td>
                      <td><?php echo $row['Post/ Desgination'] ?></td>
                      <td><?php echo $row['CentreBranch'] ?></td>
                     

                    <td>
                      <?php




                       ?>
                        
                    </td>
                  </tr>


                 

                 </tbody>
                      <?php
                    }

                     ?>
                  
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
 <?php include 'include/footer.php' ?>
 ?>
<script src="plugins/jquery/jquery.min.js"></script>
<script src="plugins/bootstrap/js/bootstrap.bundle.min.js"></script>
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
<script src="dist/js/adminlte.min.js"></script>
<script src="dist/js/demo.js"></script>
<script>
  $(function () {
    $("#example1").DataTable({
      "responsive": true, "lengthChange": false, "autoWidth": false,
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
