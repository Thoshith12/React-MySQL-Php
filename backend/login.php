<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
require("connection.php");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$email = $_GET['email'] ?? '';
$password = $_GET['password'] ?? '';

$query = "SELECT * FROM users WHERE email = '".$email."' AND password = '".$password."'";
$result = mysqli_query($conn, $query);

if ($result && mysqli_num_rows($result) > 0) {
    echo json_encode([
        "status" => "Login Successful",
        "data" => mysqli_fetch_all($result, MYSQLI_ASSOC)
    ]);
} else {
    echo json_encode([
        "status" => "Invalid email or password"
    ]);
}

$conn->close();
?>
