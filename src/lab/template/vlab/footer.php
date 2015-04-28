   </div>
   <script type="text/javascript">
 $(function() {
 	squarify('#canvasBox');
	siteResize();
 });
 

	function squarify(element) {
		if($(document).innerWidth() > $(document).innerHeight()) {
			var pgValue = ($(document).innerHeight())-122;
		} else if($(document).innerHeight() > $(document).innerWidth()) {
			if($(document).innerWidth() < 601) {
				var pgValue = $(document).innerWidth() - 55;
			} else {
				var pgValue = $(document).innerWidth() - ($(".controlHolder").width() + 55);
			}
		}
		$(element).css('width',(pgValue)+'px');
		$(element+", .controlHolder ul").css('height',(pgValue)+'px');
	}
	
	function siteResize() {
		var pgWidth = $('#canvasBox').width() + $(".controlHolder").width() + 55;
		var siteWidth = (pgWidth); //Controls site width
		$(".main").css('width',(siteWidth)+'px');
	}
	
	window.onload = function() {
		$('.controlHolder').wrap("<div id='menu'></div>");
		$("#menu").append('<div class="g198 menuSet"><a href="#"><img src="<?php echo getTempImage('saveIco.gif'); ?>" alt="Save" width="23" height="22" border="0" /></a><a href="#"><img src="<?php echo getTempImage('printIco.gif'); ?>" width="26" height="22" border="0" /></a><a href="#"><img src="<?php echo getTempImage('helpIco.gif'); ?>" alt="Help" width="25" height="22" border="0" /></a><a href="#"><img src="<?php echo getTempImage('zoomIco.gif'); ?>"alt="Fullscreen" width="23" height="22" border="0" /></a></div>');
	}
 
</script>
   
    <footer id="tempFooter"><div class="g396 footer">
   <p class="labName">   <?php echo $GLOBALS['comp_name']; ?> </p>  </div>
  <!-- end .g396 -->
  <div class="g396 footer">
    <p class="copyName"><?php echo $GLOBALS['copy_name']; ?> </p>
  </div>
    <div class="clear"></div>
   </footer> <!-- /footer -->
 
</div>
<?php
getWorksheet();
?>
<script type="text/javascript" src="../lib/js/resp.js"></script>
</body>
</html>