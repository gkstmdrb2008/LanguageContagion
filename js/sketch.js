const textToWrite = "Language    Contagion";
const SEGMENTS = 90;


let centerX, centerY, fontSize, INNER_RADIUS, RADIUS_VARIATION, pg;
let theta = 0.0;
let play = true;
let waveSpeed;

var margin = innerWidth / 25;  // gives some space from edges before placing slider lines
var line_y = innerHeight / 2.5;
var line_length = 360;  // allows for 360 degess of colour

var hue_pos_y;
var side = 30;

let timer = 30;


let overButton = false;

var myVida;

let scaleXVal = 0.4;
let scaleYVal = 0.5;
let reScalseWidth;
let reScalseHeight;

let firstImageX, firstImageY; // base image
let secondImageX, secondImageY;  // processed image 

function setup() {
	//createCanvas(windowWidth, windowHeight);
	createCanvas(windowWidth, windowHeight);
	pg = createGraphics(windowWidth * scaleXVal, windowHeight * scaleYVal);
	pg2 = createGraphics(windowWidth * scaleXVal, windowHeight * scaleYVal);

	reScalseWidth = windowWidth * scaleXVal;
	reScalseHeight = windowHeight * scaleYVal;

	firstImageX = windowWidth / 11;
	firstImageY = windowHeight / 4;
	secondImageX = windowWidth / 2;
	secondImageY = windowHeight / 4;

	centerX = windowWidth / 1.165;
	centerY = windowHeight / 1.7;
	smooth();
	let screenPct = min(height, width) / 1000;
	fontSize = screenPct * 45;
	INNER_RADIUS = screenPct * 85;
	RADIUS_VARIATION = screenPct * 115;

	textFont('Roboto Mono');
	textSize(fontSize);

	hue_pos_y = innerHeight * 0.78;

	myVida = new Vida(this);

	myVida.progressiveBackgroundFlag = false;

	myVida.imageFilterFeedback = 0.002;

	myVida.imageFilterThreshold = 0.5;



	myVida.handleBlobsFlag = true;

	myVida.normMinBlobMass = 0.0001;  // uncomment if needed
	myVida.normMaxBlobMass = 0.0011;  // uncomment if needed

	myVida.normMinBlobArea = 0.0006;  // uncomment if needed
	myVida.normMaxBlobArea = 0.00071;  // uncomment if needed

	myVida.trackBlobsFlag = false;

	frameRate(30);
}
function draw() {

	background(0);
	/*
	fill(0, 255, 0);
	noStroke();
	rectMode(CENTER);
	*/

	//pg.fill(0);

	rectMode(CENTER);
	pg.stroke(0);
	pg.background(0);
	pg.strokeWeight(10);
	//  pg.textFont(font);
	pg.textSize(37);

	pg.fill(0, 255, 0);
	pg.push();
	pg.translate(reScalseWidth / 1.7, reScalseHeight / 3);
	pg.textAlign(CENTER, TOP);
	pg.textLeading(40)
	pg.text("언어전염을 설명하는\n 재미있는 표현은\n 오염(contamination)과 \n전염(contagion)이다. \n\n새로운 시각과 언어를 통해서 \n스스로 인지하고 식별할 수 있는 \n가능성을 전염시킨다.", 30, -50);

	pg.pop();

	pg2.background(0);

	let tilesX = 15;
	let tilesY = 15;

	let tileW = round(reScalseWidth / tilesX); //windowWidth / 2, windowHeight / 1.3
	let tileH = round(reScalseHeight / tilesY);

	let virusPos = map(hue_pos_y, 0, innerHeight * 0.78, 100, 0);

	if (play) {
		theta += 0.5;
		theta %= 360;

	} else {
		theta = theta;
	}
	waveSpeed = virusPos;

	for (let y = 0; y < tilesY; y++) {
		for (let x = 0; x < tilesX; x++) {

			const wave = sin(theta * 0.1 + (x * y) * -0.4) * waveSpeed;

			const sx = x * tileW - wave;
			const sy = y * tileH - wave;
			const sw = tileW;
			const sh = tileH;

			const dx = x * tileW + wave;
			const dy = y * tileH;
			const dw = tileW;
			const dh = tileH;

			pg2.image(pg, sx, sy, sw, sh, dx, dy, dw, dh);

		}
	}
	image(pg2, firstImageX, firstImageY);




	myVida.update(pg2);

	//image(myVida.thresholdImage, windowWidth/2, 0);
	image(myVida.thresholdImage, secondImageX, secondImageY);

	var temp_blobs = myVida.getBlobs();

	var temp_w = reScalseWidth; var temp_h = reScalseHeight;
	var temp_rect_x, temp_rect_y, temp_rect_w, temp_rect_h;



	push();
	textFont('Helvetica', 22); textAlign(LEFT, BOTTOM); textStyle(NORMAL);
	for (var i = 0; i < temp_blobs.length; i++) {

		temp_rect_x = Math.floor(temp_blobs[i].normRectX * temp_w);
		temp_rect_y = Math.floor(temp_blobs[i].normRectY * temp_h);
		temp_rect_w = Math.floor(temp_blobs[i].normRectW * temp_w);
		temp_rect_h = Math.floor(temp_blobs[i].normRectH * temp_h);
		// draw bounding box
		strokeWeight(1.5); stroke(0, 255, 0); noFill(); rectMode(CORNER);
		rect(temp_rect_x + secondImageX, temp_rect_y + secondImageY, temp_rect_w, temp_rect_h);

		noStroke(); fill(0, 255, 0);
		text(temp_blobs[i].id + 1, temp_rect_x - 3 + secondImageX, temp_rect_y + 3 + secondImageY);

	}
	pop();
	drawSliders();
	push();
	textAlign(CENTER, CENTER);
	textSize(fontSize / 1.5)
	text("100", margin + 50, innerHeight * 0.2);
	text("0", margin + 50, innerHeight * 0.815);
	pop();


	if (frameCount % 60 == 0 && timer > 0) {
		timer--;
	} if (timer == 0) {
		location.href = "index.html"
	}

}

function drawSliders() {


	stroke(0, 255, 0);
	strokeWeight(8);
	line(margin + 50, innerHeight * 0.23, margin + 50, innerHeight * 0.78);

	fill(0, 255, 0);
	noStroke();
	rect(margin + 50, hue_pos_y, side, side);

}

function mouseDragged() {

	if ((margin + 20 < mouseX && mouseX < margin + 80) && (innerHeight * 0.23 < mouseY && mouseY < innerHeight * 0.78)) {
		hue_pos_y = mouseY;
	}
	timer = 5;
}

function mouseMoved() {
	timer = 5;
	//checkButton();
}

function keyPressed() {
	timer = 5;

	if (keyCode === 32)
		if (play) {
			play = false;
		} else {
			play = true;
		}
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}