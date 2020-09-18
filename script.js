class Environment {

    constructor() {
        this.light = 1;
        this.water = 1;
        this.nutrients = 1;
        this.plants = []


    }

    storm(amount) {
        this.water += amount;
        $("#updates").html("a storm blew in");

    }


    drought(amount) {
        this.water -= amount;
        $("#updates").html("it's dry as a bone");

    }





    sunny(amount) {
        this.light += amount;
        $("#updates").html("not a cloud in site");

    }

    clouds(amount) {
        this.light -= amount;
        $("#updates").html("it's cloudy today");

    }

    animals(amount) {
        this.nutrients += amount;
        $("#updates").html("look at all the animals!");

    }

    weeds(amount) {
        this.nutrients -= amount;
        $("#updates").html("the weeds are taking over!");

    }



    // events = [this.storm, this.drought, this.clouds, this.sunny, this.animals, this.weeds];
    events = [this.storm, this.drought, this.clouds, this.sunny, this.animals, this.weeds];



    determine() {
        // let events = [this.storm(), this.drought(), this.clouds(), this.sunny(), this.animals(), this.weeds()];
        let idx = Math.floor(Math.random() * this.events.length);
        let scale = Math.floor(Math.random() * 4 + 1);


        var func = this.events[idx];

        func.call(this, scale);
        // this.clouds(1);
        // return [idx, scale];




    }

    updatePlants() {

        // this.determine();

        for (var i = 0; i < this.plants.length; i++) {

            this.plants[i].addLight(this.light);
            this.plants[i].addWater(this.water);
            this.plants[i].addNutrients(this.nutrients);

            this.plants[i].updateHealth();

        }

        this.water = 0;
        this.light = 0;
        this.nutrients = 0;

    }


}


class Plant {
    constructor(env, id) {

        //the three pieces that make up the growth of our plant
        this.light = 0;
        this.water = 0;
        this.nutrients = 0;
        env.plants.push(this);
        this.id = id;


        //ideal ratio needed to grow, default is 1:1:1 ratio but possibly will make subclasses with different things (like succulents), will allow for some margin of error

        this.ratio = { "light": 1, "water": 1, "nutrients": 1 };
        this.wiggleRoom = 0.5; //how much margin of error is allowed in the ratios

        this.size = 1; //how big it is
        this.last = 1; //1 if healthy bud, 0 if wilting bud
        // this.height = 0; //start out as a baby plant 

    }

    addLight(amount) {
        this.light += amount;
    }

    addWater(amount) {
        this.water += amount;
    }

    addNutrients(amount) {
        this.nutrients += amount;
    }

    grow() {
        this.size++;
    }

    wilt() {
        this.size--;
    }

    //checks if current ratios are close enough to ideal
    checkHealth() {


        let actualWaterLight = Math.round(this.water / this.light);
        let idealWaterLight = Math.round(this.ratio['water'] / this.ratio['light']);

        let waterLightRange = [idealWaterLight - this.wiggleRoom, idealWaterLight + this.wiggleRoom];

        let actualWaterNutrients = Math.round(this.water / this.nutrients);
        let idealWaterNutrients = Math.round(this.ratio['water'] / this.ratio['nutrients']);

        let waterNutrientsRange = [idealWaterNutrients - this.wiggleRoom, idealWaterNutrients + this.wiggleRoom];

        return actualWaterLight > waterLightRange[0] && actualWaterLight < waterLightRange[1] && actualWaterNutrients > waterNutrientsRange[0] && actualWaterNutrients < waterNutrientsRange[1];


    }

    updateHealth() {
        let newHealth = this.checkHealth();

        if (newHealth) {
            if (this.last == 1) { //already healthy and gets new health
                this.grow();
                return [1, 1];
            } else { //previously sick but gets new health
                this.last = 1; //yay the plant is getting better
                return [1, 0];
            }

        } else {
            if (this.last == 1) { // prebiously healthy but poor new health
                this.last = 0; //sets up for wilting
                return [0, 1];
            } else {
                this.wilt(); // wilts because it was doing poorly and still bad health
                return [0, 0];
            }

        }


    }

    show() {
        let base = "";
        if (this.last == 1) {
            base = "<br>&#x1F331;"
        } else {
            base = "<br>&#x1F33E;"

        }

        for (let i = 0; i < this.size - 1; i++) {
            base += "<br>&#x1F33F;";

        }

        // console.log(base);
        return base;

    }




}

