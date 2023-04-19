import React from 'react'
import { Link } from 'react-router-dom';

export default function Specialists() {
  return (
    <>
      <section id="team" class="team-area pt-40 pb-50 mt-50">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-6">
              <div class="section-title text-center pb-25">
                <h3 class="title mb-15">
                  Consult top doctors online for any health concern
                </h3>
                <p>
                  Private online consultations with verified doctors in all
                  specialists.
                </p>
              </div>
            </div>
          </div>
          <div class="row justify-content-center">
            <div class="col-lg-2 col-md-6 col-sm-8">
              <div class="single-temp text-center mt-30">
                <div class="team-image">
                  <img src="assets/c1.jpg" alt="Team" />
                </div>
                <div class="team-content mt-30">
                  <h4 class="title mb-10">
                    <Link style={{ textDecoration: "none" }} to="#">
                      General Physician
                    </Link>
                  </h4>
                  <span>Internal Medicine</span>
                  <ul class="social mt-15">
                    <Link
                      style={{ textDecoration: "none" }}
                      to="/bySpecialization?specialization=General Physician"
                    >
                      {" "}
                      <h6>Consult now</h6>{" "}
                    </Link>
                  </ul>
                </div>
              </div>
            </div>
            <div class="col-lg-2 col-md-6 col-sm-8">
              <div class="single-temp text-center mt-30">
                <div class="team-image">
                  <img src="assets/c2.jpg" alt="Team" />
                </div>
                <div class="team-content mt-10">
                  <h4 class="title mb-10">
                    <Link style={{ textDecoration: "none" }} to="#">
                      Psychological Counselling
                    </Link>
                  </h4>
                  <span>Emotional or mental helth concern</span>
                  <ul class="social mt-15">
                    <Link
                      style={{ textDecoration: "none" }}
                      to="/bySpecialization?specialization=Psychological Counselling"
                    >
                      {" "}
                      <h6>Consult now</h6>{" "}
                    </Link>
                  </ul>
                </div>
              </div>
            </div>
            <div class="col-lg-2 col-md-6 col-sm-8">
              <div class="single-temp text-center mt-30">
                <div class="team-image">
                  <img src="assets/c3.jpg" alt="Team" />
                </div>
                <div class="team-content mt-10">
                  <h4 class="title mb-10">
                    <Link style={{ textDecoration: "none" }} to="#">
                      Diabetology
                    </Link>
                  </h4>
                  <span>for treatment of all types of diabetes</span>
                  <ul class="social mt-15">
                    <Link
                      style={{ textDecoration: "none" }}
                      to="/bySpecialization?specialization=	Diabetology"
                    >
                      {" "}
                      <h6>Consult now</h6>{" "}
                    </Link>
                  </ul>
                </div>
              </div>
            </div>
            <div class="col-lg-2 col-md-6 col-sm-8">
              <div class="single-temp text-center mt-30">
                <div class="team-image">
                  <img src="assets/c4.jpg" alt="Team" />
                </div>
                <div class="team-content mt-30">
                  <h4 class="title mb-10">
                    <Link style={{ textDecoration: "none" }} to="#">
                      Pediatrics
                    </Link>
                  </h4>
                  <span>Specialists to treat childrend</span>
                  <ul class="social mt-15">
                    <Link
                      style={{ textDecoration: "none" }}
                      to="/bySpecialization?specialization=Pediatrics"
                    >
                      {" "}
                      <h6>Consult now</h6>{" "}
                    </Link>
                  </ul>
                </div>
              </div>
            </div>

            <div class="col-lg-2 col-md-6 col-sm-8">
              <div class="single-temp text-center mt-30">
                <div class="team-image">
                  <img src="assets/c5.jpg" alt="Team" />
                </div>
                <div class="team-content mt-10">
                  <h4 class="title mb-10">
                    <Link style={{ textDecoration: "none" }} to="#">
                      Dermatology
                    </Link>
                  </h4>
                  <span>Managing nutrition and dite regulation</span>
                  <ul class="social mt-15">
                    <Link
                      style={{ textDecoration: "none" }}
                      to="/bySpecialization?specialization=Dermatology"
                    >
                      {" "}
                      <h6>Consult now</h6>{" "}
                    </Link>
                  </ul>
                </div>
              </div>
            </div>
            <div class="col-lg-2 col-md-6 col-sm-8">
              <div class="single-temp text-center mt-30">
                <div class="team-image">
                  <img src="assets/c6.jpg" alt="Team" />
                </div>
                <div class="team-content mt-30 pr-20">
                  <h4 class="title mb-10">
                    <Link style={{ textDecoration: "none" }} to="#">
                      Gastrologist
                    </Link>
                  </h4>
                  <span>Managing digestive health</span>
                  <ul class="social mt-15">
                    <Link
                      style={{ textDecoration: "none" }}
                      to="/bySpecialization?specialization=Gastroenterology"
                    >
                      {" "}
                      <h6>Consult now</h6>{" "}
                    </Link>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
