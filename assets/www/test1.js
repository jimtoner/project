window.onload = init();

function init() {
	var sheet = document.getElementById("m_gridContent");
	sheet.addEventListener("scroll", function(event) {
		var rowHeader1 = document.getElementById("m_rowHeader_flow_1");
		rowHeader1.style.top = -sheet.scrollTop + "px";
		var rowHeader2 = document.getElementById("m_rowHeader_flow_2");
		rowHeader2.style.top = -sheet.scrollTop + "px";//rowHeader1.offsetTop + rowHeader1.offsetHeight;
	}, false);
}

		// <!--<script type="text/javascript">
			// window.onload = init();
			// function init() {
				// var sheet = document.getElementById("gridContent");
				// sheet.addEventListener("scroll", function(event) {
					// var rowHeader = document.getElementById("rowHeader");
					// rowHeader.style.top = -gridContent.scrollTop + "px";
				// }, false);
			// }
		// </script>-->
