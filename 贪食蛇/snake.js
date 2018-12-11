//点击开始游戏，-》startpage消失-开始游戏
//随机出现食物，出现3节蛇 开始运动
//按方向键 -》根据方向键改变方向
//判断是否吃到食物 --》食物消失 蛇加1
//判断游戏结束 弹出块
//
//
var content = document.getElementById('content');
var startPage = document.getElementById('startPage');
var snakeTimer = 0;
var speed = 200;
var scoreBox = document.getElementById('score');
init();

function init() {
	// 地图...
	this.mapW = parseInt(content.clientWidth);
	this.mapH = parseInt(content.clientWidth);
	// console.log(this.mapW,this.mapH);
	this.mapDiv = content;

	//食物
	this.foodW = 20;
	this.foodH = 20;
	this.foodX = 0;
	this.foodY = 0;

	//蛇
	this.snakeW = 20;
	this.snakeH = 20;
	this.snakeBody = [[3,1,'head'],[2,1,'body'],[1,1,'body']];

	//游戏属性
	this.direct = 'right';
	this.left = false;
	this.right = false;
	this.up = true;
	this.down = true;

	//
	this.score = 0;

	startGame();

}



function startGame() {
	food();//
	snake();
	bindEvent();

	snakeTimer = setInterval(function (){
		move();
		if(this.score>10){
			clearInterval(snakeTimer);
		}
	},speed);

}

function food() {
	var food = document.createElement('div');
	food.style.width =this.foodW + "px";
	food.style.height = this.foodH + "px";
	food.style.position = 'absolute';
	this.foodX = Math.floor( Math.random() * (this.mapW / 20));
	this.foodY = Math.floor( Math.random() * (this.mapH / 20));
	// console.log("food",this.foodX,this.foodY);
	food.style.left = this.foodX * 20 + "px";
	food.style.top = this.foodY * 20 + "px";
	this.mapDiv.appendChild(food).setAttribute('class','food');

}

function snake() {
	// body...
	for(var i = 0; i < this.snakeBody.length; i++){
		var snake =  document.createElement('div');
		snake.style.width = this.snakeW + "px";
		snake.style.height = this.snakeH + "px";
		snake.style.position = 'absolute';
		snake.style.left = this.snakeBody[i][0] * 20 + "px";
		snake.style.top = this.snakeBody[i][1] * 20 + "px";
		snake.classList.add(this.snakeBody[i][2]);
		this.mapDiv.appendChild(snake).classList.add('snake');
	}
}

function move() {
	// body...
	for(var i = this.snakeBody.length-1; i > 0 ; i--){
		this.snakeBody[i][0] = this.snakeBody[i-1][0];
		this.snakeBody[i][1] = this.snakeBody[i-1][1];
	}

	switch(this.direct){
		case 'right':
			this.snakeBody[0][0] +=1;
			break;
		case 'up':
			this.snakeBody[0][1] -=1;
			break;
		case 'down':
			this.snakeBody[0][1] +=1;
			break;
		case 'left':
			this.snakeBody[0][0] -=1;
			break;
		default:
			break;
	}
	removeClass('snake');
	snake();

	if(this.snakeBody[0][0]==this.foodX && this.snakeBody[0][1]==this.foodY){
		this.score ++;
		scoreBox.innerHTML = this.score;
		removeClass('food');
		food();

		var snakeEndX = this.snakeBody[this.snakeBody.length -1][0];
		var snakeEndY = this.snakeBody[this.snakeBody.length -1][1];
			
		switch(this.direct){
			case "right":
				this.snakeBody.push([snakeEndX-1,snakeEndY,'body']);
				break;
			case "left":
				this.snakeBody.push([snakeEndX+1,snakeEndY,'body']);
				break;
			case "up":
				this.snakeBody.push([snakeEndX,snakeEndY+1,'body']);
				break;
			case "down":
				this.snakeBody.push([snakeEndX,snakeEndY-1,'body']);
				break;
		}
	}
}

function removeClass(className){
	var ele = document.getElementsByClassName(className);
	while(ele.length){
		ele[0].parentNode.removeChild(ele[0]);
	}
	// this.mapDiv.innerHTML = "";
}

function bindEvent(){
	document.onkeydown =function(e){
		var code = e.keyCode;
		setDirect(code);//37 left 38up 39right 40down
		// console.log(code);
	}
}

function setDirect(code){
	switch(code){
		case 37: //left
			if(this.left){
			this.direct = "left";
			this.left = false;
			this.right = false;
			this.up = true;
			this.down = true;
			}
			break;
		case 39:
			if(this.right){
			this.direct = "right";
			this.left = false;
			this.right = false;
			this.up = true;
			this.down = true;
			}
			break;
		case 38:
			if(this.up){
			this.direct = "up";
			this.left = true;
			this.right = true;
			this.up = false;
			this.down = false;
			}
			break;
		case 40:
			if(this.down){
			this.direct = "down";
			this.left = true;
			this.right = true;
			this.up = false;
			this.down = false;
			}
			break;
	}
}