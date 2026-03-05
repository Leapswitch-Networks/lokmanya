import { PersonThreestar, WhiteStth } from "@/site/assets/images/icons";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Counter from "../Counter/Counter";

const GeneralSurgeryBanner = ({
  title,
  subtitle,
  buttonText = "Book An Appointment",
  imageSrc,
  handleButtonClick,
}) => {
  return (
    <section className="general-sgy-cp-bnr">
      <div className="row w-100 align-items-center">
        <div className="col-xl-7 col-lg-6 order-xl-1 order-2">
          <div className="gen-sgy-bnr-ctnt">
            <div className="gen-sgy-bnr-ttl mb-lg-4 mb-md-3 mb-2">
              <h1 className="text-white mb-0">{title}</h1>
            </div>
            <h4 className="text-white text-uppercase mb-lg-4 mb-md-3 mb-2">
              {subtitle}
            </h4>
            <div className="row mb-lg-4 mb-md-3 mb-2 g-lg-3 g-2 justify-content-lg-start justify-content-center">
              <div className="col-xl-4 col-lg-12 col-md-4 col-6 d-flex">
                <div className="d-flex align-items-center gap-lg-3 gap-2">
                  <WhiteStth />
                  <div>
                    <Counter
                      targetValue="50"
                      duration={3000}
                      usePlusSign={true}
                      className="neuro-sci-counter mb-1 text-white text-start"
                    />
                    <p className="mb-0 text-white text-start neuro-sci-txt">
                      Experienced specialists
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-12 col-md-4 col-6 d-flex">
                <div className="d-flex align-items-center gap-lg-3 gap-2">
                  <PersonThreestar />
                  <div>
                    <Counter
                      targetValue="50"
                      duration={3000}
                      usePlusSign={true}
                      className="neuro-sci-counter mb-1 text-white text-start"
                    />
                    <p className="mb-0 text-white text-start neuro-sci-txt">
                      Years of experience
                    </p>
                  </div>
                </div>
              </div>
              {/* <div className="col-xl-4 col-lg-12 col-md-4 col-6 d-flex">
                                        <div className='d-flex align-items-center gap-lg-3 gap-2'>
                                            <NabhWhite />
                                            <div className='text-start'>
                                                <span className='neuro-sci-counter mb-1 text-white text-start'>NABH</span>
                                                <p className='mb-0 text-white text-start neuro-sci-txt'>Certified Nursing Excellence</p>
                                            </div>
                                        </div>
                                    </div> */}
            </div>
            <Link
              href="#"
              className="book-new-btn d-block"
              onClick={(e) => {
                e.preventDefault();
                handleButtonClick && handleButtonClick(buttonText);
              }}
            >
              <span className="text-uppercase">{buttonText}</span>
            </Link>
          </div>
        </div>
        <div className="col-xl-5 col-lg-6 order-xl-2 order-1">
          <div className="gen-sgy-bnr-img">
            <Image width={535} height={525} src={`/images/new-theme/Newpages/CampaignPages/${imageSrc}`} alt={title} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default GeneralSurgeryBanner;
