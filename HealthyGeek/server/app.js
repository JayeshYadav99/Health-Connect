const express = require('express');
const mongoose = require('mongoose');
const {Userrouter}= require('./route/UserRoutes');
const {Healthrouter}= require('./route/HealthRoutes');
const {researchRouter}= require('./route/Researchroutes');
const {EducationRouter}= require('./route/Educationroutes');

const app = express();
const port = 3000;
const cors = require('cors');
const bodyParser = require('body-parser');
// Connect to MongoDB
app.use(cors());
// Add this before your route handlers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

  const { User, HealthData, ResearchFindings, EducationalResources ,HealthReport} = require('./db');

// Define a simple route
app.get('/', (req, res) => {
  res.send('<h1>This is health website</h1>');
});

app.use('/users',Userrouter);
app.use('/health',Healthrouter);
app.use('/researchfindings',researchRouter);
app.use('/educationalresources',EducationRouter);

//first feature



// Start the server
app.listen(3000, () => { 
  console.log('Server running on port 3000');
});







// Start the server

