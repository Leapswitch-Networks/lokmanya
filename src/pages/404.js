import Link from "next/link";

const errorPage = () => {

  return (
    <div className="side-space section-space error-div d-flex flex-column justify-content-center align-items-center">
      <h1 style={{ fontSize: "80px" }}>404</h1>
      <h2>Page Not Found</h2>
      <h3>Oops, the page you're looking for doesn't exist.</h3>
      <button className="kohinoor-btn mt-2">
        <Link className="button-primary" href="/">
          <span>Home</span>
        </Link></button>
    </div>
  );
};

export default errorPage;