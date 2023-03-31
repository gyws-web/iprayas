<?php include 'include/head.php'; ?>



<body>
    <?php
    include 'include/header.php';
    include 'include/connect.php';
    ?>
    <div class="header-height"></div>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css">
    <!-- Custom CSS -->
    <link rel="stylesheet" href="css/stylemembers.css">
    <link rel="stylesheet" href="css/each_pagination.css">

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

    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Students</title>

        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>

    </head>


    <section class="about-section bd-bottom shape circle padding">
        <div class="container">
            <div style=" justify-content: center;" class="row">
                <div class="section-heading text-center mb-40">
                    <h2>Our sponsored students</h2>
                    <span class="heading-border"></span>
                    <p>We are a group of individuals based in IIT Kharagpur who have seen the success of the strategies and plans of GYWS, IIT Kharagpur, one of India's largest govt. reg. student run NGO which aims at the socio economic development of the underprivileged near the IIT Kharagpur campus. .</p>
                </div><!-- /Section Heading -->

                <div class="container-fluid" id="filter">
                    <!-- <div class="section-heading text-center ">
                <h2>All Member Details</h2>
                <span class="heading-border"></span>
            </div> -->

                   
                    <!-- <div class="team-wrapper row">

                <div class="col-lg-12 sm-padding">

                    <div class="team-wrap row" id="menber">

                        <?php

                        $sql = "SELECT * FROM `add_members` WHERE status = 0";
                        $rsult = mysqli_query($conn, $sql);
                        while ($data = mysqli_fetch_assoc($rsult)) {
                        ?>

                            <div class="col-md-3 xs-padding">
                                <a href="member-details.php?id=<?php echo $data['id'] ?>">
                                    <div class="team-details">
                                        <img src="./Admin/members_pic/<?php echo $data['image'] ?>" alt="team" style="height: 250px; cursor: pointer;">
                                        <div class="hover">

                                        </div>
                                    </div>
                                </a>
                                <p style="background: #fff; font-size: 20px; font-weight: 700; text-align: center; padding: 20px;"><?php echo $data['First Name'] . ' ' . $data['Last Name'] ?></p>
                            </div>


                        <?php
                        }


                        ?>



                    </div>
                </div>
            </div> -->
                    <div class="page">
                        <div class="col-sm-2">
                            <!-- <input class='student__search' type='text' placeholder='search'> -->
                        </div>


                        <ul class="student-list">

                            <div class="team-wrapper row" id="alldata">

                                <div class="col-lg-12 sm-padding">
                                    <div class="team-wrap row" id="each">

                                        <?php
                                        $sql = "SELECT * FROM `each_students` WHERE status = 0";
                                        $rsult = mysqli_query($conn, $sql);
                                        while ($data = mysqli_fetch_assoc($rsult)) {
                                        ?>
                                            <div class="col-md-3 xs-padding">
                                                <li class="student-item cf">
                                                    <div class="speaker-layout3">

                                                        <img src="./Admin/each_pic/<?php echo $data['image'] ?>" alt="speaker" class="img-fluid">
                                                        <div class="item-title">
                                                            <h3 class="title title-bold color-Light hover-grey">
                                                                <a href="each-details.php?id=<?php echo $data['id'] ?>"><?php echo $data['first_name'] ?>
                                                                </a>
                                                            </h3>
                                                            <div class="title-Light size-md text-left color-Light"><?php echo $data['standard'] ?></div>
                                                            <div class="title-Light size-md text-left color-Light"><strong style="font-weight: 900px;"><?php echo $data['school'] ?></strong></div>
                                                        </div>

                                                    </div>
                                                </li>
                                            </div><!-- /Team-1 -->
                                        <?php    }          ?>
                                    </div>

                                </div>
                            </div>
                        </ul>
                        <div class="pagination">
                            <ul class="pagination__list">

                            </ul>

                        </div>
                    </div>

                </div>
    </section><!-- /Causes Section -->




    <?php
    include 'footer.php';
    ?>

    <!-- Control Sidebar -->
    <aside class="control-sidebar control-sidebar-dark">
        <!-- Control sidebar content goes here -->
    </aside>
    <!-- /.control-sidebar -->
    </div>
    <!-- ./wrapper -->



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
    <script src="plugins/jquery/jquery.min.js"></script>
    <!-- Bootstrap 4 -->
    <script src="plugins/bootstrap/js/bootstrap.bundle.min.js"></script>
    <!-- DataTables  & Plugins -->
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
    <!-- AdminLTE App -->
    <script src="dist/js/adminlte.min.js"></script>
    <!-- AdminLTE for demo purposes -->
    <script src="dist/js/demo.js"></script>

    <script src="js/each.js"></script>
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