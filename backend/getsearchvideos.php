<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require("connection.php");

$srch = $_REQUEST['srch'] ?? '';
$que = $_REQUEST['que'] ?? $srch;

$query = "
    SELECT * FROM `videos`
    WHERE `title` LIKE '%$srch%'
       OR `description` LIKE '%$srch%'
       OR `category` LIKE '%$que%' 
       or `channel_title` LIKE '%$srch%' 
";

$result = mysqli_query($conn, $query);

$data = [];

if ($result) {
    while ($row = mysqli_fetch_assoc($result)) {
        $data[] = $row;
    }
}

echo json_encode($data);
