// Loads the input file into the variable "startIAT"
function initialize()
{	

	$.getJSON("dfh", startIAT);

}

// Initialize variables, build page & data object, display instructions
function startIAT(data)
{
	currentState = "instruction";
	session = 0;
	roundnum = 0;
	input = data;
	instrCount = 0; // for the instructions with multiple pages
	forward = false;
	isFour = false;
	thisHash = "";

	var d = new Date();
	thisHash = "AU" + d.getTime() + "GB";

	
	// default to show results to participant
	if (!('showResult' in input))
	{
	    input.showResult = true;
	}
	
	// make the target or association words green
	
		openA = "<font class='size_me' color=black>";
		closeA = "</font>";
		
		open1 = "<font class='size_me' color=black>";
		close1 = "</font>";

	buildPage();
	roundArray = initRounds();
    instructionPage();
}

// Adds all images to page (initially hidden) so they are pre-loaded for IAT
function buildPage()
{
	
	if (input.catA.itemtype == "img")
	{
		for (i in input.catA.items)
		{
			var itemstr = '<img id="'+input.catA.datalabel+i+'" class="IATitem" src="'+input.catA.items[i]+'">';
			$("#exp_instruct").after(itemstr);
		}
	}
	if (input.catB.itemtype == "img")
	{
		for (i in input.catB.items)
		{
			var itemstr = '<img id="'+input.catB.datalabel+i+'" class="IATitem" src="'+input.catB.items[i]+'">';
			$("#exp_instruct").after(itemstr);
		}
	}
	if (input.cat1.itemtype == "img")
	{
		for (i in input.cat1.items)
		{
			var itemstr = '<img id="'+input.cat1.datalabel+i+'" class="IATitem" src="'+input.cat1.items[i]+'">';
			$("#exp_instruct").after(itemstr);
		}
	}
	if (input.cat2.itemtype == "img")
	{
		for (i in input.cat2.items)
		{
			var itemstr = '<img id="'+input.cat2.datalabel+i+'" class="IATitem" src="'+input.cat2.items[i]+'">';
			$("#exp_instruct").after(itemstr);
		}
	}
}

// Round object
function IATround()
{
	this.starttime = 0;
	this.endtime = 0;
	this.itemtype = "none";
	this.category = "none";
	this.catIndex = 0;

	this.correct = 0;
	this.errors = 0;
}

