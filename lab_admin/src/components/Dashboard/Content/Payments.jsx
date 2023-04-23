import React from 'react'

import VPA from '../Payments/VPA'
import DoctorReceivedPayments from '../Payments/DoctorReceivedPayments'

const Payments = () => {
  return (
    <>
      <VPA/>
      button to see payouts
      <DoctorReceivedPayments/>
    </>
  )
}

export default Payments