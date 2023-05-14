const { Router } = require('express');
const express = require('express');
const {
  createEducationalResource,
  getAllEducationalResources,
  getEducationalResourceById,
  updateEducationalResource,
  deleteEducationalResource,
} = require('../controller/EducationalResources');

const EducationRouter = express.Router();

EducationRouter.post('/', createEducationalResource);
EducationRouter.get('/', getAllEducationalResources);
EducationRouter.get('/:id', getEducationalResourceById);
EducationRouter.put('/:id', updateEducationalResource);
EducationRouter.delete('/:id', deleteEducationalResource);

module.exports = { EducationRouter };
