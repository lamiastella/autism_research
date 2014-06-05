<?php require_once("IATname.inc"); ?>
<html>
<head>
<title><?php echo $IATname; ?> IAT Instructions</title>    
<script type="text/javascript" src="jquery.min.js"></script>
<script type="text/javascript"> 
    $.getJSON("input.txt", function (data) {
        $("#clabel1").html(data.cat1.label);
        $("#clabel2").html(data.cat2.label);
        $("#clabelA").html(data.catA.label);
        $("#clabelB").html(data.catB.label);
        if (data.cat1.itemtype == "txt")
            { $("#citems1").html(data.cat1.items.join(", ")); }
        else if (data.cat1.itemtype == "img")
            { $("#citems1").html("Images of "+data.cat1.label); }
        if (data.cat2.itemtype == "txt")
            { $("#citems2").html(data.cat2.items.join(", ")); }
        else if (data.cat2.itemtype == "img")
            { $("#citems2").html("Images of "+data.cat2.label); }
        if (data.catA.itemtype == "txt")
            { $("#citemsA").html(data.catA.items.join(", ")); }
        else if (data.catA.itemtype == "img")
            { $("#citemsA").html("Images of "+data.catA.label); }
        if (data.catB.itemtype == "txt")
            { $("#citemsB").html(data.catB.items.join(", ")); }
        else if (data.catB.itemtype == "img")
            { $("#citemsB").html("Images of "+data.catB.label); }
    }); 
</script>
<style type="text/css"> @import "iat.css";</style>
</head>

<body>
    
<div id="instructions">

    <p>In the next task, you will be presented with a set of words or images to classify into groups. This task requires that you classify items as quickly as you can while making as few mistakes as possible. Going too slow or making too many mistakes will result in an uninterpretable score. This part of the study will take about 5 minutes. The following is a list of category labels and the items that belong to each of those categories.</p>

    <table>
        <tr><td>Category</td><td>Items</td></tr>
        <tr><td id="clabel1"></td><td id="citems1"></td>
        <tr><td id="clabel2"></td><td id="citems2"></td>
        <tr><td id="clabelA"></td><td id="citemsA"></td>
        <tr><td id="clabelB"></td><td id="citemsB"></td>
    </table>

 
    <p>Keep in mind</p>
    <ul>
        <li>Keep your index fingers on the 'e' and 'i' keys to enable rapid response.</li>
        <li>Two labels at the top will tell you which words or images go with each key.</li>
        <li>Each word or image has a correct classification. Most of these are easy.</li>
        <li>The test gives no results if you go slow -- Please try to go as fast as possible.</li>
        <li>Expect to make a few mistakes because of going fast. That's OK.</li>
        <li>For best results, make sure that your monitor is set to maximum brightness and avoid distractions.</li>
    </ul>

    <form action="IAT.php">
        <input type="submit" value="Continue">
    </form>
    
</div>
</body>