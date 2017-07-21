<?php
header("Content-Type:application/json");
@$id = $_REQUEST["id"];
if (empty($id)) {
	echo "[]";
	return;
}
$conn = mysqli_connect('127.0.0.1','root','','kaifanla',3306);
$sql = "SET NAMES UTF8";
mysqli_query($conn,$sql);
$sql = "SELECT did,name,detail,price,material,img_lg FROM kf_dish WHERE did=$id";
$result = mysqli_query($conn,$sql);
$output = mysqli_fetch_assoc($result);
if(empty($output)){
	echo "[]";
}else{
	echo json_encode($output);
}
?>