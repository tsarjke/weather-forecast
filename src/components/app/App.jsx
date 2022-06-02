import React from 'react';
import Contact from '../contact/Contact';
import Forecast from '../forecast/Forecast';
import './app.scss';

const App = () => (
  <div className="app">
    <header className="header">
      <div className="header__content">
        <h1 className="header__title">Weather forecast</h1>
      </div>
    </header>
    <main>
      <Forecast />
    </main>
    <footer className="footer">
      <div className="footer__content">
        <h2 className="footer__text">
          To see other projects or just chat follow the links
        </h2>
        <Contact />
      </div>
    </footer>
  </div>
);

export default App;
