import './faq.css';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
export default function Faq() {
    return (
        <>

            <section id="faq" class="faq section-bg">
                <div class="container" data-aos="fade-up">

                    <div class="section-title">
                        <h2>Frequently Asked Questioins</h2>
                        <p>
                        We're always there for you! We will be happy to assist you.
                        </p>
                    </div>

                    <ul class="faq-list">

                        <li>
                            <div data-bs-toggle="collapse" class="collapsed question" href="#faq1">What is Secured Online Healthcare System? <i class="icon-show"><KeyboardArrowDownOutlinedIcon></KeyboardArrowDownOutlinedIcon></i><i className='icon-close'><KeyboardArrowUpOutlinedIcon></KeyboardArrowUpOutlinedIcon></i></div>
                            <div id="faq1" class="collapse" data-bs-parent=".faq-list">
                                <p>
                                    The system will feature activities such as Online doctor consultations, lab appointments scheduling, and others, while safeguarding the prescription and lab reports from potentially being altered and making the authentication of the documents easier.
                                </p>
                            </div>
                        </li>

                        <li>
                            <div data-bs-toggle="collapse" href="#faq2" class="collapsed question">What is the cost of setting up my online clinic? <i class="icon-show"><KeyboardArrowDownOutlinedIcon></KeyboardArrowDownOutlinedIcon></i><i className='icon-close'><KeyboardArrowUpOutlinedIcon></KeyboardArrowUpOutlinedIcon></i></div>
                            <div id="faq2" class="collapse" data-bs-parent=".faq-list">
                                <p>
                                    Setting up your digital clinic on Secured Online Healthcare System system comes with no cost attached for 3 years. You get a free listing to connect to patients across India.
                                </p>
                            </div>
                        </li>

                        <li>
                            <div data-bs-toggle="collapse" href="#faq3" class="collapsed question">How can Secured Online Healthcare System for doctors help market doctors/ promote my online clinic? <i class="icon-show"><KeyboardArrowDownOutlinedIcon></KeyboardArrowDownOutlinedIcon></i><i className='icon-close'><KeyboardArrowUpOutlinedIcon></KeyboardArrowUpOutlinedIcon></i></div>
                            <div id="faq3" class="collapse" data-bs-parent=".faq-list">
                                <p>
                                Secured Online Healthcare System for doctors helps in marketing and promoting you in various ways. It also lets you share health tips and blogs with patients on your doctor health feed, among other things
                                </p>
                            </div>
                        </li>

                        <li>
                            <div data-bs-toggle="collapse" href="#faq4" class="collapsed question">What are the benefits I'll get? <i class="icon-show"><KeyboardArrowDownOutlinedIcon></KeyboardArrowDownOutlinedIcon></i><i className='icon-close'><KeyboardArrowUpOutlinedIcon></KeyboardArrowUpOutlinedIcon></i></div>
                            <div id="faq4" class="collapse" data-bs-parent=".faq-list">
                                <p>
                                The benefits of becoming a part of Secured Online Healthcare System are endless. You get to create your own digital clinic and expand your reach by giving online medical consultations. Our intelligent workflows allow smart scheduling and secure digital databases. We also provide a new & improved way of prescribing medicines that gives you automated and personalized recommendations based on the diagnosis. Remote patient consultations help you earn more and increase patient engagement via video or in-clinic consultation.
                                </p>
                            </div>
                        </li>

                        <li>
                            <div data-bs-toggle="collapse" href="#faq5" class="collapsed question">How do I register? <i class="icon-show"><KeyboardArrowDownOutlinedIcon></KeyboardArrowDownOutlinedIcon></i><i className='icon-close'><KeyboardArrowUpOutlinedIcon></KeyboardArrowUpOutlinedIcon></i></div>
                            <div id="faq5" class="collapse" data-bs-parent=".faq-list">
                                <p>
                                    Registering to get listed on Secured Online Healthcare System is fairly easy. Tap on "Login" on the top of our home page, to start your registration. Enter your mobile no, add in your personal and practice details, upload documents, get verified and start booking appointments!
                                </p>
                            </div>
                        </li>

                        <li>
                            <div data-bs-toggle="collapse" href="#faq6" class="collapsed question">What kind of doctors are on your platform? <i class="icon-show"><KeyboardArrowDownOutlinedIcon></KeyboardArrowDownOutlinedIcon></i><i className='icon-close'><KeyboardArrowUpOutlinedIcon></KeyboardArrowUpOutlinedIcon></i></div>
                            <div id="faq6" class="collapse" data-bs-parent=".faq-list">
                                <p>
                                    Secured Online Healthcare System prides in having doctors of all specialties under its umbrella. From gynecologists to pediatricians to dermatologists to dentists, etc. This is the best online consultation and best clinic practice management app for doctors in India.
                                </p>
                            </div>
                        </li>

                    </ul>

                </div>
            </section>

        </>
    )
}