import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ResearchFindingsComponent = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');
  const [researchFindings, setResearchFindings] = useState([]);

  useEffect(() => {
    fetchResearchFindings();
  }, []);

  const fetchResearchFindings = async () => {
    try {
      const response = await axios.get('http://localhost:3000/researchfindings');
      setResearchFindings(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/researchfindings', {
        title,
        description,
        author,
      });
      setResearchFindings([...researchFindings, response.data]);
      setTitle('');
      setDescription('');
      setAuthor('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Research Findings</h2>
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
          <label>Author:</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>

      <h3>Existing Research Findings:</h3>
      <ul>
        {researchFindings.map((finding) => (
          <li key={finding._id}>
            <h4>{finding.title}</h4>
            <p>{finding.description}</p>
            <p>Author: {finding.author}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResearchFindingsComponent;
