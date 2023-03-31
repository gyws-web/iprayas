<?php include 'include/head.php'; ?>

<meta http-equiv="content-type" content="text/html;charset=utf-8" />

<head>
    <!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-J71SLVCQ9Z"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-J71SLVCQ9Z');
</script>
    <meta charset="utf-8">
    <title>Prayas</title>
    <meta content="width=device-width, initial-scale=1.0" name="viewport">
    <meta content="" name="keywords">
    <meta content="" name="description"><!-- Favicons-->
    <link href="img/Prayas_logo%20(1).png" rel="icon">
    <link href="img/apple-touch-icon.png" rel="apple-touch-icon"><!-- Google Fonts-->
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,700,700i|Montserrat:300,400,500,700" rel="stylesheet">
    <link href="vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css">
    <link href="vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet"><!-- Bootstrap CSS File-->
    <link href="lib/bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <!-- Libraries CSS Files-->
    <link href="lib/font-awesome/css/font-awesome.min.css" rel="stylesheet">
    <link href="lib/animate/animate.min.css" rel="stylesheet">
    <link href="lib/ionicons/css/ionicons.min.css" rel="stylesheet">
    <link href="lib/owlcarousel/assets/owl.carousel.min.css" rel="stylesheet">
    <link href="lib/Prayasbox/css/Prayasbox.min.css" rel="stylesheet"><!-- css files used-->
    <link href="css/networkStyle.css" rel="stylesheet" type="text/css"><!-- js scripts used-->
    <script src="networkJS/modernizr.custom.js"></script>
    <script src="js/network.js"></script><!-- link scripts used-->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css">
    <script src="https://code.jquery.com/jquery-3.4.1.min.js" integrity="sha384-vk5WoKIaW/vJyUAd9n/wmopsmNhiy+L2Z+SBxGYnUkunIxVxAv/UtMOhba/xskxh" crossorigin="anonymous"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/highPrayas.js/9.9.0/highPrayas.min.js"></script>
    <!-- for how we can help ram section-->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"></script>
    <!-- Main Stylesheet File-->
    <link href="css/style.css" rel="stylesheet">
</head>

<body>
    <!-- #header-->
    <?php
    include 'include/header.php';
    include 'include/connect.php';

    ?>

    <!-- ==========================bookblock section starts from here-->
    <section id="flipbook" class="bg-dark">
        <div class="container">
            <div class="row justify-content-center">
                <!--<div class="col-md-5">
