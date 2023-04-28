import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DisplaySchedules from './components/dIsplayschedules';
import Form from './components/formcom';
import Header from './components/headercomp';
import Home from './components/homecomp';
import ViewTimetable from './components/viewtimetable';
import ExistingSchedules from './components/existingschedules';
import Instructions from './components/instructions';


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
