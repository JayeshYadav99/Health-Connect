const {EducationalResources}=require('../db');
const createEducationalResource = async (req, res) => {
    try {
      const { title, description, category, url } = req.body;
      const educationalResource = await EducationalResources.create({
        title,
        description,
        category,
        url,
      });
      res.status(201).json(educationalResource);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const getAllEducationalResources = async (req, res) => {
    try {
      const educationalResources = await EducationalResources.find();
      res.json(educationalResources);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const getEducationalResourceById = async (req, res) => {
    try {
      const educationalResource = await EducationalResources.findById(req.params.id);
      if (!educationalResource) {
        return res.status(404).json({ error: 'Educational resource not found' });
      }
      res.json(educationalResource);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const updateEducationalResource = async (req, res) => {
    try {
      const { title, description, category, url } = req.body;
      const updatedEducationalResource = await EducationalResources.findByIdAndUpdate(
        req.params.id,
        { title, description, category, url },
        { new: true }
      );
      if (!updatedEducationalResource) {
        return res.status(404).json({ error: 'Educational resource not found' });
      }
      res.json(updatedEducationalResource);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const deleteEducationalResource = async (req, res) => {
    try {
      const deletedEducationalResource = await EducationalResources.findByIdAndDelete(req.params.id);
      if (!deletedEducationalResource) {
        return res.status(404).json({ error: 'Educational resource not found' });
      }
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  module.exports = {
    createEducationalResource,
    getAllEducationalResources,
    getEducationalResourceById,
    updateEducationalResource,
    deleteEducationalResource,
  };
  