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


var enemies = [];
enemies.push( new Enemy() );

function Enemy(){
	this.x = 1 * 32;
	this.y = 2 * 32;
	this.speed = 64;
	this.direction = {
		x:0,
		y:1
	};
	this.pathIndex = 0;
	this.move = function(){
		if( isCollided( 
			enemyPath[this.pathIndex].x, 
			enemyPath[this.pathIndex].y, 
			this.x, this.y, 
			this.speed/FPS, this.speed/FPS
		)){
			this.x = enemyPath[this.pathIndex].x;
			this.y = enemyPath[this.pathIndex].y;
			this.pathIndex = this.pathIndex + 1;
			this.direction = getUnitVector(this.x,this.y,enemyPath[this.pathIndex].x,enemyPath[this.pathIndex].y);
		}else{
			this.x = this.x + this.speed/FPS * this.direction.x ;
			this.y = this.y + this.speed/FPS * this.direction.y ;
		}
	};
}

var enemyPath = [
	{x:32*1,y:32*13},
	{x:32*18,y:32*13},
	{x:32*18,y:32*2},
	{x:32*4,y:32*2},
	{x:32*4,y:32*10},
	{x:32*15,y:32*10},
	{x:32*15,y:32*5},
	{x:32*7,y:32*5},
	{x:32*7,y:32*7},
	{x:32*11,y:32*7}
]

var clock = 0;

function draw(){
	// 將背景圖片畫在 canvas 上的 (0,0) 位置
	ctx.drawImage(bgImg,0,0); 
	ctx.drawImage(heroImg,hero.x,hero.y);
	ctx.drawImage(towerBtnImg, 640-towerBtnSize , 480-towerBtnSize ,towerBtnSize,towerBtnSize); 
	ctx.drawImage(towerImg,tower.x,tower.y,32,32); 

	for(var i=0 ; i<enemies.length ; i++){
		enemies[i].move();
		ctx.drawImage(slimeImg,enemies[i].x,enemies[i].y,32,32); 
	}


	if( isBuilding == true){
		ctx.drawImage(towerImg,cursor.x,cursor.y,32,32); 
	}
	clock ++;
	if (clock % 80 == 0) {
		var newEnemy = new Enemy();
		enemies.push(newEnemy);
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

//循跡演算法
function isCollided ( pointX, pointY, targetX, targetY, targetWidth, targetHeight ) {
	if(     pointX >= targetX
        &&  pointX <= targetX + targetWidth
        &&  pointY >= targetY
        &&  pointY <= targetY + targetHeight
  	){
	        return true;
	} else {
	        return false;
	}
}

//單位向量演算法
function getUnitVector (srcX, srcY, targetX, targetY) {

   var offsetX = targetX - srcX;

   var offsetY = targetY - srcY;

   var distance = Math.sqrt( Math.pow(offsetX,2) + Math.pow(offsetY,2) );

   var unitVector = {
       x: offsetX/distance,
       y: offsetY/distance
   };
   return unitVector;

}

