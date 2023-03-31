
<?php include 'include/head.php'; ?>
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
            <h1>View Our Projects</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">Projects</li>
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
          <h3 class="card-title">Projects</h3>

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
                          First Title
                      </th>
                      <th style="width: 30%">
                          Secound Title
                      </th>
                      <th>
                          Img
                      </th>
                    
                      <th style="float: right;">
                        Action
                      </th>
                  </tr>
              </thead>
              <tbody>
                 <?php
                 $i=1;
                include 'include/connect.php';
                 $result = mysqli_query($conn, "SELECT * FROM recently_completed_work");
                 while ($data = mysqli_fetch_array($result)) {
                
                 ?>
                
                 <tr>
                      <td>
                         <?php echo $i++; ?>
                      </td>
                      <td>
                          <a>
                              <?php echo $data['first_title'] ?>
                          </a>
                          <br/>
                        
                      </td>
                       <td>
                          <a>
                              <?php echo $data['secound_title'] ?>
                          </a>
                          <br/>
                        
                      </td>
                      <td>
                          <ul class="list-inline">
                              <li class="list-inline-item">
                                  <img alt="Avatar" class="table-avatar" src="image/<?php echo $data['img'] ?>">
                              </li>
                             
                          </ul>
                      </td>
                    
                      
                       <td class="project-actions text-right">
                         
                          <a class="btn btn-info btn-sm" href="update2.php?id=<?php echo $data['id'] ?>">
                              <i class="fas fa-pencil-alt">
                              </i>
                              Edit
                          </a>
                          <a class="btn btn-danger btn-sm" href="delete2.php?id=<?php echo $data['id'] ?>">
                              <i class="fas fa-trash">
                              </i>
                              Delete
                          </a>
                      </td>
                  </tr>
           
                <?php
                 }
                ?>
                 
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
<?php include 'include/footer.php'; ?>