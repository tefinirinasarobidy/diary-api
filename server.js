const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config();


const app = express();

var corsOptons = {
	origin:"*"
	};
app.use (cors(corsOptons));

// parse requests of content-type - application/json

app.use (bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded

app.use (bodyParser.urlencoded({extended:true}));

// routers
// const router_client = require('./routes/clientRoute.js')
// const router_event = require('./routes/eventRoute.js')
// const router_chat = require('./routes/chatRoute.js')
// app.use('/api/client', router_client)
// app.use('/api/events',auth, router_event)
const router = require('./routes')
app.use('/api', router)
//simple route
app.get ("/", (req, res) => {
res.json({message: "Welcome to Turing.com"});
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
console.log (`Server is running on port ${PORT}.`);
});