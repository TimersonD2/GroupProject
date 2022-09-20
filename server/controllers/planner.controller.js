const Planner = require('../models/planner.model');


module.exports = {

    createItem: (req, res) => {
        Planner.create(req.body)
            .then((newItem) => {
                res.status(201).json(newItem);
            })
            .catch((err) => {
                console.log('Error creating Planner Item', err);
                res.status(400).json({message: 'Error creating Planner Item', errors: err.errors});
            });
    },

    getAllItems: (req, res) => {
        Planner.find()
            .then((allItems) => {
                res.json(allItems);
            })
            .catch((err) => {
                console.log('Error getting all Planner Items', err);
                res.status(400).json({message: 'Error getting all Planner Items', errors: err.errors});
            });
    },

    getItemById: (req, res) => {
        Planner.findOne({_id: req.params.id})
            .then((item) => {
                res.json(item);
            })
            .catch((err) => {
                console.log('Error getting one Planner Item', err);
                res.status(400).json({message: 'Error getting one Planner Item', errors: err.errors});
            });
    },
    
    updateItemById: (req, res) => {
        Planner.findOneAndUpdate({_id: req.params.id}, req.body, {new:true, runValidators:true})
            .then((updatedItem) => {
                res.json(updatedItem);
            })
            .catch((err) => {
                console.log('Error updating one Planner Item', err);
                res.status(400).json({message: 'Error updating one Planner Item', errors: err.errors});
            });
    },
    
    deleteItem: (req, res) => {
        Planner.deleteOne({_id: req.params.id})
            .then((result) => {
                res.json(result);
            })
            .catch((err) => {
                console.log('Error deleting one Planner Item', err);
                res.status(400).json({message: 'Error deleting one Planner Item', errors: err.errors});
            });
    },
    
}

