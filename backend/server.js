const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require('dotenv').config();

const dayRouter = require('./routes/day');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../build')));
app.use('/day', dayRouter);
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../build/index.html')));


const uri = process.env.ATLAS_URI;
mongoose.connect(process.env.MONGODB_URI || uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
})


app.listen(port, () => {
    console.log('Server is running on port ' + port);
})