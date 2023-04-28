import React from 'react';
import pic from '../images/timetable.jpg';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <section className="text-gray-400 bg-gray-900 body-font">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">
              Kaam Ka Timetable
            </h1>
            <p className="mb-8 leading-relaxed">
            Welcome to our innovative website designed specifically for university students who are tired of struggling to create the perfect timetable. We understand the stress and frustration that comes with trying to balance classes, work, and other commitments, which is why we created a platform that allows you to easily customize your own timetable to fit your unique schedule. Our user-friendly interface and comprehensive features make it simple and hassle-free to create a timetable that works for you. Whether you're a first-year student or graduating senior, our website is the perfect tool to help you take control of your academic schedule.
            </p>
            <div className="flex justify-center">
              <button className="inline-flex text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg">
                <Link to='/Form'>
                Create a new schedule 
                </Link>
              </button>
              <button className="ml-4 inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-700 hover:text-white rounded text-lg">
                <Link to='/ExistingSchedules'>
                  View existing schedules
                </Link>
              </button>
            </div>
          </div>
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <img className="object-cover object-center rounded" alt="hero" src={pic}/>
          </div>
        </div>
      </section>
    </div>
  )
}
