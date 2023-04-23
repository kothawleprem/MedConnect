


import { red, yellow } from '@mui/material/colors';
import './blog.css';


export default function Blog() {
    return(
        <>
           
    <section id="departments" class="departments">
      <div class="container" data-aos="fade-up">

        <div class="section-title">
        
          <h2>About MedConnect</h2>
          
          <p style={{textAlign: "justify"}}>
          Welcome to MedConnect, your one-stop destination for online healthcare services. Our platform offers a range of convenient and accessible healthcare solutions, including instant doctor consultations, lab testing, and medical advice.
          At MedConnect, we're committed to providing accessible and affordable healthcare to everyone, regardless of their location or circumstances
          </p>
        </div>

        <div class="row" data-aos="fade-up" data-aos-delay="100">
          
          <div >

            <div  >
              <div class="tab-pane active show" style={{marginLeft:"40px"}} id="tab-1">
                <h3>MedConnect Doctors </h3>
                <img src="https://lirp.cdn-website.com/69c0b277/dms3rep/multi/opt/Video+Consultation-1920w.png" style={{height:'250px',width:'450px',}} alt="" class="img-fluid"/>
                <p style={{textAlign: "justify" }}>We know that healthcare professionals are busy, which is why we've designed our platform to be user-friendly, efficient, and convenient. Our secure video consultations and online lab testing make it easy for you to provide high-quality care to your patients without the hassle of scheduling appointments or traveling to a physical location.
At MedConnect, we're committed to providing personalized care to every patient, and we know that starts with the doctors and healthcare professionals on our platform. We're dedicated to supporting your growth and development as a healthcare provider, and we believe that by working together, we can make a real difference in the lives of patients around the world.
Join our community today and start providing top-quality healthcare services to patients in need.</p>
              </div>
           
              
            </div>
            

          </div>
        </div>

      </div>
    </section>

        </>
    )
    }