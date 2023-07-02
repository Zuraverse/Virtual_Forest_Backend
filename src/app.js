const express = require('express');
const mongoose = require('mongoose');
const Customer = require('./models/userModal');
const dotenv = require('dotenv');
const customerRouter = require('./routes/customer.routes');
const router = require('./routes/customer.routes');
const app = express();
mongoose.set('strictQuery',false);

app.use(express.json());
app.use(express.urlencoded({extended : true}));

if(process.env.NODE_ENV !== 'production'){
    dotenv.config();
}
const PORT = process.env.PORT || 3000;
const CONNECTION = process.env.CONNECTION;


// const seed = new Customer.seed({
//     seedId: 1,
//     stage: 'seed',
//     seedOwner: 'chahcha bhatija',
//     timeofPlanting: new Date(),
//     coordinates: '1,2',
//     seedType: 'common',
//     age: 2,
//     hrsToDie: 15,
//     seedHealth: "red",
//     isTree: false,
//     isDead: false,
//     isWatered: false 
// });
// const result= seed.updateAge();
// console.log({result});
// user.save()

app.use('/customers', router);

// ###API CALLS####
// app.get('/',(req,res) => {
//     res.send(seed);
// });

app.get('/seed', async(req,res) => {
    try {
    //     const result = await seed.updateAge();
    // res.json({result});
    console.log(seed);
    } catch (e) {
        res.status(500).json({error: e.message});
    }
    
});

app.post('/', (req, res) => {
    res.send('This is a post request!');
});

//for the customer document

//for the seed document
app.post('/api/seeds', async (req, res) => {
    console.log(req.body);
    const seed = new Customer.seed(req.body);
    try {
        await seed.save();
        res.status(201).json({seed}); 
    } catch (e) {
        res.status(400).json({error: e.message});
    }
});

//for the user document
app.post('/api/users', async (req, res) => {
    console.log(req.body);
    const user = new Customer.user(req.body);
    try {
        await user.save();
        res.status(201).json({user}); 
    } catch (e) {
        res.status(400).json({error: e.message});
    }
});

// CALL TO THE ADDMANURE FUNCTION.
app.put('/api/seeds/:id', async (req, res) => {
    try {
        const seedId = req.params.id;
        const find = await Customer.seed.findOne({_id:seedId});
        // console.log(find);
        // const manureAdded = await find.
        // const result = await Customer.seed.findOneAndUpdate({_id: seedId}, manureAdded, {new : true});
        console.log(manureAdded);
        res.json({find});
    } catch (e) {
        res.status(500).json({error: 'Something went wrong'});
    }
});

const start = async() => { 
    try {
        await mongoose.connect(CONNECTION);
        app.listen(PORT, () => {
        console.log('App listening on port:' + PORT)
    });
    } catch (e) {
        console.log(e.message)
    }
    
};

start();