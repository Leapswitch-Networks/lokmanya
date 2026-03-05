import {CommonBanner} from "../site/components";
import bannerImage from "../site/assets/images/careers/CareerBannerImg.png";
import Head from "next/head";
import EmployeeSpeaks from "@/site/components/Careers/EmployeeSpeaks";
import LifeAtLokmanya from "@/site/components/Careers/LifeAtLokmanya";
import AvailablePositions from "@/site/components/Careers/AvailablePositions";
import OurValues from "@/site/components/Careers/OurValues";
import AvailablePositionsFellowships from "@/site/components/Careers/AvailablePositionsFellowships";


const Career = () => {

  return (
    <>
      <Head>
        <title>Careers And Job Opportunities At Lokmanya Hospital Pune</title>
        <meta name="description" content="Explore rewarding career opportunities at Lokmanya Hospital, Pune. Join a team of healthcare professionals dedicated to delivering quality patient care." />
      </Head>

      <CommonBanner className={"carrer-banner"} bgColor={"#D4F2F3"} image={bannerImage.src}>
        <div className="career-banner-left">
          <h1 className="page-heading text-start">Be a Part of Lokmanya Hospitals</h1>
          <p className="mb-0 text-start">
          At Lokmanya Hospitals, your skills and passion for healthcare contribute to our mission of providing innovative, exceptional patient care. Join our team across multiple locations and embark on a fulfilling career with us.
          </p>
        </div>
      </CommonBanner>
      <OurValues/>
      <AvailablePositions/>    
      <AvailablePositionsFellowships/>    
      <LifeAtLokmanya/>
      <EmployeeSpeaks/>
    </>
  );
};

export default Career;
