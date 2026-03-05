import React from 'react'
import { Helmet } from "react-helmet";

import OrthopedicsSection from './OrthopedicsSection';
import OrthopedicCareCenter from './OrthopedicCareCenter';
import OrthopedicProcedures from './OrthopedicProcedures';
import Technologies from './Technologies';
import Conditions from './Conditions ';
import ConsultationSection from './ConsultationSection';
// import DiagnosisTreatment from './DiagnosisTreatment';
// import OrthopedicExperts from './OrthopedicExperts';
// import ExploreExpert from './ExploreExpert';
import FAQ from './FAQ';
import PatientSuccessStories from './PatientSuccessStories';
import LokmanyaNetwork from '../../components/LokmanyaNetworkSection/LokmanyaNetwork';

function Cancer() {
  return (
    <>
      <Helmet>
        <title>Best Cancer Treatment Hospital in Pune - Lokmanya Hospital</title>
        <meta name="description" content="Lokmanya Hospital offers chemotherapy, radiation therapy, and surgery for cancer. Get personalized care and effective treatments. Book your consultation today!" />
      </Helmet>
      <div>
        <OrthopedicsSection />
        <OrthopedicCareCenter />
        <OrthopedicProcedures />
        <Technologies />
        <ConsultationSection />
        <Conditions />
        {/* <DiagnosisTreatment /> */}
        {/* <OrthopedicExperts/> */}
        {/* <ExploreExpert/> */}
        <FAQ />
        <PatientSuccessStories />
        <LokmanyaNetwork />
      </div>
    </>
  )
}

export default Cancer
