<?php 
include 'include/connect.php';

if (isset($_POST['input'])) 
{
	$input = $_POST['input'];

	//$sql = "SELECT * FROM `add_members` WHERE `First Name` LIKE '$input%'";
	$sql = "SELECT * FROM `add_members` WHERE `CentreBranch` LIKE '$input%' OR `Year Of Joining` LIKE '$input'";
	// echo $sql;exit();
	$run = mysqli_query($conn,$sql);
	if (mysqli_num_rows($run) > 0){?>

		<table class="table table-bordered table-striped mt-4">

			<tr>
				<th>First Name</th>
				<th>Last Name</th>
				<th>Member ID</th>
				<th>DOB</th>
				<th>Phone</th>
				<th>Email</th>
				<th>Address</th>
				<th>City</th>
				<th>State</th>
				<th>Year Of Joining</th>
				<th>Post/ Desgination</th>
			</tr>

			<tbody>

				<?php 

				while ($row = mysqli_fetch_assoc($run)) 
				{
					$name = $row['First Name'];
					$lanme = $row['Last Name'];
					$member_id = $row['Member ID'];
					$dob = $row['DOB'];
					$phone = $row['phone'];
					$email = $row['Email'];
					$city = $row['City'];
					$addres = $row['Address'];
					$State = $row['State'];
					$YearOfJoining = $row['Year Of Joining'];
					$PostDesgination = $row['Post/ Desgination'];
				}

				?>

				<tr>
					<td><?php echo $name; ?></td>
					<td><?php echo $lanme; ?></td>
					<td><?php echo $member_id; ?></td>
					<td><?php echo $dob; ?></td>
					<td><?php echo $phone; ?></td>
					<td><?php echo $email; ?></td>
					<td><?php echo $city; ?></td>
					<td><?php echo $addres; ?></td>
					<td><?php echo $State;?></td>
					<td><?php echo $YearOfJoining; ?></td>
					<td><?php echo $PostDesgination; ?></td>

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