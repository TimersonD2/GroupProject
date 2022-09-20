const mongoose = require('mongoose');

const mongoEndPoint = 'mongodb://localhost/';
const dbName = 'planner-db';

mongoose.connect(mongoEndPoint + dbName)
    .then(() => console.log(`Connected to the ${dbName} database`))
    .catch((err) => console.log('Error connecting to database', err))

