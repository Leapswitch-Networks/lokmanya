import Footer from "./Footer";
import Header from "./Header";
// import '@/styles/presidentia.css';


export default function SurgeryCampaing({ children }) {

  return (
    <>
        <Header />
        <main>{ children }</main>
        <Footer />
    </>
  );
}
  