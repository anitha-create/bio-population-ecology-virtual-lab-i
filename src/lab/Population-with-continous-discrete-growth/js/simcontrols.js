/*
Developed under a Research grant from NMEICT, MHRD
by
Amrita CREATE (Center for Research in Advanced Technologies for Education),
VALUE (Virtual Amrita Laboratories Universalizing Education)
Amrita University, India 2009 - 2013
http://www.amrita.edu/create
*/

var ctxCon;
var ctxDis;
var inter;
var imgCon = new Image();
imgCon.src = simPath+"images/continuousGrowth.jpg";
var imgDis = new Image();
imgDis.src = simPath+"images/discreteGrowth.jpg";
var randxCon;
var randyCon;
var xCon,yCon;
var randxDis;
var randyDis;
var xDis,yDis;
var count1=0;
var count2=0;
var shwGph=0;
var statShw=0;
var stepcnt=0;
var timerId;
var flagCon=true;
var flagDis=false;
var selectIteration=0;
var timerCurrentCount=0;
var workSheetShow=0;
var prevItem=0;
var timeDiff=0;
var TimeVarDis=0;
var TimeVarCon=0;
var timeDiffernceDis=0;
var timeDiffernceCons=0;
var numberOfPrevItem=0;
var numberOfItem=0;
var array_X= new Array();
var array_Y= new Array();
var ChartcategoryNames=new Array();
var ChartDataProvider=new Array();
var plotArray=new Array();

//Clicking tabs 
function tabClicked()
{
	clearCanvas();
}
function tabClickCon() {
	flagCon=true;
	flagDis=false;
	clearCanvas()
}
function tabClickDis() {
	flagDis=true;
	flagCon=false;
	clearCanvas()
}

