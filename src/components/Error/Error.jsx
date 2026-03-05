import React from 'react';

function ErrorPage({ statusCode }) {
  return (
    <div className="d-flex min-vh-100">
      <div className="bg-primary text-white p-4" style={{ width: '250px', zIndex: 500 }}>
        <h1 className="h3 fw-semibold mb-3">Error</h1>
        <p className="small mb-0">
          {statusCode
            ? `An error ${statusCode} occurred on server`
            : 'An error occurred on client'}
        </p>
      </div>
      <div className="flex-grow-1 bg-light p-4">
        <span className="h4 fw-semibold d-block mb-2">{statusCode || 'Error'}</span>
        <p className="text-muted mb-0">Something went wrong.</p>
      </div>
    </div>
  );
}

// Correct the function name to match component name
ErrorPage.getInitialProps = ({ res, err }) => {
  const statusCode = res?.statusCode || err?.statusCode || 500;
  return { statusCode };
};

export default ErrorPage;
