import React from "react";

import lifeAtLokmanya1 from "@/site/assets/images/careers/lifeAt1.webp";
import lifeAtLokmanya2 from "@/site/assets/images/careers/lifeAt2.webp";
import lifeAtLokmanya3 from "@/site/assets/images/careers/lifeAt3.webp";
import lifeAtLokmanya4 from "@/site/assets/images/careers/lifeAt4.webp";
import lifeAtLokmanya6 from "@/site/assets/images/careers/lifeAt6.webp";
import lifeAtLokmanya5 from "@/site/assets/images/careers/lifeAt7.webp";
import Image from "next/image";

const LIFE_AT_LOKMANYA = [
  {
    id: 1,
    alt: "Student Internship",
    src: lifeAtLokmanya1,
    ttl: "Student Internship at Lokmanya Hospital",
  },
  {
    id: 2,
    alt: "Flag Hoisting",
    src: lifeAtLokmanya2,
    ttl: "Flag Hoisting",
  },
  {
    id: 3,
    alt: "Internal Audit",
    src: lifeAtLokmanya3,
    ttl: "Internal Audit",
  },
  {
    id: 4,
    alt: "Ganesh Festival",
    src: lifeAtLokmanya4,
    ttl: "Ganesh Festival",
  },
  {
    id: 5,
    alt: "Nursing Day Celebration",
    src: lifeAtLokmanya5,
    ttl: "Nursing Day Celebration",
  },
  {
    id: 6,
    alt: "Heart Awareness Program",
    src: lifeAtLokmanya6,
    ttl: "Heart Awareness Program",
  },
];

const LifeAtLokmanya = () => {
  return (
    <section className="lifeat-lokmanya section-below-space side-space">
      <h2 className="section-heading">Life at Lokmanya</h2>
      <div className="row common-gutter">
        {LIFE_AT_LOKMANYA.map(({ id, src, alt, ttl }) => (
          <div className="col-md-4 col-6" key={id}>
            <Image width={395} height={220} src={src.src} alt={alt} className="life-at-lk-img" />
            <p className="text-center my-2">{ttl}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LifeAtLokmanya;
