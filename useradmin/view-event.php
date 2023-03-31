
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
            <h1>View Initiatives</h1>
          </div>

          <span>
            <?php 

            if (isset($_GET['status'])) 
            {
              $status = $_GET['status'];
              if ($status == 1) 
              {
              ?>

              <div class="alert alert-success" role="alert">
                  Approval
</div>

              <?php
              }
            }



            ?>
          </span>


          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="view-event.php">Home</a></li>
              <li class="breadcrumb-item"><a href="add-new-event.php">Add Initiatives</a></li>
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
          <h3 class="card-title">View Initiatives</h3>

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
                          Title
                      </th>
                  
                     
                      <th>
                          text
                      </th>

                      <th>
                        Branches
                      </th>

                      <th>
                        profile
                      </th>
                    
                      <th>
                        Action
                      </th>

                     
                  </tr>
              </thead>
              <tbody>
                 <?php
                 $i=1;
                  include 'include/connect.php';
                 $result = mysqli_query($conn, "SELECT * FROM initiative");
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
                          <a>
                              <?php echo $data['branchs'] ?>
                          </a>
                          <br/>
                        
                      </td>

                       <td>
                          <a>
                              <img src="../Admin/Initiative_image/<?php echo $data['image'] ?>" height='50px';>
                          </a>
                          <br/>
                        
                      </td>
               
                   
                      
                      <td>
                         
                          <a class="btn btn-info btn-sm" href="update-initiatives.php?id=<?php echo $data['id'] ?>">
                              <i class="fas fa-pencil-alt">
                              </i>
                              Edit
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
<a href=""></a>