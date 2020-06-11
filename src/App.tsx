import React from 'react';
import logo from './logo.svg';
import './App.css';
import VizContainer from './SortingVisualizer/VizContainer'
import Header from './Header/header';

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <VizContainer />
    </div>
  );
}

export default App;
