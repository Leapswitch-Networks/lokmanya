import React from 'react'
import { BtnPlay } from '../../assets/images/icons'
import { ButtonPrimary } from '../../components'
import opinion1 from "../../assets/images/opinion1.webp";
// import './ExploreExpert.css'

function ExploreExpert() {
    return (
        <section className="opinions">
            <div className="opinions-inner side-space section-space">
                <h2 className="section-heading">Explore Our Expert Opinions</h2>
                <div className="row common-gutter">
                    <div className="col-lg-3 col-md-4 col-6">
                        <div className="opinions-card">
                            <h5 className="ellipsis-2">
                                Types Of Cancer Treatment – Immunotherapy, Targeted Therapy,
                                And Chemotherapy
                            </h5>
                            <div className="opinion-img">
                                <a href="/" target="_blank" rel="noopener noreferrer">
                                    <BtnPlay className="btn-play" />
                                </a>
                                <img src={opinion1} alt="opinionss card" />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-6">
                        <div className="opinions-card">
                            <h5 className="ellipsis-2">
                                Types Of Cancer Treatment – Immunotherapy, Targeted Therapy,
                                And Chemotherapy
                            </h5>
                            <div className="opinion-img">
                                <a href="/" target="_blank" rel="noopener noreferrer">
                                    <BtnPlay className="btn-play" />
                                </a>
                                <img src={opinion1} alt="opinionss card" />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-6">
                        <div className="opinions-card">
                            <h5 className="ellipsis-2">
                                Types Of Cancer Treatment – Immunotherapy, Targeted Therapy,
                                And Chemotherapy
                            </h5>
                            <div className="opinion-img">
                                <a href="/" target="_blank" rel="noopener noreferrer">
                                    <BtnPlay className="btn-play" />
                                </a>
                                <img src={opinion1} alt="opinionss card" />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-6">
                        <div className="opinions-card">
                            <h5 className="ellipsis-2">
                                Types Of Cancer Treatment – Immunotherapy, Targeted Therapy,
                                And Chemotherapy
                            </h5>
                            <div className="opinion-img">
                                <a href="/" target="_blank" rel="noopener noreferrer">
                                    <BtnPlay className="btn-play" />
                                </a>
                                <img src={opinion1} alt="opinionss card" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="h-center mt-3">
                    <ButtonPrimary isLink isWhite>
                        View All Insights
                    </ButtonPrimary>
                </div>
            </div>
        </section>
    )
}

export default ExploreExpert
