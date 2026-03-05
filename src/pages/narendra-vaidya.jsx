import React, { useState } from 'react';
import FaqSection from '@/site/components/FaqSection/FaqSection';
import MainSuccessStor from '@/site/components/MainSuccessStor';
import HospitalCounterSection from '@/site/components/HospitalCounterSection/HospitalCounterSection';
import { narendraCounterData } from '@/static-data';
import Counter from '@/site/components/Counter/Counter';
import Image from 'next/image';
import OverviewImg from "@/site/assets/images/counter-narendra.webp";
import NarendraSingle from "@/site/assets/images/narendra-single.webp";

// import NarendraFancy from "@/site/assets/images/narendra-fancy-bg.webp";
// import NarendraMultiple from "@/site/assets/images/narendra-multiple.webp";
import EnquiryMachine from "@/site/assets/images/enquiry-machine.webp";
// import Benefit1 from "@/site/assets/images/benefit-1.webp";
// import Benefit2 from "@/site/assets/images/benefit-2.webp";
// import Benefit3 from "@/site/assets/images/benefit-3.webp";
// import Benefit4 from "@/site/assets/images/benefit-4.webp";
// import Benefit5 from "@/site/assets/images/benefit-5.webp";
// import Benefit6 from "@/site/assets/images/benefit-6.webp";
// import Benefit7 from "@/site/assets/images/benefit-7.webp";
// import Benefit8 from "@/site/assets/images/benefit-8.webp";
import NarendraBenefitSvg from "@/site/assets/images/narendra-benefit-svg.svg";
import NarendraCut from "@/site/assets/images/narendra-cut-crop.webp";
import Polygon from "@/site/assets/images/Polygon.svg";
import { ButtonPrimary } from '@/site/components';
import BookCallSection from '@/site/components/BookCallnowSection/BookCallSection';
import AppointmentModal from '@/site/components/AppointmentModal';
import RotatingIcons from '@/site/components/RotatingSection/RevolvingIcons';
// import Knee1 from "@/site/assets/images/knee-1.svg";
// import Knee2 from "@/site/assets/images/knee-2.svg";
// import Knee3 from "@/site/assets/images/knee-3.svg";
// import Knee4 from "@/site/assets/images/knee-4.svg";
// import Knee1Img from "@/site/assets/images/knee-1.webp";
// import Knee2Img from "@/site/assets/images/knee-2.webp";
// import Knee3Img from "@/site/assets/images/knee-3.webp";
// import Knee4Img from "@/site/assets/images/knee-4.webp";
import { storeLeadInfo } from '@/ApiActions/CommonApi';
import { errorToast, successToast } from '@/utils/Toast';
import Head from 'next/head';

// FAQs
const faqs = [
    {
        question: "Who is the best robotic knee replacement surgeon in Pune?",
        answer: "Dr. Narendra Vaidya is widely regarded as the best robotic knee replacement surgeon in Pune, known for his expertise in advanced, minimally invasive techniques and precision-based care."
    },
    {
        question: "What is the cost of robotic knee surgery in Pune?",
        answer: "The cost varies based on the hospital, implant type, and case complexity, and is generally higher than traditional surgery."
    },
    {
        question: "What is the best robot for knee replacement surgery?",
        answer: "ROSA, MAKO, and NAVIO are considered top robotic systems for knee replacement, offering high precision and customized implant positioning."
    },
    {
        question: "What is the success rate of robotic knee replacement?",
        answer: "Robotic knee replacement surgeries have a success rate of over 95%, with reduced complications, better alignment, and faster recovery compared to conventional methods."
    },
    {
        question: "Which company's knee is best for replacement?",
        answer: "Top-rated knee implant brands include Zimmer Biomet, DePuy Synthes (Johnson & Johnson), and Stryker—all widely used in robotic procedures."
    },
    {
        question: "What is the highest-rated knee replacement?",
        answer: "Zimmer Biomet's NexGen and Persona, and DePuy’s Attune systems are among the highest-rated knee replacement options globally."
    },
    {
        question: "Which type of knee replacement is best?",
        answer: "The best type depends on the condition. Total knee replacement is ideal for advanced arthritis, while partial replacement suits localized joint damage. Robotic-assisted versions of both offer improved outcomes."
    },
    {
        question: "How do I find the best doctor for knee replacement?",
        answer: "Look for a surgeon with extensive experience, patient reviews, use of modern technology like robotics, and recognized outcomes, like Dr. Narendra Vaidya in Pune."
    },
    {
        question: "Which knee replacement is better, robotic or manual?",
        answer: "Robotic knee replacement is generally more precise, offers quicker recovery, and reduces the risk of implant misalignment compared to manual surgery."
    },
    {
        question: "What age is best for total knee replacement?",
        answer: "While most patients are between 55–75 years old, the decision is based on pain severity, mobility issues, and response to other treatments, not just age."
    }
];


