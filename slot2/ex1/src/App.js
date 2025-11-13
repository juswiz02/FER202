import React from 'react';
import './App.css';
import Exercise1 from '../../../slot5/ex1/src/components/exercise1';
import Exercise2 from '../../../slot5/ex1/src/components/exercise2';
import Exercise3 from '../../../slot5/ex1/src/components/exercise3';
import Exercise4 from '../../../slot5/ex1/src/components/exercise4';
import Exercise5 from '../../../slot5/ex1/src/components/exercise5';

function App() {
  return (
    <div className="App">
      <header style={{ backgroundColor: '#282c34', padding: '20px', color: 'white', textAlign: 'center' }}>
        <h1>🚀 Slot 5 - All Exercises</h1>
        <p>Complete React Exercises Collection</p>
      </header>
      
      <main style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        <Exercise1 />
        <Exercise2 />
        <Exercise3 />
        <Exercise4 />
        <Exercise5 />
      </main>
      
      <footer style={{ backgroundColor: '#f8f9fa', padding: '20px', textAlign: 'center', marginTop: '40px' }}>
        <p>© 2025 Slot 5 - Complete Exercise Collection</p>
      </footer>
    </div>
  );
}

export default App;
