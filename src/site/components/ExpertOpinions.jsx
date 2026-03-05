import React, { useState } from "react";
import Link from "next/link";

import BtnPlay from "../assets/images/New-theme/icons/blu-btn-play.svg";
import opinion1 from "../assets/images/knee-arth.webp";
import opinion2 from "../assets/images/youtube_th13.webp";
import opinion3 from "../assets/images/youtube_th14.webp";
import opinion4 from "../assets/images/youtube_th15.webp";
import Image from "next/image";

const opinionsData = [
  {
    title: "Knee Arthritis: Stage 1 से 4 तक लक्षण, कारण और उपचार",
    image: opinion1,
    video: "https://www.youtube.com/embed/cbcumsDB0Xs?rel=0",
  },
  {
    title: "ऑपरेशन म्हणजे भीती वाटायची पण आता चालतेय नव्यानं!",
    image: opinion2,
    video: "https://www.youtube.com/embed/O2pfMYj22Qs?rel=0",
  },
  {
    title: "हर्निया शस्त्रक्रिया रिकव्हरी प्रोसेस कशी असते आणि किती वेळ लागतो?",
    image: opinion3,
    video: "https://www.youtube.com/embed/OJkiESJkwXk?rel=0",
  },
  {
    title: "स्पाइन की समस्या से शरीर में कौन-कौन सी गंभीर बीमारियां हो सकती हैं?",
    image: opinion4,
    video: "https://www.youtube.com/embed/VwlFluvA5Eg?rel=0",
  },
];

const ExpertOpinions = () => {
  const [isvideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");

  const openvideoModal = (url) => {
    setVideoUrl(url);
    setIsVideoModalOpen(true);
  };

  const closevideoModal = () => {
    setVideoUrl("");
    setIsVideoModalOpen(false);
  };

  return (
    <section className="opinions side-space">
      <div className="opinions-inner">
        <h2 className="section-heading">Explore Our Expert Opinions</h2>
        <div className="row common-gutter">
          {opinionsData.map((opinion, index) => (
            <div className="col-lg-3 col-md-4 col-12" key={index}>
              <div
                className="opinions-card"
                onClick={() => openvideoModal(opinion.video)}
              >
                <h5 className="ellipsis-2">{opinion.title}</h5>
                <div className="opinion-img op-video-img">
                  <button
                    className="btn-play"
                    onClick={(e) => {
                      e.stopPropagation();
                      openvideoModal(opinion.video);
                    }}
                  >
                    <Image height={40} width={40} src={BtnPlay.src} alt="Play Video" />
                  </button>
                  <Image height={145} width={272} src={opinion.image.src} alt="opinion card" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {isvideoModalOpen && (
          <div className="modal-overlay-custom" onClick={closevideoModal}>
            <div
              className="modal-content-custom"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="modal-close-custom"
                onClick={closevideoModal}
              >
                &times;
              </button>
              <iframe
                src={videoUrl}
                title="Opinion Video"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
                className="modal-video-custom"
              ></iframe>
            </div>
          </div>
        )}
      </div>

      <div className="h-center mt-3">
        <Link href="/videos" className="button-primary btn-white">
          <span>View More</span>
        </Link>
      </div>
    </section>
  );
};

export default ExpertOpinions;
