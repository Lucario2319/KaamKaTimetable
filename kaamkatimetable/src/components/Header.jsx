import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/schedule.png';

export default function Header() {
  return (
    <header className="text-gray-600 bg-gray-50 body-font">
    <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
      <div className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
        <img src={logo} width='40px' alt="" />
        <span className="ml-3 text-xl">Kaam Ka Timetable</span>
      </div>
      <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
        <Link to='/' className="mr-5 hover:text-gray-900">Home</Link>
        {/* <Link to='/Instructions' className="mr-5 hover:text-gray-900">Instructions</Link> */}
        <Link to='/Form' className="mr-5 hover:text-gray-900">Create Timetable</Link>
        <Link to='/ExistingSchedules' className="mr-5 hover:text-gray-900">View Existing Timetable</Link>
      </nav>
    </div>
  </header>
  )
}
