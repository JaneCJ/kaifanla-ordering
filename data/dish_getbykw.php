<?php
header("Content-Type:application/json");
@$kw = $_REQUEST["kw"];
if (empty($kw)) {
	echo "[]";
	return;
}
$conn = mysqli_connect('127.0.0.1','root','','kaifanla',3306);
$sql = "SET NAMES UTF8";
mysqli_query($conn,$sql);
$sql = "SELECT did,name,price,material,img_sm FROM kf_dish WHERE name LIKE '%$kw%' OR material LIKE '%$kw%'";
$result = mysqli_query($conn,$sql);
$output = mysqli_fetch_all($result,MYSQLI_ASSOC);
echo json_encode($output);
?>