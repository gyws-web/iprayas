<?php 
include 'include/connect.php';
  include 'header.php';
  include 'sidebar.php';
?>
<?php 

if (isset($_GET['id'])) 
{
  $id = $_GET['id'];

  $sql = "SELECT * FROM `add_branches` WHERE id = '$id'";
  $result = mysqli_query($conn,$sql);

  while ($row = mysqli_fetch_assoc($result)) 
  {
    $CollageName = $row['Collage Name'];
    $CenterName  = $row['Center Name'];
    $CenterID   = $row['Center ID'];
    $City = $row ['City'];
    $State = $row['State'];
    $Branches = $row['Branches'];
    $CenterHead = $row['Center Head'];
    $CenterCoordinator = $row['Center Coordinator']; 
  }



}


?>


  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>Profile</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">User Profile</li>
            </ol>
          </div>
        </div>
      </div><!-- /.container-fluid -->
    </section>

    <!-- Main content -->
    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-3">

            <!-- Profile Image -->
            <div class="card card-primary card-outline">
              <div class="card-body box-profile">
                <div class="text-center">
                  <img alt="Avatar" class="table-avatar" class="profile-user-img img-fluid img-circle" src="dist/img/avatar4.png">
                </div>

                <h3 class="profile-username text-center">Nina Mcintire</h3>

                <p class="text-muted text-center">Software Engineer</p>

              

                <a href="#" class="btn btn-primary btn-block"><b>Follow</b></a>
              </div>
              <!-- /.card-body -->
            </div>
            <!-- /.card -->

            <!-- About Me Box -->
            <div class="card card-primary">
              <div class="card-header">
                <h3 class="card-title">About Me</h3>
              </div>
              <!-- /.card-header -->
              <div class="card-body">
                

                <strong><i class="fas fa-map-marker-alt mr-1"></i> Location</strong>

                <p class="text-muted">Malibu, California</p>

                <hr>

               

               
              </div>
              <!-- /.card-body -->
            </div>
            <!-- /.card -->
          </div>
          <!-- /.col -->
          <div class="col-md-9">
            <div class="card">
              <div class="card-header p-2">
              </div><!-- /.card-header -->
              <div class="card-body">
                <div class="tab-content">
                  <div class="active tab-pane" id="activity">
                    <!-- Post -->
                  <div class="tab-pane" id="settings">
                    <form class="form-horizontal">
                      <div class="form-group row">
                        <label for="inputName" class="col-sm-2 col-form-label">Collage Name</label>
                        <div class="col-sm-10">
                          <td><?php echo $CollageName; ?></td>
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="inputEmail" class="col-sm-2 col-form-label">Center Name</label>
                        <div class="col-sm-10">
                         <td><?php echo $CenterName;?></td>
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="inputName2" class="col-sm-2 col-form-label">Center ID</label>
                        <div class="col-sm-10">
                         <td><?php echo $CenterID; ?></td>
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="inputExperience" class="col-sm-2 col-form-label">C City</label>
                        <div class="col-sm-10">
                         <td><?php echo $City; ?></td>
                        </div>
                      </div>

                       <div class="form-group row">
                        <label for="inputExperience" class="col-sm-2 col-form-label">State</label>
                        <div class="col-sm-10">
                         <td><?php echo $State; ?></td>
                        </div>
                      </div>

                      <div class="form-group row">
                        <label for="inputExperience" class="col-sm-2 col-form-label">Branches</label>
                        <div class="col-sm-10">
                         <td><?php echo $Branches; ?></td>
                        </div>
                      </div>

                       <div class="form-group row">
                        <label for="inputExperience" class="col-sm-2 col-form-label">Center Head</label>
                        <div class="col-sm-10">
                         <td><?php echo $Branches; ?></td>
                        </div>
                      </div>

                       <div class="form-group row">
                        <label for="inputExperience" class="col-sm-2 col-form-label">Center Coordinator</label>
                        <div class="col-sm-10">
                         <td><?php echo $CenterCoordinator; ?></td>
                        </div>
                      </div>
                  
                     
                      </div>
                    
                    </form>
                  </div>
                  <!-- /.tab-pane -->
                </div>
                <!-- /.tab-content -->
              </div><!-- /.card-body -->
            </div>
            <!-- /.card -->
          </div>
          <!-- /.col -->
        </div>
        <!-- /.row -->
      </div><!-- /.container-fluid -->
    </section>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->


  <!-- Control Sidebar -->

  <!-- /.control-sidebar -->
</div>
<!-- ./wrapper -->
<?php 
include 'footer.php';
?>
</body>
</html>

