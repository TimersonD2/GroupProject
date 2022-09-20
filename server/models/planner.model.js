const mongoose = require('mongoose');

const PlannerSchema = mongoose.Schema({
    // Changed 'name' to 'task' matching the front end -JB
    task: {
        type:String,
        required:[true, "Task is required"],
    },
    dueDate: {
        type:Date,
    },
    complete: {
        type:Boolean,
    }
}, {timestamps:true});

const Planner = mongoose.model('planner', PlannerSchema);

module.exports = Planner;