<div class="right-text">
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut at sem id nisl commodo luctus nec eu est.</p>
<br>
</div>
</div>-->
                <div class="col-md-7">
                    <nav><button id="bb-nav-prev"><i class="fa fa-caret-left"></i></button><button id="bb-nav-next"><i class="fa fa-caret-right"></i></button></nav>
                    <div class="bb-custom-wrapper">
                        <div id="bb-bookblock" class="bb-bookblock">
                            <div class="bb-item cover">
                                <div style=" height: 100%; overflow: hidden;" class="container-fluid">
                                    <div style="height: 100%;" class="row">
                                        <div style="padding: 0;" class="col-6"><img src="img/network/bookblock/cover.jpg" style="height: 100%;"></div>
                                        <div class="col-6" style="text-align: center;"><img src="img/network/bookblock/ram1.png" style="margin-top: 10px; height: 42%; width:auto; ">
                                            <p style="margin-top: 10px;">Hello, he is Ram, a college student. He sees
                                                some social problems around locality. Instead of blaming governments he
                                                wants to take control and do something for society.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="bb-item">
                                <div style=" height: 100%; overflow: hidden;" class="container-fluid">
                                    <div class="row">
                                        <div class="col-6" style="text-align: center;"><img src="img/network/bookblock/ram2.png" style="margin-top: 10px; height: 32%; width:auto;">
                                            <p style="margin-top: 15px;">Ram feels helpless because neither he has a
                                                team nor guidance to solve these problems. He wants to discuss his ideas
                                                but he doesn't know where to go.</p>
                                        </div>
                                        <div class="col-6"><img src="img/network/bookblock/ram3.png" style="margin-top: 10px;">
                                            <p style="margin-top: 30px;">He knows how to solve a theoretical problem but
                                                he never got a chance to work on the real-life problem.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="bb-item">
                                <div style=" height: 100%; overflow: hidden;" class="container-fluid">
                                    <div class="row">
                                        <div class="col-6">
                                            <div class="text-center bookblock-page-head">What does Ram need to have?
                                            </div>
                                            <center><img src="img/network/bookblock/page5.png" class="page5img">
                                            </center>
                                            <div class="mb-2">Determination and dedication to bring a change in society.
                                            </div>
                                            <div class="mb-2">Can devote around 7 hours per week.</div>
                                            <div>Is willing to take up responsibility and fulfill them truthfully.</div>
                                        </div>
                                        <div class="col-6">
                                            <div class="text-center bookblock-page-head">How can Ram help us?</div>
                                            <center><img src="img/network/bookblock/research.png" style="width: 50%; margin-top: 20px"></center>
                                            <p style="margin-top: 25px;">By participating in initial research work
                                                before implementing any social cause.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="bb-item">
                                <div style=" height: 100%; overflow: hidden;" class="container-fluid">
                                    <div class="row">
                                        <div class="col-6">
                                            <center><img src="img/network/bookblock/reach.png" style="width: 60%; margin-top: 35px;"></center>
                                            <p style="margin-top: 30px">By reaching out local people/school for
                                                implementing planned projects in his locality/college.</p>
                                        </div>
                                        <div class="col-6">
                                            <center><img src="img/network/bookblock/proposal.png" style="width: 70%; margin-top: 30px;"></center>
                                            <p style="margin-top: 25px;" class="mb-2">By connecting social enthusiast in
                                                and around his campus to the Centres Network.</p>
                                            <p>Preseting Proposal to Local Bodies/Municipality/Public School.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="networkJS/jquerypp.custom.js"></script>
    <script src="networkJS/jquery.bookblock.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"></script>
    <script src="js/network.js"></script>
    <!-- ================================bookblock section code ends here   ---><br><!-- How we can help Ram section-->
    <div id="how_we_can_help" class="container text-center my-3">

        <div class="section-heading text-center mb-40">
            <h2 style="margin-top: 20px;">How we can help Ram?</h2>
            <span class="heading-border"></span>
            <!-- <p>We always believe that building a forest is much better than building a tree, and so the social workers, along with building their respective social initiatives (their own trees) can support and share their experiences with our members to help us shape the mindset of youth who can build the forest of social initiatives in the future.</p> -->
        </div><!-- /Section Heading -->
        <div class="row mx-auto my-auto">
            <div id="recipeCarousel" data-ride="carousel" class="carousel w-100">
                <div role="listbox" class="carousel-inner w-100">
                    <div class="carousel-item active">
                        <div class="col-md-4">
                            <div class="namancard namancard-body"><img src="img/network/1.png" width="200px" height="200px">
                                <div class="namancard-text">
                                    <p>1. By providing him a Platform where he can work with like-minded individuals.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="carousel-item">
                        <div class="col-md-4">
                            <div class="namancard namancard-body"><img src="img/network/2.png" width="200px" height="200px">
                                <div class="namancard-text">
                                    <p>2. By Bringing out the leader in him.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="carousel-item">
                        <div class="col-md-4">
                            <div class="namancard namancard-body"><img src="img/network/3.png" width="200px" height="200px">
                                <div class="namancard-text">
                                    <p>3. To form a team and develop Team - bonding among his college mates.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="carousel-item">
                        <div class="col-md-4">
                            <div class="namancard namancard-body"><img src="img/network/4.png" width="200px" height="200px">
                                <div class="namancard-text">
                                    <p>4. We plan activities at the ground level of any problem. While performing any
                                        activities you may face many real time challenges where we will be there to
                                        Guide you.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="carousel-item">
                        <div class="col-md-4">
                            <div class="namancard namancard-body"><img src="img/network/5.png" width="200px" height="200px">
                                <div class="namancard-text">
                                    <p>5. By involving him in a discussion of nation-wide activities for Social issues
                                        where he will get a chance to brainstorm the ideas .</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="carousel-item">
                        <div class="col-md-4">
                            <div class="namancard namancard-body"><img src="img/network/6.png" width="200px" height="200px">
                                <div class="namancard-text">
                                    <p>6. By allowing him to lead an organisation that represents his city or college in
                                        a nation wide platform.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="carousel-item">
                        <div class="col-md-4">
                            <div class="namancard namancard-body"><img src="img/network/7.png" width="200px" height="200px">
                                <div class="namancard-text">
                                    <p>7. By nurturing him to gain soft skills and management skills which are required
                                        to perform any social based activity.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div><a href="#recipeCarousel" role="button" data-slide="prev" class="carousel-control-prev w-auto"><span aria-hidden="true" class="carousel-control-prev-icon bg-dark border border-dark rounded-circle"></span><span class="sr-only">Previous</span></a><a href="#recipeCarousel" role="button" data-slide="next" class="carousel-control-next w-auto"><span aria-hidden="true" class="carousel-control-next-icon bg-dark border border-dark rounded-circle"></span><span class="sr-only">Next</span></a>
            </div>
        </div><!-- <h5 class="mt-2">Advances one slide at a time</h5>-->
    </div>
    <script src="networkJS/howToHelpRam.js"></script><!-- how we can help ram secion ends here---><br>
    <!-- from here chinmay's code starts ----------->
    <section id="about"><br>
        <div class="container fluid">
            <div style=" justify-content: center;" class="row">
                <div class="section-heading text-center mb-40">
                    <h2 style="margin-top: 0px;">Who can join us?</h2>
                    <span class="heading-border"></span>
                    <!-- <p>We always believe that building a forest is much better than building a tree, and so the social workers, along with building their respective social initiatives (their own trees) can support and share their experiences with our members to help us shape the mindset of youth who can build the forest of social initiatives in the future.</p> -->
                </div><!-- /Section Heading -->
            </div>
            <div style=" justify-content: center;" class="row"><img id="img" src="img/network/joinus.png" alt="Avatar" align="right" style=" margin-top: 0px;" class="qa"></div>
        </div><br><br>
        <div class="container">
            <div class="row about-cols">
                <div class="col-md-4 wow fadeInUp">
                    <div class="about-col">
                        <div class="img">
                            <center><img src="img/network/socialworker.png" alt="" style="width: 50%;" class="img-fluid mt-2"></center>
                        </div>
                        <h2 class="title">Social Worker</h2>
                        <p style="font-size: 16px;">We always believe that building a forest is much better than
                            building a tree, and so the social
                            workers</p><a href="worker.php"><button style="margin-left: 20px;"><strong style="color:#69bc45;">Read more</strong></button></a><br><br>
                    </div>
                </div>
                <div data-wow-delay="0.1s" class="col-md-4 wow fadeInUp">
                    <div class="about-col">
                        <div class="img">
                            <center><img src="img/network/student.png" alt="" style="width: 50%;" class="img-fluid mt-2"></center>
                        </div>
                        <h2 class="title">College Student</h2>
                        <p style="font-size: 16px;">College Students like Ram, <br> a) Who instead of blaming
                            governments wants...</p><a href="student.php"><button style="margin-left: 20px;"><strong style="color:#69bc45;">Read more</strong></button></a><br><br>
                    </div>
                </div>
                <div data-wow-delay="0.2s" class="col-md-4 wow fadeInUp">
                    <div class="about-col">
                        <div class="img">
                            <center><img src="img/network/collegeprofessor.png" alt="" style="width: 50%;" class="img-fluid mt-2"></center>
                        </div>
                        <h2 class="title">College Professor</h2>
                        <p style="font-size: 16px;">If you are a College Professor, <br> a) who thinks that your
                            students should get opertunity...</p><a href="professor.php"><button style="margin-left: 20px;"><strong style="color:#69bc45;">Read
                                    more</strong></button></a><br><br>
                    </div>
                </div>
            </div>
        </div>
    </section><!-- chinmay's code ends here--><br><br><br><!-- why to join us? starts-->
    <div style=" justify-content: center;" class="row">
        <div class="section-heading text-center mb-40">
            <h2 style="margin-top: 20px;">Why would Ram join us?</h2>
            <span class="heading-border"></span>
            <!-- <p>We always believe that building a forest is much better than building a tree, and so the social workers, along with building their respective social initiatives (their own trees) can support and share their experiences with our members to help us shape the mindset of youth who can build the forest of social initiatives in the future.</p> -->
        </div><!-- /Section Heading -->
        <div class="rajrow">
            <div class="rajcolumn">
                <div class="rajcard wow fadeInUp">
                    <p>1. By joiningPRAYAS, he will become a part of a network which is spread nationwide across 12 states.
                        He could share and discuss his ideas on a platform consisting of more than 150 members having
                        diverse opinions.</p>
                </div>
            </div>
            <div class="rajcolumn">
                <div class="rajcard wow fadeInUp">
                    <p>2. He will find this platform unique from other organizations because it was completely student-run,
                        which will enable him to communicate and understand better with other student members.</p>
                </div>
            </div>
            <div class="rajcolumn">
                <div class="rajcard wow fadeInUp">
                    <p>3. He would receive a lot of incentives such as certification, proper guidance, improving skills and
                        personality, and most importantly an established platform for team format.</p>
                </div>
            </div>
            <div class="rajcolumn">
                <div class="rajcard wow fadeInUp">
                    <p>4. Apart from this, he will also receive other benefits from the team such as career guidance,
                        various resources, mentorship and various others.</p>
                </div>
            </div>
        </div><!-- why to join us section ends here-->
        <!-- from here, the naman's task starts-->
        <div id="difference" style="margin-top: 80px;" class="container-fluid">
            <div class="row justify-content-center">
                <div style="padding: 30px;" class="col-lg-12 bg-dark">
                    <div class="section-heading text-center mb-40">
                        <h2 style="margin-top: 20px; color: white;">Difference from other platforms</h2>
                        <span class=" heading-border"></span>
                            <!-- <p>We always believe that building a forest is much better than building a tree, and so the social workers, along with building their respective social initiatives (their own trees) can support and share their experiences with our members to help us shape the mindset of youth who can build the forest of social initiatives in the future.</p> -->
                    </div><!-- /Section Heading -->
                    <div class="container mt-4">
                        <div class="row">
                            <div class="col-md-6">
                                <center><img src="img/network/col1.png" class="naman-im1 wow fadeInUp"></center>
                            </div>
                            <div style="margin: auto;" class="col-md-6 student-run">
                                <p style="color: white;" class="wow fadeInUp">Student-run: The complete <b style="color: #69bc45;">Prayas</b> network is run by students studying in different
                                    colleges of the country. Being a student run body enables better understanding and
                                    communication between
                                    members.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <!--<div class="bg-Prayas col-lg-6" style="padding: 30px;">