const procedures = [
    {
        id: 1,
        title: 'Total Knee Replacement (TKR)',
        description: 'A surgical procedure where the entire knee joint is replaced with an artificial implant to relieve severe pain and restore full mobility. It is recommended for patients with advanced arthritis or irreversible joint damage. Dr. Vaidya is regarded as the best joint replacement surgeon in Pune for delivering excellent outcomes with this procedure.',
    },
    {
        id: 2,
        title: 'Partial Knee Replacement (UKR)',
        description: 'This minimally invasive surgery involves replacing only the damaged portion of the knee joint. It preserves healthy bone and soft tissue, ensuring quicker recovery and natural knee movement. It\'s ideal for patients with localized joint degeneration.',
    },
    {
        id: 3,
        title: 'Robotic-Assisted Knee Replacement',
        description: 'A precision-led surgery where robotic technology aids in accurate implant positioning and alignment. It reduces soft tissue trauma and leads to faster recovery. Dr. Vaidya is renowned for his expertise in robotic knee replacement, having performed thousands of successful procedures.',
    },
    {
        id: 4,
        title: 'Revision Knee Replacement',
        description: 'A complex procedure to replace or repair a failed or worn-out knee implant. It requires advanced planning and surgical skill, especially in cases with bone loss or infection. Dr. Vaidya has extensive experience handling these high-risk revision cases.',
    },
    {
        id: 5,
        title: 'Hip Replacement Surgery',
        description: 'This involves replacing a damaged hip joint with a prosthetic implant to relieve pain and improve movement. It is commonly performed for arthritis or hip fractures and restores long-term function and comfort.',
    },
    {
        id: 6,
        title: 'Minimally Invasive Joint Replacement',
        description: 'Uses smaller incisions and less disruption to muscles and tissues, resulting in reduced pain, faster recovery, and shorter hospital stays. It is suitable for both knee and hip replacement surgeries.',
    },
    {
        id: 7,
        title: 'Arthroscopic Knee Surgery',
        description: 'A keyhole procedure that uses a small camera to diagnose and treat issues like meniscus tears, cartilage injuries, or ligament damage. It is minimally invasive and offers quicker healing and minimal scarring.',
    },
    {
        id: 8,
        title: 'Osteotomy',
        description: 'A bone realignment surgery is done to correct deformities such as bowlegs or knock knees. It helps distribute weight evenly across the knee joint and can delay the need for total knee replacement.',
    },
    {
        id: 9,
        title: 'ACL/PCL Ligament Reconstruction',
        description: 'Involves replacing torn knee ligaments with grafts to restore stability and prevent long-term joint damage. It is often recommended for athletes or patients with traumatic injuries.',
    },
    {
        id: 10,
        title: 'Complex Joint Reconstruction',
        description: 'Advanced procedures that correct severe joint deformities, failed previous surgeries, or cases requiring custom implants. These surgeries demand high precision and are tailored to each patient’s anatomy.',
    },
    {
        id: 11,
        title: 'Spine Surgery (Minimally Invasive)',
        description: 'Performed through small incisions to treat spine conditions such as herniated discs or spinal instability. It minimizes tissue damage and speeds up post-surgical recovery. This further reflects why Dr. Vaidya is considered a top knee replacement surgeon in Pune with expertise across orthopedic domains.',
    },
];

