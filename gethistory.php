<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
require("connection.php");
$user = $_REQUEST["user"];
$query = "SELECT * FROM `history` WHERE user_email = '$user'";

$result = mysqli_query($conn, $query);


if ($result) {
    $data = mysqli_fetch_assoc($result);
    $his = explode(",", $data["history"]);
    $res = "'" . implode("','", array_map('trim', $his)) . "'";
    $vidQuery = "SELECT * FROM `videos` WHERE `video_id` IN ($res)";
    $result2 = mysqli_query($conn, $vidQuery);

    $data = [];

    if ($result2) {
        while ($row = mysqli_fetch_assoc($result2)) {
        $row['history'] = true;
        $data[] = $row;
    }
        echo json_encode($data);
    }


}
?>