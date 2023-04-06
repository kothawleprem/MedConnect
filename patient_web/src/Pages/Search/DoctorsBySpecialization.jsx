import React from 'react'
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import axios from 'axios';

const DoctorsBySpecialization = () => {
    const [doctors, setDoctors] = useState();
    const specialization = "Diabetology";
    useEffect(() => {
      axios
        .get(
          `http://127.0.0.1:8000/api/patients/by_specialization?specialization=${specialization}`
        )
        .then(function (response) {
          const data = response.data;
          setDoctors(data);
          console.log(data);
        });
    },[]);
  return (
    <div>DoctorsBySpecialization</div>
  )
}

export default DoctorsBySpecialization