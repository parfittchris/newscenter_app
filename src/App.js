import React from 'react';

import NewsBanner from './Components/NewsBanner/newsBanner'
import './App.css';

function App() {
  return (
    <div className="App">
      <h1 id="app_header">News Center</h1>
      <div className="articles_container">
        <NewsBanner site='FOX' />
        <NewsBanner site='CNN' />
        <NewsBanner site='NYTimes' />
      </div>
      <div className="articles_container">
        <NewsBanner site='Huffington Post' />
        <NewsBanner site='NBC News' />
      </div>
    </div>
  );
}

export default App;
