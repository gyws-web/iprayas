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
            <h1>Super Admin</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Super Admin</a></li>
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
          <h3 class="card-title">Super Admin</h3>

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
         
          <table class="table table-striped projects">
              <thead>
                  <tr>
                      <th style="width: 1%">
                          S.N
                      </th>
                      <th style="width: 20%">
                          Name
                      </th>

                       <th style="width: 20%">
                         User Name
                      </th>
                  
                     
                      <th>
                         Password
                      </th>
                    
                      <th>
                        Action
                      </th>

                       <th>
                       Change Passowrd
                      </th>
                  </tr>
              </thead>
              <tbody>
                <tr>
                  <?php 
                  $a = 1;
                  $sql = "SELECT * FROM `user`";
                  $run = mysqli_query($conn,$sql);

                  while ($row = mysqli_fetch_assoc($run)) 
                  {
                    ?>

                  <td><?php echo $a++ ?></td>
                  <td><?php echo $row['name'] ?></td>
                  <td><?php echo $row['username'] ?></td>
                  <td><?php echo $row['password'] ?></td>
                  <td><a href="user_edit.php?id=<?php echo $row['id'] ?>">Edit</a></td>
                  <td><a href="change.php?id=<?php echo $row['id'] ?>">Add New Branche</a></td>

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
