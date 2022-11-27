
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
	createCanvas(windowWidth, windowHeight);
	pg = createGraphics(windowWidth * scaleXVal, windowHeight * scaleYVal);
	pg2 = createGraphics(windowWidth * scaleXVal, windowHeight * scaleYVal);

	reScalseWidth = width * scaleXVal;
	reScalseHeight = height * scaleYVal;

	firstImageX = windowWidth / 15;
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
	noCursor();

	button1 = loadImage("img/button.png");
	button2 = loadImage("img/overbuttonHover.png");

	hue_pos_y = innerHeight * 0.78;

	myVida = new Vida(this);

	myVida.progressiveBackgroundFlag = false;
	myVida.imageFilterFeedback = 0.96;
	myVida.imageFilterThreshold = 0.1;

	myVida.handleBlobsFlag = true;
	myVida.normMinBlobMass = 0.000005;  // uncomment if needed
	myVida.normMaxBlobMass = 0.0005;  // uncomment if needed

	myVida.normMinBlobArea = 0.00007;  // uncomment if needed
	myVida.normMaxBlobArea = 0.0008;  // uncomment if needed
	myVida.trackBlobsMaxNormDist = 1;
	myVida.trackBlobsFlag = false;

	frameRate(30);
}


function draw() {
	background(0);

	rectMode(CENTER);

	pg.stroke(0);
	pg.background(0);
	pg.strokeWeight(10);
	//  pg.textFont(font);
	pg.textSize(35);
	pg.textLeading(38);//행간

	pg.fill(0, 255, 0);
	pg.push();
	pg.translate(reScalseWidth / 1.7, reScalseHeight / 4);
	pg.textAlign(CENTER, TOP);
	pg.text("Interesting expressions to describe verbal \ntransmission are 'contamination' and 'contagion'.\nAlthough contagious is generally perceived negatively, \nMutation in Language contagion is interpreted \nas a meta-imaginary possibility,and \nit means the perspective on it changes \nas the language is out of context.", 0, 0);
	pg.pop();

	pg2.background(0);

	let tilesX = 10;
	let tilesY = 10;

	let tileW = round(reScalseWidth / tilesX);
	let tileH = round(reScalseHeight / tilesY);

	let virusPos = map(hue_pos_y, 0, innerHeight * 0.78, 100, 0);

	if (play) {
		theta += 0.3;
		theta %= 360;

	} else {
		theta = theta;
	}
	waveSpeed = virusPos;

	for (let y = 0; y < tilesY; y++) {
		for (let x = 0; x < tilesX; x++) {

			// WARP
			const wave = sin(theta * 6 + (2 * x * y) * -0.8) * waveSpeed;

			// SOURCE
			const sx = x * tileW - wave;
			const sy = y * tileH;
			const sw = tileW;
			const sh = tileH;

			// DESTINATION
			const dx = x * tileW - wave / 2;
			const dy = y * tileH;
			const dw = tileW;
			const dh = tileH;

			pg2.image(pg, sx, sy, sw, sh, dx, dy, dw, dh);


		}
	}
	image(pg2, firstImageX, firstImageY);

	if (frameCount % 60 == 0 && timer > 0) {
		timer--;
	} if (timer == 0) {
		location.href = "indexEn.html"
	}
	myVida.update(pg2);

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


}


function drawSliders() {


	stroke(0, 255, 0);
	strokeWeight(8);
	line(margin, innerHeight * 0.23, margin, innerHeight * 0.78);

	fill(0, 255, 0);
	noStroke();
	rect(margin, hue_pos_y, side, side);

}



function mouseDragged() {

	if ((margin - 30 < mouseX && mouseX < margin + 30) && (innerHeight * 0.23 < mouseY && mouseY < innerHeight * 0.78)) {
		hue_pos_y = mouseY;

	}
	timer = 30;

}

function mouseMoved() {
	timer = 30;
	//checkButton();
}

function keyPressed() {

	timer = 30;

	if (keyCode === 32)
		if (play) {
			play = false;

		} else {
			play = true;
		}

}
