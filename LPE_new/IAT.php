<?php require_once("IATname.inc"); ?>
<html>
<head>
<title><?php echo $IATname; ?></title>
<script type="text/javascript" src="IAT139.js"></script>
<script type="text/javascript" src="jquery.min.js"></script>
<script type="text/javascript"> 
	initialize(); 
	document.onkeypress = keyHandler; 
</script>
<style type="text/css"> @import "iat.css";</style>
</head>

<body>
    
<div id="experiment_frame">
    <div id="header">
        <div id="left_cat"></div><div id="right_cat"></div>
    </div>
    <div id="picture_frame">
        <div id="exp_instruct"></div>
        <div id="word" class="IATitem"></div>
        <img id="wrong" src="Wrong.jpg">
    </div>
</div>

</body>
