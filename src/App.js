import React from 'react';
import './App.css';
//import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Form from './Components/Form'
import Navbar from './Components/Navbar';
import Table from './Components/Table';

/*
function App() {
  return (
    
    <Router>
      <Routes>
        <Route exact path = '/form' element = {<Form/>}></Route>
        <Route exact path = '/table' element = {<Table/>}></Route>
        <Route exact path = '/navbar' element = {<Navbar/>}></Route>
      </Routes>
    </Router>

  <Form/>
  <Table/>
  );
}

*/

function App(){
  return(
    <>
    <Navbar/>
   <Form/>
   <Table/>

</>
  )
}

export default App;
