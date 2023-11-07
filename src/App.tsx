import React from 'react';
import './App.css';
import { CompletedList } from './components/CompletedList';
import { IncompleteList } from './components/IncompleteList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <CompletedList/>
      <IncompleteList/>
      </header>
    </div>
  );
}

export default App;
