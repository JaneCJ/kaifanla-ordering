<?php
header("Content-Type:application/json");
@$phone = $_REQUEST["phone"];
if (empty($phone)) {
	echo "[]";
	return;
}
$conn = mysqli_connect('127.0.0.1','root','','kaifanla',3306);
$sql = "SET NAMES UTF8";
mysqli_query($conn,$sql);
$sql = "SELECT kf_order.oid,kf_order.user_name,kf_order.addr,kf_order.order_time,kf_dish.img_sm,kf_dish.did FROM kf_order,kf_dish WHERE kf_order.phone='$phone' AND kf_order.did=kf_dish.did";
$result = mysqli_query($conn,$sql);
$output = mysqli_fetch_all($result,MYSQLI_ASSOC);
echo json_encode($output);
?>