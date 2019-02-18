/*
	author : Choi jae young
*/

//animation class
let animationData = function(x, y, animationTick) {
	let m_x;
	let m_y;
	let m_animationTick;
	let init = function(x, y, animationTick) {
		m_x = x;
		m_y = y;
		m_animationTick = animationTick;
	}
	this.getX = function() {
		return m_x;
	}
	this.getY = function() {
		return m_y;
	}
	this.getTick = function() {
		return m_animationTick;
	}
	init(x, y, animationTick);
}

//Point Class draw line and circle
let point = function(x, y) {
	let m_x, m_y;
	let m_nearPoint = [];

	let currentTick;
	let currentIndex;
	let animationPoint = [];
	let init = function(x, y) {
		m_x = x;
		m_y = y;

		initializeAnimation();
	}
	//animation initialize
	let initializeAnimation = function() {
		currentTick = 0;
		currentIndex = Math.floor(Math.random()*4);
		for(i = 0; i < 4; i++) {
			animationPoint.push(new animationData(Math.floor(Math.random()*100 + (m_x-50)), Math.floor(Math.random()*100 + (m_y-50)), Math.floor(Math.random()*100 + 70)));
		}
		changeAnimation();
	}
	let changeAnimation = function() {
		let i;

		i = Math.floor(Math.random()*4);

		currentTick = 0;
		currentIndex = i;
	}
	let animationProcess = function() {
		if(++currentTick == animationPoint[currentIndex].getTick())
			changeAnimation();

		m_x += (animationPoint[currentIndex].getX()-m_x)/animationPoint[currentIndex].getTick();
		m_y += (animationPoint[currentIndex].getY()-m_y)/animationPoint[currentIndex].getTick();
	}
	//find near points
	this.getNearPoints = function(list) {
		for(let i = 0; i < list.length; i++) {
			if(list[i] == this) continue;

			if(m_nearPoint.length < 5) {
				m_nearPoint.push(list[i]);
			}
			else {
				for(let j = 0; j < m_nearPoint.length; j++) {
					if(list[i].getDistance(this) < m_nearPoint[j].getDistance(this)){
						let maxIndex = 0;
						for(let o = 1; o < m_nearPoint.length; o++) {
							if(m_nearPoint[o].getDistance(this) > m_nearPoint[maxIndex].getDistance(this)) {
								maxIndex = o;
							}
						}
						m_nearPoint[maxIndex] = list[i];
						break;
					}
				}
			}
		}
	}
	this.getX = function() {
		return m_x;
	}
	this.getY = function() {
		return m_y;
	}
	this.getDistance = function(p1) {
		return Math.pow(m_x - p1.getX(), 2) + Math.pow(m_y - p1.getY(), 2);
	}
	//draw Circle
	this.drawCircle = function(context, x, y, enable) {
		if(enable) 
			animationProcess();
		if(!(this.reverseVariable(Math.sqrt(this.getDistance(new point(x, y)))/250) > 0)) {
			return;
		}
		context.beginPath();
		context.arc(m_x, m_y, 3, 0, 2 * Math.PI, false);
		//context.fillStyle = 'rgba(' + 255 + ',' + 0 + ',' + 0 + ',' + 1 +')';
		context.fillStyle = 'rgba(235, 42, 46,' + this.reverseVariable(Math.sqrt(this.getDistance(new point(x, y)))/250) +')';
		context.fill();	
	}
	//draw Line
	this.drawLine = function(context, x, y) {
		if(!(this.reverseVariable(Math.sqrt(this.getDistance(new point(x, y)))/250) > 0)) {
			return;
		}
		for(let i = 0; i < m_nearPoint.length; i++) {
			context.beginPath();
			context.moveTo(m_x, m_y);
			context.lineTo(m_nearPoint[i].getX(), m_nearPoint[i].getY());
			context.lineWidth = 0.5;
			//context.strokeStyle = 'rgba(' + 255 + ',' + 0 + ',' + 0 + ',' + 1 +')';
			context.strokeStyle = 'rgba(100, 100, 100, ' + this.reverseVariable(Math.sqrt(this.getDistance(new point(x, y)))/250) +')';
			context.stroke();
		}
	}
	this.reverseVariable = function(num) {
		return 1-num;
	}
	init(x, y);
}


//app.js
let app = function() {
	let canvas;
	let context;
	let pointList = [];
	let mouseX = 0;
	let mouseY = 0	;
	let circleNum = 200;
	// Initialize canvas and Add Events
	let init = function() {
		canvas = document.getElementById('myCanvas');
		context = canvas.getContext("2d");
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		window.addEventListener('resize', resizeEvent);
		window.addEventListener('mousemove', mouseMove);
		window.requestAnimationFrame(draw);
		createPoint(circleNum)
	}
	let mouseMove = function(e) {
		mouseX = e.pageX;
		mouseY = e.pageY;
		Mousedraw();
	}

	//Create Point  Limit = max(default: 200);
	let createPoint = function(max) {
		let maxWidth = window.innerWidth;
		let maxHeight = window.innerHeight;

		for(let i = 0; i < max; i++) {
			pointList.push(new point(Math.floor(Math.random()*maxWidth+1), Math.floor(Math.random()*maxHeight+1)));
		}

		for(let i = 0; i < max; i++) {
			pointList[i].getNearPoints(pointList);
		}
		draw(max);
	}
	let draw = function() {
		context.clearRect(0, 0, canvas.width, canvas.height);

		//draw
		for(let i = 0; i < circleNum; i++) {
			pointList[i].drawCircle(context, mouseX, mouseY, true);
			pointList[i].drawLine(context, mouseX, mouseY);
		}
		window.requestAnimationFrame(draw);
	}
	//repaint when mouse move
	let Mousedraw = function() {
		context.clearRect(0, 0, canvas.width, canvas.height);
		for(let i = 0; i < circleNum; i++) {
			pointList[i].drawCircle(context, mouseX, mouseY, false);
			pointList[i].drawLine(context, mouseX, mouseY);
		}	
	}
	let resizeEvent = function() {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	}
	let getDistance = function(p1, p2) {
		return Math.pow(p1.getX() - p2.getX(), 2) + Math.pow(p1.getY() - p2.getY(), 2);
	}
	init();
}
new app();