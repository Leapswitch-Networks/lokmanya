import Footer from "./Footer";
import Header from "./Header";


export default function KneeRplcLayout({ children }) {

    return (
        <>
            <Header />
            <main>{children}</main>
            <Footer />
        </>
    );
}
