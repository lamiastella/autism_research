<?php

// This line directs the output to the same folder as the scripts
$base_dir = realpath(dirname(__FILE__));

// Change this line to put the output in a folder defined below 
// (e.g., "/" for the same folder as the program files)
$folder_dir = "/output";

$data = $_REQUEST["data"];

$randtxt = dechex(rand(4097,65536));

$fh = fopen($base_dir.$folder_dir.'/IAT_'.$randtxt.'.txt', 'w');
fwrite($fh, $data);
fclose($fh);

?>