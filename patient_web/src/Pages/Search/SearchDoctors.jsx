import React from 'react'
import { useState,useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import DoctorCard from '../../components/singleDoctor/DoctorCard';


import axios from 'axios'

const SearchDoctors = () => {
    const [doctors, setDoctors] = useState()
    const query = "Prem"
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/patients/search/?query=${query}`)
        .then(function (response) {
            const data = response.data
            setDoctors(data)
            console.log(data)
        })
    },[])

  return (
    <div>SearchDoctors

<DoctorCard  data={doctors}/>
    </div>
   

  )
}

export default SearchDoctors