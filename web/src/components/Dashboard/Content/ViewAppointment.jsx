import React from 'react'
import { Link, useLocation } from 'react-router-dom';

export default function ViewAppointment() {
  const {state} = useLocation();
  const { slot_id } = state;
  return (
    
    <div>
       <Link to="/dashboard">back to dashboard </Link>
      ViewAppointment{state.slot_id}</div>

  )
}
