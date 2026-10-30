import React from 'react';
import './App.css';
import Header from './Header/header';
import Controls from './Controls/Controls';
import VizContainer from './SortingVisualizer/VizContainer';
import InfoPanel from './InfoPanel/InfoPanel';

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <Controls />
      <main className="app-main">
        <VizContainer />
        <InfoPanel />
      </main>
    </div>
  );
};

export default App;
