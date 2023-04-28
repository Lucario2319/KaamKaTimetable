import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DisplaySchedules from './components/displayschedules.jsx';
import Form from './components/formcomp.jsx';
import Header from './components/headercomp.jsx';
import Home from './components/homecomp.jsx';
import ViewTimetable from './components/viewtimetable.jsx';
import ExistingSchedules from './components/existingschedules.jsx';
import Instructions from './components/instructions.jsx';


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
