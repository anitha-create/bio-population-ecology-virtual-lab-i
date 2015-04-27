<!--
Developed under a Research grant from NMEICT, MHRD
by
Amrita CREATE (Center for Research in Advanced Technologies for Education),
VALUE (Virtual Amrita Laboratories Universalizing Education)
Amrita University, India 2009 - 2013
http://www.amrita.edu/create
-->


<ul>
<li><h1>Variables<span></span></h1>
<div class="varBox">
<div id="tabContainer" onClick="tabClicked()">
    <div class="tabs">
          <ol class="tabbed">
                <li id="tabHeader_1" ><div id="tab1" onClick="tabClickCon()"><img src="<?php getSimPath(); ?>images/continuousGrowth.jpg" style="width:12px; height:12px;"/> Continuous</div></li>
                <li id="tabHeader_2" ><div id="tab2" onClick="tabClickDis()"><img src="<?php getSimPath(); ?>images/discreteGrowth.jpg" style="width:12px; height:12px;"/> Discrete</div></li>            
          </ol>
    </div>
	<div class="tabscontent">
		<div class="tabpage" id="tabpage_1"  >
			<p class="varTitle">Time:<br>T:<input type="text" class="textField" value="100" id="contTime"></p><br>
			<p class="varTitle">Number of steps:<br>Ns:<input type="text" class="textField" value="50" id="contSteps"></p><br>
			<p class="varTitle">Initial Population:<br>No:<input type="text" class="textField" value="202" id="contInitialPop"></p><br>
			<p class="varTitle">Rate of growth:<br>R:<input type="text" class="textField" value="0.101" id="contGrowth"></p><br>
		</div>  
		<div class="tabpage" id="tabpage_2">
			<p class="varTitle">Time:<br>T:<input type="text" class="textField" value="100" id="disTime"></p><br>
			<p class="varTitle">Number of steps:<br>Ns:<input type="text" class="textField" value="1000" id="disSteps"></p><br>
			<p class="varTitle">Initial Population:<br>No:<input type="text" class="textField" value="50" id="disInitialPop"></p><br>
			<p class="varTitle">Birth rate:<br>B:<input type="text" class="textField" value="0.45" id="disBirth"></p><br>
			<p class="varTitle">Death rate:<br>D:<input type="text" class="textField" value="0.1" id="disDeath"></p><br>
		</div>
	</div>
</li>
<br>
<br>

<li><h1>Simulation Control</h1><br>
<div class="varBox">
<p><input class="submitBtns" type="button" value="Go to step" id="goToStep"><input class="textField" id="goStep" type="text"></p>
<p><input class="submitBtns" type="button" value="Step run" id="stepRun"><input class="submitBtns" type="button" value="Run iteration" id="runIteration"></p>
<p><input class="submitBtns" type="button" value="Pause" id="Pause"><input class="submitBtns" type="button" value="Reset" id="ReSet"></p>
</div>
</li>

</ul>
<script src="<?php getSimPath(); ?>js/tabs.js" language="javascript">
</script>