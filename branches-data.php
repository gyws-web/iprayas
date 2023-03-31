<?php include 'include/head.php'; ?>

<body>
    <?php
    include 'include/header.php';
    include 'include/connect.php';

    ?>

    <style>
        .team-sec-bg {
            background-color: #b9c2b2;

        }

        h2.team-heading {
            font-size: 26px;
            text-align: center;
        }

        .team-box {
            height: 400px;
            background-color: #fff;
            border-radius: 30px;
            margin: auto;
            width: 368px;
            box-shadow: rgba(0, 0, 0, 0.45) 0px 25px 20px -20px;
        }

        .img-sec {
            border-radius: 100px;
            overflow: hidden;
            height: 150px;
            width: 150px;
            position: relative;
            margin: auto;
            top: -60px;
            border: 8px solid #00000030;
        }

        h2.name-heading {
            font-size: 32px;
            font-weight: 600;
            color: #333;
            text-align: center;
        }

        h4.name-p {
            font-size: 13px;
            color: #18d26e;
            letter-spacing: 1px;
            text-align: center;
            padding-top: 10px;
        }

        .icons {
            text-align: center;
        }

        .icons li {
            display: inline-block;
            border: 1px solid #18d26e;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            padding-top: 11px;
            color: #18d26e;

        }

        ul.icon-list {
            margin-top: 22px;
        }
    </style>

    <?php

    if (isset($_GET['id'])) {
        $id = $_GET['id'];

        $selquery = "select * from add_branches where id=$id";
        $runquery = mysqli_query($conn, $selquery);
        $row = mysqli_num_rows($runquery);
        $arr = mysqli_fetch_array($runquery);
    }
    ?>

    <section class="team-section bg-grey bd-bottom circle shape padding">
        <div class="container">
            <div class="section-heading text-center ">
                <h2 style="margin-top: 60px;"><?php echo $arr['Center Name'] ?></h2>
                <span class="heading-border"></span>
            </div><!-- /Section Heading -->

            <div class="col-lg-12 sm-padding">
                <h3 style="text-align: center;"><?php echo $arr['Center Head'] ?></h3>
            </div>
        </div>

        <link rel="stylesheet" href="css/stylemembers.css">

        <div class="container" style="margin-top: 40px;">
            <div style=" justify-content: center;" class="row">
                <div class="section-heading text-center mb-40">
                    <h2>Center Members</h2>
                    <span class="heading-border"></span>
                </div><!-- /Section Heading -->

                <div class="row menu-list justify-content-center">
                    <?php
                    if (isset($arr['Center Name'])) {
                        $branches = $arr['Center Name'];
                        $sql = "SELECT * FROM `add_members` WHERE `CentreBranch` = '$branches'";
                        $rsult = mysqli_query($conn, $sql);

                        while ($row = mysqli_fetch_assoc($rsult)) {
                    ?>
                            <div class="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12 menu-item row" style="margin: 20px;">
                                <div class="speaker-layout3">
                                    <img src="./Admin/members_pic/<?php echo $row['image'] ?>" alt="speaker" class="img-fluid">
                                    <div class="item-title">
                                        <h3 class="title title-bold color-Light hover-yellow">
                                            <a href="member-details.php?id=<?php echo $row['id'] ?>"><?php echo $row['First Name'] ?>
                                            </a>
                                        </h3>
                                        <div class="title-Light size-md text-left color-Light"><?php echo $row['Post/ Desgination'] ?></div>
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

                    <?php }
                    } ?>
                </div>
            </div>
        </div>

    </section><!-- /Causes Section -->


 





    <section class="events-section bg-white bd-bottom padding">
        <div class="container">
            <div class="section-heading text-center mb-40">
                <h2>Events</h2>
                <span class="heading-border"></span>
                <!-- <span class="heading-border"></span>
                    <p>Help today because tomorrow you may be the one who <br> needs more helping!</p> -->
            </div><!-- /Section Heading -->

            <div id="event-carousel" class="events-wrap ">
                <?php
                error_reporting(E_ALL);

                if (isset($arr['Center Name'])) {
                    $branches = $arr['Center Name'];
                    $sql = "SELECT * FROM `Initiative` WHERE `branchs` = '$branches'";
                    $rsult = mysqli_query($conn, $sql);

                    while ($row = mysqli_fetch_assoc($rsult)) {
                ?>
                        <div class="events-item">

                            <div>
                                <div class="event-thumb">
                                    <img src="./Admin/Initiative_image/<?php echo $row['image'] ?>" alt="events" style="height: 400px;">
                                </div>
                                <div class="event-details">
                                    <strong><?php echo $row['first_title'] ?></strong>

                                    <div class="event-info">
                                        <p><i class="ti-calendar"></i>No of schools attended workshop: 15+</p>
                                        <p><i class="ti-calendar"></i>No of teachers who participated in workshop: 51+</p>
                                    </div>
                                    <br>
                                    <p style="font-size: 12px;"><?php echo $row['secound_title'] ?></p>
                                    <!-- <a href="#" class="default-btn">Read More</a> -->
                                </div>
                            </div>

                        </div><!-- Event-1 -->
                <?php }
                } ?>
            </div>

        </div>

    </section><!-- Events Section -->


    <div class="team-wrapper row">

        <div class="col-lg-12 sm-padding">

            <div class="team-wrap row" id="new">

                <?php

                if (isset($_GET['branche'])) {
                    $branche = $_GET['branche'];
                    $sql = "SELECT * FROM `initiative` WHERE `branchs` = '$branche'";
                    $rsult = mysqli_query($conn, $sql);

                    while ($row = mysqli_fetch_assoc($rsult)) {
                ?>

                        <div class="col-md-2.5 xs-padding">
                            <a href="initiatives-data.php?id=<?php echo $data['id'] ?>">
                                <div class="team-details">
                                    <img src="./Admin/Initiative_image/<?php echo $row['image'] ?>" alt="team" style="height: 250px; cursor: pointer;">
                                    <div class="hover">

                                    </div>
                                </div>
                            </a>
                            <p style="background: #fff; font-size: 20px; font-weight: 700; text-align: center; padding: 20px;"><?php echo $row['first_title'] . ' ' . $row['secound_title'] ?></p>


                        </div><!-- /Team-1 -->

                <?php
                    }
                }


                ?>


            </div>
        </div>
    </div>

    </section><!-- /Team Section -->




    <?php include 'include/footer.php'; ?>