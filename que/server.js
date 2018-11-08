const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./routes');
const app = express();
const PORT = process.env.PORT || 3001;

const fileUpload = require('express-fileupload')

var db = require("./models");
// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(fileUpload())
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

// var routes = require("./controllers/burgers_controller.js");
// Add routes, both API and view
app.use(routes);

//Database connection goes here

// Start the API server

db.sequelize.sync().then(function(){
    app.listen(PORT, function() {
        console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
    });
})