class Succulent extends Plant {

    constructor() {
        super();
        this.light = 2;
        this.water = 1;
        this.nutrients = 2;

        //ideal ratio needed to grow, default is 1:1:1 ratio but possibly will make subclasses with different things (like succulents), will allow for some margin of error

        this.ratio = { "light": 2, "water": 1, "nutrients": 2 };
        this.wiggleRoom = 1;
    }

}


$('.light').hide();
$('.water').hide();
$('.nutrients').hide();

let plantids = ["plants-1", "plants-2", "plants-3", "plants-4", "plants-5", "plants-6", "plants-7", "plants-8"]
let shuffledPlants = [];

var startingLen = plantids.length;
for (i = 0; i < startingLen; i++) {



    var idx = Math.floor(Math.random() * plantids.length);
    var nextPlant = plantids.splice(idx, 1);
    console.log("LOOK: ", nextPlant, nextPlant[0]);
    shuffledPlants.push(nextPlant[0]);
}

let myEnvironment = new Environment();
let plantIdx = Math.floor(Math.random() * shuffledPlants.length);

// let myPlant = new Plant(myEnvironment, plantids.splice(plantIdx));
var nextId = shuffledPlants.pop();
console.log("next id: ", nextId, nextId.slice(-1));
let myPlant = new Plant(myEnvironment, nextId);
$('#light-' + nextId.slice(-1)).show();
$('#water-' + nextId.slice(-1)).show();
$('#nutrients-' + nextId.slice(-1)).show();




// let myPlant = new Succulent();


let lightSlider = $('.light');
let waterSlider = $('.water');
let nutrientSlider = $('.nutrients');



$('#light-0').show();
$('#water-0').show();
$('#nutrients-0').show();

lightSlider.html('&#x1F31E;' + myEnvironment.light);
waterSlider.html('&#x1F4A7;' + myEnvironment.water);
nutrientSlider.html('&#x1F4A9;' + myEnvironment.nutrients);




let newPlant = $('#plus');

newPlant.click(function() {
    // 
    // let plantIdx = Math.floor(Math.random() * plantids.length);
    let plantIdx = myEnvironment.plants.length;

    console.log("new plant idx: ", plantIdx);

    $('#light-' + plantIdx).show();
    $('#water-' + plantIdx).show();
    $('#nutrients-' + plantIdx).show();
    // let plantId = plantids.splice(plantIdx);
    let plantId = shuffledPlants.pop();
    // #look into array.filter() and findbyindex 


    let myPlant = new Plant(myEnvironment, plantId);


});

let nextRound = $('#next');


lightSlider.click(function() {




    let pid = "#plants-" + String(this.id).slice(-1);


    for (let idx in myEnvironment.plants) {
        let plant = myEnvironment.plants[idx];

        if (plant.id == pid.slice(1)) {

            plant.addLight(1);
            $('#' + String(this.id)).html('&#x1F31E;' + plant.light);

        }


    }

})

waterSlider.click(function() {

    let pid = "#plants-" + String(this.id).slice(-1);


    for (let idx in myEnvironment.plants) {
        let plant = myEnvironment.plants[idx];

        if (plant.id == pid.slice(1)) {

            plant.addWater(1);
            $('#' + String(this.id)).html('&#x1F4A7;' + plant.water);

        }


    }

})



nutrientSlider.click(function() {

    let pid = "#plants-" + String(this.id).slice(-1);


    for (let idx in myEnvironment.plants) {
        let plant = myEnvironment.plants[idx];

        if (plant.id == pid.slice(1)) {

            plant.addNutrients(1);
            console.log('.' + String(this.id));
            $('#' + String(this.id)).html('&#x1F4A9;' + plant.nutrients);

        }


    }





})

nextRound.click(function() {

    // myPlant.updateHealth();
    myEnvironment.updatePlants();

    for (let idx in myEnvironment.plants) {
        let plant = myEnvironment.plants[idx];
        // debugger

        lightSlider.html('&#x1F31E;' + plant.light);
        waterSlider.html('&#x1F4A7;' + plant.water);
        nutrientSlider.html('&#x1F4A9;' + plant.nutrients);
        // console.log(plant.id);

        $("#" + plant.id).html(plant.show());


    }



})