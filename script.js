class plant {
    constructor() {

        //the three pieces that make up the growth of our plant
        this.light = 0;
        this.water = 0;
        this.nutrients = 0;

        //ideal ratio needed to grow, default is 1:1:1 ratio but possibly will make subclasses with different things (like succulents), will allow for some margin of error

        this.ratio = { "light": 1, "water": 1, "nutrients": 1 };

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

    //checks if current ratios are close enough to ideal
    checkHealth() {


    }

    show() {
        let base = "";
        if (this.last == 1) {
            base = "&#x1F331;"
        } else {
            base = "&x1F33E;"
        }

        for (let i = 0; i < this.size - 1; i++) {
            base = "&#x1F33F;" + base;
        }

        return base;

    }



}