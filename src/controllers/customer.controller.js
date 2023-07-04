const {user, seed} = require('../models/userModal');


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
                msg:"Failed to found the user",
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
        const users = await user.findById(userId);
        users.updateManureBags();
        await users.save();
        console.log("Manure Bags Updated!!");
        res.json({users});
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
        res.json({seeds});
    } catch (e) {
        res.status(400).json({error: e.message});
    }
}
const Health = async(req,res) => {
    const seedId = req.params.id;
    try {
        const seeds = await seed.findById(seedId);
        seeds.updateHealth();
        await seeds.save();
        res.json({seeds})
    } catch (e) {
        res.status(400).json({error: e.message});
    }
}

// Updates age of all the seeds after 24 hours
// setInterval(() => {
//     seed.updateMany({}, {$inc: {age: 1}}).exec()
//         .then(() => {
//             console.log("Ages updated successfully.");
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// }, 6000);

// Updates the time hrsToDie field for all seeds after every hour.
// setInterval(() => {
//     seed.updateMany({hrsToDie: {$gt: 0}}, {$inc: {hrsToDie: -1}}).exec()
//         .then(() => {
//             console.log("HrsToDie updated successfully.");
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// }, 6000);


module.exports = {saveUser, findUser, manure, age, saveSeed, die, Health}


