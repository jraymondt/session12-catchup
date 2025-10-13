import React from "react";

const ApodContent = ({ data }) => {
  console.log('ApodContent received data:', data);
  console.log('Data type:', typeof data, 'Is array:', Array.isArray(data), 'Length:', data?.length);
  
  if (!data) {
    return (
      <div className="box">
        <p className="has-text-centered">
          Please enter parameters and click "Fetch APOD".
        </p>
      </div>
    );
  }

  const renderSingleApod = (apodData, index) => {
    // Handle cases where apodData might be incomplete
    if (!apodData || !apodData.title) {
      return (
        <div key={index} className="box mb-4">
          <p className="has-text-danger">
            Incomplete data received for this entry. Raw data: {JSON.stringify(apodData)}
          </p>
        </div>
      );
    }

    return (
      <div key={apodData.date || index} className="box mb-4">
        {apodData.media_type === "image" ? (
          <figure className="image">
            <img 
              src={apodData.url} 
              alt={apodData.title}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <p style={{display: 'none'}} className="has-text-danger">
              Failed to load image: {apodData.url}
            </p>
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
  };

  // Handle empty arrays
  if (Array.isArray(data) && data.length === 0) {
    return (
      <div className="box">
        <p className="has-text-warning has-text-centered">
          No APOD data found for the requested date range. This could mean:
          <br />• No APOD was published for those dates
          <br />• The dates are outside the available range (APOD started June 16, 1995)
          <br />• There was a temporary API issue
        </p>
      </div>
    );
  }

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
