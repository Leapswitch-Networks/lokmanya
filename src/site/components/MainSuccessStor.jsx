import React from "react";
import { REVIEWS } from "@/static-data";
import QuoteMark from "../assets/images/quote-mark.webp";
import { CustomCarousel } from ".";
import Image from "next/image";

const MainSuccessStor = ({ data }) => {
  const REVIEWSdata = data?.length ? data : REVIEWS;
  return (
    <section className="success-stories section-space">
      <h2 className="section-heading">Patient Success Stories</h2>
      <div id="review-carousel">
        <CustomCarousel id="review-carousel">
          {REVIEWSdata.map(({ id, review, author }) => (
            <div className="common-card" key={id}>
              <Image height={35} width={35}
                src={QuoteMark.src}
                alt="quotation"
                className="quote-mark"
              />
              <p className="review">{review}</p>
              <p className="author-name">{author}</p>
            </div>
          ))}
        </CustomCarousel>
      </div>
    </section>
  );
};

export default MainSuccessStor;
