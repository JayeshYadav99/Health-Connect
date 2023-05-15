import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ArticleGallery = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('https://api.nhs.uk/mental-health', {
          headers: {
            'SUBSCRIPTION-KEY': 'c6c66d1d741f4298a8e051cc66d1794b', // Replace with your actual subscription key
          },
        });
        setArticles(response.data.hasPart);
      } catch (error) {
        console.log(error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className="grid grid-cols-2 gap-4">
      {articles.map((article) => (
        <div key={article.url} className="p-4 bg-white shadow-md">
          <a href={article.url} className="block mb-4">
            <img
              src='article.png'
              alt={article.headline}
              className="w-full h-auto"
            />
          </a>
          <div>
            <h3 className="text-lg font-semibold">{article.headline}</h3>
            <p className="mt-2 text-gray-600">{article.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ArticleGallery;
