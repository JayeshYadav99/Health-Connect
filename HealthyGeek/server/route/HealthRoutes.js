const { Router } = require('express');
const express = require('express');
const { createHealthData, getHealthDataByUserId, updateHealthData, deleteHealthData }= require('../controller/HealthData');
const Healthrouter = express.Router();
Healthrouter.get('/:id',getHealthDataByUserId);
Healthrouter.post('/',createHealthData);
Healthrouter.put('/:id',updateHealthData);
Healthrouter.delete('/:id',deleteHealthData);

module.exports={Healthrouter};