<header class="section-header">
<h3>Our Reach</h3>
</header>
<div class="container mt-4">
<div class="row justify-content-center">
<div class="image col-md-4 col-sm-12 col-12">
<img src="img/network/col2.png" alt="#" class="naman-im2">
</div>
<div class="content col-md-8 col-sm-12 col-12">
<p>
<ul style="margin-right: 15%;margin-left:15%;margin-top: 30px; margin-bottom: 30px;text-align: left;line-height: 150%;font-size: small;">
<li>We have a nationwide reach with total 14 centres present across the country spread across 12 states.</li>
<li>More than 161 active members are associated withPRAYASthrough various centes.</li>
</ul>
</p>
</div>
<div class="col-md-4 text-center">
<div class="reach-card wow fadeInUp">
<span class="counter">14</span><br>
CENTRES<br><br>
</div>
</div>
<div class="col-md-4 text-center">
<div class="reach-card wow fadeInUp">
<span class="counter">12</span><br>
STATES<br><br>
</div>
</div>
<div class="col-md-4 text-center">
<div class="reach-card wow fadeInUp">
<span class="plus"><span class="counter">160</span>+</span><br>
ACTIVE MEMBERS<br><br>
</div>
</div>
</div>
</div>
</div>-->
            </div>
        </div>
        <div style="padding: 40px" class="container-fluid bg-Prayas">

            <div class="section-heading text-center mb-40">
                <h2 style="margin-top: 20px;">Incentives</h2>
                        <span class=" heading-border"></span>
                    <!-- <p>We always believe that building a forest is much better than building a tree, and so the social workers, along with building their respective social initiatives (their own trees) can support and share their experiences with our members to help us shape the mindset of youth who can build the forest of social initiatives in the future.</p> -->
            </div><!-- /Section Heading -->


            <div style="margin-top: 40px;" class="container">
                <div class="row justify-content-center">
                    <div style="padding-right: 7px; padding-left: 7px;" class="col-md-3 col-6 mb-4">
                        <div class="incentive-card text-center bg-dark text-white wow fadeInUp">
                            <p>Certificates</p>
                        </div>
                    </div>
                    <div style="padding-right: 7px; padding-left: 7px;" class="col-md-3 col-6 mb-4">
                        <div class="incentive-card text-center bg-dark text-white wow fadeInUp">
                            <p>NGO Work Experience</p>
                        </div>
                    </div>
                    <div style="padding-right: 7px; padding-left: 7px;" class="col-md-3 col-6 mb-4">
                        <div class="incentive-card text-center bg-dark text-white wow fadeInUp">
                            <p>Guidance and Mentorship</p>
                        </div>
                    </div>
                    <div style="padding-right: 7px; padding-left: 7px;" class="col-md-3 col-6 mb-4">
                        <div class="incentive-card text-center bg-dark text-white wow fadeInUp">
                            <p>Already established platform for team formation</p>
                        </div>
                    </div>
                    <div style="padding-right: 7px; padding-left: 7px;" class="col-md-3 col-6 mb-4">
                        <div class="incentive-card text-center wow fadeInUp">
                            <p>Skill Development</p>
                        </div>
                    </div>
                    <div style="padding-right: 7px; padding-left: 7px;" class="col-md-3 col-6 mb-4">
                        <div class="incentive-card text-center wow fadeInUp">
                            <p>Can get a chance to visit IIT Kharagpur</p>
                        </div>
                    </div>
                    <div style="padding-right: 7px; padding-left: 7px;" class="col-md-3 col-12">
                        <div class="incentive-card text-center wow fadeInUp">
                            <p>Other Help</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--<div class="my-row3">
