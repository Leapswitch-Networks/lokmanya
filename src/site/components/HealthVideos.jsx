import React, { useState, useEffect } from "react";
import BtnPlay from "@/site/assets/images/New-theme/icons/blu-btn-play.svg";
import Image from "next/image";
import { getVideosFrontend } from "@/ApiActions/CommonApi";

const HealthVideos = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await getVideosFrontend();
        setVideos(response.data || []);
      } catch (error) {
        console.error("Error fetching videos:", error);
        setVideos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  useEffect(() => {
    if (isVideoModalOpen) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("bodyClass");
    } else {
      document.body.style.overflow = "auto";
      document.body.classList.remove("bodyClass");
    }

    return () => {
      document.body.style.overflow = "auto";
      document.body.classList.remove("bodyClass");
    };
  }, [isVideoModalOpen]);

  const openVideoModal = (url) => {
    setVideoUrl(url);
    setIsVideoModalOpen(true);
  };

  const closeVideoModal = () => {
    setIsVideoModalOpen(false);
    setVideoUrl("");
  };

  return (
    <section className="opinions">
      <div className="opinions-inner side-space section-space">
        <h2 className="section-heading">Videos</h2>
        <div className="row common-gutter">
          {loading ? (
            <p>Loading videos...</p>
          ) : (
            videos.map((video, index) => (
              <div className="col-lg-3 col-md-4 col-12" key={video.id || index}>
                <div
                  className="opinions-card"
                  onClick={() => openVideoModal(video.videoUrl)}
                >
                  <div className="opinion-img mb-2 op-video-img">
                    <button
                      className="btn-play"
                      onClick={(e) => {
                        e.stopPropagation(); // prevent double trigger
                        openVideoModal(video.videoUrl);
                      }}
                    >
                      <Image width={40} height={40} src={BtnPlay.src} alt="Play button" />
                    </button>
                    <Image width={270} height={145} src={video.thumbnil_image ? `/${video.thumbnil_image.replace(/\\/g, '/').replace(/^\//, '')}` : ''} alt="video thumbnail" />
                  </div>
                  <h5 className="ellipsis-2">{video.title}</h5>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Video Modal */}
        {isVideoModalOpen && (
          <div className="modal-overlay-custom" onClick={closeVideoModal}>
            <div
              className="modal-content-custom"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="modal-close-custom"
                onClick={closeVideoModal}
              >
                &times;
              </button>
              <iframe
                src={videoUrl}
                title="Health Video"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
                className="modal-video-custom"
              ></iframe>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default HealthVideos;
