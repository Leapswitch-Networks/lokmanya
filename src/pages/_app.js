import MainLayout from "@/layouts/MainLayout";
import Container from "@/layouts/admin/container";
import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min";
import '@/styles/DoctorsSpecialist.css';
import "@/styles/globals.css";
import "@/styles/home.css";
import "@/styles/header.css";
import "@/styles/footer.css";
import "@/styles/aboutus.css";
import "@/styles/patients.css";
import "@/styles/pagination.css";
import "@/styles/video.css";
import "@/styles/contact.css";
import "@/styles/Neurosurgery.css";
import "@/styles/find.css";
import "@/styles/ourbranch.css";
import "@/styles/addblog.css";
import "@/styles/blogListing.css";
import "@/styles/single.css";
import "@/styles/layout.css";
import "@/styles/lead.css";
import "@/styles/humanresource.css";
import "@/styles/adddoctor.css";
import "@/styles/addblog.css";
import "@/styles/login.css";
import "@/styles/adduser.css";
// import "@/styles/controls.css";
import { Provider } from "react-redux";
import store from "@/store/index";
import { useRouter } from "next/router";
import { useEffect } from "react";
import SurgeryCampaing from "@/layouts/General-Surgery-Campaign/SurgeryCampaing";
import KneeRplcLayout from "@/layouts/Knee-replacement/KneeRplcLayout";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min");
  }, []);

  useEffect(() => {
    if (
      router.pathname === "/general-surgery-campaign" ||
      router.pathname === "/neuro-science" ||
      router.pathname === "/sports-injury" ||
      router.pathname === "/cardiac-science" 
    ) {
      import("../styles/generalsurgerycampaign.css");
    }
    if (
      router.pathname === "/hospital-nearme" ||
      router.pathname === "/doctors-specialist" ||
      router.pathname === "/best-treatment"
    ) {
      import("../styles/HospitalNearMe.css");
    }
    if (
      router.pathname === "/doctors-specialist" ||
      router.pathname === "/best-treatment"
    ) {
      import("../styles/DoctorsSpecialist.css");
    }
    if (router.pathname === "/careers") {
      import("../styles/career.css");
    }
    if (router.pathname === "/knee-replacement-robotic") {
      import("../styles/Kneereplacement.css");
    }
    if (router.pathname === "/narendra-vaidya") {
      import("../styles/narendra-vaidya.css");
    }
  }, [router.pathname]);

  let Layout = MainLayout;

  if (router.pathname.startsWith("/general-surgery-campaign")) {
    Layout = SurgeryCampaing;
  } else if (router.pathname.startsWith("/neuro-science")) {
    Layout = SurgeryCampaing;
  } else if (router.pathname.startsWith("/sports-injury")) {
    Layout = SurgeryCampaing;
  } else if (router.pathname.startsWith("/cardiac-science")) {
    Layout = SurgeryCampaing;
  } else if (router.pathname.startsWith("/knee-replacement")) {
    Layout = KneeRplcLayout;
  } else if (router.pathname.startsWith("/adminpanel")) {
    Layout = Container;
  } else if (router.pathname.startsWith("/forgot")) {
    Layout = Container;
  }

  return (
    <Provider store={store}>
      <ToastContainer />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
