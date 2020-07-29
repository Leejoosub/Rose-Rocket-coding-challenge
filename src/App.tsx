import React from 'react';
import { Counter } from './features/counter/Counter';
import './App.css';
import { Scheduler } from './features/Scheduler/Scheduler';

function App() {
  return (
    <div className="App">
      {/* <Counter /> */}
      <Scheduler />
    </div>
  );
}

export default App;
