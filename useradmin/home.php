
<?php include 'include/head.php'; ?>
<body class="hold-transition dark-mode sidebar-mini layout-fixed layout-navbar-fixed layout-footer-fixed">
<div class="wrapper">


<?php include 'include/side_bar.php'; ?>

  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0">Admin</h1>
          </div><!-- /.col -->
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">Dashboard</li>
            </ol>
          </div><!-- /.col -->
        </div><!-- /.row -->
      </div><!-- /.container-fluid -->
    </div>
    <!-- /.content-header -->

    <!-- Main content -->
    <section class="content">
      <div class="container-fluid">
        <!-- Info boxes -->
        <div class="row">
          <div class="col-12 col-sm-6 col-md-3">
            <div class="info-box">
              <span class="info-box-icon bg-info elevation-1"><i class="fas fa-shopping-cart"></i></span>
              <?php
              include 'include/connect.php';
                       $selquery="SELECT * FROM `add_members`";
                      $runquery=mysqli_query($conn,$selquery);
                      $row=mysqli_num_rows($runquery);
              ?>
              <a href="view-our-products.php" style="color: #fff;">
              <div class="info-box-content">
                <span class="info-box-text">Branches
</span>
                <span class="info-box-number">
                  <?php echo $row; ?>
                  
                </span>
              </div>
            </a>
              <!-- /.info-box-content -->
            </div>
            <!-- /.info-box -->
          </div>
          <!-- /.col -->
          <div class="col-12 col-sm-6 col-md-3">
            <div class="info-box mb-3">
              <span class="info-box-icon bg-danger elevation-1"><i class="fas fa-shopping-cart"></i></span>
              <?php
             
                       $selquery="select * from members";
                      $runquery=mysqli_query($conn,$selquery);
                      $row=mysqli_num_rows($runquery);
              ?>
              <a href="view-our-recently-project.php" style="color: #fff;">   
              <div class="info-box-content">
                <span class="info-box-text">Recent
Members</span>
                <span class="info-box-number"><?php echo $row; ?></span>
              </div>
            </a>
              <!-- /.info-box-content -->
            </div>
            <!-- /.info-box -->
          </div>
          <!-- /.col -->

          <!-- fix for small devices only -->
          <div class="clearfix hidden-md-up"></div>

          <div class="col-12 col-sm-6 col-md-3">
            <div class="info-box mb-3">
              <span class="info-box-icon bg-success elevation-1"><i class="fas fa-shopping-cart"></i></span>
                   <?php
             
                       $selquery="select * from registration";
                      $runquery=mysqli_query($conn,$selquery);
                      $row=mysqli_num_rows($runquery);
                     ?>
                <a href="view-our-client-logo.php" style="color: #fff;">     
              <div class="info-box-content">
                <span class="info-box-text">Registration</span>
                <span class="info-box-number"><?php echo $row; ?></span>
              </div>
            </a>
              <!-- /.info-box-content -->
            </div>
            <!-- /.info-box -->
          </div>
          <!-- /.col -->
      <!--  -->
         
        <!-- /.row -->

     

      </div><!--/. container-fluid -->
    </section>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->

  <!-- Control Sidebar -->
  <aside class="control-sidebar control-sidebar-dark">
    <!-- Control sidebar content goes here -->
  </aside>
  <!-- /.control-sidebar -->
<?php include 'include/footer.php'; ?>