const benefits = [
    {
        image: '/images/narendra-single/benefit-1.webp',
        title: "Extensive Surgical Experience",
        description:
            "With over three decades of hands-on orthopedic experience, Dr. Vaidya brings unmatched surgical precision and clinical judgment to every case. His track record of more than 40,000 successful joint replacements reflects his standing as one of the best joint replacement surgeons in Pune.",
    },
    {
        image: '/images/narendra-single/benefit-2.webp',
        title: "Pioneering Robotic-Assisted Knee Replacement",
        description:
            "Dr. Vaidya is among the first in India to adopt robotic-assisted technology in knee surgeries. This advanced technique enhances accuracy in implant positioning, reduces post-operative pain, and speeds up recovery, setting a new benchmark in care. His leadership in this field has earned him a strong reputation as the best knee replacement surgeon in Pune.",
    },
    {
        image: '/images/narendra-single/benefit-3.webp',
        title: "Personalized, Patient-First Approach",
        description:
            "Each patient is treated as a unique case and not just a diagnosis. From pre-surgical planning to recovery, Dr. Vaidya customizes every step based on individual anatomy, activity level, and lifestyle goals.",
    },
    {
        image: '/images/narendra-single/benefit-4.webp',
        title: "Minimally Invasive Techniques for Faster Recovery",
        description:
            "By using smaller incisions and tissue-sparing approaches, Dr. Vaidya ensures less pain, minimal scarring, and faster rehabilitation. Patients often resume normal activities much sooner than with traditional methods.",
    },
    {
        image: '/images/narendra-single/benefit-5.webp',
        title: "Successful Outcomes in Complex Cases",
        description:
            "Many patients with failed previous surgeries, severe deformities, or advanced arthritis turn to Dr. Vaidya when conventional approaches fall short. His ability to handle complex knee conditions with precision and confidence reflects his high surgical competence.",
    },
    {
        image: '/images/narendra-single/benefit-6.webp',
        title: "Comprehensive In-House Support System",
        description:
            "From diagnostic imaging and surgical planning to physiotherapy and long-term rehabilitation, all services are streamlined within Lokmanya Hospital’s integrated care model, overseen directly by Dr. Vaidya and his team.",
    },
    {
        image: '/images/narendra-single/benefit-7.webp',
        title: "Globally Trained, Locally Respected",
        description:
            "Having trained and practiced in centers of excellence across the USA, Sweden, and Singapore, Dr. Vaidya brings international-level expertise to patients in India. His global exposure, combined with deep local insight, places him among the most trusted names in Pune’s orthopedic community.",
    },
    {
        image: '/images/narendra-single/benefit-8.webp',
        title: "Commitment to Long-Term Mobility and Quality of Life",
        description:
            "Beyond the technical success of the surgery, Dr. Vaidya’s focus remains on improving the patient’s long-term mobility, confidence, and quality of life, a perspective that distinguishes him among the city’s leading specialists. This level of attention to detail is a hallmark of a top knee replacement surgeon in Pune.",
    },

];

const conditions = [
    {
        title: "Advanced Osteoarthritis",
        highlight:
            "Dr. Narendra Vaidya, known as one of the best knee replacement surgeons in Pune, offers robotic-assisted solutions for better long-term outcomes.",
        description:
            "When knee cartilage is severely worn down due to age-related degeneration, patients experience constant pain, stiffness, and difficulty in movement, even during rest. At this stage, non-surgical treatments often fail, and knee replacement becomes the most effective option.",
        icon: '/images/narendra-single/knee-1.svg',
        image: '/images/narendra-single/knee-1.webp'
    },
    {
        title: "Rheumatoid Arthritis",
        highlight:
            "When medications no longer control symptoms, knee replacement can restore joint function. Dr. Vaidya provides advanced care tailored to the severity of each case.",
        description:
            "In chronic rheumatoid arthritis, the immune system attacks the knee joint lining, leading to inflammation, deformity, and erosion of cartilage and bone.",
        icon: '/images/narendra-single/knee-2.svg',
        image: '/images/narendra-single/knee-2.webp'
    },
    {
        title: "Post-Traumatic Arthritis",
        highlight:
            "This condition develops after a serious knee injury, such as a fracture or ligament tear, and can cause long-term pain, swelling, and restricted movement.",
        description:
            "When structural damage progresses, joint replacement may be required to restore mobility. Patients often turn to Dr. Vaidya, recognized as one of the best joint replacement surgeons in Pune, for expert surgical care in such complex scenarios.",
        icon: '/images/narendra-single/knee-3.svg',
        image: '/images/narendra-single/knee-3.webp'
    },
    {
        title: "Severe Knee Deformities",
        highlight:
            "Dr. Vaidya's precision techniques and personalized treatment plans make him a trusted name among the best knee replacement surgeons in Pune.",
        description:
            "When alignment issues put uneven stress on the knee joint, they can accelerate wear and tear, leading to joint breakdown. In severe cases, deformity correction through knee replacement surgery may be necessary.Dr. Vaidya's precision techniques and personalized treatment plans make him a trusted name among the best knee replacement surgeons in Pune.",
        icon: '/images/narendra-single/knee-4.svg',
        image: '/images/narendra-single/knee-4.webp'
    },
];