$(document).ready(function(){
	alertfn();
	ctxCon = document.getElementById('speciesCanvas').getContext('2d');
	ctxDis = document.getElementById('speciesCanvas').getContext('2d');
	document.getElementById("statLabel").style.display="none";
	document.getElementById("Pause").disabled=true;

	// Click function of Statistics
	$("#Statistics").click(function () {
		getVal();
		if(stepcnt>0)
		{
			if(stepcnt<=contSteps-1){			
				if(statShw==0){
					document.getElementById("statLabel").style.display="block";
					document.getElementById("Statistics").style.color="#cacaca";
					document.getElementById("species1").innerHTML="Time:"+parseFloat(ChartcategoryNames[stepcnt-1]);
					document.getElementById("species2").innerHTML="Step:"+parseFloat(stepcnt-1);
					document.getElementById("species3").innerHTML="Population:"+ChartDataProvider[stepcnt-1];
					statShw=1;
				}
				else
				{
					document.getElementById("statLabel").style.display="none";
					document.getElementById("Statistics").style.color="#6e6e6e";
					statShw=0;
				}
			}
		} else if(stepcnt==0){
			document.getElementById("species1").innerHTML="Time:0";
			document.getElementById("species2").innerHTML="Step:0";
			document.getElementById("species3").innerHTML="Population:0";
		}
		TimeVarDis=(TimeVarDis+timeDiffernceDis);
		TimeVarCon=(TimeVarCon+timeDiffernceCons);		
	});

	//Click function of Data plots
	$("#dataPlots").click(function () {		
		if(selectIteration==1){
			if(workSheetShow==1)	
			{
				workSheetShow=0;
				document.getElementById("workSheet").style.display="none";
			}
			if(shwGph==0)
			{				
				document.getElementById("tinyGraphArea").style.display="block";
				document.getElementById("dataPlots").style.color="#cacaca";
				shwGph=1;	
				//showTooltip(item.pageX, item.pageY," X:" + x + " and Y:" + y);			
			}
			else
			{
				console.log(selectIteration,shwGph)
				document.getElementById("tinyGraphArea").style.display="none";
				document.getElementById("dataPlots").style.color="#6e6e6e";
				shwGph=0;
				$("#tooltip").remove();
			}
		}
	});

	// Click function of worksheet
	$("#workSheets").click(function () {
		if(shwGph==1)	
		{
			shwGph=0;
			document.getElementById("tinyGraphArea").style.display="none";
		}	
		if(workSheetShow==0){
			
			document.getElementById("workSheet").style.display="block";		
			document.getElementById("workSheets").style.color="#cacaca";
			if(flagDis) {			
				document.getElementById("workSheet1").innerHTML="Population with discrete model";
				document.getElementById("workSheet2").innerHTML="P = RtN0";
				document.getElementById("workSheet4").innerHTML="R = 1 + (B-D)";
				document.getElementById("workSheet5").innerHTML="P = R"+"t".sup()+" * N"+"0".sub();
				document.getElementById("workSheet6").innerHTML="P = ";
				$("#workSheet6").append("<input type='text' class='textField' id='population' style='float:right' />");
			} else if (flagCon) {
				document.getElementById("workSheet1").innerHTML="Population with continuous model";
				document.getElementById("workSheet2").innerHTML="P = N0ert";
				document.getElementById("workSheet4").innerHTML="P = N"+"0".sub()+" * e"+"rt".sup();
				document.getElementById("workSheet5").innerHTML="P = ";
				$("#workSheet5").append("<input type='text' class='textField' id='population' style='float:right' />");
				document.getElementById("workSheet6").innerHTML="";
			}
			workSheetShow=1;
		}
		else
		{	
			document.getElementById("workSheet").style.display="none";
			document.getElementById("workSheets").style.color="#6e6e6e";
			workSheetShow=0;
		}
		inputValueAtTimeChanged();
	});

	// Click function of Run Iteration
	$("#runIteration").click(function() {
		document.getElementById("stepRun").disabled=true;
		document.getElementById("Pause").disabled=false;
		selectIteration=1;
		getVal();
		timerId = setInterval(runItration, 500); 
	});

	// Click function of Step Run
	$("#stepRun").click(function() {
		selectIteration=1;
		getVal();
		if(stepcnt<=contSteps-1){		
			drawItem();
			document.getElementById("species1").innerHTML="Time:"+parseFloat(ChartcategoryNames[stepcnt-1]);
			document.getElementById("species2").innerHTML="Step:"+parseFloat(stepcnt-1);
			document.getElementById("species3").innerHTML="Population:"+ChartDataProvider[stepcnt-1];
			stepcnt++;
		} else {
			document.getElementById("stepRun").disabled=true;
			document.getElementById("runIteration").disabled=true;
			document.getElementById("Pause").disabled=true;
			document.getElementById("ReSet").disabled=false;
		}
		graphPlotValues();
	});	

	// Play pause functions
	$("#Pause").click(function() {
		if($(this).val()=="Pause"){
			clearInterval(timerId);
			document.getElementById("Pause").value="Play";
		}else{
			document.getElementById("Pause").value="Pause";
			getVal();
			timerId = setInterval(runItration, 200);
		}
	});
	
	// Go to step button 
	$("#goToStep").click(function() {
		getVal();
		if (document.getElementById("goStep").value!="") {
			if (document.getElementById("goStep").value>0) 
			{
				numInputSteps=document.getElementById("goStep").value;
				if(flagCon) {
					document.getElementById("contSteps").value=numInputSteps;
					eqTime=document.getElementById("contTime").value;				
				} else {
					document.getElementById("disSteps").value=numInputSteps;
					eqTime=document.getElementById("disTime").value;
				}			
				//timeDiff=parseFloat(eqTime/numInputSteps);
				graphPlotValues();
				timerIdStep = setInterval(drawSpecies, 0); 
			} 
		}else {
			alert("Enter a number");
		}
	});

	//Function for restrict alphabets in textbox
	$(".textField").keypress(function (e) {
		//if the letter is not digit then display error and don't type anything
		if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
			return false;
		}
	});

	// Reset function
	$("#ReSet").click(function () {
		window.location.reload();
	});

});

