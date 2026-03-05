import React from 'react'

const Footer = () => {
    return (
        <footer className="footer">
            <div className="row">
                {/* Copyright on the Left */}
                <div className="col-md-12 col-sm-12 mb-2 mb-md-0">
                    <p className="mb-0 text-center">
                        Copyright 2024, All Rights Reserved with Lokmanya Hospitals, Powered by&nbsp;
                        <a href="https://www.hatsoffdigital.com/" target="_blank" rel="noopener noreferrer" className="hatsoff cursor-pointer">
                            Hats-Off
                        </a>
                    </p>
                </div>

                {/* Terms of Policy and Disclaimer on the Right */}
                {/* <div className="col-md-6 col-sm-12 text-end">
          <a href="#" id="checking" className="mr-2" data-toggle="modal" data-target="#policy">
            Privacy Policy
          </a>
          |
          <a href="#" className="ml-2" data-toggle="modal" data-target="#enquiryModal">
            Medical Disclaimer
          </a>
        </div> */}
            </div>
        </footer>
    )
}

export default Footer