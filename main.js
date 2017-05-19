// 找出網頁中的 canvas 元素
var canvas = document.getElementById("game-canvas");
// 取得 2D繪圖用的物件
var ctx = canvas.getContext("2d");


// 創造 img HTML 元素，並放入變數中
var bgImg = document.createElement("img");
// 設定這個元素的要顯示的圖片
bgImg.src = "images/map2.png";

// 創造 img HTML 元素，並放入變數中
var heroImg = document.createElement("img");
// 設定這個元素的要顯示的圖片
heroImg.src = "images/jason.gif";

// 創造 img HTML 元素，並放入變數中
var towerImg = document.createElement("img");
// 設定這個元素的要顯示的圖片
towerImg.src = "images/tower.png";

// 創造 img HTML 元素，並放入變數中
var towerBtnImg = document.createElement("img");
// 設定這個元素的要顯示的圖片
towerBtnImg.src = "images/tower-btn.png";
var towerBtnSize = 60;

var slimeImg = document.createElement("img");
slimeImg.src = "images/slime.gif";

var FPS = 60;

var hero = {
	x:0,
	y:0
};

var cursor = {
	x: 0,
	y: 0
}; 	

var tower = {
	x: 0,
	y: 0
}

var enemy = {
	x:1 * 32 ,
	y:2 * 32,
	speed:64,
}
pathIndex = 0;

function draw(){
	// 將背景圖片畫在 canvas 上的 (0,0) 位置
	ctx.drawImage(bgImg,0,0); 
	ctx.drawImage(heroImg,hero.x,hero.y);
	ctx.drawImage(towerBtnImg, 640-towerBtnSize , 480-towerBtnSize ,towerBtnSize,towerBtnSize); 
	ctx.drawImage(towerImg,tower.x,tower.y,32,32); 

	if(pathIndex == 0){
		enemy.y = enemy.y + enemy.speed/FPS ;
		if(enemy.y > 32*13){
			pathIndex = pathIndex + 1;
			enemy.y = 32*13;
		}
	}else if(pathIndex == 1){
		enemy.x = enemy.x + enemy.speed/FPS ;
		if(enemy.x > 32*18){
			pathIndex = pathIndex + 1;
			enemy.x = 32*18;
		}
	}else if(pathIndex == 2){
		enemy.y = enemy.y - enemy.speed/FPS ;
		if(enemy.y < 32*2){
			pathIndex = pathIndex + 1;
			enemy.y = 32*2;
		}
	}else if(pathIndex == 3){
		enemy.x = enemy.x - enemy.speed/FPS ;
		if(enemy.x < 32*4){
			pathIndex = pathIndex + 1;
			enemy.x = 32*4;
		}
	}else if(pathIndex == 4){
		enemy.y = enemy.y + enemy.speed/FPS ;
		if(enemy.y > 32*10){
			pathIndex = pathIndex + 1;
			enemy.y = 32*10;
		}
	}else if(pathIndex == 5){
		enemy.x = enemy.x + enemy.speed/FPS ;
		if(enemy.x > 32*15){
			pathIndex = pathIndex + 1;
			enemy.x = 32*15;
		}
	}else if(pathIndex == 6){
		enemy.y = enemy.y - enemy.speed/FPS ;
		if(enemy.y < 32*5){
			pathIndex = pathIndex + 1;
			enemy.y = 32*5;
		}
	}else if(pathIndex == 7){
		enemy.x = enemy.x - enemy.speed/FPS ;
		if(enemy.x < 32*7){
			pathIndex = pathIndex + 1;
			enemy.x = 32*7;
		}
	}else if(pathIndex == 8){
		enemy.y = enemy.y + enemy.speed/FPS ;
		if(enemy.y > 32*7){
			pathIndex = pathIndex + 1;
			enemy.y = 32*7;
		}
	}else if(pathIndex == 9){
		enemy.x = enemy.x + enemy.speed/FPS ;
		if(enemy.x > 32*11){
			pathIndex = pathIndex + 1;
			enemy.x = 32*11;
		}
	}else{

	}

	ctx.drawImage(slimeImg,enemy.x,enemy.y,32,32); 
	if( isBuilding == true){
		ctx.drawImage(towerImg,cursor.x,cursor.y,32,32); 
	}
}

// 執行 draw 函式
setInterval(draw,1000/FPS);

$( "#game-canvas" ).mousemove( function( event ) {
	cursor.x =  event.offsetX - event.offsetX%32 ;
	cursor.y =  event.offsetY - event.offsetY%32 ;
});


var isBuilding = false;

$( "#game-canvas" ).click( function( event ) {
	if(event.offsetX > (640-60)  &&	event.offsetY > (480-60) ){

		if(isBuilding == false ){
			isBuilding = true;
		}else{
			isBuilding = false;
		}

	}else if(isBuilding == true){
		tower.x = cursor.x;
		tower.y = cursor.y;
		isBuilding = false;
	}
});

