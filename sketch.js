let playing = true;
let playimg;
let playbutton;
let plants;

function preload() {

    // require('script.js');
    playimg = loadImage('./static/images/play.png');


}

function setup() {
    createCanvas(600, 600);
    colorMode(HSB)

    playbutton = image(playimg, height / 2 - playimg.width / 2, width / 2 - playimg.height / 2)
        // playbutton.mousePressed(function() {
        //     console.log("test");
        //     playing = true;
        // });s

    // let myEnvironment = new Environment();

    // testPlant = new Plant(myEnvironment, 111)
    // console.log(myEnvironment.plants)

}

function draw() {
    plants = myEnvironment.plants;


    background(200, 100, 100)

    fill(150, 100, 100)
    stroke(150, 100, 50)
    beginShape()
    curveVertex(0, height)
    curveVertex(0, height)
    curveVertex(0, height - height / 15)
    curveVertex(width / 2, height - 2 * height / 15)

    curveVertex(width, height - height / 15)
    curveVertex(width, height)
    curveVertex(width, height)
    endShape()

    // plants[0].show()
    for (plant of plants) {
        plant.show()
    }
    // testPlant.show()
    if (!playing) {
        // playbutton = image(playimg, height / 2 - playimg.width / 2, width / 2 - playimg.height / 2);

    } else {



    }

    noLoop()

}