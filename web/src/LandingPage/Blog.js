


import { red, yellow } from '@mui/material/colors';
import './blog.css';


export default function Blog() {
    return(
        <>
           
    <section id="departments" class="departments">
      <div class="container" data-aos="fade-up">

        <div class="section-title">
          <h2>Blogs</h2>
          <p>
            Blogging is the great Internet equalizer. Anyone can opine, dish, complain, and philosophize free of charge, but the true test is whether your blog gets read. Many physicians have discovered that blogging is a great way to build community with others in healthcare, share their opinions and successes, and vent. 
          </p>
        </div>

        <div class="row" data-aos="fade-up" data-aos-delay="100">
          <div class="col-lg-4 mb-5 mb-lg-0">
            <ul class="nav nav-tabs flex-column">
              <li class="nav-item" >
                <a class="nav-link active" data-bs-toggle="tab" data-bs-target="#tab-1">
                  <h4>Calorie</h4>
                  <p>Calorie Restriction Has Benefits for Metabolism and Heart Health</p>
                </a>
              </li>
              <li class="nav-item mt-2">
                <a class="nav-link" data-bs-toggle="tab" data-bs-target="#tab-2">
                  <h4>Chronic Pain</h4>
                  <p>Could an Antidepressant Help Treat Chronic Pain?</p>
                </a>
              </li>
              <li class="nav-item mt-2">
                <a class="nav-link" data-bs-toggle="tab" data-bs-target="#tab-3">
                  <h4>Teeth and Gums</h4>
                  <p>Healthy Teeth and Gums Tied to Better Brain Health</p>
                </a>
              </li>
              <li class="nav-item mt-2">
                <a class="nav-link" data-bs-toggle="tab" data-bs-target="#tab-4">
                  <h4>Diabetic Eye Diesease</h4>
                  <p>Early Treatment of Diabetic Eye Disease May Not Prevent Vision Loss</p>
                </a>
              </li>
            </ul>
          </div>
          <div class="col-lg-8">
            <div class="tab-content">
              <div class="tab-pane active show" id="tab-1">
                <h3>Calorie</h3>
                <p class="fst-italic">Calorie Restriction Has Benefits for Metabolism and Heart Health</p>
                <img src="assets/b1.jpg" alt="" class="img-fluid"/>
                <p>One investigation found that calorie restriction slowed aging-related changes in physiology related to the liver, kidneys, metabolism, blood vessels, and the immune system. Another study showed that calorie restriction reduced risk factors for heart disease and type 2 diabetes and improved cardiovascular and metabolic health.</p>
              </div>
              <div class="tab-pane" id="tab-2">
                <h3>Chronic Pain</h3>
                <p class="fst-italic">Could an Antidepressant Help Treat Chronic Pain?</p>
                <img src="assets/b2.jpg" alt="" class="img-fluid"/>
                <p>Doctors sometimes prescribe antidepressants to treat chronic pain when other, more common pain relievers aren’t working. But new research suggests not all types of antidepressants have the desired pain-reducing effect. Scientists found not one instance where they could say with “high certainty” that a particular kind of antidepressant helped relieve chronic pain for a particular condition. There were only four instances where scientists could conclude with “moderate certainty” that a particular type of antidepressant might relieve a given type of chronic pain.</p>
              </div>
              <div class="tab-pane" id="tab-3">
                <h3>Teeth and Gums</h3>
                <p class="fst-italic">Healthy Teeth and Gums Tied to Better Brain Health</p>
                <img src="assets/b3.jpg" alt="" class="img-fluid"/>
                <p>People who are genetically predisposed to cavities and other dental issues may be more likely to develop structural changes in the brain that are associated with cognitive decline, preliminary results from a new study suggest. Previous research has linked oral health issues like gum disease, missing teeth, poor brushing habits, and plaque buildup to an increased risk of stroke and risk factors for heart disease like high blood pressure. People who were genetically prone to cavities, missing teeth, or needing dentures had a larger amount of white matter hyperintensities and structural damage visible on their MRI images, according to preliminary study findings presented at the American Stroke Association’s International Stroke Conference 2023 in Dallas.</p>
              </div>
              <div class="tab-pane" id="tab-4">
                <h3>Diabetic Eye Diesease</h3>
                <p class="fst-italic">Early Treatment of Diabetic Eye Disease May Not Prevent Vision Loss</p>
                <img src="assets/b4.jpg" alt="" class="img-fluid"/>
                <p>Treating people in the early stages of diabetes-related eye disease may help slow the progression of the condition, but a new study also suggests that it can’t help prevent vision loss in the future. The study, published today in JAMA, included 328 adults with type 1 or type 2 diabetes who had early-stage eye disease, also known as nonproliferative diabetic retinopathy (NDPR), in at least one eye. Diabetic retinopathy develops when blood vessels in the light-sensitive retina weaken and leak fluid into surrounding tissue. As this condition progresses, two complications in the retina can lead to vision loss: so-called proliferative diabetic retinopathy (PDR) that involves the growth of new, abnormal blood vessels, and fluid buildup known as diabetic macular edema (DME). Doctors can treat these patients by injecting anti-vascular endothelial growth factor (anti-VEGF) drugs into their eyes to reduce vision loss, but research to date hasn’t offered a clear picture of the best time to start injections for ideal results. Eye doctors haven’t been able to say whether starting treatment sooner might prevent vision loss once patients do develop severe diabetic eye disease.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>

        </>
    )
    }