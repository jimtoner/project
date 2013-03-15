window.onload = init;
//动态生成的sheet内容节点索引
var currFlowIdx = 0;

function GridRange() {
	this.left = 0;
	this.top = 0;
	this.right = 0;
	this.bottom = 0;
}

GridRange.prototype.toString = function () {
	return "GridRange:" + this.left + "," + this.top + ","
	 + this.right + "," + this.bottom;
}

/**
 *	缓存行列数据,单位都是从内核中取出的原始单位
 */
function GridLayoutInfo() {
	//当前的缓存范围
	this.rangeCache = new GridRange();
	this.defaultRowHeight = 0;
	this.defaultColWidth = 0;
	
	//行：以twip为单位	
	this.rowCache = new Array();
	//列：以excel中的列字符单位定义
	this.columnCache = new Array();
}

function UnitsConverter(xdpi, ydpi) {
	this.xdpi = xdpi;
	this.ydpi = ydpi;
}


function init() {
	currFlowIdx = 1;
	var excelSheetContentDiv = document.getElementById("m_excelWebRenderer_ewaCtl_sheetContentDiv");
	//滚屏事件
	scrollRegist(excelSheetContentDiv);
	
	var sheetTable = document.getElementById("m_excelWebRenderer_ewaCtl_scrollTable");
	sheetTable.onclick = clickHandler;
}

function clickHandler (event) {
	//TODO:
}

function isTouchDevice(){
	try{
		document.createEvent("TouchEvent");
		return true;
	}catch(e){
		return false;
	}
}

function scrollRegist (sheet) {
	//移动设备上是不会直接响应此事件的
	sheet.addEventListener("scroll", function(event) {
		var columnHeader = document.getElementById("m_excelWebRenderer_ewaCtl_columnHeadersDiv_Flow_0");
		var excelSheetContentDiv = document.getElementById("m_excelWebRenderer_ewaCtl_sheetContentDiv");

		var rowHeader = null;
		for (var i = 0; i <= currFlowIdx; ++i) {
			rowHeader = document.getElementById("m_excelWebRenderer_ewaCtl_rowHeadersDiv_Flow_" + i);
			if (rowHeader != null) {
				rowHeader.style.top = -excelSheetContentDiv.scrollTop + "px";
			}
		}
		columnHeader.style.left = -excelSheetContentDiv.scrollLeft + "px";
		
		var sheetContent = null;
		// for (i = 0; i <= currFlowIdx; ++i) {
			// sheetContent = document.getElementById("m_excelWebRenderer_ewaCtl_sheetContentDiv_Flow_" + i);
			// if (sheetContent != null) {
				// sheetContent.style.top = -excelSheetContentDiv.scrollTop + "px";
			// }
		// }
		
		// if (excelSheetContentDiv.scrollTop + excelSheetContentDiv.clientHeight <= rowHeader.scrollHeight) {
			// rowHeader.style.top = -excelSheetContentDiv.scrollTop + "px";
		// }else {
			// // if (-rowHeader.offsetTop <= rowHeader.scrollHeight) {
				// // rowHeader.style.top = -excelSheetContentDiv.scrollTop + "px";
			// // }
			// currFlowIdx++;
			// var rowHeaderNext = document.getElementById("m_excelWebRenderer_ewaCtl_rowHeadersDiv_Flow_" + currFlowIdx);
			// if (rowHeaderNext != null) {
				// rowHeaderNext.style.top = rowHeader.style.top + rowHeader.scrollHeight + "px";
			// } else {
				// //TODO:先判断行标头范围是不是超出了usedRange,超出后直接客户端生成，否则需要和服务器交互获取行高列宽信息
				// rowHeaderNext = createFlowRowHeader (currFlowIdx);
				// rowHeaderNext.style.top = -excelSheetContentDiv.scrollTop + "px";
			// }
			// // excelSheetContentDiv.scrollHeight += rowHeader.style.height;
		// }
		
		if (excelSheetContentDiv.scrollLeft <= columnHeader.style.width) {
		} else {
			
		}
		
		updateViewSize();
	}, false);

	if(isTouchDevice()){ //if touch events exist...
		var scrollStartXPos = 0;
		var scrollStartYPos = 0;

		sheet.addEventListener("touchstart", function(event) {
			if (event.touches.length == 1) {
				scrollStartXPos = this.scrollLeft + event.touches[0].pageX;
				scrollStartYPos = this.scrollTop + event.touches[0].pageY;
			}
			event.preventDefault();
		}, false);

		sheet.addEventListener("touchmove", function(event) {
			if (event.touches.length == 1) {
				this.scrollLeft = scrollStartXPos - event.touches[0].pageX;
				this.scrollTop = scrollStartYPos - event.touches[0].pageY;
			}
			event.preventDefault();
		},false);
	} else {
		//动态修改ewr-sheetcontainer的overflow属性
		document.getElementById("m_excelWebRenderer_ewaCtl_sheetContentDiv").className = "ewr-sheetcontainer-pc ewr-grdblkcontainer ewa-scrollbars";
	}
}

