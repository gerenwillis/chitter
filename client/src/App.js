import React from 'react';
import Chitter from './Chitter'
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
      <Chitter />
    </div>
  );
}

export default App;
