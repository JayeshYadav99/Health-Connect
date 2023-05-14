const express = require('express');
const {
  createResearchFinding,
  getAllResearchFindings,
  getResearchFindingById,
  updateResearchFinding,
  deleteResearchFinding,
} = require('../controller/ResearchFindings');

const researchRouter = express.Router();

researchRouter.post('/', createResearchFinding);
researchRouter.get('/', getAllResearchFindings);
researchRouter.get('/:id', getResearchFindingById);
researchRouter.put('/:id', updateResearchFinding);
researchRouter.delete('/:id', deleteResearchFinding);

module.exports = {researchRouter};
