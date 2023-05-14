// db.js

const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://Jazzy49:MyNodeApp@nodeprojects.tsxlcqi.mongodb.net/Health?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
// Define User schema
const userSchema = new mongoose.Schema({
  
  name: String,
  email: String,
  userId:String,
  
});

// Define HealthData schema
const healthDataSchema = new mongoose.Schema({
  userId: { type: String },
  timestamp: Date,
  vitalSigns: {
    temperature: Number,
    bloodPressure: {
      systolic: Number,
      diastolic: Number,
    },
    heartRate: Number,
  },
  medicalHistory: String,
  lifestyleFactors: {
    exerciseFrequency: String,
    diet: String,
  },
});

// Define ResearchFindings schema
const researchFindingsSchema = new mongoose.Schema({
  title: String,
  description: String,
  author: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  timestamp: Date,
});

// Define EducationalResources schema
const educationalResourcesSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  url: String,
});
const healthReportSchema = new mongoose.Schema({
  reportText: String,
  extractedDetails: {
    type: Map,
    of: String,
  },
});

const HealthReport = mongoose.model('HealthReport', healthReportSchema);


// Create models
const User = mongoose.model('User', userSchema);
const HealthData = mongoose.model('HealthData', healthDataSchema);
const ResearchFindings = mongoose.model('ResearchFindings', researchFindingsSchema);
const EducationalResources = mongoose.model('EducationalResources', educationalResourcesSchema);


module.exports = { User, HealthData, ResearchFindings, EducationalResources ,HealthReport};
