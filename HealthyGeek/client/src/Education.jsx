import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EducationalResourceComponent = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [url, setUrl] = useState('');
  const [educationalResources, setEducationalResources] = useState([]);

  useEffect(() => {
    fetchEducationalResources();
  }, []);

  const fetchEducationalResources = async () => {
    try {
      const response = await axios.get('http://localhost:3000/educationalresources');
      setEducationalResources(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/educationalresources', {
        title,
        description,
        category,
        url,
      });
      setEducationalResources([...educationalResources, response.data]);
      setTitle('');
      setDescription('');
      setCategory('');
      setUrl('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Educational Resources</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div>
          <label>Category:</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div>
          <label>URL:</label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>

      <h3>Existing Educational Resources:</h3>
      <ul>
        {educationalResources.map((resource) => (
          <li key={resource._id}>
            <h4>{resource.title}</h4>
            <p>{resource.description}</p>
            <p>Category: {resource.category}</p>
            <a href={resource.url} target="_blank" rel="noopener noreferrer">Go to Resource</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EducationalResourceComponent;
