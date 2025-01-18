import React,{useState} from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Form from './Components/Form'
import Navbar from './Components/Navbar';
import Table from './Components/Table';

import { submitData, fetchData, updateData } from './Components/api';

function App() {
  const [data, setData] = useState([]); // Shared state for table data

  // Fetch data from the server
  const loadData = async () => {
    try {
      const response = await fetchData();
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Submit new form data
  const handleFormSubmit = async (formData) => {
    try {
      await submitData(formData);
      loadData(); // Refresh data in the table
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  // Edit existing data
  const handleEdit = async (id, updatedData) => {
    try {
      await updateData(id, updatedData);
      loadData(); // Refresh data in the table
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };
  return (
    <Router>
      <div className="app--container">
        <Navbar />
        <Routes>
          {/* Pass handleFormSubmit as a prop to the Form component */}
          <Route
            exact
            path="/"
            element={<Form onSubmit={handleFormSubmit} />}
          />
          {/* Pass data and handleEdit to the Table component */}
          <Route
            exact
            path="/table"
            element={<Table data={data} onEdit={handleEdit} />}
          />
        </Routes>
      </div>
    </Router>

  );
}


export default App;
