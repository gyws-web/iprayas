<?php include 'include/head.php'; ?>

<body>
    <?php include 'include/header.php'; ?>

    <div class="header-height"></div>

    <div class="pager-header">
        <div class="container">
            <div class="page-content">
                <h2>Gallery</h2>
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="index.php">Home</a></li>
                    <li class="breadcrumb-item active">Gallery</li>
                </ol>
            </div>
        </div>
    </div><!-- /Page Header -->
    <section class="gallery-section bg-grey bd-bottom padding">
        <div class="container">

            <div class="row">
                <ul class="gallery-filter align-center mb-30">
                    <li class="active" data-filter="*">All</li>
                    <li data-filter=".branding">Aashayien</li>
                    <li data-filter=".design">Sports day</li>
                    <li data-filter=".wordpress">Republic Day</li>
                    <li data-filter=".marketing">KTJ Visit</li>
                </ul><!-- /.gallery filter -->
            </div>
            <div class="gallery-items row">
                <div class="col-lg-4 col-sm-6 single-item branding design">
                    <div class="gallery-wrap">
                        <img src="img/gallery-1.jpg" alt="gallery">
                        <div class="hover">
                            <a class="img-popup" data-gall="galleryimg" href="img/gallery-1.jpg"><i class="ti-image"></i>
                                <strong>Hello</strong>
                            </a>

                        </div>
                    </div>
                </div><!-- /Item-1 -->
                <div class="col-lg-4 col-sm-6 single-item marketing wordpress">
                    <div class="gallery-wrap">
                        <img src="img/gallery-2.jpg" alt="gallery">
                        <div class="hover">
                            <a class="img-popup" data-gall="galleryimg" href="img/gallery-2.jpg"><i class="ti-image"></i></a>
                        </div>
                    </div>
                </div><!-- /Item-2 -->
                <div class="col-lg-4 col-sm-6 single-item wordpress design branding">
                    <div class="gallery-wrap">
                        <img src="img/gallery-3.jpg" alt="gallery">
                        <div class="hover">
                            <a class="img-popup" data-gall="galleryimg" href="img/gallery-3.jpg"><i class="ti-image"></i></a>
                        </div>
                    </div>
                </div><!-- /Item-3 -->
                <div class="col-lg-4 col-sm-6 single-item design branding wordpress">
                    <div class="gallery-wrap">
                        <img src="img/gallery-4.jpg" alt="gallery">
                        <div class="hover">
                            <a class="img-popup" data-gall="galleryimg" href="img/gallery-4.jpg"><i class="ti-image"></i></a>
                        </div>
                    </div>
                </div><!-- /Item-4 -->
                <div class="col-lg-4 col-sm-6 single-item branding marketing">
                    <div class="gallery-wrap">
                        <img src="img/gallery-5.jpg" alt="gallery">
                        <div class="hover">
                            <a class="img-popup" data-gall="galleryimg" href="img/gallery-5.jpg"><i class="ti-image"></i></a>
                        </div>
                    </div>
                </div><!-- /Item-5 -->
                <div class="col-lg-4 col-sm-6 single-item marketing design">
                    <div class="gallery-wrap">
                        <img src="img/gallery-6.jpg" alt="gallery">
                        <div class="hover">
                            <a class="img-popup" data-gall="galleryimg" href="img/gallery-6.jpg"><i class="ti-image"></i></a>
                        </div>
                    </div>
                </div><!-- /Item-6 -->
            </div>
        </div>
    </section><!-- /Gallery Section -->

    <?php include 'include/footer.php'; ?>