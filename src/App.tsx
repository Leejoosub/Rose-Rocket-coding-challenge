import React from 'react';
import { Counter } from './components/features/counter/Counter';
import './App.css';
import { Scheduler } from './components/features/Scheduler/Scheduler';

function App() {
  return (
    <div className="App">
      {/* <Counter /> */}
      <Scheduler />
    </div>
  );
}

export default App;