// Form Logic Hook
const useAppointmentForm = () => {

    const [formData, setFormData] = useState({
        fullName: '',
        phoneNumber: '',
        doctor: 7,
        city: '',
        formtype: 'book_appointment',
        slug: 'narendra-vaidya'
    });

    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const validate = () => {
        const errs = {};
        const nameRegex = /^[a-zA-Z\s]+$/;
        const phoneRegex = /^[0-9]{10}$/;

        if (!nameRegex.test(formData.fullName)) {
            errs.fullName = 'Full Name should only contain letters and spaces.';
        }

        if (!phoneRegex.test(formData.phoneNumber)) {
            errs.phoneNumber = 'Phone number should be 10 digits.';
        }

        if (!formData.city.trim()) {
            errs.city = 'City is required.';
        }

        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            setSubmitted(true);
            const payload = {
                patientName: formData.fullName,
                mobileNumber: formData.phoneNumber,
                doctorId: 7,
                location: formData.city,
                formtype: 'book_appointment',
                slug: 'narendra-vaidya'
            };
            console.log("Form submitted:", payload);

            try {
                const response = await storeLeadInfo(payload, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                setSubmitted(false);

                if (response.status === 201) {
                    successToast("Appointment booked successfully!");
                    setSubmitted(false);
                    resetForm();
                }
            } catch (error) {
                console.error("Form submission error:", error);
                errorToast("Something went wrong. Please try again.");
            }

        }
    };

    const resetForm = () => {
        setFormData({
            fullName: '',
            phoneNumber: '',
            doctor: '', // if used
            city: '',
            formtype: 'book_appointment',
            slug: 'narendra-vaidya'
        });
        setErrors({});
    };

    return { formData, errors, handleChange, handleSubmit, submitted };
};

