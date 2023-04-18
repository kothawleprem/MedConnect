import React from 'react'
import DoctorsBySpecialization from '../Search/DoctorsBySpecialization'

export default function Hero() {
  return (
    <div>

<section id="team" class="team-area pt-40 pb-100 mt-10">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-6">
              <div class="section-title text-center pb-25">
                <h3 class="title mb-15">
                Instantly connect with trusted healthcare professionals.
                </h3>
                <p>
                Doctor consultations made convenient and accessible, just a click away.
                </p>
             
                <DoctorsBySpecialization/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
              </div>
            </div>
          </div>
         

        </div>
      </section>

    </div>
  )
}
