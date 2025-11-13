import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Import all components
import CounterComponent from './components/CounterComponent';
import LightSwitch from './components/LightSwitch';
import LoginForm from './components/LoginForm';
import LoginForm2 from './components/LoginForm2';
import SearchItem from './components/SearchItem';
import AccountSearch from './components/AccountSearch';
import RegistrationForm from './components/RegistrationForm';

function App() {
  return (
    <div className="App">
      <div className="container-fluid">
        <h1 className="text-center my-4">useState Hook Exercises</h1>
        
        <div className="row">
          <div className="col-md-6 mb-4">
            <CounterComponent />
          </div>
          <div className="col-md-6 mb-4">
            <LightSwitch />
          </div>
        </div>

        <div className="row">
          <div className="col-12 mb-4">
            <LoginForm />
          </div>
        </div>

        <div className="row">
          <div className="col-12 mb-4">
            <LoginForm2 />
          </div>
        </div>

        <div className="row">
          <div className="col-12 mb-4">
            <SearchItem />
          </div>
        </div>

        <div className="row">
          <div className="col-12 mb-4">
            <AccountSearch />
          </div>
        </div>

        <div className="row">
          <div className="col-12 mb-4">
            <RegistrationForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
