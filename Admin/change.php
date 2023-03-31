<?php 
include 'header.php';
include 'include/connect.php';
?>

<?php 

if (isset($_POST['change'])) 
{
  $user = $_POST['user'];
  $password = $_POST['password'];
  
  $sql = "INSERT INTO `admin_user`(`username`, `password`) VALUES ('$user','$password')";
  $run = mysqli_query($conn,$sql);

  if ($run) 
  {
    echo "<script>alert('admin created');</script>";
  }



}

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
            <h1>Super Admin</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Create Branch Admin</a></li>
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
          <h3 class="card-title">Create Branch Admin</h3>
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

         <form method="POST">
            <div class="form-group">
            <label>user Name</label>
            <input type="text" name="user" class="form-control" required>
          </div>

           <div class="form-group">
            <label>Password</label>
            <input type="password" name="password" class="form-control" required>
          </div>


             <div class="form-group">
           <input type="submit" name="change" class="btn-btn-info">
          </div>
         </form>


         
       
        </div>
        <!-- /.card-body -->
      </div>
      <!-- /.card -->

    </section>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->
<?php include 'footer.php'; ?>
