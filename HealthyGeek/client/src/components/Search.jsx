import React, { useState } from 'react';
import { Octokit, App } from "https://cdn.skypack.dev/octokit";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [repositories, setRepositories] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedLabels, setSelectedLabels] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState([]);

  const octokit = new Octokit();

  const handleSearch = async () => {
    try {
      const response = await octokit.request('GET /search/repositories',{
        q:`${searchTerm} ${selectedTags.map((tag) => `topic:${tag}`).join(' ')}`
        // q: `${searchTerm} topic:${selectedTopics.join(' ')} label:${selectedLabels.join(
        //   ' '
        // )} ${selectedTags.map((tag) => `topic:${tag}`).join(' ')}`,
      });

      const results = response.data.items;
      setRepositories(results);
    } catch (error) {
      console.error('Error searching repositories:', error);
    }
  };

  const handleTagSelect = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags((prevTags) => prevTags.filter((t) => t !== tag));
    } else {
      setSelectedTags((prevTags) => [...prevTags, tag]);
    }
  };

  const handleLabelSelect = (label) => {
    if (selectedLabels.includes(label)) {
      setSelectedLabels((prevLabels) => prevLabels.filter((l) => l !== label));
    } else {
      setSelectedLabels((prevLabels) => [...prevLabels, label]);
    }
  };

  const handleTopicSelect = (topic) => {
    if (selectedTopics.includes(topic)) {
      setSelectedTopics((prevTopics) => prevTopics.filter((t) => t !== topic));
    } else {
      setSelectedTopics((prevTopics) => [...prevTopics, topic]);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Search Health-related Repositories</h2>
      <div>
      <h3 className="text-lg font-bold mb-2">Tags:</h3>
<div className="flex flex-wrap">
  {/* Replace 'your-tag-1', 'your-tag-2', etc. with your desired tags */}
  {['corona', 'typhoid', 'asthma'].map((tag) => (
    <button
      key={tag}
      className={`bg-gray-200 text-gray-800 rounded-full px-3 py-1 mr-2 mb-2 ${
        selectedTags.includes(tag) ? 'bg-blue-500 text-white' : ''
      }`}
      onClick={() => handleTagSelect(tag)}
    >
      {tag}
    </button>
  ))}
</div>
</div>
      <div className="flex items-center mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter search term"
          className="w-full border border-gray-300 rounded px-3 py-2 mr-4"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Search
        </button>
      </div>
      <div>
        <h3 className="text-lg font-bold mb-2">Repositories:</h3>
        {repositories.map((repo) => (
          <div key={repo.id} className="border border-gray-300 rounded p-4 mb-4">
            <h4 className="text-xl font-bold mb-2">{repo.name}</h4>
            <p>{repo.description}</p>
          </div>
        ))}
      </div>
     
</div>
)
}
export default Search;