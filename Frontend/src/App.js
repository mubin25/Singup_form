import React from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Form from './Components/Form'
import Navbar from './Components/Navbar';
import Table from './Components/Table';


function App() {
  return (
    
    <Router>
      <Routes>
        
        <Route exact path = '/' element = {<><Navbar/><Form/></>} ></Route>
        <Route exact path = '/table' element = {<><Navbar/><Table/></>}></Route>
      </Routes>
    </Router>

  );
}


export default App;