// shuffles an array 
function shuffle(o){ 
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

// Create array for each session & round, with pre-randomized ordering of images
function initRounds()
{
//############## Begin code for specific order ####################
var catOrder = new Array();
var rdex = new Array();  
//############## end specific order code  #####################

//used in generating random order
var catAdex = new Array();  
var catBdex = new Array();
var cat1dex = new Array();
var cat2dex = new Array();  

	for(k=0; k< input.catA.items.length; k++)
	{ catAdex[k] = k; }
	for(k=0; k< input.catB.items.length; k++)
	{ catBdex[k] = k; }
	for(k=0; k< input.cat1.items.length; k++)
	{ cat1dex[k] = k; }
	for(k=0; k< input.cat2.items.length; k++)
	{ cat2dex[k] = k; }

var ca;
var cb;
var c1;
var c2;


    var roundArray = [];
    // for each session
    for (var i=0; i<7; i++)
    {

		catAdex = shuffle(catAdex);
		catBdex = shuffle(catBdex);
		cat1dex = shuffle(cat1dex);
		cat2dex = shuffle(cat2dex);
		ca = 0;
		cb = 0;
		c1 = 0;
		c2 = 0;
		
        roundArray[i] = [];
        switch (i)
        {
            case 0:
                stype = "target";
                numrounds = 18;
                catOrder = [1, 2, 1, 1, 2, 2, 2, 1, 2, 2, 1, 1, 1, 1, 2, 2, 1, 2];
                rdex = [9, 7, 1, 4, 5, 3, 4, 8, 6, 8, 7, 3, 2, 6, 9, 2, 5, 1];
                break;
            case 1:
                stype = "association";
                numrounds = 18;
                catOrder = [3, 4, 3, 3, 3, 4, 4, 4, 3, 4, 3, 4, 3, 3, 3, 4, 4, 4];
                rdex = [6, 2, 3, 9, 7, 6, 1, 4, 5, 7, 4, 5, 2, 8, 1, 9, 3, 8];
                break;
            case 2:    
                stype = "both";
                numrounds = 4;
                catOrder = [2, 3, 1, 4];
                rdex = [0, 0, 0, 0, ];
                break;
            case 3:
                stype = "both";
                numrounds = 72;
                catOrder = [1, 3, 4, 2, 3, 1, 3, 1, 2, 3, 2, 1, 4, 1,
                			4, 3, 2, 4, 3, 2, 3, 4, 4, 2, 1, 4, 4, 2,
                			4, 1, 2, 4, 1, 2, 3, 3, 1, 3, 1, 3, 2, 3,
                			2, 3, 2, 3, 4, 1, 1, 4, 3, 2, 4, 2, 1, 2,
                			4, 4, 1, 4, 3, 2, 1, 4, 1, 2, 3, 2, 3, 1,
                			4, 1];
                rdex = [8, 6, 5, 1, 8, 6, 4, 1, 2, 9, 6, 9, 3, 8, 2,
                 		5, 5, 4, 7, 6, 1, 8, 7, 8, 5, 7, 6, 4, 1, 2, 
                 		4, 6, 5, 3, 6, 2, 9, 7, 7, 5, 1, 9, 9, 3, 8,
                 		2, 5, 1, 2, 4, 8, 3, 1, 5, 4, 7, 8, 3, 3, 9, 
                 		4, 2, 7, 2, 6, 9, 1, 7, 3, 3, 9, 4];
                break;
            case 4:
             	stype = "target";
                numrounds = 18;
                catOrder = [2, 2, 1, 2, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 2, 2, 2, 2];
                rdex = [3, 2, 1, 4, 7, 1, 8, 9, 7, 5, 6, 3, 4, 2, 5, 8, 9, 6];
                break;
            case 5:
                stype = "both";
                numrounds = 4;
                catOrder = [2, 3, 1, 4];
                rdex = [0, 0, 0, 0];
                break;
            case 6:
                stype = "both";
                numrounds = 72;
                catOrder = [3, 1, 4, 4, 1, 4, 4, 2, 1, 4, 1, 4, 2, 1,
                			3, 3, 3, 2, 4, 2, 4, 1, 2, 3, 1, 1, 3, 2,
                			2, 3, 1, 3, 3, 1, 4, 2, 3, 4, 4, 1, 4, 1,
                			2, 4, 1, 1, 4, 2, 3, 4, 2, 3, 3, 2, 4, 3,
                			3, 1, 2, 4, 2, 1, 2, 3, 3, 2, 2, 3, 2, 1,
                			4, 1];
                rdex = [6, 4, 1, 2, 2, 9, 6, 3, 5, 5, 3, 1, 2, 9, 7,
                		6, 9, 6, 3, 8, 6, 1, 7, 7, 5, 2, 5, 6, 3, 3,
                		7, 9, 2, 4, 7, 5, 1, 4, 7, 6, 9, 8, 2, 5, 7,
                		3, 8, 5, 8, 4, 8, 5, 4, 9, 8, 4, 1, 8, 4, 3,
                		7, 1, 9, 8, 2, 1, 4, 3, 1, 9, 2, 6];
                break;
            
        }
		prevIndexA = -1; prevIndex1 = -1;

        for (var j = 0; j<numrounds; j++)
        {
	    	
            var round = new IATround();
            var roundSet = false;
            var thisSwitch = catOrder[j];

             switch (thisSwitch)
	        {
	        	case 1:
	        		round.category = input.catA.datalabel;
	        		break;

	        	case 2:
	        		round.category = input.catB.datalabel;
	        		break;

	        	case 3:
	        		round.category = input.cat1.datalabel;
	        		break;
	        	case 4: 
	        		round.category = input.cat2.datalabel;
	        		break;

	        } 
	       
	     
           /* if (stype == "target")
            {
                round.category = (Math.random() < 0.5 ? input.catA.datalabel : input.catB.datalabel);
            }
            else if (stype == "association")
            {
                round.category = (Math.random() < 0.5 ? input.cat1.datalabel : input.cat2.datalabel);  
            }
            else if (stype == "both")
            {
				if (j % 2 == 0) { round.category = (Math.random() < 0.5 ? input.catA.datalabel : input.catB.datalabel); }
				else { round.category = (Math.random() < 0.5 ? input.cat1.datalabel : input.cat2.datalabel); }
            }*/




        	// pick a category
       	if (round.category == input.catA.datalabel) 
        	{ 

					
					// pick an item different from the last
		        	//while (prevIndexA == round.catIndex)
		        	    //{ 
	//round.catIndex = Math.floor(Math.random()*input.catA.items.length); 
				   // }
		        	//prevIndexA = round.catIndex;
				if (ca >=input.catA.items.length) 
					{
				round.itemtype = input.catB.itemtype;
					if (i < 4) { round.correct = 2; }
					else { round.correct = 1; }
				round.category = input.catB.datalabel			
	        		round.catIndex = rdex[j];//catBdex[cb];
			        cb = cb+1;		
				roundSet = true;
					}
				else
					{
					round.itemtype = input.catA.itemtype;
					if (i < 4) { round.correct = 1; }
					else { round.correct = 2; }
				round.catIndex = rdex[j];//catAdex[ca];
			        ca = ca+1;
					}
        	} 
        	else if (round.category == input.catB.datalabel)
        	{ 

					// pick an item different from the last
		        	//while (prevIndexA == round.catIndex)
		        	 //   { round.catIndex = Math.floor(Math.random()*input.catB.items.length); }
		        	//prevIndexA = round.catIndex;
			if(!roundSet){
				if (cb >=input.catB.items.length) 
					{
				round.itemtype = input.catA.itemtype;
					if (i < 4) { round.correct = 1; }
					else { round.correct = 2; }			
				round.category = input.catA.datalabel			
	        		round.catIndex = rdex[j];// catAdex[ca];
			        ca = ca+1;		

					}
				else
					{
					round.itemtype = input.catB.itemtype;
					if (i < 4) { round.correct = 2; }
					else { round.correct = 1; }
				round.catIndex = rdex[j];//catBdex[cb];
			        cb = cb+1;
					}
				    }
        	}
        	else if (round.category == input.cat1.datalabel) 
        	{ 

					
					// pick an item different from the last
		        	//while (prevIndexA == round.catIndex)
		        	    //{ 
	//round.catIndex = Math.floor(Math.random()*input.catA.items.length); 
				   // }
		        	//prevIndexA = round.catIndex;
				if (c1 >=input.cat1.items.length) 
					{
				round.itemtype = input.cat2.itemtype;
					 round.correct = 2; 
					
				round.category = input.cat2.datalabel			
	        		round.catIndex =  rdex[j]; //cat2dex[c2];
			        c2 = c2+1;		
				roundSet = true;
					}
				else
					{
					round.itemtype = input.cat1.itemtype;
					round.correct = 1; 
					
				round.catIndex =  rdex[j]; //cat1dex[c1];
			        c1 = c1+1;
					}
        	}
        	else if (round.category == input.cat2.datalabel)
        	{ 

						// pick an item different from the last
			        	//while (prevIndexA == round.catIndex)
			        	 //   { round.catIndex = Math.floor(Math.random()*input.catB.items.length); }
			        	//prevIndexA = round.catIndex;
				if(!roundSet){
					if (c2 >=input.cat2.items.length) 
						{
					round.itemtype = input.cat1.itemtype;
						round.correct = 1;
									
					round.category = input.cat1.datalabel			
		        		round.catIndex =  rdex[j]; //cat1dex[c1];
				        c1 = c1+1;		

						}
					else
						{
						round.itemtype = input.cat2.itemtype;
						 round.correct = 2; 
						
					round.catIndex =  rdex[j]; //cat2dex[c2];
				        c2 = c2+1;
						}
				    }
        	}
        	roundArray[i].push(round);
        }
    }
    
    return roundArray;
}

function setLabels()
{
	switch (session)
    {
		case 0://A and B
			if (input.catA.labeltype = "img")
			{
				$('#left_cat').html(openA+input.catA.label+closeA);
			}
			else
			{
				$('#left_cat').ready(function() { $('#left_cat').html(openA+input.catA.label+closeA); });
			}
			if (input.catB.labeltype = "img")
			{
				$('#right_cat').html(openA+input.catB.label+closeA);
			}
			else 
			{
				$('#right_cat').ready(function() { $('#right_cat').html(openA+input.catB.label+closeA); });
			}			
			break;
        case 1:    //1 and 2
			$("#left_cat").html(open1+input.cat1.label+close1);
			$("#right_cat").html(open1+input.cat2.label+close1);
            break;
        case 2:
        case 3:     //A or 1 and B or 2

			$("#left_cat").html(openA+input.catA.label+closeA+'<br>'+open1+input.cat1.label+close1);
			$("#right_cat").html(openA+input.catB.label+closeA+'<br>'+open1+input.cat2.label+close1);
			//$('#left_cat').html(openA+input.catA.label+closeA);
			//$('#right_cat').prepend('<img id="right" src="PuzzlePiece3_cropped.png" />')
            break;

        case 4:     //B and A
			$("#left_cat").html("");
			$("#right_cat").html("");
			if (input.catA.labeltype = "img")
			{
				$('#right_cat').html(openA+input.catA.label+closeA);
			}
			else
			{
				$('#right_cat').ready(function() { $('#left_cat').html(openA+input.catA.label+closeA); });
			}
			if (input.catB.labeltype = "img")
			{
				$('#left_cat').html(openA+input.catB.label+closeA);
			}
			else 
			{
				$('#left_cat').ready(function() { $('#right_cat').html(openA+input.catB.label+closeA); });
			}			
			break;
        case 5:
        case 6:		//B or 1 and A and 2
			
			$("#left_cat").html(openA+input.catB.label+closeA+'<br>'+open1+input.cat1.label+close1);
			$("#right_cat").html(openA+input.catA.label+closeA+'<br>'+open1+input.cat2.label+close1);
			//$('#right_cat').html(openA+input.catA.label+closeA);
			//$('#left_cat').prepend('<img id="right" src="PuzzlePiece3_cropped.png" />')
            break;
    }

}

// insert instruction text based on stage in IAT
function instructionPage()
{	

	document.getElementById("header").style.height='5px';
	if (session == 7)
	{
		$("#left_cat").html("");
		$("#right_cat").html("");
		$("#exp_instruct").html("<img src='spinner.gif'>");
		resultsString = WriteFile();
		if(input.showResult)
		{
		    calculateIAT(resultsString);
		}
		else
		{
		    resulttext = "<div style='text-align:center;padding:20px'>Thanks for participating!</div>";
		    $("#picture_frame").html(resulttext);
		}
	}
	else
	{
		if(!forward){
		
			switch(session)
			{
				case 0:
					
					switch(instrCount)
						{
							case 0:
								$.get("gInstruct"+(session+1)+".html", function(data) { $('#exp_instruct').html(data); });
								break;
							case 3:
								$.get("gInstruct9andhalf.html", function(data) { $('#exp_instruct').html(data); });
								$("#left_cat").hide();
								$("#right_cat").hide();
								instrCount = 0;
								setLabels();
								forward = true;
								break;
							default: 
								$.get("gInstruct"+(session+7+instrCount)+".html", function(data) { $('#exp_instruct').html(data); });
								break;
						}

					break;
				case 1:
					setLabels();					
					switch(instrCount)
						{   
							case 2:
								$.get("gInstruct11andhalf.html", function(data) { $('#exp_instruct').html(data); });
								instrCount = 0; //BUG HERE?
								setLabels();
								forward = true;
								break;
							default: 
								$.get("gInstruct"+(session+9+instrCount)+".html", function(data) { $('#exp_instruct').html(data); });
								$("#left_cat").hide();
								$("#right_cat").hide();
								break;
						}

					break;
				case 2:
					switch(instrCount)
						{   
							case 0:
								$.get("gInstruct"+(session+1)+".html", function(data) { $('#exp_instruct').html(data); });
								setLabels();
								forward = false;
								$("#left_cat").hide();
								$("#right_cat").hide();
								break;
							default: 
								$.get("gInstruct23.html", function(data) { $('#exp_instruct').html(data); });
								$("#left_cat").hide();
								$("#right_cat").hide();
								instrCount = 0;
								setLabels();
								forward = true;
								break;
						}
					break;
				case 3:
					document.getElementById("header").style.height='120px';
					currentState = "play";
					$('#exp_instruct').html('');
					displayItem();
					break;
					/*switch(instrCount)
						{   
							case 0:
								$.get("gInstruct"+(session+1)+".html", function(data) { $('#exp_instruct').html(data); });
								setLabels();
								forward = false;
								$("#left_cat").hide();
								$("#right_cat").hide();
								break;
							default: 
								$.get("gInstruct23.html", function(data) { $('#exp_instruct').html(data); });
								$("#left_cat").hide();
								$("#right_cat").hide();
								instrCount = 0;
								setLabels();
								forward = true;
								break;
						}
					break;*/
				case 5:
				
					switch(instrCount)
						{   
							case 0:
								$("#left_cat").hide();
								$("#right_cat").hide();
								forward = false;
								$.get("gInstruct"+(session+1)+".html", function(data) { $('#exp_instruct').html(data); });
								break;
							default: 
								$.get("gInstruct56.html", function(data) { $('#exp_instruct').html(data); });
								$("#left_cat").hide();
								$("#right_cat").hide();
								instrCount = 0;
								setLabels();
								forward = true;
								break;
						}
					break;
				case 6:
					document.getElementById("header").style.height='120px';
					currentState = "play";
					$('#exp_instruct').html('');
					displayItem();
					break;
				case 4:
					setLabels();
					$.get("gInstruct"+(session+9+instrCount)+".html", function(data) { $('#exp_instruct').html(data); });
					switch(instrCount)
						{   

							case 0:
								isFour = true;
								forward = false;
								$("#left_cat").hide();
								$("#right_cat").hide();
								break;
							case 1:
								break;
							default: 
								$("#left_cat").hide();
								$("#right_cat").hide();
								break;
						}

					break;
				default:
					$.get("gInstruct"+(session+1)+".html", function(data) { $('#exp_instruct').html(data); });
					instrCount = 0;
					setLabels();
					forward = true;
					$("#left_cat").hide();
					$("#right_cat").hide();
					break;

			}

		}
		else{
			alert("forward wasn't set");
			setLabels();
			$("#left_cat").hide();
			$("#right_cat").hide();
			$.get("gInstruct"+(session+1)+".html", function(data) { $('#exp_instruct').html(data); });
		}
	}



}

// Calculates estimate of effect size to present results to participant
function calculateIAT(result)
{



   // calculate mean log(RT) for first key trial
	compatible = 0;
	for (i=1; i<roundArray[3].length; i++)
	{
		score = roundArray[3][i].endtime - roundArray[3][i].starttime;
		if (score < 300) { score = 300; }
		if (score > 3000) { score = 3000; }
		compatible += Math.log(score);
	}
	compatible /= (roundArray[3].length - 1);
	
	// calculate mean log(RT) for second key trial
	incompatible = 0;
	for (i=1; i<roundArray[6].length; i++)
	{
		score = roundArray[6][i].endtime - roundArray[6][i].starttime;
		if (score < 300) { score = 300; }
		if (score > 3000) { score = 3000; }
		incompatible += Math.log(score);
	}
    incompatible /= (roundArray[6].length - 1);
    
    // calculate variance log(RT) for first key trial
    cvar = 0;
	for (i=1; i<roundArray[3].length; i++)
	{
		score = roundArray[3][i].endtime - roundArray[3][i].starttime;
		if (score < 300) { score = 300; }
		if (score > 3000) { score = 3000; }
	    cvar += Math.pow((Math.log(score) - compatible),2);
	}
	
	// calculate variance log(RT) for second key trial
	ivar = 0;
	for (i=1; i<roundArray[6].length; i++)
	{
		score = roundArray[6][i].endtime - roundArray[6][i].starttime;
		if (score < 300) { score = 300; }
		if (score > 3000) { score = 3000; }
	    ivar += Math.pow((Math.log(score) - incompatible),2);
	}
	
	// calculate t-value
	tvalue = (incompatible - compatible) / Math.sqrt(((cvar/39) + (ivar/39))/40);
    
    // determine effect size from t-value and create corresponding text
	if (Math.abs(tvalue) > 2.89) { severity = " <b>much more</b> than "; }
	else if (Math.abs(tvalue) > 2.64) { severity = " <b>more</b> than "; }	
	else if (Math.abs(tvalue) > 1.99) { severity = " <b>a little more</b> than "; }
	else if (Math.abs(tvalue) > 1.66) { severity = " <b>just slightly more</b> than "; }
	else { severity = ""; }
	
	// put together feedback based on direction & magnitude
	if (tvalue < 0 && severity != "")
    { 
        resulttext = "<div style='text-align:center;padding:20px'>You associate "+openA+input.catB.label+closeA+" with "+open1+input.cat1.label+close1;
        resulttext += " and "+openA+input.catA.label+closeA+" with "+open1+input.cat2.label+close1+severity;
        resulttext += "you associate "+openA+input.catA.label+closeA+" with "+open1+input.cat1.label+close1;
        resulttext += " and "+openA+input.catB.label+closeA+" with "+open1+input.cat2.label+close1+".</div>"; 
        // resulttext += "<div>incompatible: "+incompatible+" ("+(ivar/39)+"); compatible: "+compatible+" ("+(cvar/39)+"); tvalue: "+tvalue+"</div>";
    }
    else if (tvalue > 0 && severity != "")
    { 
        resulttext = "<div style='text-align:center;padding:20px'>You associate "+openA+input.catA.label+closeA+" with "+open1+input.cat1.label+close1;
        resulttext += " and "+openA+input.catB.label+closeA+" with "+open1+input.cat2.label+close1+severity;
        resulttext += "you associate "+openA+input.catB.label+closeA+" with "+open1+input.cat1.label+close1;
        resulttext += " and "+openA+input.catA.label+closeA+" with "+open1+input.cat2.label+close1+".</div>"; 
        // resulttext += "<div>incompatible: "+incompatible+" ("+(ivar/39)+"); compatible: "+compatible+" ("+(cvar/39)+"); tvalue: "+tvalue+"</div>";
    }
    else
    { 
        resulttext = "<div style='text-align:center;padding:20px'>You do not associate "+openA+input.catA.label+closeA;
        resulttext += " with "+open1+input.cat1.label+close1+" any more or less than you associate ";
        resulttext += openA+input.catB.label+closeA+" with "+open1+input.cat1.label+close1+".</div>"; 
        // resulttext += "<div>incompatible: "+incompatible+" ("+(ivar/39)+"); compatible: "+compatible+" ("+(cvar/39)+"); tvalue: "+tvalue+"</div>";
    }

resulttext = "<p>Here is your Authentication Code. </p></br>"
		+ "<p><b style='font-size:30px;'>"+thisHash+"</b> </p>";

	$("#picture_frame").html(resulttext);

}

// not currently used
function startSurvey()
{
    // demographics survey / explicit attitudes form, including:
	/*
	Please rate how warm or cold you feel toward the following groups 
	(0 = coldest feelings, 5 = neutral, 10 = warmest feelings)
	*/
}

// Converts the data for each session and round into a comma-delimited string
// and passes it to writeFile.php to be written by the server
function WriteFile()
{
	var str = "";
	/*for (i=0; i<roundArray.length; i++)
	{
		for (j=0;j<roundArray[i].length;j++)
		{
			str += "Category, Round, Errors, Time,";
		}
	}
		str += "hash, \n";*/

	for (i=0; i<roundArray.length; i++)
	{
		for (j=0;j<roundArray[i].length;j++)
		{
	        str += roundArray[i][j].category+",";
			str += i +", ";
			str += roundArray[i][j].errors+",";
			str += (roundArray[i][j].endtime - roundArray[i][j].starttime)+",";
		}
	}
	str += thisHash + ", \n";

    $.post("writeFile.php", { data: str });	
    return str;
}

// This monitors for keyboard events
function keyHandler(kEvent)
{   
if (session!=7)
  {

		// move from instructions to session on spacebar press
		var unicode=kEvent.keyCode? kEvent.keyCode : kEvent.charCode;
		keyE = (unicode == 69 || unicode == 101 );
		keyI = (unicode == 73 || unicode == 105 );
	//alert("here2");
		if(currentState == "instruction" && keyE)
		{//alert("here3");
		 	switch(session)
		 	{
		 		case 0:
		 			//alert("here");
		 			if (instrCount == 1)
		 			{	
		 				instrCount += 1;
		    			instructionPage();
		    		}
		    		break;
		    	case 1:
		    		if (instrCount == 1)
		 			{	
		 				instrCount += 1;
		    			instructionPage();
		    		}
		    		break;
		    	case 4:
		    		if (instrCount == 1 && (!forward))
		 			{	
						currentState = "play";
						$('#exp_instruct').html('');
						displayItem();
		    		}
		    		break;
		    	default:
		    		break;
		 	}

		}
		if(currentState == "instruction" && keyI)
		{//alert("here3");
		 	switch(session)
		 	{
		 		case 0:
		    		if (instrCount == 2)
		 			{	
		 				instrCount += 1;
		    			instructionPage();
		    		}
		    		break;
		    	case 1:
		    		if (instrCount == 0 && (!forward))
		 			{	
		 				instrCount += 1;
		    			instructionPage();
		    		}
		    		break;
		    	case 4:
		    		if (instrCount == 0 && (!forward))
		 			{	
		 				instrCount += 1;
		    			instructionPage();
		    		}
		    		break;
		    	default:
		    		break;
		 	}

		}

	    if (currentState == "instruction" && unicode == 32)
	    {
			switch(session)
		 	{
		 		case 0:
		 			//alert("here");
		 			if ((instrCount == 1) || (instrCount ==2))
		 			{	
		 				break;
		    		}
		    	case 1:
		    		if (((instrCount == 1) || (instrCount ==0 && (!forward))) && (session != 0))
		 			{	
		 				break;
		    		}
		    	case 4:
		    		if((instrCount == 0 && (!forward))&& (session != 0))
		    		{
		    			break;
		    		}
		    	default:
		    		if (!forward)
		    		{ // for the instructions with multiple pages
			    		instrCount += 1;
			    		instructionPage();
		    		}
		    		else
		    		{
						currentState = "play";
						$('#exp_instruct').html('');
						displayItem();

					}
		    		break;
		 	}
	    	
    	}
  	



	// in session
	if (currentState == "play")
	{
		document.getElementById("header").style.height='120px';
    	forward = false;
    	instrCount = 0;
		$("#left_cat").show();
		$("#right_cat").show();
		runSession(kEvent);
	}
  }
}

// Get the stimulus for this session & round and display it
function displayItem()
{
	var tRound = roundArray[session][roundnum]; 
	tRound.starttime = new Date().getTime(); // the time the item was displayed
	if (tRound.itemtype == "img")
	{
		if (tRound.category == input.catA.datalabel)
			{ $("#"+input.catA.datalabel+tRound.catIndex).css("display","block"); }
		else if (tRound.category == input.catB.datalabel)
			{ $("#"+input.catB.datalabel+tRound.catIndex).css("display","block"); }
		else if (tRound.category == input.cat1.datalabel)
			{ $("#"+input.cat1.datalabel+tRound.catIndex).css("display","block"); }
		else if (tRound.category == input.cat2.datalabel)
			{ $("#"+input.cat2.datalabel+tRound.catIndex).css("display","block"); }
	}
	else if (tRound.itemtype == "txt")
	{
		if (tRound.category == input.catA.datalabel)
		{ 
			$("#word").html(openA+input.catA.items[tRound.catIndex]+closeA)
			$("#word").css("display","block"); 
		}
		else if (tRound.category 
== input.catB.datalabel)
		{ 
			$("#word").html(openA+input.catB.items[tRound.catIndex]+closeA)
			$("#word").css("display","block"); 
		}
		else if (tRound.category == input.cat1.datalabel)
		{ 
			$("#word").html(open1+input.cat1.items[tRound.catIndex]+close1)
			$("#word").css("display","block"); 
		}
		else if (tRound.category == input.cat2.datalabel)
		{ 
			$("#word").html(open1+input.cat2.items[tRound.catIndex]+close1)
			$("#word").css("display","block"); 
		}
	}
}




function runSession(kEvent)
{
	var rCorrect = roundArray[session][roundnum].correct;
	var unicode = kEvent.keyCode? kEvent.keyCode : kEvent.charCode;
	
	if (!(isFour))
	{
			keyE = (unicode == 69 || unicode == 101 );
		keyI = (unicode == 73 || unicode == 105 );
		
		// if correct key (1 & E) or (2 & I)
		if ((rCorrect == 1 && keyE) || (rCorrect == 2 && keyI))
		{
			$("#wrong").css("display","none"); // remove X if it exists
			roundArray[session][roundnum].endtime = new Date().getTime(); // end time
			// if more rounds
			if (roundnum < roundArray[session].length-1)
			{
				roundnum++;
				$(".IATitem").css("display","none"); // hide all items
				displayItem(); // display chosen item
			}
			else
			{
	    		$(".IATitem").css("display","none"); // hide all items
				currentState = "instruction"; // change state to instruction
				session++; // move to next session
				roundnum=0; // reset rounds to 0
			    instructionPage(); // show instruction page
			}
		}
		// incorrect key
		else if ((rCorrect == 1 && keyI) || (rCorrect == 2 && keyE))
		{
			$("#wrong").css("display","block"); // show X
			roundArray[session][roundnum].errors++; // note error
		}
	}
	else {
		isFour = false;
	}
	
}

