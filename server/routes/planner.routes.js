const plannerController = require('../controllers/planner.controller');

module.exports = (app) => {
    app.get('/api/planner', plannerController.getAllItems);
    app.post('/api/planner', plannerController.createItem);
    app.get('/api/planner/:id', plannerController.getItemById);
    app.put('/api/planner/:id', plannerController.updateItemById);
    app.delete('/api/planner/:id', plannerController.deleteItem);
}
