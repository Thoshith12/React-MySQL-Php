<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
require("connection.php");
$vid_id = $_REQUEST["video_id"];
$user = $_REQUEST["user"];
$query = "SELECT `history` FROM `history` WHERE `user_email` = '$user'";
$result = mysqli_query($conn,$query);

$row = mysqli_fetch_assoc($result); 
$history = $row['history'];
$historyArr = array_map('trim', explode(',', $history));
$historyArr = array_values(array_filter($historyArr, fn($id) => $id !== $vid_id));
$newHistory = implode(',', $historyArr);

$update = "UPDATE history SET history = '$newHistory' WHERE user_email = '$user'";
mysqli_query($conn, $update);

$data = [];

if (!empty($historyArr)) {
    $res = "'" . implode("','", $historyArr) . "'";
    $sql = "SELECT * FROM videos WHERE video_id IN ($res)";
    $result2 = mysqli_query($conn, $sql);

    while ($row = mysqli_fetch_assoc($result2)) {
        $row['history'] = true;  
        $data[] = $row;
    }
}
echo json_encode([
    "status" => "success",
    "data" => $data
]);

?>
