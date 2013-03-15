
window.onload = init();

function GraphicCanvas (canvas) {
	this.canvas = canvas;
	this.context = canvas.getContext("2d"); 
}

function init() {
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	
	var graphicCanvas = new GraphicCanvas(canvas, context);
	// graphicsCanvas.canvas = canvas;
	// graphicsCanvas.context = canvas.getContext("2d");
	// drawDiagonal(graphicCanvas);
	// drawExample(context);	drawGrid(context, canvas.width, canvas.height);
}

function drawGrid (context, width, height) {
	var startX = 0;
	var endX = 0;
	var startY = 0;
	var endY = 0;
	
	for (var j = 0; j < 10; j++) {
		context.beginPath();
		context.moveTo(startX, startY);
		context.lineTo(startX, startY + height);
		startX += 30;
		context.stroke();
	}

	startX = 0;
	startY = 0;
	for (var i = 0; i < 20; i++) {
		context.beginPath();
		context.moveTo(startX, startY);
		context.lineTo(startX + width, startY);
		context.stroke();
		startY += 20;
	}
}

function drawDiagonal(graphicCanvas) {
	graphicCanvas.context.beginPath();
	graphicCanvas.context.moveTo(70, 140);
	graphicCanvas.context.lineTo(140, 70);
	graphicCanvas.context.stroke();
	graphicCanvas.context.font = "30px Times New Roman"; 
	graphicCanvas.context.fillText("HelloCanvas", 100, 100);
}


function drawExample() {
	var canvas = document.getElementById("canvas");
	var context2D = canvas.getContext("2d");

	//绘制相交的线段
	context2D.beginPath();
	context2D.moveTo(50, 50);
	//指定一条线段的起点
	context2D.lineTo(100, 100);
	//指定一条线段的终点
	context2D.moveTo(200, 50);
	context2D.lineTo(100, 100);
	context2D.stroke();

	//绘制与这两条线段相切的红色圆弧
	context2D.beginPath();
	//清除之前的路径并提醒Context开始绘制一条新的路径，否则当调用stroke()方法的时候会绘制之前所有的路径
	context2D.strokeStyle = "#ff0000";
	context2D.moveTo(50, 50);
	context2D.arcTo(100, 100, 200, 50, 100);
	//很明显，这里的参数不好设置……
	context2D.stroke();
	//绘制一个蓝色的圆
	context2D.beginPath();
	context2D.strokeStyle = "#ff0000";
	context2D.arc(300, 250, 100, 0, Math.PI * 2, false);
	//注意这里的参数是弧度制，而不是角度制
	context2D.stroke();
	//将上面的圆填充为灰色
	context2D.fillStyle = "#a3a3a3";
	context2D.fill();
	//在上面的圆中剪辑一个圆形方形区域
	context2D.beginPath();
	context2D.rect(250, 200, 100, 100);
	context2D.clip();
	//这个方法确实很土，需要借助于默认的矩形或者制定的矩形，而不能自定义矩形
	//在剪辑区域中填充一个大于该区域尺寸的矩形
	context2D.fillStyle = "yellow";
	context2D.fillRect(0, 0, 400, 400);
}

