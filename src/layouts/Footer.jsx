import React, { useState } from 'react';
import ButtonPrimary from '../site/components/controls/ButtonPrimary'
import { Facebook, Helpline, Instagram, Linkedin, EmgIcon, Youtube, Email } from '../site/assets/images/icons'
import AppointmentModal from '../site/components/AppointmentModal';
import Link from 'next/link';

export default function Footer() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalType, setModalType] = useState('');

  const handleModalOpen = (title) => {
    setModalTitle(title);
    setIsModalOpen(true);
  };
  const handleModalClose = () => setIsModalOpen(false);
  return (
    <footer className="footer" >
      <div className="footer-inner">
        <div className="row common-gutter">
          <div className="accordion d-md-none" id="footerAccordion">
            {/* Specialties Section */}
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingSpecialties">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseSpecialties"
                  aria-expanded="true"
                  aria-controls="collapseSpecialties"
                >
                  Specialties
                </button>
              </h2>
              <div
                id="collapseSpecialties"
                className="accordion-collapse collapse show"
                aria-labelledby="headingSpecialties"
                data-bs-parent="#footerAccordion"
              >
                <div className="accordion-body">
                  <ul className="footer-list">
                    <li><Link href="/orthopedics">Orthopedics</Link></li>
                    <li><Link href="/joint-hip-and-knee-replacement">Joint Replacement</Link></li>
                    <li><Link href="/spine">Spine</Link></li>
                    <li><Link href="/general-surgery">General Surgery</Link></li>
                    <li><Link href="/internal-medicine">Internal Medicine</Link></li>
                    <li><Link href="/trauma-and-critical-care">Trauma & Critical Care</Link></li>
                    <li><Link href="/gastroenterology">Gastroenterology</Link></li>
                    <li><Link href="/neurology">Neurology</Link></li>
                    <li><Link href="/neurosurgery">Neuro Surgery</Link></li>
                    <li><Link href="/cardiology">Cardiology</Link></li>
                    <li><Link href="/cardiac-surgery">Cardiac Surgery</Link></li>
                    <li><Link href="/gynecology">Gynecology</Link></li>
                    <li><Link href="/urology">Urology</Link></li>
                    <li><Link href="/dietetics">Dietetics</Link></li>
                    <li><Link href="/physiotherapy">Physiotherapy</Link></li>
                    <li><Link href="/dental">Dental</Link></li>
                    <li><Link href="/ophthalmology">Ophthalmology</Link></li>
                    <li><Link href="/dermatology">Dermatology</Link></li>
                    {/* <li><a href="/cancer">Cancer</a></li> */}
                    {/* <li><a href="/cancer">Cancer</a></li>
                    <li><a href="javascript:void(0)">ENT</a></li> */}
                  </ul>
                </div>
              </div>
            </div>

            {/* Corporate Section */}
            {/* <div className="accordion-item">
    <h2 className="accordion-header" id="headingCorporate">
      <button
        className="accordion-button collapsed"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapseCorporate"
        aria-expanded="false"
        aria-controls="collapseCorporate"
      >
        Corporate
      </button>
    </h2>
    <div
      id="collapseCorporate"
      className="accordion-collapse collapse"
      aria-labelledby="headingCorporate"
      data-bs-parent="#footerAccordion"
    >
      <div className="accordion-body">
        <ul className="footer-list">
          <li><a href="#">Help Desk</a></li>
          <li><a href="#">About us</a></li>
          <li><a href="#">Blogs</a></li>
          <li><a href="#">Careers</a></li>
          <li><a href="#">Feedback</a></li>
          <li><a href="#">Contact Us</a></li>
          <li><a href="#">News & Events</a></li>
          <li><a href="#">Investor Relations</a></li>
          <li><a href="#">Policies & Forms</a></li>
          <li><a href="#">Biomedical Waste Report</a></li>
          <li><a href="#">Sitemap Specialties</a></li>
        </ul>
      </div>
    </div>
  </div> */}
            {/* Our Hospitals Section */}
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingHospitals">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseHospitals"
                  aria-expanded="false"
                  aria-controls="collapseHospitals"
                >
                  Our Location
                </button>
              </h2>
              <div
                id="collapseHospitals"
                className="accordion-collapse collapse"
                aria-labelledby="headingHospitals"
                data-bs-parent="#footerAccordion"
              >
                <div className="accordion-body">
                  <ul className="footer-list">
                    <li><Link href="/our-branch#sb-road-branch">S B Road, Pune</Link></li>
                    <li><Link href="/our-branch#nigdi-branch">Nigdi, Pune</Link></li>
                    <li><Link href="/our-branch#chinchwad-branch">Chinchwad, Pune</Link></li>
                    <li><Link href="/our-branch#swargate-branch">Swargate, Pune</Link></li>
                    {/* <li><a href="/our-branch#kolhapur-branch">Kolhapur</a></li> */}
                  </ul>
                </div>
              </div>
            </div>
            {/* For Patients Section */}
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingPatients">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapsePatients"
                  aria-expanded="false"
                  aria-controls="collapsePatients"
                >
                  Quick Links
                </button>
              </h2>
              <div
                id="collapsePatients"
                className="accordion-collapse collapse"
                aria-labelledby="headingPatients"
                data-bs-parent="#footerAccordion"
              >
                <div className="accordion-body">
                  <ul className="footer-list">
                    <li><Link href="/doctors">Find a Doctor</Link></li>
                    <li>
                      <a href="#" onClick={(e) => {
                        e.preventDefault()
                        handleModalOpen("Book An Appointment");
                      }}>
                        Book Appointment
                      </a>
                    </li>

                    {/* <li><a href="#">Treatments</a></li> */}
                    <li><Link href="/blogs">Blogs</Link></li>
                    {/* <li><a href="#">Emergency 24×7</a></li> */}
                    <li><Link href="/videos">Videos</Link></li>
                    <li><Link href="/careers">Careers</Link></li>
                    {/* <li><a href="#">Technology</a></li> */}
                    <li><Link href="/testimonials">Patient Testimonials</Link></li>
                    <li><Link href="/academics">Academics</Link></li>
                    <li><Link href="/privacy-policy">Privacy Policy</Link></li>
                    <li><Link href="/medical-disclaimer">Medical Disclaimer</Link></li>
                    {/* <li><a href="#">CPR</a></li> */}
                  </ul>
                </div>
              </div>
            </div>


          </div>
          <div className="col-lg-4 col-sm-8 d-md-none order-2">
            <div className="footer-social-icons mb-md-0 mb-3">
              <Link href="https://www.instagram.com/lokmanya_hospital/" target="_blank" rel="noopener noreferrer"><img src={Instagram.src} alt="Instagram" /></Link>
              {/* <a href="https://twitter.com/lmhospitals" target="_blank" rel="noopener noreferrer"><img src={XIcon} alt="XIcon" /></a> */}
              <Link href="https://www.linkedin.com/company/lokmanyahospitals/" target="_blank" rel="noopener noreferrer"><img src={Linkedin.src} alt="Linkedin" /></Link>
              <Link href="https://www.facebook.com/lokmanyahospitals" target="_blank" rel="noopener noreferrer"><img src={Facebook.src} alt="Facebook" /></Link>
              <Link href="https://www.youtube.com/@LokmanyaHospitalsPune/" target="_blank" rel="noopener noreferrer"><img src={Youtube.src} alt="Youtube" /></Link>
            </div>

            <h4 className="footer-title mt-2">Subscribe Our Newsletter</h4>
            <form className="footer-form">
              <input type="email" placeholder="Enter your email." className="footer-input" />
              <ButtonPrimary type="submit">Submit</ButtonPrimary>
            </form>
            <div className="footer-contact-info">
              <div className='contact-group d-none'>
                <img src={EmgIcon.src} alt="emergency" />
                <div><p className='text-mute'>EMERGENCY </p> <Link href="tel:1066">1066</Link> </div>
              </div>
              <div className='contact-group'>
                <img src={Helpline.src} alt="helpline" />
                <div><p className='text-mute'>HELPLINE</p> <Link href="tel:9307076767">93 0707 6767</Link></div>
              </div>
              <div className='contact-group'>
                <img src={Email.src} alt="email" />
                <div><p className='text-mute'>EMAIL</p> <Link href="mailto:care@lokmanyahospitals.com">care@lokmanyahospitals.com</Link></div>
              </div>
            </div>
          </div>

          <div className="mobileFooterHide col-lg-4 col-sm-8">
            <h4 className="footer-title">Specialties</h4>
            <div className="row row-cols-2">
              <div className='col'>
                <ul className="footer-list">
                  <li><Link href="/orthopedics">Orthopedics</Link></li>
                  <li><Link href="/joint-hip-and-knee-replacement">Joint Replacement</Link></li>
                  <li><Link href="/spine">Spine</Link></li>
                  <li><Link href="/general-surgery">General Surgery</Link></li>
                  <li><Link href="/internal-medicine">Internal Medicine</Link></li>
                  <li><Link href="/trauma-and-critical-care">Trauma & Critical Care</Link></li>
                  <li><Link href="/gastroenterology">Gastroenterology</Link></li>
                  <li><Link href="/neurology">Neurology</Link></li>
                  <li><Link href="/neurosurgery">Neuro Surgery</Link></li>
                  <li><Link href="/cardiology">Cardiology</Link></li>
                </ul>
              </div>
              <div className='col'>
                <ul className="footer-list">
                  <li><Link href="/cardiac-surgery">Cardiac Surgery</Link></li>
                  <li><Link href="/gynecology">Gynecology</Link></li>
                  <li><Link href="/urology">Urology</Link></li>
                  <li><Link href="/dietetics">Dietetics</Link></li>
                  <li><Link href="/physiotherapy">Physiotherapy</Link></li>
                  <li><Link href="/dental">Dental</Link></li>
                  <li><Link href="/ophthalmology">Ophthalmology</Link></li>
                  <li><Link href="/dermatology">Dermatology</Link></li>
                  {/* <li><a href="/cancer">Cancer</a></li> */}
                  {/* <li><a href="javascript:void(0)">ENT</a></li> */}
                </ul>
              </div>
              {/* <ul className='footer-list'>            
                <li><a href="#">Obstetrics & Gynecology</a></li>
                <li><a href="#">IVF</a></li>
                <li><a href="#">Paediatrics</a></li>
                <li><a href="#">Endocrinology</a></li>
                <li><a href="#">Kidney Transplant</a></li>
                <li><a href="#">Spine Surgery</a></li>
                <li><a href="#"> Urology</a></li>
                <li><a href="#"> Orthopedic</a></li>
                <li><a href="#">Gastroenterology</a></li>
                <li><a href="#">Liver Transplant</a></li>
            </ul> */}
            </div>
          </div>
          <div className="mobileFooterHide col-lg-2 col-sm-4 col-6">
            <h4 className="footer-title">Our Location</h4>
            <ul className="footer-list">
              {/* <li><a href="#">Help Desk</a></li>
              <li><a href="#">About us</a></li>
              <li><a href="#">Blogs</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Feedback</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">News & Events</a></li>
              <li><a href="#">Investor Relations</a></li>
              <li><a href="#">Policies & Forms</a></li>
              <li><a href="#">Biomedical Waste Report</a></li>
              <li><a href="#">Sitemap Specialties</a></li> */}
              <li><Link href="/our-branch#sb-road-branch">S B Road, Pune</Link></li>
              <li><Link href="/our-branch#nigdi-branch">Nigdi, Pune</Link></li>
              <li><Link href="our-branch#chinchwad-branch">Chinchwad, Pune</Link></li>
              <li><Link href="/our-branch#swargate-branch">Swargate, Pune</Link></li>
              {/* <li><a href="/our-branch#kolhapur-branch">Kolhapur</a></li> */}
            </ul>
          </div>
          <div className="mobileFooterHide col-lg-2 col-sm-4 col-6">
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-list">
              <li><Link href="/doctors">Find a Doctor</Link></li>
              <li>
                <a href="#" onClick={(e) => {
                  e.preventDefault();
                  handleModalOpen("Book An Appointment");
                }} className="text-blue-600 hover:underline cursor-pointer">
                  Book Appointment
                </a>
              </li>

              {/* <li><a href="#">Treatments</a></li> */}
              <li><Link href="/blogs">Blogs</Link></li>
              <li><Link href="/videos">Videos</Link></li>
              <li><Link href="/careers">Careers</Link></li>
              {/* <li><a href="#">Emergency 24×7</a></li> */}
              {/* <li><a href="#">Technology</a></li> */}
              <li><Link href="/testimonials">Patient Testimonials</Link></li>
              <li><Link href="/academics">Academics</Link></li>
              <li><Link href="/privacy-policy">Privacy Policy</Link></li>
              <li><Link href="/medical-disclaimer">Medical Disclaimer</Link></li>
              {/* <li><a href="#">CPR</a></li> */}
            </ul>
            {/* <h4 className="footer-title">Our Hospitals</h4>
            <ul className="footer-list">
              <li><a href="#">Lokmanya, SB Road</a></li>
              <li><a href="#">Lokmanya, Nigdi</a></li>
            </ul> */}
          </div>
          <div className="mobileFooterHide col-lg-4 col-sm-8">
            <h4 className="footer-title">Subscribe Our Newsletter</h4>
            <form className="footer-form">
              <input type="email" placeholder="Enter your email." className="footer-input" />
              <ButtonPrimary type="submit">Submit</ButtonPrimary>
            </form>
            <div className="footer-contact-info">
              <div className='contact-group d-none'>
                <img src={EmgIcon.src} alt="emergency" />
                <div><p className='text-mute'>EMERGENCY </p> <Link href="tel:1066">1066</Link> </div>
              </div>
              <div className='contact-group'>
                <img src={Helpline.src} alt="helpline" />
                <div><p className='text-mute'>HELPLINE</p> <Link href="tel:9307076767">93 0707 6767</Link></div>
              </div>
              <div className='contact-group'>
                <img src={Email.src} alt="email" />
                <div><p className='text-mute'>EMAIL</p> <Link href="mailto:Care@lokmanyahospitals.com">Care@lokmanyahospitals.com</Link></div>
              </div>
            </div>
            <div className="footer-social-icons mb-md-0 mb-3">
              <Link href="https://www.instagram.com/lokmanya_hospital/" target="_blank" rel="noopener noreferrer"><img src={Instagram.src} alt="Instagram" /></Link>
              {/* <a href="https://twitter.com/lmhospitals" target="_blank" rel="noopener noreferrer"><img src={XIcon} alt="XIcon" /></a> */}
              <Link href="https://www.linkedin.com/company/lokmanyahospitals/" target="_blank" rel="noopener noreferrer"><img src={Linkedin.src} alt="Linkedin" /></Link>
              <Link href="https://www.facebook.com/lokmanyahospitals" target="_blank" rel="noopener noreferrer"><img src={Facebook.src} alt="Facebook" /></Link>
              <Link href="https://www.youtube.com/@LokmanyaHospitalsPune/" target="_blank" rel="noopener noreferrer"><img src={Youtube.src} alt="Youtube" /></Link>
            </div>
          </div>
          <div className='col-md-4 col-12'>
            <h4 className="footer-title">Registered Address</h4>
            <p className='mb-0'>
              Lokmanya Hospitals Pvt. Ltd. <br />
              3rd Floor, 759/51, <br />
              Deccan Pride, F.C. Road, <br />
              Deccan Gymkhana, <br />
              Pune - 411004, Maharashtra, India. <br />
              CIN NO : U85190PN2009PTC134052
            </p>
          </div>
        </div>
        <hr className="footer-divider" />
        <div className="footer-bottom">
          <p className="copy-right">
            Copyright 2025, All Rights Reserved with Lokmanya Hospitals, Powered by <a href="https://www.hatsoffdigital.com/" target="_blank" rel="noopener noreferrer">Hats-Off</a>
          </p>
          {/* <div>
            <a href="#">Privacy Policy</a> |
            <a href="#"> Medical Disclaimer</a>
          </div> */}
        </div>
      </div>
      {/* Appointment Modal */}

      <AppointmentModal title={modalTitle} isModalOpen={isModalOpen}  formtype={modalType}  handleModalClose={handleModalClose} />
    </footer>
  );
}
