const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/Tracker-App';
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
});


app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter); 

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
