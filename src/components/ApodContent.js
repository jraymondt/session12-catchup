import React from "react";

const ApodContent = ({ data }) => {
  if (!data) {
    return (
      <div className="box">
        <p className="has-text-centered">
          Please enter parameters and click "Fetch APOD".
        </p>
      </div>
    );
  }

  const renderSingleApod = (apodData, index) => (
    <div key={apodData.date || index} className="box mb-4">
      {apodData.media_type === "image" ? (
        <figure className="image">
          <img src={apodData.url} alt={apodData.title} />
        </figure>
      ) : apodData.media_type === "video" ? (
        <div className="video-container">
          <iframe 
            src={apodData.url} 
            frameBorder="0" 
            allowFullScreen
            title={apodData.title}
          />
        </div>
      ) : (
        <p>Media type not supported: {apodData.media_type}</p>
      )}
      <h2 className="title is-4 mt-4">{apodData.title}</h2>
      {apodData.date && (
        <p className="subtitle is-6">Date: {apodData.date}</p>
      )}
      <p>{apodData.explanation}</p>
    </div>
  );

  return (
    <div id="apod-content">
      {Array.isArray(data) 
        ? data.map(renderSingleApod)
        : renderSingleApod(data, 0)
      }
    </div>
  );
};

export default ApodContent;
