import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';

export default function Form() {
  const [courses, setCourses] = useState([{ name: "", sections: [{ starttime: "", endtime:"", days: ["Monday"], nbr: "", sec_num: "", instructor: "" }] }]);
  const hasEmptyCourse = courses.some((course) => course.name.trim() === '');

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const navigate = useNavigate();

  const checkConflict = (combination, section) => {
    for (let existingSection of combination) {
      const hasCommonDay = existingSection.days.some(day => section.days.includes(day));
      if (hasCommonDay && existingSection.starttime <= section.endtime && existingSection.endtime >= section.starttime) {
        return true;
      }
    }
    return false;
  }
  // courses has the following structure
    // courses = [
    //   {
    //     name:'xyz',
    //     sections: [
    //       {
    //         starttime: "", 
    //         endtime:"", 
    //         days: [
    //           "Monday",
    //           "Wednesday"
    //         ], 
    //         nbr: "", 
    //         sec_num: "", 
    //         instructor: ""
    //       },
    //       {
    //         // same as above
    //       }
    //     ]
    //   },
    //   {
    //     // same as above 
    //   }     
    // ]

  
  const generateCombinations = (currentCombination, currentCourseIndex, courses, allCombinations) => {
    
    // all courses are full
    if (currentCourseIndex === courses.length) {
      allCombinations.push(currentCombination);
      return;
    }
  
    const currentCourseSections = courses[currentCourseIndex]['sections'];
    const course_name = courses[currentCourseIndex]['name'];
    // Iterate over the sections of the next course
    // If they do not clash with the sections already in current combination
    // Then add them to the combination and look for next course by making a recursive call
    for (let section of currentCourseSections) {
      if (!checkConflict(currentCombination, section)) {
        section['name'] = course_name
        const newCombination = [...currentCombination, section];
        generateCombinations(newCombination, currentCourseIndex + 1, courses, allCombinations);
      }
    }
  }

  const handleCourseNameChange = (event, courseIndex) => {
    const newCourses = [...courses];
    newCourses[courseIndex].name = event.target.value;
    setCourses(newCourses);
  };

  const handleStartTimeChange = (event, courseIndex, sectionIndex) => {
    const { value } = event.target;
    setCourses((prevCourses) => {
      const newCourses = [...prevCourses];
      newCourses[courseIndex].sections[sectionIndex].starttime = value;
      if (
        newCourses[courseIndex].sections[sectionIndex].endtime &&
        value >= newCourses[courseIndex].sections[sectionIndex].endtime
      ) {
        alert("Start time must be before end time");
        newCourses[courseIndex].sections[sectionIndex].starttime = "";
      }
      return newCourses;
    });
  };

  const handleEndTimeChange = (event, courseIndex, sectionIndex) => {
    const { value } = event.target;
    setCourses((prevCourses) => {
      const newCourses = [...prevCourses];
      newCourses[courseIndex].sections[sectionIndex].endtime = value;
      if (
        newCourses[courseIndex].sections[sectionIndex].starttime &&
        value <= newCourses[courseIndex].sections[sectionIndex].starttime
      ) {
        alert("End time must be after start time");
        newCourses[courseIndex].sections[sectionIndex].endtime = "";
      }
      return newCourses;
    });
  };

  const handleSectionNumChange = (event, courseIndex, sectionIndex) => {
    const newCourses = [...courses];
    newCourses[courseIndex].sections[sectionIndex].sec_num = event.target.value;
    setCourses(newCourses);
  };

  const handleNbrChange = (event, courseIndex, sectionIndex) => {
    const newCourses = [...courses];
    newCourses[courseIndex].sections[sectionIndex].nbr = event.target.value;
    setCourses(newCourses);
  };
  
  const handleInstructorChange = (event, courseIndex, sectionIndex) => {
    const newCourses = [...courses];
    newCourses[courseIndex].sections[sectionIndex].instructor = event.target.value;
    setCourses(newCourses);
  };

  const handleDayChange = (event, courseIndex, sectionIndex, dayIndex) => {
    const { value } = event.target;
    const newCourses = [...courses];
    const section = newCourses[courseIndex].sections[sectionIndex];
    const selectedDays = section.days.slice(0, dayIndex).concat(section.days.slice(dayIndex + 1));
    if (selectedDays.includes(value)) {
      alert(`Day ${value} has already been selected for this section`);
      return;
    }
    newCourses[courseIndex].sections[sectionIndex] = {
      ...section,
      days: [
        ...section.days.slice(0, dayIndex),
        value,
        ...section.days.slice(dayIndex + 1),
      ],
    };
    setCourses(newCourses);
  };

  const handleAddSection = (courseIndex) => {
    const newCourses = [...courses];
    newCourses[courseIndex].sections.push({ starttime: "", endtime:"", days: ["Monday"], nbr: "", sec_num: "", instructor: "" });
    setCourses(newCourses);
  };

  const handleAddDay = (courseIndex, sectionIndex) => {
    const newCourses = [...courses];
    const section = newCourses[courseIndex].sections[sectionIndex];
    const selectedDays = section.days;
    const availableDays = daysOfWeek.filter(day => !selectedDays.includes(day));
    if (availableDays.length === 0) {
      alert("All days have been selected for this section");
      return;
    }
    newCourses[courseIndex].sections[sectionIndex] = {
      ...section,
      days: [
        ...selectedDays,
        availableDays[0],
      ],
    };
    setCourses(newCourses);
  };

  const handleAddCourse = () => {
    setCourses([...courses, { name: "", sections: [{ starttime: "", endtime:"", days: ["Monday"], nbr: "", sec_num: "", instructor: "" }] }]);
  };

  const handleDeleteCourse = (index) => {
    const updatedCourses = courses.filter((_, i) => i !== index);
    setCourses(updatedCourses);
  };

  const handleDeleteSection = (courseIndex, sectionIndex) => {
    const updatedCourse = {
      ...courses[courseIndex],
      sections: [
        ...courses[courseIndex].sections.slice(0, sectionIndex),
        ...courses[courseIndex].sections.slice(sectionIndex + 1),
      ],
    };
    const updatedCourses = [...courses];
    updatedCourses[courseIndex] = updatedCourse;
    setCourses(updatedCourses);
  };

  const handleDeleteDay = (courseIndex, sectionIndex, dayIndex) => {
    const updatedSection = {
      ...courses[courseIndex].sections[sectionIndex],
      days: [
        ...courses[courseIndex].sections[sectionIndex].days.slice(0, dayIndex),
        ...courses[courseIndex].sections[sectionIndex].days.slice(dayIndex + 1),
      ],
    };
    const updatedCourse = {
      ...courses[courseIndex],
      sections: [
        ...courses[courseIndex].sections.slice(0, sectionIndex),
        updatedSection,
        ...courses[courseIndex].sections.slice(sectionIndex + 1),
      ],
    };
    const updatedCourses = [...courses];
    updatedCourses[courseIndex] = updatedCourse;
    setCourses(updatedCourses);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let currComb = [];
    let allCombs = [];
    generateCombinations(currComb, 0, courses, allCombs);
    // console.log(allCombs);

    // Retrieve the existing list from local storage, or initialize an empty list
    const existingList = JSON.parse(localStorage.getItem("existingTimeTables")) || [];
    existingList.push(allCombs);
    localStorage.setItem("existingTimeTables", JSON.stringify(existingList));

    navigate('/display', {state:{allCombs}});
  };

  return (
    <div className="text-gray-400 bg-gray-900 py-8">
    <div className="flex justify-center">
      <button className="inline-flex text-white bg-yellow-400 border-0 py-2 px-6 my-2 focus:outline-none hover:bg-yellow-600 rounded text-lg">
        <Link to='/Instructions'>
          Instructions 
        </Link>
      </button>
    </div>
    <form onSubmit={handleSubmit}>
      {courses.map((course, courseIndex) => (
        <>
        <div key={courseIndex} 
        className="h-full max-w-xl my-8 p-6 rounded-lg border-2 border-gray-800 flex flex-col mx-auto relative overflow-hidden">
          <label className="mx-auto">
            Course Name:
            <input
              type="text"
              required
              value={course.name}
              className="max-w-md w-full bg-white-100 bg-opacity-60 rounded border border-gray-700 focus:border-blue-400 focus:bg-white-100 focus:ring-2 focus:ring-blue-900 text-base outline-none text-gray-600 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              onChange={(event) => handleCourseNameChange(event, courseIndex)}
            />
          </label>
          
          {course.sections.map((section, sectionIndex) => (
            <>
            <div key={sectionIndex}
            className="max-w-sm mx-auto h-full my-6 p-6 rounded-lg border-2 border-gray-600 flex flex-col relative overflow-hidden">
              <label>
                Instructor:
                <input
                  type="text"
                  placeholder="Qasim Pasta"
                  required
                  value={section.instructor}
                  className="max-w-sm my-2 w-full bg-white-100 bg-opacity-60 rounded border border-gray-700 focus:border-blue-400 focus:bg-white-100 focus:ring-2 focus:ring-blue-900 text-base outline-none text-gray-600 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  onChange={(event) =>
                    handleInstructorChange(event, courseIndex, sectionIndex)
                  }
                />
              </label>
              <label>
                Section Num:
                <input
                  type="text"
                  placeholder="L2"
                  value={section.sec_num}
                  className="max-w-sm my-2 w-full bg-white-100 bg-opacity-60 rounded border border-gray-700 focus:border-blue-400 focus:bg-white-100 focus:ring-2 focus:ring-blue-900 text-base outline-none text-gray-600 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  onChange={(event) =>
                    handleSectionNumChange(event, courseIndex, sectionIndex)
                  }
                />
              </label>
              <label>
                NBR code (unique identifier):
                <input
                  required
                  type="text"
                  value={section.nbr}
                  placeholder='1234'
                  className="max-w-sm my-2 w-full bg-white-100 bg-opacity-60 rounded border border-gray-700 focus:border-blue-400 focus:bg-white-100 focus:ring-2 focus:ring-blue-900 text-base outline-none text-gray-600 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  onChange={(event) =>
                    handleNbrChange(event, courseIndex, sectionIndex)
                  }
                />
              </label>
              <label>
                Class Start Time:
                <input
                  type="time"
                  min="08:00"
                  required
                  value={section.starttime}
                  className="max-w-sm my-2 w-full bg-white-100 bg-opacity-60 rounded border border-gray-700 focus:border-blue-400 focus:bg-white-100 focus:ring-2 focus:ring-blue-900 text-base outline-none text-gray-600 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  onChange={(event) =>
                    handleStartTimeChange(event, courseIndex, sectionIndex)
                  }
                />
              </label>
              <label>
                Class End Time:
                <input
                  type="time"
                  max="20:00"
                  required
                  value={section.endtime}
                  className="max-w-sm my-2 w-full bg-white-100 bg-opacity-60 rounded border border-gray-700 focus:border-blue-400 focus:bg-white-100 focus:ring-2 focus:ring-blue-900 text-base outline-none text-gray-600 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  onChange={(event) =>
                    handleEndTimeChange(event, courseIndex, sectionIndex)
                  }
                />
              </label>
              {section.days.map((day, dayIndex) => (
                <div key={dayIndex}>
                  <label>
                    Day {dayIndex + 1}:
                    <select
                      value={day}
                      className="max-w-sm my-2 w-full bg-white-100 bg-opacity-60 rounded border border-gray-700 focus:border-blue-400 focus:bg-white-100 focus:ring-2 focus:ring-blue-900 text-base outline-none text-gray-600 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  
                      onChange={(event) =>
                        handleDayChange(
                          event,
                          courseIndex,
                          sectionIndex,
                          dayIndex
                        )
                      }
                    >
                      {daysOfWeek.map((dayOfWeek) => (
                        <option key={dayOfWeek} 
                        value={dayOfWeek}
                        disabled={section.days.includes(dayOfWeek) && dayOfWeek !== day}
                        >
                          {dayOfWeek}
                        </option>
                      ))}
                    </select>
                  </label>
                  <button className="flex my-4 mx-auto text-white bg-red-400 border-0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-lg btn" disabled={section.days.length === 1} onClick={() => handleDeleteDay(courseIndex, sectionIndex, dayIndex)}>
                    Delete Day
                  </button>
                  {dayIndex === section.days.length - 1 && (
                    <button
                      type="button"
                      className="flex my-4 mx-auto text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-700 rounded text-lg"
                      onClick={() => handleAddDay(courseIndex, sectionIndex)}
                    >
                      Add Day
                    </button>
                  )}
                </div>
              ))}
            </div>
              <button className="flex my-4 mx-auto text-white bg-red-400 border-0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-lg" onClick={() => handleDeleteSection(courseIndex, sectionIndex)}>
                Delete Section
              </button>
            </>
          ))}
          <button type="button" className="flex my-4 mx-auto text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-700 rounded text-lg" onClick={() => handleAddSection(courseIndex)}>
            Add Section
          </button>
        </div>
        
      <button className="flex my-4 mx-auto text-white bg-red-400 border-0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-lg" onClick={() => handleDeleteCourse(courseIndex)}>Delete Course</button>
      </>
      ))}
      <button className="flex my-4 mx-auto text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-700 rounded text-lg" type="button" onClick={handleAddCourse}>
        Add Course
      </button>
      <button disabled={hasEmptyCourse} className="flex my-4 mx-auto text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 btndisabled:bg-red-900 disabled:border-blue-200 disabled:cursor-not-allowed rounded text-lg" type="submit">Submit</button>
    </form>
    </div>
  );
  
}