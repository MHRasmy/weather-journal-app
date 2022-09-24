// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());


// Initialize the main project folder
app.use(express.static("website"));


/* Setup Server*/
// Middleware function for GET
const getAll = async (request, response) =>{
    response.send(projectData);
}

// Setting up GET Route
app.get("/all", getAll);

// Middleware function for POST
const postData = async function(request, response){
    const body = await request.body;
    projectData = body;
    console.log(projectData);
    response.status(200).send(projectData);
}

// Setting up POST Route
app.post("/add", postData);

// Spin up the server
const port = 5500;

const listening = () =>{
    console.log(`running on localhost: ${port}`);
}


app.listen(port, listening);