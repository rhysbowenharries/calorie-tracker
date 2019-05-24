const express = express();
const ObjectID = require('mongodb').ObjectID;

const createRouter = function(collection){

    const router = express.Router();

    router.get('/', (req,res) => {
        collection
            .find()
            .toArray()
            .then((docs) => res.json(docs))
            .catch(console.error)
    })
    
}