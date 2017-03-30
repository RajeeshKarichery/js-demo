<?php
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');


$date = new DateTime();
$d1   =  $date->format('Y-m-d H:i:s');
echo "data: The server time is: {$d1}\n\n";
flush();
?>
