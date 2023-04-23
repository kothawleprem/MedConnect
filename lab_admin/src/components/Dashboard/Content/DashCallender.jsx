import React from 'react'
import { useState } from 'react';
import './Calendar.css';


export default function DashCallender() {
    const [date, setDate] = useState(new Date());

  return (
    <div>

<div className='app'>
      <h1 className='text-center'> </h1>
      <div className='calendar-container'>
        {/* <Calendar
          onChange={setDate}
          value={date}
          selectRange={true}
        /> */}
      </div>
      {date.length > 0 ? (
        <p className='text-center'>
          <span className='bold'>Start:</span>{' '}
          {date[0].toDateString()}
          &nbsp;|&nbsp;
          <span className='bold'>End:</span> {date[1].toDateString()}
        </p>
      ) : (
        <p className='text-center'>
          <span className='bold'>Default selected date:</span>{' '}
          {date.toDateString()}
        </p>
      )}
    </div>
    </div>


  )
}