function deleteFlow (flowIndex) {
	if (flowIndex < 0) {
		return;
	} else {
		var rowHeaderContainer = document.getElementById("m_excelWebRenderer_ewaCtl_rowHeadersDiv");
		var rowHeaderFlow = document.getElementById("m_excelWebRenderer_ewaCtl_rowHeadersDiv_Flow_" + flowIndex);
		rowHeaderContainer.removeChild(rowHeaderFlow);
	}
}

function createFlowRowHeader (flowIndex) {
	var rowHeaderRoot = document.getElementById("m_excelWebRenderer_ewaCtl_rowHeadersDiv");
	var flowHeader = document.createElement("div");
	flowHeader.className = "ewr-grdblkflow";
	flowHeader.id = "m_excelWebRenderer_ewaCtl_rowHeadersDiv_Flow_" + flowIndex;
	rowHeaderRoot.appendChild(flowHeader);
	
	var flowclip = document.createElement("div");
	flowclip.className = "ewr-grdblkflowclip";
	flowHeader.appendChild(flowclip);
	var grdblkpush = document.createElement("div");
	grdblkpush.className = "ewr-grdblkpush";
	grdblkpush.style.width = "0px";
	flowclip.appendChild(grdblkpush);
	
	var grdblk = document.createElement("div");
	grdblk.className = "ewr-grdblk";
	grdblk.style.height = "504px";
	grdblkpush.appendChild(grdblk);
	
	var rowhdcontainer = document.createElement("div");
	rowhdcontainer.className = "ewr-rowhdrcontainer-brdr";
	rowhdcontainer.style.height = "504px";
	grdblk.appendChild(rowhdcontainer);
	var baseRowIndex = 57;
	
	for (var i = 0; i < 25; i++) {
		rowhdcontainer.appendChild(createRowHeaderItem(baseRowIndex, i, 17));
	}
	
	return flowHeader;
}

function createRowHeaderItem (baseRowIndex, index, height) {
	var item = document.createElement("div");
	item.className = "ewrch-row-nosel";
	item.style.top = index * height + "px";
	item.style.height = height + "px";
	
	var rowName = document.createElement("div");
	rowName.className = "ewr-rhc";
	rowName.innerText = baseRowIndex + index;
	item.appendChild(rowName);
	
	return item;
}

function updateViewSize () {
	// var excelSheetContentDiv = document.getElementById("m_excelWebRenderer_ewaCtl_sheetContentDiv");
	// var rowHeader = document.getElementById("m_excelWebRenderer_ewaCtl_rowHeadersDiv_Flow_0");
	// var columnHeader = document.getElementById("m_excelWebRenderer_ewaCtl_columnHeadersDiv_Flow_0");
// 
	// var left = excelSheetContentDiv.scrollLeft;
	// var top = excelSheetContentDiv.scrollTop;
	// if (rowHeader.style.width > left) {
		// alert ("rowHeader invalid");
		// var rowHeader = document.getElementById("m_excelWebRenderer_ewaCtl_rowHeadersDiv_Flow_1");
// 		
	// }
	// if (columnHeader.style.height > top) {
		// alert ("columnHeader invalid");
	// }	
// 	
	// if (excelSheetContentDiv.style.width > left ||
		 // excelSheetContentDiv.style.height > top) {
		 	// alert ("sheet content invalid");
	// }
}
