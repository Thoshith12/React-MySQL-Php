<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require("connection.php");

$fname  = $_GET['fname']  ?? '';
$lname  = $_GET['lname']  ?? '';
$email  = $_GET['email']  ?? '';
$phn    = $_GET['phn']    ?? '';
$passwd = $_GET['passwd'] ?? '';
if (!$fname || !$lname || !$email || !$phn || !$passwd) {
    echo json_encode([
        "status" => "Signup failed",
        "error" => "Missing required fields"
    ]);
    exit;
}

$sql = "
    INSERT INTO users (first_name, last_name, email, phone, password)
    VALUES ('$fname', '$lname', '$email', '$phn', '$passwd')
";

$result = mysqli_query($conn, $sql);

if (!$result) {
    echo json_encode([
        "status" => "Signup failed",
        "error" => mysqli_error($conn)
    ]);
    exit;
}
$historySql = "
    INSERT INTO history (user_email, user_phone_no)
    VALUES ('$email', '$phn')
";

$historyResult = mysqli_query($conn, $historySql);

if (!$historyResult) {
    echo json_encode([
        "status" => mysqli_error($conn)
    ]);
    exit;
}

$data = [
    "first_name" => $fname,
    "last_name"  => $lname,
    "password"   => $passwd,
    "phone"      => $phn,
    "email"      => $email
];

echo json_encode([
    "status" => "success",
    "data" => $data
]);

$conn->close();
