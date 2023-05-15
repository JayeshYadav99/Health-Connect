import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VideoGallery = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get('https://api.nhs.uk/video', {
          headers: {
            'SUBSCRIPTION-KEY': 'c6c66d1d741f4298a8e051cc66d1794b', // Replace with your actual subscription key
          },
        });
        setVideos(response.data.video);
      } catch (error) {
        console.log(error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="grid grid-cols-2 gap-4">
      {videos.map((video) => (
        <div key={video.id} className="p-4 bg-white shadow-md">
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              className="w-full h-full"
              src={video.embedUrl}
              title={video.name}
              allowFullScreen
            ></iframe>
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold">{video.name}</h3>
            <p className="mt-2 text-gray-600">{video.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideoGallery;
