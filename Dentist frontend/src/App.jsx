import { BrowserRouter } from "react-router-dom";
import React, { useState } from 'react';

import {
  About,
  Contact,
  Experience,
  Feedbacks,
  Hero,
  Navbar,
  Tech,
  Works,
  StarsCanvas,
} from "./components";

import "./bot.css"
import InitializeGoogleAnalytics from "./utils/googleAnalytics";

InitializeGoogleAnalytics('G-W2C12EP6PV');

const App = () => {

  const [showIframe, setShowIframe] = useState(false);
  const [initial, setInitial] = useState(false);

  const toggleIframe = () => {
    !initial && setInitial(true);
    setShowIframe(!showIframe);
  };

  return (
    <BrowserRouter>
      <div className="relative z-0 bg-black">
        <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
          <Navbar />
          <Hero />
        </div>
        <About />
        <Experience />
        <Tech />
        <Works />
        <Feedbacks />
        <div className="relative z-0">
          <Contact />
          <StarsCanvas />
        </div>
      </div>
    </BrowserRouter >
  );
};

export default App;
