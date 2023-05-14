// Create a new health data entry
const  {HealthData} =require('../db');
const createHealthData = async (req, res) => {
    try {
      const newHealthData = new HealthData(req.body);
      // const {userId}=req.body;
      // const existingData = await HealthData.findOne({ userId });
      // if (existingData) {
      //   // User with the same name and email already exists
      //   return res.status(200).json({ message: 'User already exists' ,existingData});
      // }
      const savedHealthData = await newHealthData.save();
      res.status(201).json(savedHealthData);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Get all health data entries for a specific user
  const getHealthDataByUserId = async (req, res) => {
    const {userId}=req.params;
    try {
       
      const healthData = await HealthData.find({ userId:req.params.id });
      console.log(" "+userId+" " +healthData);
      res.status(200).json(healthData);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Update a health data entry
  const updateHealthData = async (req, res) => {
    try {
      const updatedHealthData = await HealthData.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedHealthData) {
        return res.status(404).json({ error: 'Health data entry not found' });
      }
      res.status(200).json(updatedHealthData);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Delete a health data entry
  const deleteHealthData = async (req, res) => {
    try {
      const deletedHealthData = await HealthData.findByIdAndDelete(req.params.id);
      if (!deletedHealthData) {
        return res.status(404).json({ error: 'Health data entry not found' });
      }
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  module.exports = { createHealthData, getHealthDataByUserId, updateHealthData, deleteHealthData };
  