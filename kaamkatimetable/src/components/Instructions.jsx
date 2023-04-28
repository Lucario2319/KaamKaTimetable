import React from 'react';
import { Link } from 'react-router-dom';
import inst from '../images/instructions.jpg';

export default function Instructions() {
  return (
    <>
      <section className="text-gray-400 bg-gray-900 body-font">
        <div className="container px-5 py-14 mx-auto flex flex-wrap">
            <div className="flex flex-wrap w-full">
            <div className="lg:w-2/5 md:w-1/2 md:pr-10 md:py-6">
                <div className="flex relative pb-12">
                <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                    <div className="h-full w-1 bg-gray-800 pointer-events-none"></div>
                </div>
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500 inline-flex items-center justify-center text-white relative z-10">
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    </svg>
                </div>
                <div className="flex-grow pl-4">
                    <h2 className="font-medium title-font text-sm text-white mb-1 tracking-wider">STEP 1</h2>
                    <p className="leading-relaxed">Click on add a new course and then enter name for that particular course.</p>
                </div>
                </div>
                <div className="flex relative pb-12">
                <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                    <div className="h-full w-1 bg-gray-800 pointer-events-none"></div>
                </div>
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500 inline-flex items-center justify-center text-white relative z-10">
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                    </svg>
                </div>
                <div className="flex-grow pl-4">
                    <h2 className="font-medium title-font text-sm text-white mb-1 tracking-wider">STEP 2</h2>
                    <p className="leading-relaxed">Fill out other fields such as Instructor name, start/end time and days.</p>
                </div>
                </div>
                <div className="flex relative pb-12">
                <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                    <div className="h-full w-1 bg-gray-800 pointer-events-none"></div>
                </div>
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500 inline-flex items-center justify-center text-white relative z-10">
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <circle cx="12" cy="5" r="3"></circle>
                    <path d="M12 22V8M5 12H2a10 10 0 0020 0h-3"></path>
                    </svg>
                </div>
                <div className="flex-grow pl-4">
                    <h2 className="font-medium title-font text-sm text-white mb-1 tracking-wider">STEP 3</h2>
                    <p className="leading-relaxed">Make sure to add nbr code for that section. It acts as a unique identifier which can be used later to search for it.</p>
                </div>
                </div>
                <div className="flex relative pb-12">
                <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                    <div className="h-full w-1 bg-gray-800 pointer-events-none"></div>
                </div>
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500 inline-flex items-center justify-center text-white relative z-10">
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                </div>
                <div className="flex-grow pl-4">
                    <h2 className="font-medium title-font text-sm text-white mb-1 tracking-wider">STEP 4</h2>
                    <p className="leading-relaxed">Click on add section to add alternative sections for that same course if needed.Make sure to treat lab,recitation, lecture etc as different course as they have different timing and nbr code.</p>
                </div>
                </div>
                <div className="flex relative">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500 inline-flex items-center justify-center text-white relative z-10">
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                    <path d="M22 4L12 14.01l-3-3"></path>
                    </svg>
                </div>
                <div className="flex-grow pl-4">
                    <h2 className="font-medium title-font text-sm text-white mb-1 tracking-wider">FINISH</h2>
                    <p className="leading-relaxed">After you're done with adding all courses and sections, review it once and click on generate timetable.</p>
                </div>
                </div>

            </div>
            <img className="lg:w-3/5 md:w-1/2 object-cover object-center rounded-lg md:mt-0 mt-12" src={inst} alt="step"/>
            </div>
            
        </div>
        <div className="flex justify-center">
            <button className="inline-flex text-white bg-blue-500 border-0 py-2 px-6 my-2 focus:outline-none hover:bg-blue-600 rounded text-lg">
            <Link to='/Form'>
            Create a new schedule 
            </Link>
            </button>
        </div>
        </section>
    </>
  )
}