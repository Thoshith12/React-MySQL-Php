<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require("connection.php");

$userEmail = $_GET['userEmail'] ?? '';
$videoId   = $_GET['videoId'] ?? '';

if (!$userEmail || !$videoId) {
    echo json_encode([
        "status" => "Error",
        "error" => "Missing parameters"
    ]);
    exit;
}

// Escape input
$userEmail = mysqli_real_escape_string($conn, $userEmail);
$videoId   = mysqli_real_escape_string($conn, $videoId);

// Step 1: Fetch history
$selectSql = "SELECT history FROM history WHERE user_email = '$userEmail'";
$result = mysqli_query($conn, $selectSql);

if (!$result || mysqli_num_rows($result) === 0) {
    echo json_encode([
        "status" => "Error",
        "error" => "User history not found"
    ]);
    exit;
}

$row = mysqli_fetch_assoc($result);
$history = $row['history'] ?? "";

// Step 2: Update history if video not present
$historyArray = array_filter(explode(",", $history));

if (!in_array($videoId, $historyArray)) {
    $history = ($history === "") ? $videoId : $history . "," . $videoId;

    $updateSql = "
        UPDATE history 
        SET history = '$history'
        WHERE user_email = '$userEmail'
    ";

    mysqli_query($conn, $updateSql);
}

// Step 3: Response
echo json_encode([
    "status" => "success",
    "data" => $history
]);
