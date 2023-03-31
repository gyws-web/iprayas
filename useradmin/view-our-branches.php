
<?php 
include 'include/head.php';
include 'include/connect.php';

 ?>
<body class="hold-transition sidebar-mini">
<!-- Site wrapper -->
<div class="wrapper">
<?php include 'include/side_bar.php'; ?>
  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>All Branches</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">All Branches</li>
            </ol>
          </div>
        </div>
      </div><!-- /.container-fluid -->
    </section>

    <!-- Main content -->
    <section class="content">

      <!-- Default box -->
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">All Branches</h3>
        </div>
        <div class="card-body p-0">

          <table id="example" class="display" style="width:100%">
        <thead>
            <tr>
                <th>Sn..</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Member ID</th>
                <th>DOB</th>
                <th>phone</th>
                <th>Email</th>
                <th>Address</th>
                <th>City</th>
                <th>State</th>
                <th>Year Of Joining</th>
                <th>Post/ Desgination</th>
                 <th>Centre/Branch</th>
                <th>Status</th>
                
            </tr>
        </thead>
       
          <?php 
          $no = 1;
          $sql = "SELECT * FROM `add_members`";
          $run = mysqli_query($conn,$sql);
          while ($row = mysqli_fetch_assoc($run)) 
            {?>


             <tbody>
              <tr>
                <td><?php echo $no++ ?></td>
                <td><?php echo $row['First Name'] ?></td>
                <td><?php echo $row['Last Name'] ?></td>
                <td><?php echo $row['Member ID'] ?></td>
                <td><?php echo $row['DOB'] ?></td>
                <td><?php echo $row['phone'] ?></td>
                <td><?php echo $row['Email'] ?></td>
                <td><?php echo $row['Address'] ?></td>
                <td><?php echo $row['City'] ?></td>
                <td><?php echo $row['State'] ?></td>
                <td><?php echo $row['Year Of Joining'] ?></td>
                 <td><?php echo $row['Post/ Desgination'] ?></td>
                <td><?php echo $row['Centre/Branch'] ?></td>

                <td>
                  <?php 

                  if ($row  ['status'] ==1)
                  {
                    echo '<button type="button" class="btn btn-danger">Peding</button>';
                  }

                  else if ($row  ['status'] ==2)
                  {
                    echo '<button type="button" class="btn btn-success">Active</button>';
                  }
                  ?>
                </td>
                
                
                
            </tr>
        </tbody>



            <?php
          }



          ?>
          
        <tfoot>
            <tr>
                <th>Sn..</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Member ID</th>
                <th>DOB</th>
                <th>phone</th>
                <th>Email</th>
                <th>Address</th>
                <th>City</th>
                <th>State</th>
                <th>Year Of Joining</th>
                <th>Post/ Desgination</th>
                <th>Centre/Branch</th>
                <th>Status</th>
            </tr>

        </tfoot>
    </table>
         
          
        </div>
        <!-- /.card-body -->
      </div>
      <!-- /.card -->

    </section>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->
<?php include 'include/footer.php'; ?>
<script type="text/javascript" src="https://code.jquery.com/jquery-3.5.1.js"></script>
<script type="text/javascript" src="https://cdn.datatables.net/1.12.1/js/jquery.dataTables.min.js"></script>
<script>
  $(document).ready(function () {
    $('#example').DataTable();
});
</script>