const NarendraVaidya = () => {
    const [visibleCount, setVisibleCount] = useState(5);
    const handlebookModalOpen = () => setIsbookModalOpen(true);
    const handlebookModalClose = () => setIsbookModalOpen(false);
    // const [isModalOpen, setIsModalOpen] = useState(false);
    const [isbookModalOpen, setIsbookModalOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalId, setModalId] = useState("");
    const [modalTitle, setModalTitle] = useState("");
    const handleModalOpen = (submitBtnClass, title) => {
        setIsModalOpen(true);
        setModalId(submitBtnClass);
        setModalTitle(title);
    };
    const handleModalClose = () => setIsModalOpen(false);
    const toggleView = () => {
        setVisibleCount(prev => (prev === 5 ? procedures.length : 5));
    };

    const [visibleCount2, setVisibleCount2] = useState(4);
    const toggleView2 = () => {
        setVisibleCount2((prev) => (prev === 4 ? benefits.length : 4));
    };

    const { formData, errors, handleChange, handleSubmit, submitted } = useAppointmentForm();

    return (
        <>
            <Head>
                <title>Best Knee Replacement Surgeon in Pune – Dr. Narendra Vaidya</title>
                <meta
                    name="description"
                    content="Consult Dr. Narendra Vaidya, the Best robotic & joint replacement surgeon in Pune. 150000+ successful surgeries. Book an appointment for advanced knee treatment."
                />
                <script type="application/ld+json">
                    {`
                    {
  "@context": "https://schema.org",
  "@type": "Physician",
  "name": "Dr. Narendra Vaidya",
  "image": "https://lokmanyahospitals.com/images//uploads/doctors/1752497107979-DrNarendraVaidya.webp",
  "medicalSpecialty": ["Orthopedic Joint Replacement Surgeon"],
  "description": "Dr. Narendra Vaidya is a highly experienced orthopedic doctor at Lokmanya Hospital with over 30 years of expertise in managing musculoskeletal conditions. Known for his patient-focused approach, Dr. Vaidya specializes in diagnosing and treating a wide range of orthopedic issues, including joint, bone, and soft tissue disorders. His proficiency in both surgical and non-surgical treatments makes him one of the best orthopedic doctors in Pune. With a commitment to providing comprehensive care, Dr. Vaidya ensures that each patient receives the appropriate treatment tailored to their individual needs.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Lokmanya Hospitals Pvt. Ltd., 3rd Floor, 759/51, Deccan Pride, F.C. Road, Deccan Gymkhana",
    "addressLocality": "Pune",
    "addressRegion": "Maharashtra",
    "postalCode": "411004",
    "addressCountry": "IN"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+91-9307076767",
    "contactType": "Appointment"
  },
  "hospitalAffiliation": {
    "@type": "Hospital",
    "name": "Lokmanya Hospital",
    "url": "https://lokmanyahospitals.com/",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Lokmanya Hospitals Pvt. Ltd., 3rd Floor, 759/51, Deccan Pride, F.C. Road, Deccan Gymkhana",
      "addressLocality": "Pune",
      "addressRegion": "Maharashtra",
      "postalCode": "411004",
      "addressCountry": "IN"
    }
  },
  "review": {
    "@type": "Review",
    "author": {
      "@type": "Person",
      "name": "Anonymous"
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": "4.9",
      "bestRating": "5"
    }
  },
  "acceptsInsurance": "Yes",
  "url": "https://lokmanyahospitals.com/doctors/"
}

                    `}
                </script>

            </Head>
            <section className="narendra-hero">
                <div className="side-space">
                    <div className="row align-items-center">
                        {/* Left: Text content */}
                        <div className="col-md-7 mb-4 mb-md-0 narendra-hero-text">
                            <h1 className='section-heading text-start'>
                                DR. NARENDRA VAIDYA<br />
                                BEST JOINT REPLACEMENT <br />
                                SURGEON IN PUNE
                            </h1>
                            <p className='narendra-hero-text__desc'>
                                Renowned for his expertise in advanced joint replacement procedures, delivering precision, care, and lasting mobility to patients.
                            </p>
                            <ButtonPrimary submitBtnClass="narendraBookButtonId" onClick={() => handleModalOpen("narendraBookButtonId", "Book An Appointment")}>
                                Book An Appointment
                            </ButtonPrimary>
                        </div>
                        {/* Right: Image */}
                        <div className="col-md-5 narendra-hero-img text-center">
                            <Image
                                src={NarendraSingle} // Move your image to the public folder and use '/doctor.jpg'
                                alt="Dr. Narendra Vaidya"
                                // width={350}
                                // height={350}
                                className="narendra-single"
                                style={{ maxHeight: "350px", width: "auto" }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className='side-space section-space'>
                <HospitalCounterSection data={narendraCounterData} />
            </section>

            <section className="overview side-space section-space pt-0">
                <div className="row align-items-center">
                    <div className="col-lg-5 col-md-6 pe-lg-4 pe-md-3 order-md-1 order-2">
                        <div className="overview-img-box">
                            {/* <div className="overview-counter counter1">
                                <div className="overview-counter1">
                                    <Counter
                                        targetValue="50"
                                        duration={3000}
                                        usePlusSign={true}
                                        className="counter-numb txt-blue"
                                    />
                                    <p className="mb-0 txt-blue">Years Of Experience</p>
                                </div>
                            </div> */}
                            <Image width={485} height={446} className="overview-img" src={OverviewImg.src} alt="OverView" />
                            <div className="overview-counter narendra-counter counter2">
                                <div className="overview-counter2">
                                    <Counter
                                        targetValue="30"
                                        duration={3000}
                                        usePlusSign={true}
                                        className="counter-numb txt-yellow"
                                    />
                                    <p className="mb-0 txt-yellow">Successful Surgeries</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-7 col-md-6 order-md-2 order-1 mb-md-0 mb-3">
                        <h2 className="text-start section-heading">Overview</h2>

                        <p>

                            Dr. Narendra Vaidya is a highly experienced orthopedic doctor at Lokmanya Hospital with over 30 years of expertise in managing musculoskeletal conditions. Known for his patient-focused approach, he specializes in diagnosing and treating a wide range of orthopedic issues, including joint, bone, and soft tissue disorders.
                        </p>
                        <p className='mb-0'>
                            Dr.Narendra Vaidya is one of the best joint replacement surgeons in Pune, with thousands of successful procedures to his record, including advanced robotic-assisted knee and hip replacements. His proficiency in both surgical and non-surgical treatments, combined with a commitment to customized healthcare solutions, ensures that every patient receives the most effective treatment for lasting relief and mobility.
                        </p>
                        {/* <p>
                            Lokmanya Hospitals is a leading multispecialty healthcare facility
                            in Pune, committed to providing world-class medical care with a
                            patient-centric approach. Renowned for its expertise in
                            orthopaedic treatments, Lokmanya also excels in a wide range of
                            specialties, making it a trusted name in healthcare.
                        </p>
                        <p>
                            With over 50 years of experience in healthcare , Lokmanya Hospitals
                            has pioneered numerous advancements. Our highly skilled team of
                            doctors and surgeons is recognized for clinical excellence and
                            innovation in treating complex multi-speciality conditions. As a
                            leader in the healthcare sector, Lokmanya Hospitals has
                            successfully treated over 1,50,000 patients from around the world,
                            earning a reputation for delivering exceptional outcomes and
                            transforming lives.
                        </p>
                        <p className="mb-0">
                            Lokmanya Hospitals offers a comprehensive range of multispecialty
                            services, including cardiology, neurology, gastroenterology,
                            urology, and internal medicine, among others. Our
                            multidisciplinary team collaborates to provide integrated care,
                            ensuring that patients receive accurate diagnosis and holistic
                            treatments tailored to their unique needs.
                        </p> */}
                    </div>
                </div>
            </section>

            <section className='section-space rotating-section'>
                <h2 className='section-heading mb-4'>Conditions Treated by Dr. Narendra Vaidya</h2>
                <RotatingIcons />
            </section>

            <section className="side-space narendra-procedures">
                <h2 className="section-heading mb-2">Procedures Performed By Dr. Narendra Vaidya</h2>

                <div className="">
                    {procedures.slice(0, visibleCount).map((item, index) => (
                        <div key={item.id} className="row py-3 border-bottom hover-row">
                            <div className="col-1 col-md-1 d-flex align-items-center justify-content-start td-div">
                                <p className='table-limited td-hover mb-0'>
                                    {String(index + 1).padStart(2, '0')}
                                </p>
                            </div>
                            <div className="col-11 col-md-4 d-flex align-items-center justify-content-start td-div">
                                <p className='table-limited td-hover mb-0'>
                                    {item.title}
                                </p>
                            </div>
                            <div className="col-12 col-md-7 mt-2 mt-md-0 td-div ">
                                <p className='table-desc td-hover mb-0'>
                                    {item.description}
                                </p>
                            </div>
                        </div>

                    ))}
                </div>

                <div className="text-center mt-3">
                    <button
                        className="section-heading fst-italic mb-0"
                        onClick={toggleView}
                        style={{ textDecoration: 'none' }}
                    >
                        {visibleCount === 5 ? 'Load More ⟳' : 'Show Less'}
                    </button>
                </div>
            </section>

            <section className="knee-cards section-space side-space">
                <h2 className='section-heading mb-4'>Conditions Where Knee Replacement Surgery May Be Needed</h2>
                <div className="row g-3">
                    {conditions.map((item, index) => (
                        <div
                            className={`col-sm-12 col-md-6 col-lg-3 knee-cards__col ${index !== conditions.length - 1 ? "knee-cards__border-right" : ""}`}
                            key={index}
                        >
                            <div className="knee-cards__icon-wrapper mb-3">
                                <Image src={item.icon} width={62} height={62} alt={item.title} />
                            </div>
                            <h4 className="section-heading text-start mb-2">{item.title}</h4>
                            <div className="knee-cards__highlight-wrapper mb-2">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    height={215}
                                    width={285}
                                    className="knee-cards__highlight-bg"
                                />
                                <div className="knee-cards__highlight-gradient"></div>
                                <div className="knee-cards__highlight-content text-white">
                                    {item.highlight}
                                </div>
                            </div>
                            <p className="knee-cards__desc mb-0">{item.description}</p>


                        </div>
                    ))}
                </div>
            </section>

            <section className="side-space">
                <div className="why-narendra-inner">
                    <div className='pb-4'>
                        <h2 class="section-heading text-white">What makes Dr. Vaidya the Best Joint Replacement Surgeon in Pune and India?</h2>
                    </div>
                    <div className='why-narendra-content'>
                        <p className='text-white mb-4'>Dr. Narendra Vaidya is known for his patient-first philosophy, clear communication, and deeply personalized approach to orthopedic care. With a strong foundation in evidence-based medicine and modern surgical techniques, he ensures that every treatment plan is designed around the patient’s unique needs and comfort. His ability to balance clinical precision with compassion makes him a trusted name for individuals seeking long-term relief from joint and bone conditions.
                        </p>
                        <p className='text-white mb-0'>

                            What distinguishes Dr. Vaidya is his holistic outlook. He doesn’t just treat symptoms, but focuses on restoring mobility, independence, and quality of life. Whether managing early-stage joint issues or guiding patients through complex surgeries, he brings consistency, clarity, and genuine care to every consultation. It’s this commitment that places him among the best joint replacement surgeons in Pune and a respected orthopedic specialist across India.
                        </p>
                    </div>
                </div>
            </section>

            <section className="narendra-achievements pb-0 section-space">
                {/* <Image src={NarendraFancy} alt="Dr. Narendra Vaidya Multiple Achievements" className="img-fluid fancy-bg-right" /> */}
                <div className="achievements-inner side-space">
                    <div className="row g-3">
                        <div className="col-12 col-lg-5">
                            <div className="achievements-img-box text-center">
                                <Image src='/images/narendra-single/n-a-multiple.webp' width={490} height={410} alt="Dr. Narendra Vaidya Achievements position-relative" className="img-fluid " />
                                {/* <div className="achievements-img-overlay">
                                </div> */}
                            </div>
                        </div>
                        <div className="col-12 col-lg-7">
                            <h2 className="section-heading text-start">His Achievements and Contributions</h2>
                            <p>Dr. Narendra Vaidya has made remarkable contributions to both orthopedic surgery and trauma care in India. He played a pivotal role in developing Rapid Rescue Units and the Mobile Trauma & Critical Care Unit (MTCCU), enhancing the country’s emergency response infrastructure. His leadership during the 2001 Anjaar earthquake, where he managed over 2,100 trauma cases and performed 82 surgeries in a temporary setup, earned him national recognition and reinforced his standing as one of the best joint replacement surgeons in Pune.
                            </p>
                            <p className='mb-0'>
                                In addition to his clinical work, Dr. Vaidya is actively involved in academic research and public health initiatives. He has published peer-reviewed papers on robotic-assisted joint replacement and contributed to medical textbooks in orthopedics and spine care. His commitment to community outreach is reflected in the numerous geriatric health awareness programs he has conducted. As a speaker at leading national and international medical forums, Dr. Vaidya continues to shape the future of joint care as a top knee replacement surgeon in Pune and a respected voice in global orthopedic practice.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="side-space narendra-enquiry-section">

                <BookCallSection
                    title="Transforming Knee Care with Robotic Precision"
                    subtitle="Expertly Led by Dr. Narendra Vaidya and His Advanced Orthopedic Care Team for Unmatched Robotic Knee Surgery Outcomes!"
                    primaryText="Book Your Appointment"
                    secondaryText="Call Now"
                    parentClass='col-xl-8'
                    parentClass2='col-xl-4'
                    imageUrl={EnquiryMachine.src}
                    onPrimaryClick={handlebookModalOpen}
                    onSecondaryClick={() => window.location.href = 'tel:+919307076767'}
                />
                <AppointmentModal isModalOpen={isbookModalOpen} handleModalClose={handlebookModalClose} />

            </section>

            <section className="narendra-benefits pb-0 section-space side-space">
                <h2 className="mb-4 section-heading text-center">Benefits of Choosing Dr. Vaidya for Knee Replacement in Pune</h2>
                {benefits.slice(0, visibleCount2).map((benefit, index) => (
                    <div className={`row benefit-row mb-4 g-3 ${index % 2 === 1 ? 'inverse' : ''}`} key={index}>
                        <div className={`col-md-3 ${index % 2 === 1 ? 'order-md-2' : 'order-md-1'} order-1`}>
                            <Image src={benefit.image} alt={benefit.title} width={205} height={185} className="w-100 h-100" />
                        </div>
                        <div
                            className={`
        col-md-9
        d-flex
        justify-content-center
        flex-column
        align-items-center align-items-md-${index % 2 === 1 ? 'end' : 'start'}
        ${index % 2 === 1 ? 'order-md-1' : 'order-md-2'}
        order-2
      `}
                        >
                            <Image
                                src={NarendraBenefitSvg}
                                alt={benefit.title}
                                className="benefit-svg mb-2"
                            />
                            <h4 className="section-heading">{benefit.title}</h4>
                            <p className="mb-0 narendra-benefit-description">{benefit.description}</p>
                        </div>
                    </div>
                ))}
                {benefits.length > 4 && (
                    <div className="text-center mt-3">
                        <button
                            className="section-heading fst-italic mb-0"
                            onClick={toggleView2}
                            style={{ textDecoration: 'none', background: 'none', border: 'none', cursor: 'pointer' }}
                        >
                            {visibleCount2 === 4 ? 'Load More ⟳' : 'Show Less'}
                        </button>
                    </div>
                )}

            </section>

            {/*  */}
            <MainSuccessStor />
            {/*  */}

            <section className="about-narendra section-space side-space">
                <div className="about-narendra-div">
                    <div className="row">
                        <div className="col-lg-3 col-12 p-0 narendra-cut-div">
                            <Image src={NarendraCut} alt="Dr. Narendra Vaidya" className="narendra-cut" />
                            {/* <img src={Polygon} alt="Polygon Decoration" className="polygon-img" /> */}
                            <Image src={Polygon} alt="polygon" className="narendra-polygon d-none d-md-block" />
                        </div>
                        <div className="col-lg-9 col-12 about-narendra-content">
                            <h2 className="section-heading text-start text-white">His Surgical Experience as the Best Joint Replacement Surgeon in Pune</h2>
                            <p className="text-white">
                                Dr. Narendra Vaidya brings a wealth of international training to his practice, having completed advanced fellowships in robotic-assisted knee replacement in Salt Lake City, USA, and minimally invasive spine surgery in Sweden and the USA, under renowned experts at Ryhov Hospital and University Hospital Linköping. This global exposure to cutting‑edge techniques has equipped him to deliver precise, modern orthopedic care in Pune, blending international standards with local needs.
                            </p>

                            <p className="text-white mb-0">
                                With over three decades in the field, Dr. Vaidya has been instrumental in training the next generation of orthopedic surgeons. He serves as a recognized professor for MD/MS, DNB, and fellowship programs under MUHS and the National Board of Examinations. He also leads the Visiting Surgeon Program, mentoring both national and international surgeons in the latest advancements in joint replacement and robotic surgery.

                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className='hospital-faq-section'>
                <FaqSection data={faqs} />
            </section>

            <section className='enquiry-meet-section enquiry-meet-section-narendra side-space section-space hospital-book-section'>
                <div className='enquiry-meet-inner bg-color-image position-relative'>
                    <div className='row w-100 h-100 g-0'>
                        <div className='col-xl-6 col-lg-6 col-md-8 d-lg-flex d-none h-100'>
                            <div className='enquiry-meet-img'>
                                <img src='/images/new-theme/Newpages/HospitalNearme/hosp-bookform-img.png' alt="Appointment Form" />
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-12 narendra-form">
                            <div id="appointment">
                                <h3 className="text-center text-white mb-4">Book An Appointment With Dr Narendra Vaidya!</h3>
                                <form className="row g-3" onSubmit={handleSubmit}>
                                    <div className="col-md-6">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            placeholder="Full Name*"
                                            required
                                        />
                                        {errors.fullName && <span className="text-danger">{errors.fullName}</span>}
                                    </div>

                                    <div className="col-md-6">
                                        <input
                                            type="tel"
                                            className="form-control"
                                            name="phoneNumber"
                                            value={formData.phoneNumber}
                                            onChange={handleChange}
                                            placeholder="Phone Number*"
                                            required
                                        />
                                        {errors.phoneNumber && <span className="text-danger">{errors.phoneNumber}</span>}
                                    </div>

                                    <div className="col-md-12">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleChange}
                                            placeholder="City*"
                                            required
                                        />
                                        {errors.city && <span className="text-danger">{errors.city}</span>}
                                    </div>

                                    <div className="col-md-12">
                                        <button type="submit" className="button-primary btn-white w-100">
                                            <span>Submit</span>
                                        </button>
                                    </div>
                                </form>

                                {submitted && (
                                    <div className="toast-container position-fixed top-0 end-0 p-3" style={{ zIndex: 9999 }}>
                                        <div className="toast show">
                                            <div className="toast-header">
                                                <strong className="me-auto">Success</strong>
                                                <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close" />
                                            </div>
                                            <div className="toast-body">Your form has been submitted successfully!</div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <AppointmentModal
                            submitBtnClass={modalId}
                            isModalOpen={isModalOpen}
                            title={modalTitle}
                            handleModalClose={handleModalClose}
                        />
                    </div>
                </div>
            </section>




        </>
    );
};

export default NarendraVaidya;
