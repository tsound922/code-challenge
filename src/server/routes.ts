import * as express from 'express';
const fs = require('fs');
var path = require("path");
var bodyParser = require('body-parser');
const cheeses = require('./data/cheeses.json') ;
const historyPurchases = require('./data/historyPurchases.json')|| null;
const router = express.Router();



var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })


router.get('/api/cheeses', (req, res, next) => {

    res.json(cheeses);
});

router.get('/api/history', (req, res, next) => {
    res.json(historyPurchases);
})

router.post('/api/cheeses', jsonParser, (req, res) => {
    
    try {
        //If JSON data length is 0 or null, store as first data
        if(historyPurchases.length == 0 || historyPurchases == null){
            const obj = {
                id:1,
                date: req.body.date,
                total: req.body.total,
                cartItem: req.body.cartItem
            }
            //Store the post data into JSON file
            console.log('Data Successfully Stored!');
            console.log(typeof obj.cartItem, obj.cartItem);
            let data = JSON.stringify(obj, null, "\t");
            fs.writeFileSync(path.resolve(__dirname, '../src/server/data/historyPurchases.json'), `[\n\t${data}\n]`);
            res.send({
                Status: `Status: ${res.statusCode}`,
                Message: 'Data Successfully Stored!',
                data: JSON.stringify(obj)
            });
        }else{
            const obj = {
                id:historyPurchases.length + 1,
                date: req.body.date,
                total: req.body.total,
                cartItem: req.body.cartItem
            }
            //Append to the JSON file if JSON data lenth is 0 or null
            let data = JSON.stringify(obj, null, "\t");
            const fsData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../src/server/data/historyPurchases.json')));
            fsData.splice(0,0,JSON.parse(data))
            console.log("FS Data", fsData.length);
            fs.writeFileSync(path.resolve(__dirname, '../src/server/data/historyPurchases.json'), `${JSON.stringify(fsData, null, "\t")}` );
            res.send({
            Status: `Status: ${res.statusCode}`,
            Message: 'Data Successfully Stored!',
            data: JSON.stringify(obj)
            });
        }
        
        } catch (error) {
            console.log(error);
            const obj = {
                id:historyPurchases.length + 1,
                date: req.body.date,
                total: req.body.total,
                cartItem: req.body.cartItem
            }
            res.send({
                Status: `Status: ${res.statusCode}`,
                Message: 'Data store failed!',
                data: JSON.stringify(obj)
            });
        }
})

export default router;