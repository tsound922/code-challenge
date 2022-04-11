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

router.post('/api/cheeses', jsonParser, (req, res) => {
    const obj = {
        date: req.body.date,
        total: req.body.total,
        cartItem: req.body.cartItem
    }
    //Store the post data into JSON file
    console.log('Data Successfully Stored!');
    console.log(typeof obj.cartItem, obj.cartItem);
    let data = JSON.stringify(obj, null, "\t");
    
    try {
        if(historyPurchases.length == 0 || historyPurchases == null){
            fs.writeFileSync(path.resolve(__dirname, '../src/server/data/historyPurchases.json'), `[\n\t${data}\n]`);
            res.send({
                Status: `Status: ${res.statusCode}`,
                Message: 'Data Successfully Stored!',
                data: JSON.stringify(obj)
            });
        }else{
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
            res.send({
                Status: `Status: ${res.statusCode}`,
                Message: 'Data store failed!',
                data: JSON.stringify(obj)
            });
        }
})

export default router;