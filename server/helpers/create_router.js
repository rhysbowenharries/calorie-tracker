const express = require('express')
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

    router.get('/:id', (req, res) => {
        const id = req.params.id;
        collection
            .findOne({_id: id})
            .then((doc)=> res.json(doc))
            .catch(console.error)
    })

    router.post('/', (req,res) => {
        const newData = req.body;
        collection
            .insertOne(newData)
            .then(()=> collection.find().toArray())
            .then((docs) => res.json(docs))
            .catch(console.error)
    })

    return router 
}

module.exports = createRouter;
