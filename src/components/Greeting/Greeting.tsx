import React from "react";

import "./index.scss";

const Greeting: React.FC = () => {
  return (
    <section className="greeting-container">
      <h1 data-testid="greeting-header">Welcome to Weather App!</h1>
      <p data-testid="greeting-content">
        You need to enter the name of the city in the input at the top to start
        exploring.
        <br />
        Hope you enjoy it!
      </p>
    </section>
  );
};

export default Greeting;
