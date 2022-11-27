
const textToWrite = "Language Contagion";
const SEGMENTS = 200;

//auto start variables
let centerX, centerY, fontSize, INNER_RADIUS, RADIUS_VARIATION, img;

var canvas;


function setup() {
    canvas = createCanvas(innerWidth / 2, innerHeight / 2);
    canvas.parent("virus");
    canvas.position(width / 1.8, height / 1.8);
    canvas.style('z-index', '10007');
    canvas.style('position', 'fixed');
    /*
    canvas.style('position', 'absolute');
    canvas.style('top', '30%');
    canvas.style('left', '-10%');
    */

    centerX = innerWidth / 4;
    centerY = innerHeight / 4;

    let screenPct = min(height, width) / 1000;
    fontSize = screenPct * 150;
    INNER_RADIUS = screenPct * 200;
    RADIUS_VARIATION = screenPct * 200;

    textFont('Roboto Mono');
    textSize(fontSize);
    textStyle(BOLD);
}
function pointForIndex(pct) {
    const NOISE_SCALE = 1.5;
    let angle = pct * TWO_PI;
    let cosAngle = cos(angle);
    let sinAngle = sin(angle);
    let time = frameCount / 100;
    let noiseValue = noise(NOISE_SCALE * cosAngle + NOISE_SCALE, NOISE_SCALE * sinAngle + NOISE_SCALE, time);
    let radius = INNER_RADIUS + RADIUS_VARIATION * noiseValue;
    return {
        x: radius * cosAngle + centerX,
        y: radius * sinAngle + centerY
    };
}

function draw() {
    clear();
    fill(0, 255, 0);
    noStroke();

    //draw sphere
    beginShape();
    for (let i = 0; i < SEGMENTS; i++) {
        let p0 = pointForIndex(i / SEGMENTS);
        vertex(p0.x, p0.y);
    }
    endShape(CLOSE);

    //draw text
    let pct = atan2(mouseY - centerY, mouseX - centerX) / TWO_PI;//follow mouse
    //let pct = 0;//dont follow mouse
    let pixToAngularPct = 1 / ((INNER_RADIUS + RADIUS_VARIATION / 2) * TWO_PI);
    for (var i = 0; i < textToWrite.length; i++) {
        let charWidth = textWidth(textToWrite.charAt(i));
        pct += charWidth / 2 * pixToAngularPct;

        //calculate angle
        let leftP = pointForIndex(pct - 0.01);
        let rightP = pointForIndex(pct + 0.01);
        let angle = atan2(leftP.y - rightP.y, leftP.x - rightP.x) + PI;

        push();
        let p = pointForIndex(pct);
        //apply angle
        translate(p.x, p.y);
        rotate(angle);
        translate(-p.x, -p.y);
        fill(0);
        text(textToWrite.charAt(i), p.x - charWidth / 2, p.y);
        pop();

        pct += charWidth / 2 * pixToAngularPct;
    }//for
}