<h1 class="heading3">Incentives</h1>
<div class="row ">
<div class="col-md-4 col-sm-12 col-12">
<ul class="list1">
<li>
<div class="boxed">Certificates</div>
</li>
<li>
<div class="boxed">NGO Work experience</div>
</li>
<li>
<div class="boxed">Guidance and Mentorship</div>
</li>
<li>
<div class="boxed">Already established platform for team formation</div>
</li>
</ul>
</div>
<div class="col-md-8 col-sm-12 col-12">
<div class="row">
<div class="col-md-6" style="margin-top: 20px;">
<img src="img/network/col3.png" alt="#" class="naman-im3">
</div>
<div class="col-md-6" style="margin-top: 20px;">
<ul class="list2">
<li>
<div class="boxed">Skill Development</div>
</li>
<li>
<div class="boxed">Can get a chance to visit IIT Kharagpur</div>
</li>
<li>
<div class="boxed">Other help</div>
</li>
</ul>
</div>
</div>
</div>
</div>
</div>-->
        <!-- here naman's task ends-->
        <!----rakesh's code for the semicircular card's part
<div id="wrap" >
<div class="rakeshcontainer-fixed rakeshstacked-rakeshcards rakeshstacked-rakeshcards-fanOut">
<header class="section-header">
<h3>What extra help we can give?</h3>
</header>
<ul>
<li>
<div class="rakesh">
<img src="img/network/extraGive/img1.jpg"  id="rakesh1"  class="rakeshimage">
<div class="overlay_rakesh">
<div class="rakeshtext">In GYWS andPRAYAS, members have completed or are doing various projects/internships in various companies in different fields. We will be able to guide you through the steps required to accomplish your plans.</div>
</div>
</div>
</li>
<li>
<div class="rakesh">
<img src="img/network/extraGive/img2.jpg" id="rakesh2" class="rakeshimage">
<div class="overlay_rakesh">
<div class="rakeshtext">Not only for career, members inPRAYASare always ready to help you in various fields. Be it sports, art, learning new things etc.</div>
</div>
</div>
</li>
<li>
<div class="rakesh">
<img src="img/network/extraGive/sushant.jpg"  id="rakesh3" class="rakeshimage">
<div class="overlay_rakesh">
<div class="rakeshtext">what extra help we can give?</div>
</div>
</div>
</li>
<li>
<div class="rakesh">
<img src="img/network/extraGive/img3.jpg" id="rakesh4" class="rakeshimage">
<div class="overlay_rakesh">
<div class="rakeshtext">We are a network of under-graduate, Post Graduates and Research Scholars studying In different streams of engineering. We work together to create a pool of ideas, which can/will try to provide a solution to every problem faced by you.
With us, you can benefit yourself in the ways which sometimes you cannot get on your own.</div>
</div>
</div>
</li>
<li>
<div class="rakesh">
<img src="img/network/extraGive/img4.jpg" id="rakesh5" class="rakeshimage">
<div class="overlay_rakesh">
<div class="rakeshtext">If you are interested in Research or want to have a discussion on a certain topic, our intellectually stimulated members can guide you might fulfil your thirst for knowledge.</div>
</div>
</div>
</li>
<li>
<div class="rakesh">
<img src="img/network/extraGive/img5.jpg" id="rakesh6" class="rakeshimage">
<div class="overlay_rakesh">
<div class="rakeshtext">Our esteemed alumni are working in different companies and have excelled in their fields, and their experience is a treasure to us. Through them we can help you to know the mantra to get various type of internships and jobs easily.</div>
</div>
</div>
</li>
<li>
<div class="rakesh">
<img src="img/network/extraGive/img6.jpg" id="rakesh7"  class="rakeshimage">
<div class="overlay_rakesh">
<div class="rakeshtext">A variety of resources for learning almost every domain or field is present are present in IIT Kharagpur Community, which can be shared with all the centre members.</div>
</div>
</div>
</li>
</ul>
</div>
<script src="networkJS/stackedCards.min.js"></script>
</div>
<script>
var stackedCardSlide = new stackedRakeshCards({
selector: '.rakeshstacked-rakeshcards-slide',
layout: "slide",
transformOrigin: "center",
});
stackedCardSlide.init();
var stackedCardFanOut = new stackedRakeshCards({
selector: '.rakeshstacked-rakeshcards-fanOut',
layout: "fanOut",
transformOrigin: "bottom",
});
stackedCardFanOut.init();
</script>
here rakesh's code ends ------><br><br><br><!-- -Aaditya's code for the flipping card-->
        <div id="extra_help" class="container">
            <div class="flipping cards">
                <div class="section-heading text-center mb-40">
                <h2 style="margin-top: 30px;">What Extra Help Can we give?</h2>
                        <span class=" heading-border"></span>
                    <!-- <p>We always believe that building a forest is much better than building a tree, and so the social workers, along with building their respective social initiatives (their own trees) can support and share their experiences with our members to help us shape the mindset of youth who can build the forest of social initiatives in the future.</p> -->
            </div><!-- /Section Heading -->


                <div style="padding-top: 3vw;" class="row justify-content-center">
                    <div style="margin-bottom: 20px;" class="col-lg-4 col-md-6 col-12 wow fadeInUp">
                        <div class="my-card">
                            <div class="my-card-inner">
                                <div class="card-front"><img src="img/network/extraGive/img2.png" style="width: inherit; height:inherit"></div>
                                <div class="card-back">
                                    <p id="p3" style="line-height: 19px;">We are a network of under-graduate, Post Graduates and Research Scholars
                                        studying In different streams of engineering. We work together to create a pool of
                                        ideas, which can/will try to provide a solution to every problem faced
                                        by you. With us, you can benefit yourself in the ways which sometimes you cannot get
                                        on your own.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style="margin-bottom: 20px;" class="col-lg-4 col-md-6 col-12 wow fadeInUp">
                        <div class="my-card">
                            <div class="my-card-inner">
                                <div class="card-front"><img src="img/network/extraGive/img1.png" style="width: inherit; height:inherit"></div>
                                <div class="card-back">
                                    <p id="p2">Not only for career, members inPRAYASare always ready to help you in various
                                        fields. Be it sports, art, learning new things etc.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style="margin-bottom: 20px;" class="col-lg-4 col-md-6 col-12 wow fadeInUp">
                        <div class="my-card">
                            <div class="my-card-inner">
                                <div class="card-front"><img src="img/network/extraGive/img3.png" style="width: inherit; height:inherit"></div>
                                <div class="card-back">
                                    <p id="p1">In GYWS andPRAYAS, members have completed or are doing various
                                        projects/internships in various companies in different fields. We will be able to
                                        guide you through the steps required to accomplish your plans.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style="margin-bottom: 20px;" class="col-lg-4 col-md-6 col-12 wow fadeInUp">
                        <div class="my-card">
                            <div class="my-card-inner">
                                <div class="card-front"><img src="img/network/extraGive/img4.png" style="width: inherit; height:inherit"></div>
                                <div class="card-back">
                                    <p id="p4">If you are interested in Research or want to have a discussion on a certain
                                        topic, our intellectually stimulated members can guide you might fulfil your thirst
                                        for knowledge.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style="margin-bottom: 20px;" class="col-lg-4 col-md-6 col-12 wow fadeInUp">
                        <div class="my-card">
                            <div class="my-card-inner">
                                <div class="card-front"><img src="img/network/extraGive/img5.png" style="width: inherit; height:inherit"></div>
                                <div class="card-back">
                                    <p id="p5">Our esteemed alumni are working in different companies and have excelled in
                                        their fields, and their experience is a treasure to us. Through them we can help you
                                        to know the mantra to get various type of internships and jobs
                                        easily.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style="margin-bottom: 20px;" class="col-lg-4 col-md-6 col-12 wow fadeInUp">
                        <div class="my-card">
                            <div class="my-card-inner">
                                <div class="card-front"><img src="img/network/extraGive/img6.png" style="width: inherit; height:inherit"></div>
                                <div class="card-back">
                                    <p id="p6">A variety of resources for learning almost every domain or field is present
                                        are present in IIT Kharagpur Community, which can be shared with all the centre
                                        members.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div><br><br>
        </div><!-- ========================from here the aaditya's card code starts ===========-->
        <!--<link rel="stylesheet" href="http://netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
