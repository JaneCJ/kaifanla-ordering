<?php
header("Content-Type:application/json");
@$user_name = $_REQUEST["user_name"];
@$phone = $_REQUEST["phone"];
@$addr = $_REQUEST["addr"];
@$did = $_REQUEST["did"];
@$sex = $_REQUEST["sex"];
if (empty($user_name)||empty($phone)||empty($addr)||empty($did)||empty($sex)) {
	echo '[]';
	return;
}
$order_time = time()*1000;
$conn = mysqli_connect('127.0.0.1','root','','kaifanla',3306);
$sql = "SET NAMES UTF8";
mysqli_query($conn,$sql);
$sql = "INSERT INTO kf_order VALUES(
	NULL,'$phone','$user_name','$sex','$order_time','$addr','$did'
)";
$result = mysqli_query($conn,$sql);
$output = [];
$arr = [];
if ($result) {
	$arr['msg'] = 'succ';
	$arr['oid'] = mysqli_insert_id($conn);
}else{
	$arr['msg'] = 'error';
}
$output[] = $arr;
echo json_encode($output);
?>