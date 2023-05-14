import React, { useState } from 'react';
import { Octokit, App } from "https://cdn.skypack.dev/octokit";

const CreateRepositoryForm = () => {
  const [repoName, setRepoName] = useState('');
  const [repoDescription, setRepoDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const octokit = new Octokit({
      auth: "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",
    });

    try {
      const { data } = await octokit.request('POST /user/repos', {
        name: repoName,
        description: repoDescription,
        private: false,
      });

      console.log('Repository created:', data);

      // Clear form inputs
      setRepoName('');
      setRepoDescription('');

      // TODO: Add any additional logic after repository creation

    } catch (error) {
      console.error('Error creating repository:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Create GitHub Repository</h2>
      <div className="mb-4">
        <label htmlFor="repoName" className="block font-semibold mb-1">Repository Name:</label>
        <input
          type="text"
          id="repoName"
          value={repoName}
          onChange={(e) => setRepoName(e.target.value)}
          required
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="repoDescription" className="block font-semibold mb-1">Repository Description:</label>
        <textarea
          id="repoDescription"
          value={repoDescription}
          onChange={(e) => setRepoDescription(e.target.value)}
          required
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Create Repository</button>
    </form>
  );
};

export default CreateRepositoryForm;
