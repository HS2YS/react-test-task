import React from 'react';
import './assets/css/mainStyle-min.css';
import Header from './components/header/Header';
import SeminarList from './components/seminars/SeminarList';

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <SeminarList />
      </main>
    </div>
  );
}

export default App;
