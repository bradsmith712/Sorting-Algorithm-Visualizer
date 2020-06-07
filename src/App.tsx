import React from 'react';
import logo from './logo.svg';
import './App.css';
import VizContainer from './SortingVisualizer/VizContainer'

const App: React.FC = () => {
  return (
    <div className="App">
      <VizContainer />
    </div>
  );
}

export default App;
