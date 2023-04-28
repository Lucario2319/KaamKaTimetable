import React from 'react';
import {useLocation} from 'react-router-dom';

export default function ViewTimetable() {
    const timetable = useLocation().state.innerList;
    // declaring these constants in case I feel like changing the display later
    const partition_min = 5;
    const start_hour = 8;
    const num_hours = 11;
    // 8am to 7pm is 11 hours.
    // to add leading zeros, use the below code for reference
    // const paddedNumber = number.toString().padStart(length, "0");
    const total_rows = Math.ceil((num_hours * 60) / partition_min) + 1;
    const daylist = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const dayDict = {'Monday':0, 'Tuesday':1, 'Wednesday':2, 'Thursday':3, 'Friday':4};
    const colorlist = ['palegoldenrod', 'ivory', 'mistyrose', 'lightcyan', 'lavenderblush',   'lightsalmon', 'cornsilk', 'aquamarine', 'bisque', 'lightgreen', 'lightpink', 'rosybrown', 'salmon', 'lightskyblue'];
    const len = colorlist.length;
    let colorIndex = 0;

    const timelist = [];
    for (let i = 0; i < total_rows-1; i+=6) {
      timelist.push(i);
    }

    const calculateRows = (start, end) => {
        let hours = end.slice(0, 2) - start.slice(0, 2)
        let mins = end.slice(3, 5) - start.slice(3, 5)
        let totalTime = (hours * 60) + mins
        let rows = Math.ceil(totalTime / partition_min)
        return rows
    }
    
    const calculateStartRow = (start) => {
        let hours = start.slice(0, 2) - start_hour
        let mins = start.slice(3, 5) - partition_min
        let totalTime = (hours * 60) + mins
        let row = Math.ceil(totalTime / partition_min) + 2
        return row
    }

    const sectionList = []
    timetable.forEach(section => {
      let startRow = calculateStartRow(section.starttime);
      let rows = calculateRows(section.starttime, section.endtime);
      section['rows'] = rows;
      section['startRow'] = startRow;
      section['color'] = colorlist[colorIndex]
      colorIndex = (colorIndex + 1) % len
      section.days.forEach(day => {
        let newSection = {...section} ;
        newSection['startCol'] = dayDict[day] + 2;
        sectionList.push(newSection);
      });
      
    });
    
    // dict for keeping each half hour slot
    let hourlist = [];
    let hour = start_hour;
    let mint = 0;
    for (let i = 0; i < (2*num_hours)+1; i++) {
      let txt = hour.toString().padStart(2, '0');
      txt += ':' + mint.toString().padStart(2, '0');
      hourlist.push(txt);
      mint += 30;
      if (mint % 60 === 0) {
        hour += 1;
        mint = 0
      }
    }
  
  return (
    <div className='sm:text-xs md:text-base'>
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(6, 1fr)',
      gridTemplateRows: `repeat(${total_rows}, 1fr)`,
      height:'200vh', width:'96vw', margin:"2px 5px"}}>
      {daylist.map((day,index) => (
        <div key={(index+1)*11} className={`col-start-${index+2} col-span-1 text-center border-2 border-l-0 border-black`}>
            {day}
        </div>
      ))}
      <div className='col-start-1 row-start-1 row-span-1 col-span-1 border-2 border-black w-30 text-center'>
        <p>Time \ Day</p>
      </div>
      {timelist.map((num,index) => (
        <>
        <div key={(index+1)*3} className={`row-start-${num+2} row-span-6 col-start-1 border-2 border-t-0 border-black w-30 flex items-center justify-center`}>
            <p>{hourlist[index] + ' - ' + hourlist[index+1]}</p>
        </div>
        </>
      ))}
      {sectionList.map((section, index) => (
        <div key={(index+1)*5} className={`sm:text-[8px] md:text-sm border-2 border-black w-30 text-center flex flex-col items-center justify-center`} style={{backgroundColor: section.color, gridRow:section.startRow + ' / span ' + section.rows, gridColumn: section.startCol + '/ span 1'}}>
          <p>Course: {section.name}</p>
          <p>Instructor: {section.instructor}</p>
          <p>Time: {section.starttime} - {section.endtime}</p>
          <p>NBR: {section.nbr}</p>
        </div>
      ))}
      

    </div>
    </div>
  )
}
