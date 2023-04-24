import React from 'react'

import VPA from '../Payments/VPA'
import DoctorReceivedPayments from '../Payments/DoctorReceivedPayments'

const Payments = () => {
  return (
    <>
      <VPA/>
      <DoctorReceivedPayments/>
    </>
  )
}

export default Payments