<?php

include 'config.php';
session_start();
error_reporting(0);
$user_id = $_SESSION['user_id'];

if(!isset($user_id)){
   header('location:../index.php');
};

if(isset($_GET['logout'])){
   unset($user_id);
   session_destroy();
   header('location:../index.php');
}

?>
