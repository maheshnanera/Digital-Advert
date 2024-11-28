import React from 'react';
import { Amplify } from 'aws-amplify';
import './App.css';
import './responsive.css';
import Routes from './Routes/Routes';
import config from './amplifyconfiguration.json';

function App() {
  // This will update the configration

  Amplify.configure(config);

  return (
    <div className="App">
      <Routes />
    </div>
  );
}

export default App;
