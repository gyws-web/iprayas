<?php 
include 'header.php';
include 'include/connect.php';
?>
<body class="hold-transition sidebar-mini">
<!-- Site wrapper -->
<div class="wrapper">
<?php include 'sidebar.php'; ?>
  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>Admin Detals</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Admin Details</a></li>
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
          <h3 class="card-title">Admin Details</h3>

          <div class="card-tools">
            <button type="button" class="btn btn-tool" data-card-widget="collapse" title="Collapse">
              <i class="fas fa-minus"></i>
            </button>
            <button type="button" class="btn btn-tool" data-card-widget="remove" title="Remove">
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>
        <div class="card-body p-0">
         
      <table class="table table-hover">
  <thead>
    <tr>
      <th scope="col">S.N</th>
      <th scope="col">User Name</th>
      <th scope="col">Password</th>
      <th scope="col">Action</th>
      <th scope="col">Add New</th>
    </tr>
  </thead>
  <tbody>
    <tr>

      <?php
      $a = 1;
     $sql = "SELECT * FROM `admin_user`";
     $run = mysqli_query($conn,$sql);

     while ($row = mysqli_fetch_assoc($run)) 
     {
       ?>
       <tr>

       <td><?php echo $a++ ?></td>
       <td><?php echo $row['username'] ?></td>
       <td><?php echo $row['password'] ?></td>
       <td><a href="auser_edit.php?id=<?php echo $row['id'] ?>">Edit</a></td>
        <td><a href="change.php?id=<?php echo $row['id'] ?>">Add new Admin</a></td>
</tr>

       <?php
     }



       ?>
      
    </tr>
    
   
  </tbody>
</table>
        </div>
        <!-- /.card-body -->
      </div>
      <!-- /.card -->

    </section>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->
<?php include 'footer.php'; ?>
