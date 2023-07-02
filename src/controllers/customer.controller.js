const { ServerDescription } = require('mongodb');
const {customer, user, seed} = require('../models/userModal');

/// FOR CUSTOMERS??///
const getAllCustomers = async(req,res) => {
    let customers = await customer.find();
    if(customers){
        console.log("customers");
        res.json({
            msg:"customers list",
            data: customers
        })
    } else {
        res.json({
            msg:"Failed to find customer list",
            data: {}
        })
    }
}
const saveCustomer = async(req,res) => {
    const customers = new customer(req.body);
    try {
        await customers.save();
        res.json({
            msg:"Customer Added Successfully!!",
            data: customers
        })
    } catch (e) {
        res.status(400).json({error: e.message});
    }
}

/////****FOR USERS ***/
const findUser = async(req,res) => {
    const userId = req.params.id;
    try {
        const foundUser = await user.findOne({_id: userId});
        if(foundUser){
            res.json({
                msg:"Found user!!",
                data: foundUser
            })
        } else {
            res.json({
                msg:"Failed to the user",
                data: {}
            })
        }
        
    } catch (e) {
        res.status(400).json({error: e.message});
    }
    
}
const saveUser = async(req,res) => {
    const users = new user(req.body);
    try {
        await users.save();
        console.log("user saved");
        res.json({
            msg:"users Added Successfully!!",
            data: users._id
        })
    } catch (e) {
        res.status(400).json({error: e.message});
    }
}
const manure= async(req,res) => {
    const userId = req.params.id;
    try {
        const currentUser = await user.findOne({_id: userId});
        if(currentUser.manureBags != 0) {
            let manurebags = currentUser.manureBags;
            console.log(manurebags);
            manureDecreased = await user.findOneAndUpdate({_id:userId},{manureBags: manurebags-1}, {new : true});
            res.json({manureDecreased})
        } else {
            res.json({
                msg:"Not Enough Manure Bags!!"
            })
        } 
    } catch (e) {
        res.status(400).json({error: e.message});
    }
}

////****FOR SEEDS */
const saveSeed = async(req,res) => {
    const seeds = new seed(req.body);
    try {
        await seeds.save();
        console.log("seed saved");
        res.json({
            msg:"seed Added Successfully!!",
            data: seeds._id
        })
    } catch (e) {
        res.status(400).json({error: e.message});
    }
}
const age = async(req,res) => {
    const seedId = req.params.id;
    try {
        const seeds = await seed.findById(seedId);
        seeds.updateAge();
        await seeds.save();
        res.json({seeds})
    } catch (e) {
        res.status(400).json({error: e.message});
    }
}
const die = async(req,res) => {
    const seedId = req.params.id;
    try {
        const seeds = await seed.findById(seedId);
        seeds.updateHrsToDie();
        await seeds.save();
        res.json({seeds})
    } catch (e) {
        res.status(400).json({error: e.message});
    }
}
const dieHealth = async(req,res) => {
    const seedId = req.params.id;
    try {
        const seeds = await seed.findById(seedId);
        seeds.updateHrsToDieHealth();
        await seeds.save();
        res.json({seeds})
    } catch (e) {
        res.status(400).json({error: e.message});
    }
}




module.exports = { getAllCustomers, saveCustomer , saveUser, findUser, manure, age, saveSeed, die, dieHealth}

//   seedsSchema.methods.addManure = function() {
//     return(this.age += 2);
//     //make an api call to the frontend
//   }

//   seedsSchema.methods.checkAge = function() {
//     if(this.isDead != true){if(this.age <= 4){
//         this.stage == "Seed";
//         //make an api call to the frontend
//     }
//     else if(this.age >4 || this.age < 14){
//         this.stage == "Plant";
//         //make an api call to the frontend
//     }
//     else {
//         this.stage == "Tree";
//         this.isTree == true;
//         //make an api call to the frontend
//     }}
//     else {
//         this.stage == "Dead";
//         //make an api call to the frontend
//     }
//   }

// seedsSchema.methods.seedfitness = function() {
//     if(this.isWatered != true){if(this.hrsToDie>12 && this.hrsToDie<=24){
//         this.seedHealth == "Green";
//         //make an api call to the frontend
//     }
//     else if(this.hrsToDie>6 && this.hrsToDie<=12){
//         this.seedHealth == "Yellow";
//         //make an api call to the frontend
//     }
//     else{
//         this.seedHealth == "Red";
//         //make an api call to the frontend
//     }}
//     else {
//         this.hrsToDie == 24;
//     }
// }
// seedsSchema.methods.manureBagsLeft = function() {
//     this.manureBags -=1;
//     //make an api call to the frontend
// }

// async function main() {
//     const seed1 = new seed({
//         seedId: 1,
//         stage: 'seed',
//         seedOwner: 'John Doe',
//         timeofPlanting: new Date(),
//         coordinates: '1,2',
//         seedType: 'common',
//         age: 2,
//         hrsToDie: 15,
//         seedHealth: "red",
//         isTree: false,
//         isDead: false,
//         isWatered: false 
//     });
//     // let user = seed1;
//     // console.log({user});
//     // const manureAdded = await user.addManure();
//     // console.log({manureAdded});
// }
// main();

