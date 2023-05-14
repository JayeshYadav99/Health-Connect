import React, { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import axios from 'axios';

const UserContributionsWithConfetti = ({ username }) => {
  const [events, setEvents] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [medicalContributions, setMedicalContributions] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`https://api.github.com/users/FlawlessIntrovert/events`);
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, [username]);

  const handleReward = () => {
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
    }, 3000);
  };

  const analyzeContributions = async () => {
    try {
      const medicalContributions = [];
      for (const event of events) {
        const repoName = event.repo.name;
        const response = await axios.get(`https://api.github.com/repos/${repoName}/events`);
        const repoEvents = response.data;
        const contributions = repoEvents.filter(event => {
          const repoName = event.repo.name.toLowerCase();
          return repoName.includes('medical') || repoName.includes('health');
        });

        if (contributions.length > 0) {
          medicalContributions.push({
            repoName,
            contributions: contributions.length
          });
        }
      }

      if (medicalContributions.length > 0) {
        handleReward();
        setMedicalContributions(medicalContributions);
      }
    } catch (error) {
      console.error('Error analyzing contributions:', error);
    }
  };

  return (
    <div>
      <h2>User Contributions</h2>
      <button onClick={analyzeContributions}>Analyze Contributions</button>
      {showConfetti && <Confetti />}
      <ul>
        {medicalContributions.map((contribution, index) => (
          <li key={index}>
            <p>Repository: {contribution.repoName}</p>
            <p> Medical Contributions: {contribution.contributions}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserContributionsWithConfetti;
