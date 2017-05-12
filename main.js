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

var hero = {
	x:0,
	y:0
};

function draw(){
	// 將背景圖片畫在 canvas 上的 (0,0) 位置
	ctx.drawImage(bgImg,0,0); 
	ctx.drawImage(heroImg,hero.x,hero.y);
	ctx.drawImage(towerBtnImg, 640-towerBtnSize , 480-towerBtnSize ,towerBtnSize,towerBtnSize); 
	if( isBuilding == true){
		ctx.drawImage(towerImg,cursor.x,cursor.y,32,32); 
	}
}

// 執行 draw 函式
setInterval(draw,16);

var cursor = {
	x: 0,
	y: 0
}; 	

$( "#game-canvas" ).mousemove( function( event ) {
	cursor.x =  event.offsetX;
	cursor.y =  event.offsetY;
});


var isBuilding = false;

$( "#game-canvas" ).click( function( event ) {
	if(event.offsetX > (640-60)  &&	event.offsetY > (480-60) ){

		if(isBuilding == false ){
			isBuilding = true; 
		}else{
			isBuilding = false;
		}

	}
});

