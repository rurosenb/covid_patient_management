import React from 'react';
import CreatePatient from './pages/CreatePatient';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import PatientList from './pages/PatientList';
import HomePage from './pages/HomePage';
import ViewPatient from './pages/components/ViewPatient';


function App() {
  return (
    <BrowserRouter>
   <Routes>
   <Route  path="/" element={<HomePage/>}/>
    <Route  path="/createpatient" element={<CreatePatient/>}/>
    <Route path="/patientlist" element={<PatientList/>}/>
    <Route path='/viewpatient/:id' element={<ViewPatient/>}/>
   </Routes>
   </BrowserRouter>
  );
}



export default App;
