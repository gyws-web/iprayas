<style type="text/css">
        .whatsApp {
    position: fixed;
    width: 50px;
    height: 50px;
    margin-top: -40px;
    color: #FFF;
    border-radius: 5px;
    text-align: center;
    font-size: 30px;
    z-index: 100;
    /* box-shadow: 0px -1px 10px 1px rgb(81 202 95); */
    animation: glow 1.5s linear infinite alternate;
    float: left;
}
    </style>
      <section class="widget-section padding">
            <div class="container">
                <div class="widget-wrap row">
                    <div class="col-md-5 xs-padding">
                        <div class="widget-content">
                            <img src="img/logo.png" alt="logo" style="height: 120px;">
                            <p>PRAYAS is an initiative of one of India's largest student-run government registered NGO Gopali Youth Welfare Society, based in IIT Kharagpur. Gopali Youth Welfare Society aims at the overall socio-economic development of the underprivileged near the IIT Kharagpur campus.</p>
                            <ul class="social-icon">
                                <li><a href="https://www.facebook.com/gyws.iitkgp"><i class="fa fa-facebook"></i></a></li>
                                <li><a href="https://twitter.com/gopali_youth"><i class="fa fa-twitter"></i></a></li>
                                <li><a href="https://www.linkedin.com/company/gopali-youth-welfare-society/?originalSubdomain=in"><i class="fa fa-linkedin"></i></a></li>
                                <li><a href="https://www.instagram.com/gyws_ngo.iitkgp/"><i class="fa fa-instagram"></i></a></li>
                                <li><a href="https://api.whatsapp.com/send?phone=918957557713&amp;text=Hi"><i class="fa fa-whatsapp"></i></a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-md-3 xs-padding">
                        <div class="widget-content">
                            <h3>Useful Links</h3>
                            <ul class="widget-link">
                                <li><a href="#">Home</a></li>
                                 <li><a href="#">About Us</a></li>
                                  <li><a href="#">Initiatives</a></li>
                                   <li><a href="#">Media</a></li>
                                   <li><a href="#">Members</a></li>
                                   <li><a href="#">Gallery</a></li>
                                   <li><a href="#">Contact Us</a></li>
                                   
                            </ul>
                        </div>
                    </div>
                    <div class="col-md-4 xs-padding">
                        <div class="widget-content">
                            <h3>Contact Us</h3>
                            <ul class="address">
                                <li><i class="ti-email"></i> gywsociety@gmail.com</li>
                                <li><i class="ti-mobile"></i> +91 8957557713</li>
                            
                                <li class="gopali"><i class="ti-location-pin"></i> Gopali (No-shooting Area),
P.O. – Salua, Dist. – Paschim Medinipur,
West Bengal, Pin-721145.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section><!-- ./Widget Section -->
        
        <footer class="footer-section">
			<div class="container">
                <div class="row">
                    <div class="col-md-6 sm-padding">
                        <div class="copyright">Copyright © GYWS All rights reserved | Developed by <a href="https://www.viswasidigital.com/" style="color: #fff;">Magcyan Solutions Pvt. Ltd.</a> </div>
                    </div>
                    <div class="col-md-6 sm-padding">
                        <ul class="footer-social">
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#">Terms & Condition</a></li>
                          
                        </ul>
                    </div>
                </div>
			</div>
		</footer><!-- /Footer Section -->
        <!-- <a href="https://api.whatsapp.com/send?phone=918957557713&amp;text=Hi" class="whatsApp" target="_blank" datasqstyle="{&quot;top&quot;:null}" datasquuid="ca02102c-3d6e-4d06-a85e-351523545b06" datasqtop="663" style="top: 663px;"><img src="https://c.tenor.com/Spdlu7aT88AAAAAj/wp.gif" alt="phone" class="whts01" style="height: 63px;"></a> -->
		<a data-scroll href="#header" id="scroll-to-top"><i class="arrow_up"></i></a>
	
		<!-- jQuery Lib -->
		<script src="js/vendor/jquery-1.12.4.min.js"></script>
		<!-- Bootstrap JS -->
		<script src="js/vendor/bootstrap.min.js"></script>
		<!-- Tether JS -->
		<script src="js/vendor/tether.min.js"></script>
        <!-- Imagesloaded JS -->
        <script src="js/vendor/imagesloaded.pkgd.min.js"></script>
		<!-- OWL-Carousel JS -->
		<script src="js/vendor/owl.carousel.min.js"></script>
		<!-- isotope JS -->
		<script src="js/vendor/jquery.isotope.v3.0.2.js"></script>
		<!-- Smooth Scroll JS -->
		<script src="js/vendor/smooth-scroll.min.js"></script>
		<!-- venobox JS -->
		<script src="js/vendor/venobox.min.js"></script>
        <!-- ajaxchimp JS -->
        <script src="js/vendor/jquery.ajaxchimp.min.js"></script>
        <!-- Counterup JS -->
		<script src="js/vendor/jquery.counterup.min.js"></script>
        <!-- waypoints js -->
		<script src="js/vendor/jquery.waypoints.v2.0.3.min.js"></script>
        <!-- Slick Nav JS -->
        <script src="js/vendor/jquery.slicknav.min.js"></script>
        <!-- Nivo Slider JS -->
        <script src="js/vendor/jquery.nivo.slider.pack.js"></script>
        <!-- Letter Animation JS -->
		<script src="js/vendor/letteranimation.min.js"></script>
        <!-- Wow JS -->
		<script src="js/vendor/wow.min.js"></script>
		<!-- Contact JS -->
		<script src="js/contact.js"></script>
		<!-- Main JS -->
		<script src="js/main.js"></script>

    </body>
    <script>
        var right = document.getElementsByClassName("right");
    var si = right.length;
    var z=1;
    turnRight();
    function turnRight()
    {
        if(si>=1){
            si--;
        }
        else{
            si=right.length-1;
            function sttmot(i){
                setTimeout(function(){right[i].style.zIndex="auto";},300);
            }
            for(var i=0;i<right.length;i++){
                right[i].className="right";
                sttmot(i);
                z=1;
            }
        }
        right[si].classList.add("flip");
        z++;
        right[si].style.zIndex=z;
    }
    function turnLeft()
    {
        if(si<right.length){
            si++;
        }
        else{
            si=1;
            for(var i=right.length-1;i>0;i--){
                right[i].classList.add("flip");
                right[i].style.zIndex=right.length+1-i;
            }
        }
        right[si-1].className="right";
        setTimeout(function(){right[si-1].style.zIndex="auto";},350);
    }
    </script>

</html>