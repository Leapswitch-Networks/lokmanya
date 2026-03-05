import React, { useState } from "react";
import ArrowRightTab from "../assets/images/icons/arrowRightTab.svg";

const QuestionAnsweredSection = ({ activeTabtab, combinedProcedures = [] }) => {
  const [activeProcedure, setActiveProcedure] = useState(0);
  const [showMore, setShowMore] = useState(false);

  const handleProcedureClick = (index) => {
    setActiveProcedure(index);
  };

  const handleSeeMoreClick = () => {
    setShowMore((prev) => !prev);
  };

  const visibleProcedures = showMore ? combinedProcedures : combinedProcedures.slice(0, 5);
  const inactiveProcedures = combinedProcedures.slice(5);

  return (
    <>
      {/* Desktop View */}
      <div
        id="treatmentProcedure"
        className={`d-md-block d-none tab-pane fade ${
          activeTabtab === "treatmentProcedure" ? "show active" : ""
        }`}
      >
        <div className="row treat-content-row align-items-center">
          <div className="col-md-6 col-lg-5">
            <ul className="nav nav-pills treatment-procedure-tabs">
              {visibleProcedures.map((procedure, i) => (
                <li className="nav-item" key={procedure.id}>
                  <a
                    className={`btn-treat-tab ${activeProcedure === i ? "active" : ""}`}
                    data-bs-toggle="pill"
                    href={`#procedure-${procedure.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleProcedureClick(i);
                    }}
                  >
                    {procedure?.question || 'Untitled'} <img src={ArrowRightTab.src} alt="" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-md-6 col-lg-7">
            <div className="tab-content treatment-procedure-content">
              {visibleProcedures.map((procedure, i) => (
                <div
                  id={`procedure-${procedure.id}`}
                  className={`tab-pane fade ${activeProcedure === i ? "show active" : ""}`}
                  key={procedure.id}
                >
                  <div className="display-flex-center row">
                    {procedure?.image && (
                      <div className="col-12 col-lg-5">
                        <div className="treat-pane-img">
                          <img
                            src={procedure.image.src}
                            crossOrigin="anonymous"
                            alt={procedure.question}
                          />
                        </div>
                      </div>
                    )}
                    <div className={procedure?.image ? "col-12 col-lg-7" : "col-12"}>
                      <div className="treat-pane-desc">
                        <p className="mb-0" dangerouslySetInnerHTML={{ __html: procedure?.description || '' }}></p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {inactiveProcedures.length > 0 && (
          <div className="d-flex justify-content-center align-items-center w-100">
            <button type="button" className="btn-see-more" onClick={handleSeeMoreClick}>
              {showMore ? "See Less" : "See More"}
            </button>
          </div>
        )}
      </div>

      {/* Mobile View */}
      <div
        id="treatmentProcedure"
        className={`d-md-none d-block tab-pane fade ${
          activeTabtab === "treatmentProcedure" ? "show active" : ""
        }`}
      >
        <div className="row treat-content-row">
          <div className="col-12">
            <ul className="list-unstyled">
              {visibleProcedures.map((procedure, i) => (
                <li key={procedure.id} className="mb-md-4 mb-3">
                  <div
                    className={`btn-treat-tab d-flex justify-content-between align-items-center ${activeProcedure === i ? "active" : ""}`}
                    onClick={() => handleProcedureClick(i)}
                    style={{ cursor: "pointer" }}
                  >
                    {procedure?.question}
                    <img src={ArrowRightTab.src} alt="" />
                  </div>

                  {activeProcedure === i && (
                    <div className="treatment-procedure-content mt-3">
                      <div className="display-flex-center row">
                        {procedure?.image && (
                          <div className="col-12 col-lg-5">
                            <div className="treat-pane-img">
                              <img
                                src={procedure.image.src}
                                crossOrigin="anonymous"
                                alt={procedure.question}
                              />
                            </div>
                          </div>
                        )}
                        <div className={procedure?.image ? "col-12 col-lg-7" : "col-12"}>
                          <div className="treat-pane-desc">
                            <p dangerouslySetInnerHTML={{ __html: procedure?.description || '' }}></p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {inactiveProcedures.length > 0 && (
          <div className="d-flex justify-content-center align-items-center w-100">
            <button type="button" className="btn-see-more" onClick={handleSeeMoreClick}>
              {showMore ? "See Less" : "See More"}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default QuestionAnsweredSection;
