<?php
//
// A very simple PHP example that sends a HTTP POST to a remote site
//

//$nm = $_POST["nm"];
//$dictonary = $_POST["dictonary"];

$ch = curl_init();

curl_setopt($ch, CURLOPT_URL,"http://localhost:5005");
curl_setopt($ch, CURLOPT_HTTPGET, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, array('nm' => $nm);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$server_output = curl_exec ($ch);
// var_dump($server_output);
if ($server_output === false){
	$server_output = curl_error($ch);
}
//echo stripslashes($server_output);
echo $server_output;

curl_close ($ch);
?>

