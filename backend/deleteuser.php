<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require("connection.php");

$email = $_GET['email'] ?? '';
$command = "
    DELETE users, history
    FROM users
    LEFT JOIN history ON history.user_email = users.email
    WHERE users.email = '$email'
";

$result = mysqli_query($conn, $command);

if (!$result) {
    echo json_encode([
        "error" => mysqli_error($conn)
    ]);
} else {
    echo json_encode([
        "status" => "SUCCESS",
        "data" => $result
    ]);
}

$conn->close();
?>
