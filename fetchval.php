<?php
include 'include/connect.php';

$k = $_POST['id'];
$k = trim($k);

$sql = "SELECT * FROM `add_branches` WHERE 	City = '$k'";
$rsult = mysqli_query($conn, $sql);

while ($row = mysqli_fetch_assoc($rsult)) {
?>
	<div class="col-lg-12 sm-padding">
		<div class="col-md-2.5 xs-padding">
			<div class="team-details">

				<p><?php echo $row['Collage Name'] ?></p>
				<p><?php echo $row['Center Name'] ?></p>
				<p><?php echo $row['Center ID'] ?></p>
				<p><?php echo $row['City'] ?></p>
				<p><?php echo $row['State'] ?></p>
				<p><?php echo $row['Collage Name'] ?></p>

			</div>

		</div>


	<?php
}


	?>