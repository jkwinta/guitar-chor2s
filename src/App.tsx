import React from 'react';
import './App.css';

// import ChooseAndDisplayCollection from './gui/choose_and_display_collection';
import ChordCollector from './gui/chord_collector';

function App() {
  return (
    <div className="App">
      <ChordCollector />
      {/* <ChooseAndDisplayCollection /> */}
    </div>
  );
}

export default App;
