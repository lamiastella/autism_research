<?php

// This line directs the output to the same folder as the scripts
$base_dir = "ftp://langcomplab.net/10_28_2013/GPE_new";


// Change this line to put the output in a folder defined below 
// (e.g., "/" for the same folder as the program files)
$folder_dir = "/";

$data = $_REQUEST["data"];

$randtxt = dechex(rand(4097,65536));
$resName = '/public_html/bin498/results'.$randtxt.'.csv';
//$fh = fopen($resName, 'a');
//fwrite($fh, 'weee');
//fclose($fh);

//Connect to the FTP server
$ftpstream = @ftp_connect('ftp.langcomplab.net');

//Login to the FTP server
$login = @ftp_login($ftpstream, 'langcomp', 'hostcp7247313');
if($login) {

//Create a directory 'config' at the root of your website
//@ftp_mkdir($ftpstream, '/public_html/results');

//Create a temporary file
//$temp = tmpfile();

//Upload the temporary file to server
//@ftp_fput($ftpstream, '/public_html/results/results.csv', $temp, FTP_ASCII);

//Make the file writable by all
ftp_site($ftpstream,"CHMOD 0777 /public_html/bin498/resultsGPE.csv");

//Write to file
$fp = fopen('/home/langcomp/public_html/bin498/resultsGPE.csv', 'a');
fputs($fp,$data);
fclose($fp);

//Make the file writable only to owner
ftp_site($ftpstream,"CHMOD 0644 /public_html/bin498/resultsGPE.csv");

}

//Close FTP connection
ftp_close($ftpstream);

?>