function onlyNumbers(e) {	
	//if the letter is not digit then display error and don't type anything
	if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
		
		return false;
	}
}

//Function for drawing Graph
function showGraph(arr)
{
	$.plot($("#tinyGraphArea"), [arr],
	{
		grid: 
		{
			hoverable: true, clickable: true
		},
		points: 
		{ 
			show: true 
		},
		lines: 
		{
			 show: true 
		}			
	});
}

//Function for getting values
function getVal()
{		
	//values of Continuous
	contTime=document.getElementById("contTime").value;
	contSteps=document.getElementById("contSteps").value;
	contInitialPop=document.getElementById("contInitialPop").value;
	contGrowth=document.getElementById("contGrowth").value;		
	//values of Discreat
	disTime=document.getElementById("disTime").value;
	disSteps=document.getElementById("disSteps").value;
	disInitialPop=document.getElementById("disInitialPop").value;
	disBirth=document.getElementById("disBirth").value;
	disDeath=document.getElementById("disDeath").value;

	count1=0;
	count2=0;
}	

// Getting x and y positions for species
for(w=0;w<=520;w+=20)
{
	array_X.push(w);
}
for(h=0;h<=408;h+=17)
{
	array_Y.push(h);
}

// Drawing the species
function drawSpecies(){
	document.getElementById("Statistics").disabled=false;
	document.getElementById("dataPlots").disabled=false;
	if(flagCon) {

		if(numberOfItem>0)
		{
			if(count1<numberOfItem)
			{				
				randxCon = Math.random() * (27 - 0);
				randyCon=  Math.random() * (24 - 0);
				xCon= Math.round(randxCon,0);
				yCon= Math.round(randyCon,0);			
				ctxCon = document.getElementById('speciesCanvas').getContext('2d');
				ctxCon.drawImage(imgCon,array_X[xCon],array_Y[yCon-1]);				
			} else {				
				clearInterval(inter);
				checkValueAlert(); 
			}
		}	
		count1++;
	} 
	if(flagDis) {
		if(numberOfItem>0)
		{
			if(count2<numberOfItem)
			{
				randxDis = Math.random() * (26 - 0);
				randyDis=  Math.random() * (24 - 0);
				xDis= Math.round(randxDis,0);
				yDis= Math.round(randyDis,0);
				ctxDis = document.getElementById('speciesCanvas').getContext('2d');
				ctxDis.drawImage(imgDis,array_X[xDis],array_Y[yDis-1]);
		    } else {		   		
		   		clearInterval(inter);
		   		//clearCanvas();
		   		checkValueAlert(); 
			}
		}
		count2++;
	}
}

