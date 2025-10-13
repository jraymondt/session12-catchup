import React from "react";
import DateInputComponent from "./components/DateInputComponent.js";
import ApodForm from "./components/ApodForm";
import ApodContent from "./components/ApodContent";

function App() {
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
