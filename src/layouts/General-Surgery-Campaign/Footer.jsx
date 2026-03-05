import React from "react";

const Footer = () => {
  return (
    <div className="gen-footer">
      <footer className="">
        <div className="footer-ctnt">
          <div>
            <p className="mb-0 ">
              Copyright 2025, All Rights Reserved with Lokmanya Hospitals, Pune.
              Powered by{" "}
              <a
                target="_blank"
                rel="noopener noreferrer"
                className=" hatsoff-link"
                href="https://www.hatsoffdigital.com/"
              >
                Hats-Off
              </a>
            </p>
          </div>
          <div className="">
            <a className="footer-link" href="/">
              Privacy Policy
            </a>{" "}
            &nbsp;| &nbsp;
            <a className="footer-link" href="/">
              Medical Disclaimer
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
