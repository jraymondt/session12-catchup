import React from "react";
// import DateInputComponent from "./components/DateInputComponent.js";
import ApodForm from "./components/ApodForm";
import ApodContent from "./components/ApodContent";
import "./App.css";

function App() {
  const [apodData, setApodData] = useState(null);

  // event handler
  const fetchApodData = async (parameters) => {
    fetchApodButton.addEventListener("click", () => {

      let apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

      for (const key in parameters) {
        apiUrl += `&${key}=${parameters[key]}`;
      }

      apiUrl = apodForm();

      try {
        const response = await fetch(apiUrl)
          // .then((response) => response.json())
          // .then((data) => {
          //   // render
          //   if (Array.isArray(data)) {
          //     apodContent.innerHTML = "";
          //     data.forEach((item) => displayApod(item, apodContent));
          //   } else {
          //     apodContent.innerHTML = "";
          //     displayApod(data, apodContent);
          //   }
          // })
          // .catch((error) => {
          //   apodContent.innerHTML = `<p>Error fetching data: ${error.message}</p>`;
          // });
      }
    });
  };

  // return <DateInputComponent />;
  return (
    <div className="App">
      <section className="section">
        <div className="container">
          <ApodForm />
          <ApodContent />
        </div>
      </section>
    </div>
  );
}

export default App;
