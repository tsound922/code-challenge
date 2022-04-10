import * as express from 'express';
import {writeFile} from 'fs';
var bodyParser = require('body-parser');
const cheeses = require('./data/cheeses.json');
const router = express.Router();



var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })


router.get('/api/cheeses', (req, res, next) => {

    res.json(cheeses);
});

router.post('/api/cheeses', jsonParser, (req, res) => {
    console.log("Got request", req.body);
    const obj = {
        date: req.body.date,
        cartItem: req.body.cartItem
    }
    //Store the post data into JSON file
    // writeFile.writeFile('./data/lastPurchases.json', JSON.stringify(obj), (err)=> {
    //     if(err){
    //         throw err;
    //     }else{
            console.log('Data Successfully Stored!');
            res.send({
                Status: `Status: ${res.statusCode}`,
                Message: 'Data Successfully Stored!',
                data: obj
            });
    //     }
    // })
    // writeFile('./data/lastPurchases.json', JSON.stringify(obj), (err) =>)
})

export default router;