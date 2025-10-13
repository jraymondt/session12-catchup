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
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setApodData(data);
      setError(null); // Clear any previous errors
    } catch (err) {
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
