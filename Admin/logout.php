<?php
session_start(); 
include 'include/connect.php';
session_destroy();

header('location:http://localhost/work/gopali/Admin/');



?>