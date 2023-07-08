const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    walletAddress: {
        type: String,
        required: true
    },
    numOfSeeds: {
        type: Number,
        default: 0
    },
    manureBags: {
        type: Number,
        default:0
    },
    treesGrown: {
        type: Number,
        default:0
    },
    level: {
        type: Number,
        default: 0
    },
    nftsEarned: {
        type: Number,
        default:0
    },
    profilePic: String,
    username: String,
    about: String,
    location: String,
    badges: Number
});

const seedsSchema = new mongoose.Schema({
    seedId: {
        type: Number,
        required: true
    },
    stage: {
        type: String,
        default: "seed"
    },
    seedOwner: {
        type: String,
        required: true
    },
    timeofPlanting: {
        type: Date,
        default: Date.now()
    },
    timeofwatering: {
        type: Date,
        default: Date.now()
    },
    coordinates: {
        latitude: {
            type: String,
            required: true
        },
        longitude: {
            type: String,
            required: true
        }
    },
    seedType: {
        type: String,
        default: "common"
    },
    age: {
        type: Number,
        default:0
    },
    hrsToDie: {
        type: Number,
        dafault:24
    },
    seedHealth: {
        type: String,
        dafault:"green"
    },
    isTree: {
        type: Boolean,
        default: false
    },
    isDead: {
        type: Boolean,
        default: false
    },
    isWatered: {
        type: Boolean,
        default: false
    }

});

// For Users
userSchema.methods.updateManureBags = function() {
    if(this.manureBags != 0) {
        this.manureBags -= 1;
    } else {
        console.log("You Don't have enough manure Bags!!");
    }
}

// For seeds
seedsSchema.methods.updateAge = function() {
    if (!this.isDead) {
        const now = new Date();
        const timeDiff = Math.abs(now - this.timeofwatering);
        const hoursDiff = Math.ceil(timeDiff / (1000 * 60 * 60));
        // console.log(timeDiff);
        if (hoursDiff >= 24) {
            const daysDiff = Math.floor(hoursDiff / 24);
            this.age += daysDiff;
            
            if (this.age > 0 && this.age <= 4) {
                this.stage = "seed";
            } else if (this.age > 4 && this.age <= 14) {
                this.stage = "plant";
            } else if (this.age >= 15) {
                this.isTree = true;
                this.stage = "tree";
            }
            // this.updateAge();
            console.log(daysDiff);
        }
    } else {
        this.stage = "Dead";
    }
};

seedsSchema.methods.updateHrsToDie = function() {
        if (this.hrsToDie == 0) {
            this.isDead = true;  
            // console.log(this.isDead);
        }
};

seedsSchema.methods.updateHealth = function() {
    if (!this.isDead) {
        if (this.hrsToDie >= 0) {
            console.log(this.hrsToDie);
            if (this.hrsToDie <= 6) {
                this.seedHealth = "red";
            } else if (this.hrsToDie <= 12) {
                this.seedHealth = "yellow";
            } else {
                this.seedHealth = "green";
            }
            if(this.isWatered){
                this.hrsToDie = 24;
            }
        }
    } else {
        console.log("The sapling is dead.");
    }
};

const user = mongoose.model('user', userSchema);
const seed = mongoose.model('seed', seedsSchema);

module.exports = {
    user: user,
    seed: seed
}