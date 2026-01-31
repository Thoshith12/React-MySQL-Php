<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
require("connection.php");
$vid = $_REQUEST['id'];

$selectSql = "SELECT * FROM videos WHERE video_id = '$vid'";
$result = mysqli_query($conn, $selectSql);
if ($result) {
    $videoData = mysqli_fetch_assoc($result);
    echo json_encode([
        "status" => "success",
        "data" => $videoData
    ]);
}
?>