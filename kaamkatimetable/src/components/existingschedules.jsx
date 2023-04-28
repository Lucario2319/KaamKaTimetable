import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function ExistingSchedules() {

    // Retrieve the existing list from local storage, or initialize an empty list
    const existingList = JSON.parse(localStorage.getItem("existingTimeTables")) || [];
    // console.log(existingList)
    const courseList = [];

    for (let i = 0; i < existingList.length; i++) {
      const courses = [];
      for (let j = 0; j < existingList[i].length; j++) {
        for (let k = 0; k < existingList[i][j].length; k++) {
          let d = existingList[i][j][k];
          d = JSON.stringify(d)
          if (!courses.includes(d)) {
              courses.push(d);
          }
        }
      }
      courseList.push(courses)
    } 

    let count = 0;
    const nestedListComponents = courseList.map((courses, outerIndex) => {
    count++;
    return (
    <div key={(outerIndex+count+1)*17} className="xl:w-1/4 lg:w-1/2 my-4 md:w-full px-8 py-6 border-l-2 border-gray-800">
        <h3 className="text-lg sm:text-xl font-medium title-font mb-2 text-gray-300">Schedule Number: {count}</h3>  
        {courses.map((section, innerIndex)=> {
        section = JSON.parse(section);
        return (
          <div key={(innerIndex+1)*19} className="leading-relaxed text-base mb-4">
            <p>Course: {section.name}</p>
              <p>Instructor: {section.instructor}</p>
              <p>Time: {section.starttime} - {section.endtime}</p>
              <p>NBR: {section.nbr}</p>
          </div>
        )})}
        <button className="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg" onClick={()=>{
          const allCombs = existingList[outerIndex];
          navigate('/display', {state:{allCombs}})}}>
             View Timetable
         </button>
    </div>
    )});

    const navigate = useNavigate();

  return (
    <div className="container px-14 py-14 mx-auto text-gray-400 bg-gray-900">
      {existingList.length > 0 ? (
        <div className="flex flex-wrap">
          {nestedListComponents}
        </div>
      ) : (
        <div>
          <p>Sorry, the list is empty, click on the button below to create a new timetable</p>
          <button className="inline-flex text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg">
            <Link to='/Form'>
              Create a new schedule 
            </Link>
          </button>
        </div>
      )}
    </div>
  )
}
