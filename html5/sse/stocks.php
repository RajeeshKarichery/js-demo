<?php
//$tickets =  {"IBM",  163.34 },{ "AAPL", 114.25 }];

$ticketsLength = count($tickets);


// Set necessary headers
header("Content-Type: text/event-stream");
header("Cache-Control: no-cache");
header("Connection: keep-alive");

// If connection is closed and then reopened then browser sends last event id that it received.
// So server can continue sending data from that even and not to send all events again.
// Note that it is incremented by one, because we have to send next value (after last id).
// HTTP header value is Last-Event-ID and should be accessible by HTTP_LAST_EVENT_ID field.
$lastId = $_SERVER["HTTP_LAST_EVENT_ID"];
if (isset($lastId) && !empty($lastId) && is_numeric($lastId)) {
	$lastId = intval($lastId);
	$lastId++;
} else {
	$lastId = 0;
}

// Check that lastId is not larger than the size of array - if it is larger star from zero.
if ($lastId >= $ticketsLength) {
	$lastId = 0;
}

// Using while server keeps connection open and thus we have only one request.
// If connection is closed browser will reconnect and will send last event Id.
while (true) {

	sendMessage(1, 'messi', 'heloo');
	$lastId++;

	// Check that lastId is not larger than the size of array - if it is larger close connection.
	if ($lastId >= $ticketsLength) {
		die();
	}

	// This code tests that last event id really wokrs.
	// Connection is closed on 10, 20 30, etc. ids and then should continue to next id.
	// Uncomment it if you want to test it.
	//if ($lastId % 10 == 0) {
	//	die();
	//}

	// Sleep some random seconds
	sleep(rand(1, 3));
}


// Function to send data in format "ticket:price".
function sendMessage($id, $ticket, $price) {
	echo "id: $id\n";
	echo "data: $ticket:$price\n\n";
	ob_flush();
	flush();
}

?>

