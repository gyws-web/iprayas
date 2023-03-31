<?php 
include 'include/connect.php';

if (isset($_POST['input'])) 
{
	$input = $_POST['input'];

	//$sql = "SELECT * FROM `add_members` WHERE `First Name` LIKE '$input%'";
	$sql = "SELECT * FROM `add_branches` WHERE `Collage Name` LIKE '$input%' OR `City` LIKE '$input%'";
	// echo $sql;exit();
	$run = mysqli_query($conn,$sql);
	if (mysqli_num_rows($run) > 0){?>

		<table class="table table-bordered table-striped mt-4">

			<tr>
				<th>College Name</th>
				<th>Center Name</th>
				<th>Center ID</th>
				<th>City</th>
				<th>State</th>
				<th>Year Of Joining</th>
				<th>Branches</th>
				<th>Center Head</th>
				<th>Center Coordinator</th>
			</tr>

			<tbody>

				<?php 

				while ($row = mysqli_fetch_assoc($run)) 
				{
					$College = $row['Collage Name'];
					$Center = $row['Center Name'];
					$Center_ID = $row['Center ID'];
					$City = $row['City'];
					$State = $row['State'];
					$Joining = $row['Year Of Joining'];
					$Branches = $row['Branches'];
					$head = $row['Center Head'];
					$Coordinator = $row['Center Coordinator'];
				
				}

				?>

				<tr>
					<td><?php echo $College; ?></td>
					<td><?php echo $Center; ?></td>
					<td><?php echo $Center_ID; ?></td>
					<td><?php echo $City; ?></td>
					<td><?php echo $State; ?></td>
					<td><?php echo $Joining; ?></td>
					<td><?php echo $Branches; ?></td>
					<td><?php echo $head; ?></td>
					<td><?php echo $Coordinator;?></td>
					

				</tr>
				
			</tbody>
			
		</table>


		<?php
	}
	else{

		echo "not data";
	}
}


?>