// Getting the values for ploting graph
function graphPlotValues() {
	getVal();
	if (flagCon) {
		timeDiffernceCons = parseFloat(contTime/contSteps);
		numberOfItem=contInitialPop*Math.exp(contGrowth*TimeVarCon);
		ChartcategoryNames.push(TimeVarCon);
	} else {
		timeDiffernceDis = parseFloat(disTime/disSteps);
		var calcOne=Number(disBirth)-Number(disDeath);
		var growth=1+calcOne;
		numberOfItem=disInitialPop*Math.pow(growth,TimeVarDis);
		ChartcategoryNames.push(TimeVarDis);
	}	
	ChartDataProvider.push(numberOfItem);
	TimeVarDis=(TimeVarDis+timeDiffernceDis);
	TimeVarCon=(TimeVarCon+timeDiffernceCons);
	for(var i=0;i<ChartcategoryNames.length;i++){
		plotArray[i]=[ChartcategoryNames[i],ChartDataProvider[i]];
		showGraph(plotArray);
	}
	numberOfItem=Math.floor(numberOfItem);
	if (timerCurrentCount!=0) {
		
		prevItem=numberOfItem;
		// to decide whether the population decreases or increase...
		if ((numberOfPrevItem>numberOfItem)&&(disDeath>disBirth)) {
			
			numberOfItem=Math.abs((numberOfPrevItem-numberOfItem))*-1;
			
		} else {
			
			numberOfItem=Math.abs((numberOfPrevItem-numberOfItem));
			
		}
		numberOfPrevItem=prevItem;
	} else {
		numberOfPrevItem=numberOfItem;
	}
	timerCurrentCount++;	
}
// Calculating the worsheet values and displayed it in a textbox
function inputValueAtTimeChanged() {
	getVal();
	if(flagCon) {
		var N=contInitialPop;
		var calcOne=Number(contGrowth)-Number(disDeath);
		var r=1+calcOne;
	} else {
		var N=disInitialPop;
		var calcOne=Number(disBirth)-Number(disDeath);
		var r=1+calcOne;
	}
	$("#time").keyup(function () {
	 	if (! isNaN($("#time").val())) {
	 		var t=Number($("#time").val());
	 		var P="";
	 		if (flagDis) {
	 			P=N*Math.pow(r,t);				
	 		} else {
	 			r=Number(contGrowth);
	 			P=N*Math.exp(r*t);
	 		}
	 		if ($("#time").val()=="") {
	 		} else if (!isNaN(P)) {
	 			// To show answer in the work book..
	 			$("#population").val(P);
	 		}
	 	} else {
	 		alert("Please enter a valid number");
	 	}
	});
}

// Drawing item using timer
function drawItem()
{
	clearInterval(inter);
	inter =setInterval("drawSpecies()",0);	
}
// Function for total itration run
function runItration(){
	if(stepcnt<=contSteps-1){		
		drawItem();
		document.getElementById("species1").innerHTML="Time:"+parseFloat(ChartcategoryNames[stepcnt-1]);
		document.getElementById("species2").innerHTML="Step:"+parseFloat(stepcnt-1);
		document.getElementById("species3").innerHTML="Population:"+ChartDataProvider[stepcnt-1];
		stepcnt++;
	} else {
		document.getElementById("stepRun").disabled=true;
		document.getElementById("runIteration").disabled=true;
		document.getElementById("Pause").disabled=true;
		document.getElementById("ReSet").disabled=false;
	}
	graphPlotValues();
}
// Checking the values
function checkValueAlert() {
	getVal();
	if (flagDis) {
		if ((disBirth<0) || (disBirth>1)) {
			alert("Number of births and deaths should be between 0 and 1.");
		} else if ((disBirth==0) && (disDeath==1)) {
			alert("Number of births and deaths should be between 0 and 1.");
		} else if ((disDeath<0) || (disDeath>1)) {
			alert("Number of births and deaths should be between 0 and 1.");
		} else if (((String(disBirth)) == (String(disDeath)))) {
			alert("Number of births and deaths should not be equal.");
		}
	}
}
//fn for clear canvas
function clearCanvas(){
	count1=0;
	count2=0;
	shwGph=0;
	statShw=0;
	stepcnt=0;
	selectIteration=0;
	timerCurrentCount=0;
	workSheetShow=0;
	prevItem=0;
	timeDiff=0;
	TimeVarDis=0;
	TimeVarCon=0;
	timeDiffernceDis=0;
	timeDiffernceCons=0;
	numberOfPrevItem=0;
	numberOfItem=0;
	ChartcategoryNames=new Array();
	ChartDataProvider=new Array();
	document.getElementById("workSheet").style.display="none";
	document.getElementById("statLabel").style.display="none";
	document.getElementById("tinyGraphArea").style.display="none";
    ctxCon.clearRect(0, 0, document.getElementById('speciesCanvas').width, document.getElementById('speciesCanvas').height);
    ctxDis.clearRect(0, 0, document.getElementById('speciesCanvas').width, document.getElementById('speciesCanvas').height);
    clearInterval(timerId);
    clearInterval(inter);
}
