<?php include 'include/head.php'; ?>

<?php include 'include/head_admin.php';   ?>



<body>
    <?php
    include 'include/header.php';
    include 'include/connect.php';
    ?>
    <div class="header-height"></div>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css">
    <!-- Custom CSS -->
    <link rel="stylesheet" href="css/stylemembers.css">
    <div class="pager-header">
        <div class="container">
            <div class="page-content">
                <h2>All Member</h2>
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="index.html">Home</a></li>
                    <li class="breadcrumb-item active">All Member</li>
                </ol>
            </div>
        </div>
    </div><!-- /Page Header -->


    <section class="about-section bd-bottom shape circle padding">
        <div class="container">
            <div style=" justify-content: center;" class="row">
                <div class="section-heading text-center mb-40">
                    <h2>Home Branch Members</h2>
                    <span class="heading-border"></span>
                    <p>We are a group of individuals based in IIT Kharagpur who have seen the success of the strategies and plans of GYWS, IIT Kharagpur, one of India's largest govt. reg. student run NGO which aims at the socio economic development of the underprivileged near the IIT Kharagpur campus. We were inspired to reciprocate the same to various other parts of the nation so as to create a greater impact by spreading knowledge and experience gained through GYWS which has been running successfully since 2002 and now has over 150 active members and a budget of 30 lakh INR per annum.PRAYAScurrently aims at forming teams of spirited students in various colleges across India and we have already succeeded in convincing over 20 colleges which include various reputed IITs, NITs and IIITs.</p>
                </div><!-- /Section Heading -->

                <!-- <div class="row">
                    <div class="col-md-12 xs-padding"></div>
                    <div class="col-md-12 xs-padding">
                        <div class="profile-wrap">
                            <img class="profile" src="img/prerit.jpg" alt="profile">
                            <h3>Prerit Jain <span>Founder, PRAYAS </span></h3>
                            

                        </div>
                    </div>

                </div>


                <div class="row">
                    <div class="col-md-12 xs-padding"></div>
                    <div class="col-md-3 xs-padding">
                        <div class="profile-wrap">
                            <img class="profile" src="img/prerit.jpg" alt="profile">
                            <h3>Prerit Jain <span>Founder, PRAYAS </span></h3>
                            

                        </div>
                    </div>

                    <div class="col-md-3 xs-padding">
                        <div class="profile-wrap">
                            <img class="profile" src="img/profile.jpg" alt="profile">
                            <h3>Jonathan Smith <span>CEO & Founder of Charitify.</span></h3>
                            

                        </div>
                    </div>

                    <div class="col-md-3 xs-padding">
                        <div class="profile-wrap">
                            <img class="profile" src="img/profile.jpg" alt="profile">
                            <h3>Jonathan Smith <span>CEO & Founder of Charitify.</span></h3>
                            

                        </div>
                    </div>
                    <div class="col-md-3 xs-padding">
                        <div class="profile-wrap">
                            <img class="profile" src="img/profile.jpg" alt="profile">
                            <h3>Jonathan Smith <span>CEO & Founder of Charitify.</span></h3>
                            

                        </div>
                    </div>
                    <div class="col-md-3 xs-padding"></div>

                </div> -->

                <div class="row menu-list justify-content-center">
                    <div class="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12 menu-item ">
                        <div class="speaker-layout3">
                            <img src="https://gyws.org/gyws/assets/img/new_website_img/about/founder.jpg" alt="speaker" class="img-fluid">
                            <div class="item-title">
                                <h3 class="title title-bold color-Light hover-yellow">
                                    <a href="member-details.php">Mrinal K Bhanja</a>
                                </h3>
                                <div class="title-Light size-md text-left color-Light">Chairman, PRAYAS </div>
                            </div>
                            <div class="item-social">
                                <ul>
                                    <li>
                                        <a href="#" title="facebook">
                                            <i class="fa fa-facebook" aria-hidden="true"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" title="twitter">
                                            <i class="fa fa-twitter" aria-hidden="true"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" title="linkedin">
                                            <i class="fa fa-linkedin" aria-hidden="true"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" title="pinterest">
                                            <i class="fa fa-pinterest" aria-hidden="true"></i>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12 menu-item ">
                        <div class="speaker-layout3">
                            <img src="img/prerit.jpg" alt="speaker" class="img-fluid">
                            <div class="item-title">
                                <h3 class="title title-bold color-Light hover-yellow">
                                </h3>
                                <div class="title-Light size-md text-left color-Light">Founder and Advisor, PRAYAS </div>
                            </div>
                            <div class="item-social">
                                <ul>
                                    <li>
                                        <a href="#" title="facebook">
                                            <i class="fa fa-facebook" aria-hidden="true"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" title="twitter">
                                            <i class="fa fa-twitter" aria-hidden="true"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" title="linkedin">
                                            <i class="fa fa-linkedin" aria-hidden="true"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" title="pinterest">
                                            <i class="fa fa-pinterest" aria-hidden="true"></i>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div class="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12 menu-item ">

                        <?php
                        $branches = 'Headquarter';
                        $post = 'Chief Executive Officer, PRAYAS ';
                        $sql = "SELECT * FROM `add_members` WHERE `Post/ Desgination` = '$post' ";
                        $rsult = mysqli_query($conn, $sql);
                        while ($data = mysqli_fetch_assoc($rsult)) {
                        ?>

                            <div class="speaker-layout3">
                                <img src="./Admin/members_pic/<?php echo $data['image'] ?>" alt="speaker" class="img-fluid">
                                <div class="item-title">
                                    <h3 class="title title-bold color-Light hover-grey">
                                        <a href="member-details.php?id=<?php echo $data['id'] ?>"><?php echo $data['First Name'] ?>
                                        </a>
                                    </h3>
                                    <div class="title-Light size-md text-left color-Light"><?php echo $data['Post/ Desgination'] ?></div>
                                    <!-- <div class="title-Light size-md text-left color-Light"><strong style="font-weight: 900px;"><?php echo $data['CentreBranch'] ?></strong></div> -->
                                </div>
                                <div class="item-social">
                                    <ul>
                                        <li>
                                            <a href="<?php echo $data['facebook'] ?>" target="blank" title="facebook">
                                                <i class="fa fa-facebook" aria-hidden="true"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="<?php echo $data['instagram'] ?>" target="blank" title="twitter">
                                                <i class="fa fa-instagram" aria-hidden="true"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="<?php echo $data['LinkedIn'] ?>" target="blank" title="linkedin">
                                                <i class="fa fa-linkedin" aria-hidden="true"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        <?php
                        }
                        ?>
                    </div>
                </div>

                <div class="team-wrapper row justify-content-center">

                    <div class="col-lg-12 sm-padding">

                        <div class="team-wrap row">

                            <?php
                            $branches = 'Headquarter';
                            $post = 'Chief Executive Officer, PRAYAS ';
                            $sql = "SELECT * FROM `add_members` WHERE (`CentreBranch` = '$branches' AND `Post/ Desgination` != '$post') ";
                            $rsult = mysqli_query($conn, $sql);
                            while ($data = mysqli_fetch_assoc($rsult)) {
                            ?>

                                <div class="col-md-3 xs-padding">
                                    <div class="speaker-layout3">
                                        <img src="./Admin/members_pic/<?php echo $data['image'] ?>" alt="speaker" class="img-fluid">
                                        <div class="item-title">
                                            <h3 class="title title-bold color-Light hover-grey">
                                                <a href="member-details.php?id=<?php echo $data['id'] ?>"><?php echo $data['First Name'] ?>
                                                </a>
                                            </h3>
                                            <div class="title-Light size-md text-left color-Light"><?php echo $data['Post/ Desgination'] ?></div>
                                            <!-- <div class="title-Light size-md text-left color-Light"><strong style="font-weight: 900px;"><?php echo $data['CentreBranch'] ?></strong></div> -->
                                        </div>
                                        <div class="item-social">
                                            <ul>
                                                <li>
                                                    <a href="<?php echo $data['facebook'] ?>" target="blank" title="facebook">
                                                        <i class="fa fa-facebook" aria-hidden="true"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="<?php echo $data['instagram'] ?>" target="blank" title="twitter">
                                                        <i class="fa fa-instagram" aria-hidden="true"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="<?php echo $data['LinkedIn'] ?>" target="blank" title="linkedin">
                                                        <i class="fa fa-linkedin" aria-hidden="true"></i>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div><!-- /Team-1 -->
                            <?php
                            }
                            ?>
                        </div>
                    </div>
                </div>

                <!-- <div class="row menu-list justify-content-center">
                    <div class="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12 menu-item">
                        <div class="speaker-layout3">
                            <img src="img/nitish.jpg" alt="speaker" class="img-fluid">
                            <div class="item-title">
                                <h3 class="title title-bold color-Light hover-yellow">
                                    <a href="member-details.php">Nitish Rathore</a>
                                </h3>
                                <div class="title-Light size-md text-left color-Light">HR Officer</div>
                            </div>
                            <div class="item-social">
                                <ul>
                                    <li>
                                        <a href="#" title="facebook">
                                            <i class="fa fa-facebook" aria-hidden="true"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" title="twitter">
                                            <i class="fa fa-twitter" aria-hidden="true"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" title="linkedin">
                                            <i class="fa fa-linkedin" aria-hidden="true"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" title="pinterest">
                                            <i class="fa fa-pinterest" aria-hidden="true"></i>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div> -->
    </section><!-- /Causes Section -->

    <section class="team-section bg-grey bd-bottom shape circle padding">
        <div class="wrapper">
            <!-- Content Wrapper. Contains page content -->
            <div class="content-wrapper">
                <!-- Content Header (Page header) -->
                <section class="content-header">
                    <div class="container-fluid">
                        <div class="row mb-2">
                            <div class="col-sm-6">
                                <h1> All Members</h1>
                            </div>
                            <!-- <div class="col-sm-6">
                                <ol class="breadcrumb float-sm-right">
                                    <li class="breadcrumb-item"><a href="#">Home</a></li>
                                    <li class="breadcrumb-item active">Members</li>
                                    <li class="breadcrumb-item"> <a href="add-members.php" class="btn btn-primary">Add Member</a></li>
                                </ol>
                            </div> -->
                        </div>
                    </div><!-- /.container-fluid -->
                </section>

                <!-- Main content -->
                <section class="content">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-12">
                                <!-- /.card -->
                                <div class="card">
                                    <!-- /.card-header -->
                                    <div class="card-body">
                                        <table id="example1" class="table table-bordered table-striped">
                                            <thead>
                                                <tr>
                                                    <th>SN..</th>
                                                    <th>First Name</th>
                                                    <th>Centre/Branch</th>
                                                    <th>Post/ Desgination</th>
                                                    <th>Image</th>
                                                    <th>Year</th>
                                                    <th>Email</th>
                                                    <th>Instagram Link</th>
                                                    <th>Facebook Link</th>
                                                    <th>LinkedIn Link</th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                <?php
                                                $a = 1;
                                                $sql = "SELECT * FROM `add_members` ORDER BY `id` ASC";
                                                $run = mysqli_query($conn, $sql);
                                                while ($row = mysqli_fetch_assoc($run)) {
                                                ?>
                                                    <tr>
                                                        <td><?php echo $a++ ?></td>
                                                        <td> <a href="member-details.php?id=<?php echo $row['id'] ?>" target="blank"><?php echo $row['First Name']; ?></td>
                                                        <td><?php echo $row['CentreBranch'] ?></td>
                                                        <td><?php echo $row['Post/ Desgination'] ?></td>
                                                        <td><img src="Admin/members_pic/<?php echo $row['image'] ?>" height="80" width="70" /></td>
                                                        <td><?php echo $row['Year Of Joining'] ?></td>
                                                        <td><?php echo $row['Email'] ?></td>
                                                        <td><?php echo $row['instagram'] ?></td>
                                                        <td><?php echo $row['facebook'] ?></td>
                                                        <td><?php echo $row['LinkedIn'] ?></td>
                                                    </tr>
                                                <?php
                                                }

                                                ?>
                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <th>SN</th>
                                                    <th>First Name</th>
                                                    <th>Centre/Branch</th>
                                                    <th>Post/ Desgination</th>
                                                    <th>Image</th>
                                                    <th>Year</th>
                                                    <th>Email</th>
                                                    <th>Instagram Link</th>
                                                    <th>Facebook Link</th>
                                                    <th>LinkedIn Link</th>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                    <!-- /.card-body -->
                                </div>
                                <!-- /.card -->
                            </div>
                            <!-- /.col -->
                        </div>
                        <!-- /.row -->
                    </div>
                    <!-- /.container-fluid -->
                </section>
                <!-- /.content -->
            </div>
        </div>
        <!-- /.content-wrapper -->

    </section><!-- /Team Section -->


    <?php include 'include/footer.php'; ?>

    <script type="text/javascript">
        function memberfilter() {
            var x = document.getElementById("member").value;

            $.ajax({

                url: "mamber.php",
                method: "POST",
                data: {

                    id: x
                },

                success: function(data) {

                    $("#menber").html(data);

                }


            });
        }
    </script>


    <script type="text/javascript">
        function yearfilter() {
            var x = document.getElementById("member").value;
            var y = document.getElementById("year").value;

            $.ajax({

                url: "year.php",
                method: "POST",
                data: {
                    idy: y,
                    idx: x
                },

                success: function(data) {

                    $("#menber").html(data);

                }


            });
        }
    </script>

    <script type="text/javascript">
        function reset() {

            {
                elem = document.getElementById('alldata');
                elem.innerHTML = text;
            }
        }
    </script>


    <script>
        function myFunction() {
            // Declare variables
            var input, filter, ul, li, a, i, txtValue;
            input = document.getElementById('member');
            filter = input.value.toUpperCase();
            ul = document.getElementById("myUL");
            li = ul.getElementsByTagName('li');

            // Loop through all list items, and hide those who don't match         
            the search query
            for (i = 0; i < li.length; i++) {
                a = li[i].getElementsByTagName("a")[0];
                txtValue = a.textContent || a.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    li[i].style.display = "";
                } else {
                    li[i].style.display = "none";
                }
            }
        }
    </script>

    <!-- jQuery -->
    <script src="Admin/plugins/jquery/jquery.min.js"></script>
    <!-- Bootstrap 4 -->
    <script src="Admin/plugins/bootstrap/js/bootstrap.bundle.min.js"></script>
    <!-- DataTables  & Admin/plugins -->
    <script src="Admin/plugins/datatables/jquery.dataTables.min.js"></script>
    <script src="Admin/plugins/datatables-bs4/js/dataTables.bootstrap4.min.js"></script>
    <script src="Admin/plugins/datatables-responsive/js/dataTables.responsive.min.js"></script>
    <script src="Admin/plugins/datatables-responsive/js/responsive.bootstrap4.min.js"></script>
    <script src="Admin/plugins/datatables-buttons/js/dataTables.buttons.min.js"></script>
    <script src="Admin/plugins/datatables-buttons/js/buttons.bootstrap4.min.js"></script>
    <script src="Admin/plugins/jszip/jszip.min.js"></script>
    <script src="Admin/plugins/pdfmake/pdfmake.min.js"></script>
    <script src="Admin/plugins/pdfmake/vfs_fonts.js"></script>
    <script src="Admin/plugins/datatables-buttons/js/buttons.html5.min.js"></script>
    <script src="Admin/plugins/datatables-buttons/js/buttons.print.min.js"></script>
    <script src="Admin/plugins/datatables-buttons/js/buttons.colVis.min.js"></script>
    <!-- AdminLTE App -->
    <script src="Admin/dist/js/adminlte.min.js"></script>
    <!-- AdminLTE for demo purposes -->
    <script src="Admin/dist/js/demo.js"></script>
    <!-- Page specific script -->
    <script>
        $(function() {
            $("#example1").DataTable({
                "responsive": true,
                "lengthChange": true,
                "autoWidth": true,
                "info": true,
                "ordering": true,
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