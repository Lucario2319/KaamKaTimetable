import React, {useState, useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
    

export default function DisplaySchedules() {
    const [displayInfo, setDisplayInfo] = useState('instructor');
    const [searchValue, setSearchValue] = useState('');

    const navigate = useNavigate();
    const allCombs = useLocation().state.allCombs;
    const [Nbr, setNbr] = useState('');
    const [minTime, setMinTime] = useState('08:00');
    const [maxTime, setMaxTime] = useState('20:00');
    const [filteredList, setFilteredList] = useState(allCombs);
  
    const filterCoursesByName = () => {
      return allCombs.filter(list => {
        return list.some(item => {
          const instructorName = item['instructor'].toLowerCase();
          return instructorName.includes(searchValue.toLowerCase());
        });
      });
    }

    const filterCoursesByNbr = () => {
      return allCombs.filter(list => {
        return list.some(item => {
          const sectionNbr = item['nbr'].toLowerCase();
          return sectionNbr.includes(Nbr.toLowerCase());
        });
      });
    }

    const filterCoursesByTime = () => {
      return allCombs.filter(list => {
        return list.every(item => {
          return item.starttime >= minTime && item.endtime <= maxTime;
        });
      });
    }

    const filterCourses = (nameList, timeList, nbrList) => {
      const intersection = nameList.filter((item) =>
        timeList.some((element) => JSON.stringify(element) === JSON.stringify(item)) &&
        nbrList.some((element) => JSON.stringify(element) === JSON.stringify(item))
      );
      setFilteredList(intersection)
    }
  
    const handleTeacherClick = () => {
      setDisplayInfo('instructor');
    };
  
    const handleStartTimeClick = () => {
      setDisplayInfo('starttime');
    };

    const handleEndTimeClick = () => {
      setDisplayInfo('endtime');
    };
  
    const handleCodeClick = () => {
      setDisplayInfo('nbr');
    };
  
    const handleSelectChange = (event) => {
      setDisplayInfo(event.target.value);
    };

    const handleSearchInputChange = (event) => {
      setSearchValue(event.target.value);
    }

    const handleNbrChange = (event) => {
      setNbr(event.target.value);
    }
  
    const handleMinTimeChange = (event) => {
      setMinTime(event.target.value);
    }
  
    const handleMaxTimeChange = (event) => {
      setMaxTime(event.target.value);
    }

  useEffect(()=> {
    const nameList = filterCoursesByName();
    const timeList = filterCoursesByTime();
    const nbrList = filterCoursesByNbr();
    filterCourses(nameList, timeList, nbrList);
  }, [minTime, maxTime, searchValue, Nbr])

  // console.log(allCombs);
  let count = 0;
  const nestedListComponents = filteredList.map((innerList, outerIndex) => {
    count++;
    return (
    <div className="xl:w-1/4 lg:w-1/2 my-4 md:w-full px-8 py-6 border-l-2 border-gray-600">
        <h3 className="text-lg sm:text-xl font-medium title-font mb-2 text-gray-300">Schedule Number: {count}</h3>  
        <div key={(outerIndex+count+1)*13} className="leading-relaxed text-base mb-4">
        {innerList.map((dict, innerIndex) => (
            <div key={(innerIndex+count)*23}>
                <div >
                    {displayInfo}: {dict[displayInfo]}
                </div>
            </div>
            )
        )}
        </div>
        <button className="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg" onClick={()=>{navigate('/viewTimetable', {state:{innerList}})}}>
            View Timetable
        </button>
    </div>
    )});

  return (
    <div className="container px-5 py-14 mx-auto bg-gray-900">
      <label>
        <div className='mb-2 text-base text-gray-200'>
        Click Below to change the information being displayed  
        </div> 
      
        <select value={displayInfo} onChange={handleSelectChange} 
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
          <option value="instructor" onClick={handleTeacherClick}>Instructor</option>
          <option value="starttime" onClick={handleStartTimeClick}>Start Time</option>
          <option value="endtime" onClick={handleEndTimeClick}>End Time</option>
          <option value="nbr" onClick={handleCodeClick}>Code</option>
        </select>
      </label>
        <div className='flex flex-row justify-evenly my-2'>
          <input type="text" value={searchValue} onChange={handleSearchInputChange} placeholder='Instructor Name' className="max-w-md w-full bg-white-200 bg-opacity-40 rounded border border-gray-700 focus:border-blue-500 focus:bg-white-200 focus:ring-2 focus:ring-blue-900 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
          <input type="text" value={Nbr} onChange={handleNbrChange} placeholder='Nbr Code' className="max-w-md w-full bg-white-200 bg-opacity-40 rounded border border-gray-700 focus:border-blue-500 focus:bg-white-200 focus:ring-2 focus:ring-blue-900 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
        <div className='flex flex-row justify-evenly my-2'>
          <input type="time" value={minTime} onChange={handleMinTimeChange} className="max-w-md w-full bg-white-200 bg-opacity-40 rounded border border-gray-700 focus:border-blue-500 focus:bg-white-200 focus:ring-2 focus:ring-blue-900 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
          <input type="time" value={maxTime} onChange={handleMaxTimeChange} className="max-w-md w-full bg-white-200 bg-opacity-40 rounded border border-gray-700 focus:border-blue-500 focus:bg-white-200 focus:ring-2 focus:ring-blue-900 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
      
        <div className="flex flex-wrap text-gray-400">
            {nestedListComponents}
        </div>
    </div>
  )
}
