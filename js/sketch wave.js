var font, font2, font3, font4, font5, font6;
var pg, layer;

// 언어전염 변형
var tileNum = 40, tileNum2, waveSpeed, wave;
var theta;

function preload() {
	font = loadFont('AppleSDGothicNeoH.ttf');
}


function setup() {
	createCanvas(windowWidth, windowHeight, P2D);
	pg = createGraphics(width, height, P2D);

}

function draw() {
	drawPg1();
}

function drawPg1() {
	fill(0, 255, 0);
	textSize(28);
	translate(600, 450);
	textAlign(CENTER, CENTER);
	// 행간
	textLeading(35);
	textFont(font);
	text("언어 전염을 설명하는 데 있어 재미있는 표현은\n 오염(contamination)과 전염(contagion)이다. \n 새로운 시각과 언어가 전염되는 것이다. 빼앗기고 변형되고, 옮겨지는 것은 \n 일반적으로 부정적으로 지각되지만, \n언어전염에서 변이는 메타상상의 가능성으로 해석되며,\n 언어가 탈맥락함에 따라 그것에 대한 시각이 바뀌는 것을 의미한다.", 50, 100);

	var tilesX = tileNum;
	var tilesY = tileNum;
	// 캔버스의 길이를 타일의 갯수로 나눠서 타일의 크기 정하기
	var tileW = int(width / tilesX);
	var tileH = int(height / tilesY);
	for (var y = 0; y < tilesY; y++) {//noprotect
		for (var x = 0; x < tilesX; x++) {
			if (play) {
				theta += 0.02;
				theta %= 360;
			}
			// WARP
			wave = int(sin(theta * 0.01 + (x * y) * -0.4) * waveSpeed);
			// 소스 왼쪽 위의 모서리의 x,y값
			var sx = x * tileW - wave;
			var sy = y * tileH - wave;
			// 타일가로,세로
			var sw = tileW;
			var sh = tileH;
			var dx = x * tileW + wave;
			var dy = y * tileH;
			// 복사된거 가로,세로
			var dw = tileW;
			var dh = tileH;
			copy(pg, sx, sy, sw, sh, dx, dy, dw, dh);
		}
	}
}