import React from 'react'
import SpecialCard from './SpecialCard'
import { Col, Row } from 'react-bootstrap'
import Specialists from '../LandingPage/Specialists'

export default function Specialization() {
  return (
    <>


<section id="team" class="team-area pt-40 pb-50 mt-40">
        <div class="container">
        <div class=" pb-25">
            <h4> Select specialists</h4>
                <p class="title mb-15">
                Consult a doctor online for any health issue.
             </p>
            
           <Specialists/> 

             



               
              </div>

        </div>
      </section>

    </>
  )
}