<link href="http://www.jqueryscript.net/css/jquerysctipttop.css" rel="stylesheet" type="text/css">
<link href='https://fonts.googleapis.com/css?family=Abel' rel='stylesheet'>
<div class="temp" >
<header class="section-header">
<h3>What extra help can we give?</h3>
</header>
<div class="row justify-content-center">
<div class="col-md-8">
<center>
<div class="stack" >
<div class="sheet" id="s1">
<p style="text-align: center;color:black;position: relative;top: 15%; padding-top: 2em; padding-bottom: 2em; padding-left: 0.7em;padding-right: 0.7em;">Ram always wanted to know how the students of other colleges work, and the path peope follow to reach their goals! When he got to know about us, he realised that we are a vast network of pan india colleges and hence we will have a diverse
pool of ideas, which can help him fulfill his dreams and needs.
</p>
</div>
<div class="sheet" id="s2">
<p style=" margin-top: 3em;color:white;text-align: center;position: relative;top: 15%; padding-top: 2em; padding-bottom: 2em; padding-left: 0.7em;padding-right: 0.7em;">By joining us, he can get mentorship from us regarding the working of his in academic or non-academic activities.</p>
</div>
<div class="sheet" id="s3">
<p style=" margin-top: 3em;color:black;text-align: center;position: relative;top: 15%; padding-top: 2em; padding-bottom: 2em; padding-left: 0.7em;padding-right: 0.7em;">Career guidance can help Ram clear his pathway of obstacles and help him ease out his process of becoming a successful person.
</p>
</div>
<div class="sheet" id="s4">
<p style=" margin-top: 3em;color:white;text-align: center;position: relative;top: 15%; padding-top: 2em; padding-bottom: 2em; padding-left: 0.7em;padding-right: 0.7em;">Topic discussions with people of various mindset and different thoughts can enhance the output of it and will be even more fruitful.</p>
</div>
</div>
<div class="buttons">
<a id="aadityaprev"><i class="fa fa-angle-left"></i></a>
<a id="aadityanext"><i class="fa fa-angle-right"></i></a>
</div>
</center>
</div>
</div>--><br><!-- -here aaditya's card code ends-->
        <!-- network page code ends here-->
        <!--==========================
