<?php require_once("IATname.inc"); ?>
<html>
<head>
<title><?php echo $IATname; ?> IAT</title>
<script type="text/javascript" src="IAT.js"></script>
<script type="text/javascript" src="jquery.min.js"></script>
<script type="text/javascript">
    window.onload = function() { $('#jscheck').html('<img src=\'Correct.jpg\' width=75 height=75>');}
</script>
<style type="text/css"> @import "iat.css";</style>
</head>

<body>
    
<div id="instructions">
    Javascript must be enabled for the application to run.<br><br>
    If you do not see a green checkmark below, please enable Javascript. <br>
    <div id="jscheck"></div>
    If you see the green checkmark, click this button to continue.<br><br>
    <form action="turk1index.html">
        <input type="submit" value="Continue">
    </form>
</div>

</body>
