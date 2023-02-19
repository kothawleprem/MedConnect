import React from 'react'
import './book.css'
export default function Book() {
  return (
      <div>
        <br></br><br></br>
          <section id="appointment" class="appointment section-bg">
              <div class="container" data-aos="fade-up">

                  <div class="section-title">
                      <h2>Make an Appointment</h2>
                      <p>Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat sit in iste officiis commodi quidem hic quas.</p>
                  </div>

                  <form action="forms/appointment.php" method="post" role="form" class="php-email-form" data-aos="fade-up" data-aos-delay="100">
                      <div class="row">
                          <div class="col-md-4 form-group">
                              <input type="text" name="name" class="form-control" id="name" placeholder="Your Name" required />
                          </div>
                          <div class="col-md-4 form-group mt-3 mt-md-0">
                              <input type="email" class="form-control" name="email" id="email" placeholder="Your Email" required />
                          </div>
                          <div class="col-md-4 form-group mt-3 mt-md-0">
                              <input type="tel" class="form-control" name="phone" id="phone" placeholder="Your Phone" required />
                          </div>
                      </div>
                      <div class="row">
                          <div class="col-md-4 form-group mt-3">
                              <select name="department" id="department" class="form-select">
                                  <option value="">Select Date</option>
                                  <option value="Date 1">13-02-2023</option>
                                  <option value="Date 2">14-02-2023</option>
                                  <option value="Date 3">15-02-2023</option>
                                  <option value="Date 4">16-02-2023</option>
                                  <option value="Date 5">17-02-2023</option>
                                  <option value="Date 6">18-02-2023</option>
                              </select>
                          </div>
                          <div class="col-md-4 form-group mt-3">
                              <select name="department" id="department" class="form-select">
                                  <option value="">Select Specialities</option>
                                  <option value="Department 1">Gynaecologist</option>
                                  <option value="Department 2">General physician</option>
                                  <option value="Department 3">Dermatology</option>
                                  <option value="Department 4">Psychiatrist</option>
                                  <option value="Department 5">Pediatrician</option>
                              </select>
                          </div>
                          <div class="col-md-4 form-group mt-3">
                              <select name="doctor" id="doctor" class="form-select">
                                  <option value="">Select Doctor</option>
                                  <option value="Doctor 1">Dr. Lavesh Jain</option>
                                  <option value="Doctor 2">Dr. Prem Kothawle</option>
                                  <option value="Doctor 3">Dr. Shubham Saroj</option>
                                  <option value="Doctor 4">Dr. Ganesh Shinde</option>
                              </select>
                          </div>
                      </div>

                      <div class="form-group mt-3">
                          <textarea class="form-control" name="message" rows="5" placeholder="Message (Optional)"></textarea>
                      </div>
                      <div class="my-3">
                          <div class="loading">Loading</div>
                          <div class="error-message"></div>
                          <div class="sent-message">Your appointment request has been sent successfully. Thank you!</div>
                      </div>
                      <div class="text-center"><button type="submit">Make an Appointment</button></div>
                  </form>

              </div>
          </section>
      </div>
  )
}


