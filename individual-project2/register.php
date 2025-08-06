<?php
// Handle form submission
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    require 'db.php';

    $username = trim($_POST['username']);
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);
    $name     = trim($_POST['name']);
    $email    = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL);

    if (!$email) {
        die('Invalid email format');
    }

    $stmt = $mysqli->prepare("INSERT INTO users (username, password, name, email) VALUES (?, ?, ?, ?)");
    $stmt->bind_param('ssss', $username, $password, $name, $email);

    if ($stmt->execute()) {
        echo "<p style='text-align:center; color: green;'>Registration successful! You can <a href='login.php'>login now</a>.</p>";
    } else {
        echo "<p style='text-align:center; color: red;'>Error: " . $stmt->error . "</p>";
    }
    $stmt->close();
    $mysqli->close();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Registration</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
<div class="register-container">
    <h2>Create an Account</h2>
    <form action="register.php" method="POST">
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" required pattern="[A-Za-z0-9_]{4,}" title="Minimum 4 characters, letters, numbers or underscores only">

        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required minlength="6">

        <label for="name">Full Name:</label>
        <input type="text" id="name" name="name" required>

        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required>

        <input type="submit" value="Register">
    </form>
    <p>Already have an account? <a href="login.php">Login here</a></p>
</div>
</body>
</html>
