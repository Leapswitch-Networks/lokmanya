import Link from "next/link";

const ErrorPage = () => {
  return (
    <div className="side-space section-space error-div d-flex flex-column justify-content-center align-items-center text-center">
      <h1 style={{ fontSize: "100px", fontWeight: "bold", color: "#dc3545" }}>404</h1>
      <h2 className="mb-2">Page Not Found</h2>
      <p className="mb-3" style={{ maxWidth: "500px" }}>
        Sorry, the page you were looking for doesn’t exist or has been moved. Please check the URL or return to the dashboard.
      </p>
      <Link href="/adminpanel" passHref>
        <button className="button-primary mt-2 px-4 py-2">
          <span>Go to Dashboard</span>
        </button>
      </Link>
    </div>
  );
};

export default ErrorPage;