Footer
============================-->

        <!-- <div id="preloader"></div>-->
        <!-- JavaScript Libraries-->
        <script src="lib/jquery/jquery.min.js"></script>
        <script src="lib/jquery/jquery-migrate.min.js"></script>
        <script src="lib/bootstrap/js/bootstrap.bundle.min.js"></script>
        <script src="lib/easing/easing.min.js"></script>
        <script src="lib/superfish/hoverIntent.js"></script>
        <script src="lib/superfish/superfish.min.js"></script>
        <script src="lib/wow/wow.min.js"></script>
        <script src="lib/waypoints/waypoints.min.js"></script>
        <script src="lib/counterup/counterup.min.js"></script>
        <script src="lib/owlcarousel/owl.carousel.min.js"></script>
        <script src="lib/isotope/isotope.pkgd.min.js"></script>
        <script src="lib/Prayasbox/js/Prayasbox.min.js"></script>
        <script src="lib/touchSwipe/jquery.touchSwipe.min.js"></script>
        <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script><!-- Contact Form JavaScript File-->
        <script src="contactform/contactform.js"></script>
        <script src="networkJS/paperstack.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/waypoints/4.0.0/jquery.waypoints.min.js"></script>
        <script src="networkJS/jquery.counterup.min.js"></script><!-- Template Main Javascript File-->
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
</body>
<?php include 'include/footer.php'; ?>