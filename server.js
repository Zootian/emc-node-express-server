const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
//const mongoose = require('mongoose');
//const dataBaseConfig = require('./database/db');
const path = require('path');
const mysql = require('mysql');

var mysqlConnection = mysql.createConnection({
  host: 'emcsql.manifestmars.com',
  user: 'ewicinski',
  password: '56EMCplease6!',
  database: 'emctourney'
});

mysqlConnection.connect((err)=>{
  if(!err)
  console.log('DB connection succeeded')
  else
  console.log('DB connection failed \n Error: '+JSON.stringify(err, undefined, 2));
});

// // Connecting mongoDB
// mongoose.Promise = global.Promise;
// mongoose.connect(dataBaseConfig.db, {
//   useNewUrlParser: true
// }).then(() => {
//     console.log('Database connected sucessfully ')
//   },
//   error => {
//     console.log('Could not connected to database : ' + error)
//   }
// )

// Set up express js port
const playerRoute = require('./routes/player.routes.js');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cors());
app.use(express.static(path.join(__dirname, 'dist/formsYT')));
app.use('/', express.static(path.join(__dirname, 'dist/formsYT')));
// app.use('/api', playerRoute)
app.use(playerRoute(mysqlConnection));

// Create port
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log('Connected to port: '+port)
})

// Find 404 and hand over to error handler
app.use((err, req, res, next) => {
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});

// app.get('/', function(req, res) {
//     res.send('Hello from server');
// });

// app.post('/signUp', function(req, res) {
//     console.log(req.body);
//     res.status(200).send({"message":"Data Received"});
// });

// app.listen(PORT, function(){
//     console.log("Server running on localhost: " + PORT);
// });