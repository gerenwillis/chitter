import React from 'react';
import ChitForm from './components/ChitForm';
import ChitterFeed from './components/ChitterFeed';
import Header from './components/Header';


/*
    TODO
    1. Form for entering chits
    2. Area for viewing chits
    3. 
*/

function App() {
  return (
    <div className="App">
      <Header />
      <ChitForm />
      <ChitterFeed />
    </div>
  );
}

export default App;
