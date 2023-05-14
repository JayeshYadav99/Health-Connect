const {ResearchFindings}= require('../db');
const createResearchFinding = async (req, res) => {
    try {
      const { title, description, author, userId } = req.body;
      const researchFinding = await ResearchFindings.create({
        title,
        description,
        author,
        userId,
        timestamp: new Date(),
      });
      res.status(201).json(researchFinding);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const getAllResearchFindings = async (req, res) => {
    try {
      const researchFindings = await ResearchFindings.find();
      res.json(researchFindings);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const getResearchFindingById = async (req, res) => {
    try {
      const researchFinding = await ResearchFindings.findById(req.params.id);
      if (!researchFinding) {
        return res.status(404).json({ error: 'Research finding not found' });
      }
      res.json(researchFinding);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const updateResearchFinding = async (req, res) => {
    try {
      const { title, description, author } = req.body;
      const updatedResearchFinding = await ResearchFindings.findByIdAndUpdate(
        req.params.id,
        { title, description, author },
        { new: true }
      );
      if (!updatedResearchFinding) {
        return res.status(404).json({ error: 'Research finding not found' });
      }
      res.json(updatedResearchFinding);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const deleteResearchFinding = async (req, res) => {
    try {
      const deletedResearchFinding = await ResearchFindings.findByIdAndDelete(req.params.id);
      if (!deletedResearchFinding) {
        return res.status(404).json({ error: 'Research finding not found' });
      }
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  module.exports = {
    createResearchFinding,
    getAllResearchFindings,
    getResearchFindingById,
    updateResearchFinding,
    deleteResearchFinding,
  };
  