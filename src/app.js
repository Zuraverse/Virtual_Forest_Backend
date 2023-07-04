const express = require('express');
const mongoose = require('mongoose');
const Customer = require('./models/userModal');
const dotenv = require('dotenv');
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

// For using routes 
app.use('/customers', router);

// start the mongoose connection
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