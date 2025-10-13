import React, { useState } from "react";
// import DateInputComponent from "./components/DateInputComponent.js";
import ApodForm from "./components/ApodForm";
import ApodContent from "./components/ApodContent";
import "./App.css";

function App() {
  const [apodData, setApodData] = useState(null);
  const [error, setError] = useState(null);

  // event handler
  const fetchApodData = async (parameters) => {
    const apiKey = "j7zecHn3hNANmgts8pYoC5G355dtbiZjbBCuCEA1";
    let apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

    for (const key in parameters) {
      apiUrl += `&${key}=${parameters[key]}`;
    }

    try {
      console.log('Making request to:', apiUrl);
      const response = await fetch(apiUrl);
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(`No APOD data found for the requested date(s). This could mean the date is in the future, before APOD started (June 16, 1995), or the data is temporarily unavailable.`);
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('API Response:', data);
      console.log('API Response details - Type:', typeof data, 'Is array:', Array.isArray(data), 'Length:', data?.length);
      if (Array.isArray(data)) {
        data.forEach((item, index) => {
          console.log(`Item ${index + 1}:`, {
            date: item.date,
            title: item.title,
            media_type: item.media_type,
            hasUrl: !!item.url,
            hasExplanation: !!item.explanation
          });
        });
      }
      
      // Check if the API returned an error
      if (data.error) {
        throw new Error(`NASA API Error: ${data.error.message || data.error}`);
      }
      
      setApodData(data);
      setError(null); // Clear any previous errors
    } catch (err) {
      console.error('Fetch error:', err);
      setError(`Error fetching data: ${err.message}`);
      setApodData(null);
    }
  };

  // return <DateInputComponent />;
  return (
    <div className="App">
      <section className="section">
        <div className="container">
          <ApodForm fetchApodData={fetchApodData} />
          <ApodContent data={apodData} />
          {error && (
            <div className="notification is-danger">
              {error}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default App;
