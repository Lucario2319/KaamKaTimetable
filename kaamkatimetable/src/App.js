import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DisplaySchedules from './components/DisplaySchedules';
import Form from './components/Form';
import Header from './components/Header';
import Home from './components/Home';
import ViewTimetable from './components/ViewTimetable';
import ExistingSchedules from './components/ExistingSchedules';
import Instructions from './components/Instructions';


function App() {
  return (
    <Router>
      <div>
        <Header/>
        <Routes>
          <Route exact path="/" element= {<Home />} />
          <Route path="/display" element={<DisplaySchedules />} />
          <Route path="/Form" element={<Form />} />
          <Route path="/viewTimetable" element={<ViewTimetable />} />
          <Route path="/existingSchedules" element={<ExistingSchedules />} />
          <Route path="/Instructions" element={<Instructions />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
