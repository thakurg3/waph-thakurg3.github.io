<?php
$host = 'localhost';
$db   = 'waph_db';
$user = 'waph_user';
$pass = 'waph_pass';

$mysqli = new mysqli($host, $user, $pass, $db);

if ($mysqli->connect_error) {
    die('Connection failed: ' . $mysqli->connect_error);
}
?>
