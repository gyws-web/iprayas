<?php include 'include/head.php'; ?>
<head>
    <style>
        table { 
    width: 750px; 
    border-collapse: collapse; 
    margin:50px auto;
    }

/* Zebra striping */
tr:nth-of-type(odd) { 
    background: #eee; 
    }

th { 
    background: #3498db; 
    color: white; 
    font-weight: bold; 
    }

td, th { 
    padding: 10px; 
    border: 1px solid #ccc; 
    text-align: left; 
    font-size: 18px;
    }

/* 
Max width before this PARTICULAR table gets nasty
This query will take effect for any screen smaller than 760px
and also iPads specifically.
*/
@media 
only screen and (max-width: 760px),
(min-device-width: 768px) and (max-device-width: 1024px)  {

    table { 
        width: 100%; 
    }

    /* Force table to not be like tables anymore */
    table, thead, tbody, th, td, tr { 
        display: block; 
    }
    
    /* Hide table headers (but not display: none;, for accessibility) */
    thead tr { 
        position: absolute;
        top: -9999px;
        left: -9999px;
    }
    
    tr { border: 1px solid #ccc; }
    
    td { 
        /* Behave  like a "row" */
        border: none;
        border-bottom: 1px solid #eee; 
        position: relative;
        padding-left: 50%; 
    }

    td:before { 
        /* Now like a table header */
        position: absolute;
        /* Top/left values mimic padding */
        top: 6px;
        left: 6px;
        width: 45%; 
        padding-right: 10px; 
        white-space: nowrap;
        /* Label the data */
        content: attr(data-column);

        color: #000;
        font-weight: bold;
    }

}
    </style>
</head>
    <body>
 <?php include 'include/header.php'; ?>
        
        <div class="header-height"></div>
        
        <div class="pager-header">
            <div class="container">
                <div class="page-content">
                    <h2>Covirelife</h2>
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="index.php">Home</a></li>
                        <li class="breadcrumb-item active">Covirelife</li>
                    </ol>
                </div>
            </div>
        </div><!-- /Page Header -->
        
       

             <section class="about-section bd-bottom shape circle padding">
            <div class="container">
                <div class="row">
                   <div class="col-md-4 xs-padding">
                        <div class="profile-wrap">
                           <img src="https://gyws.org/gyws/assets/img/covid2.jpg" style="height: 270px;">
                            
                            
                        </div>
                    </div>
                    <div class="col-md-8" style="text-align: justify;">
                        <h3> Some Overview of Covirelife</h3>
                                <p>
                                    
Gopali Youth Welfare Society has been tasked to equip the Safe House with Medical and Safety Kits and help the villagers of Gopali to get the necessary treatment for their speedy recovery from the deadly coronavirus. We seek your support to fulfill sophisticated requirements like oxygen concentrators, cylinders and pulse oximeters to protect our people!
                                    <br><br>
                                   The cost and requirements of the necessary equipment are listed below. Kindly help CoviRelief provide the much-needed relief to the villagers of Gopali!
</p>
                               
                        <a href="#" class="default-btn">Donate Now</a>
                    </div>
                </div>
            </div>
        </section><!-- /Causes Section -->
        

        <section>
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                       <table>
                              <thead>
                                <tr>
                                  <th>Product</th>
                                  <th>Qty Required</th>
                                  <th>Cost per piece</th>
                                  <th>Total Cost</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td data-column="First Name">Oximeter</td>
                                  <td data-column="Last Name">6 Pcs</td>
                                  <td data-column="Job Title">  Rs. 2500</td>
                                  <td data-column="Twitter">    Rs. 15000</td>
                                </tr>
                                <tr>
                                  <td data-column="First Name">Oxygen Cylinder</td>
                                  <td data-column="Last Name">  2 Pcs</td>
                                  <td data-column="Job Title">Rs. 8000</td>
                                  <td data-column="Twitter">Rs. 16000</td>
                                </tr>
                                <tr>
                                  <td data-column="First Name">Oxygen Concentrator</td>
                                  <td data-column="Last Name">1 Pcs</td>
                                  <td data-column="Job Title">  Rs. 60000</td>
                                  <td data-column="Twitter">    Rs. 60000</td>
                                </tr>
                                
                              </tbody>
                            </table>
                    </div>
                </div>
            </div>
        </section>

         <div class="sponsor-section bd-bottom">
            <div class="container">
                      <div class="section-heading text-center mb-40">
                        <h2>Clientele</h2>
                        <span class="heading-border"></span>
                        <p>Help today because tomorrow you may be the one who <br> needs more helping!</p>
                    </div><!-- /Section Heading -->
                <ul id="sponsor-carousel" class="sponsor-items owl-carousel">
                    <?php 
                    include "include/connect.php";
                        $result =mysqli_query($conn,"SELECT * FROM brand");
                        while($data =mysqli_fetch_array($result)){

                     ?>
                    <li class="sponsor-item">
                        <img src="dashboard/image/<?php echo $data['img'] ?>" alt="sponsor-image">
                    </li>
                 <?php } ?>
                </ul>
            </div>
        </div><!-- ./Sponsor Section -->


<?php include 'include/footer.php'; ?>