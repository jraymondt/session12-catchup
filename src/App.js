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

    apiUrl = ApodForm();

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setApodData(data);
    } catch (err) {
      setError(`${err.mssage}`);
    }
  };

  // return <DateInputComponent />;
  return (
    <div className="App">
      <section className="section">
        <div className="container">
          <ApodForm fetchApodData={fetchApodData} />
          <ApodContent pdData={apodData} />
        </div>
      </section>
    </div>
  );
}

export default App;
