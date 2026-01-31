<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require("connection.php");

$query = "SELECT * FROM `videos`";
$result = mysqli_query($conn, $query);

$videos = [];

if ($result && mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_assoc($result)) {
        $videos[] = $row;   
    }
}

echo json_encode($videos);
