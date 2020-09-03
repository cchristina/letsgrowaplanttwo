class Plant {
    constructor() {

        //the three pieces that make up the growth of our plant
        this.light = 0;
        this.water = 0;
        this.nutrients = 0;

        //ideal ratio needed to grow, default is 1:1:1 ratio but possibly will make subclasses with different things (like succulents), will allow for some margin of error

        this.ratio = { "light": 1, "water": 1, "nutrients": 1 };
        this.wiggleRoom = 0.5; //how much margin of error is allowed in the ratios

        this.size = 1; //how big it is
        this.last = 1; //1 if healthy bud, 0 if wilting bud
        this.height = 0; //start out as a baby plant 

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
            base = "&#x1F331;"
        } else {
            base = "&#x1F33E;"

        }

        for (let i = 0; i < this.size - 1; i++) {
            base = "&#x1F33F;" + base;
        }

        console.log(base);
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





let myPlant = new Plant();
// let myPlant = new Succulent();

let lightSlider = $('#light');
let waterSlider = $('#water');
let nutrientSlider = $('#nutrients');

lightSlider.html('&#x1F31E;' + myPlant.light);
waterSlider.html('&#x1F4A7;' + myPlant.water);
nutrientSlider.html('&#x1F4A9;' + myPlant.nutrients);






let nextRound = $('#next');


lightSlider.click(function() {
    myPlant.addLight(1);
    lightSlider.html('&#x1F31E;' + myPlant.light);

})

waterSlider.click(function() {

    myPlant.addWater(1);
    waterSlider.html('&#x1F4A7;' + myPlant.water);


})



nutrientSlider.click(function() {

    myPlant.addNutrients(1);
    nutrientSlider.html('&#x1F4A9;' + myPlant.nutrients);



})

nextRound.click(function() {

    myPlant.updateHealth();
    $('#plants').html(myPlant.show());


})