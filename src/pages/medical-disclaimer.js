import React from "react";
import Head from "next/head";

const MedicalDisclaimer = () => {
    return (
        <>
            <Head>
                <title>Medical Disclaimer | Lokmanya Hospitals Official Website</title>
                <meta
                    name="description"
                    content="Read the official medical disclaimer of Lokmanya Hospitals. Learn about content accuracy, medical advice limitations, and liability on our website."
                />
            </Head>

            <div className="side-space section-space">
                <h1>Medical Disclaimer</h1>

                <h3>Medical Advice and Consultation</h3>
                <p>
                    The content on the Lokmanya Hospitals website is provided for general informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment​. Nothing on this site is intended to create a doctor-patient relationship or to replace a one-on-one consultation with a qualified healthcare provider​.
                </p>
                <p>
                    Always seek the advice of a qualified physician or other licensed health provider with any questions about a medical condition or treatment​. Never disregard professional medical advice or delay seeking it because of something you have read on this website.
                </p>
                <p>
                    If you believe you may have a medical emergency, call your doctor or emergency medical services immediately​.
                </p>

                <h3>Accuracy of Information</h3>
                <ul>
                    <li>Lokmanya Hospitals strives to ensure that the information on this website is accurate and up-to-date; however, we do not guarantee the completeness, accuracy, or timeliness of any content​.</li>
                    <li>Medical knowledge and practices evolve over time, and information on the site may become outdated or contain omissions or errors despite our best efforts</li>
                    <li>We make no warranties or representations regarding the reliability, suitability, or current validity of the information provided on the website​.</li>
                    <li>No assurance is given that all information is entirely complete or up-to-date, and we reserve the right to update or modify website content at any time without notice.</li>
                    <li>Users are encouraged to confirm any details (such as medical procedures, treatments, or health guidelines) with official sources or healthcare professionals before making decisions based on website content.</li>
                </ul>

                <h3>Limitation of Liability</h3>
                <p>
                    Use of the information on this website is entirely at your own risk​. Lokmanya Hospitals, including its doctors, staff, and affiliates, shall not be responsible or liable for any loss, injury, or damage arising from the use of, or reliance on, any information obtained from this website​.
                </p>
                <p>
                    This limitation of liability applies to any direct, indirect, incidental, or consequential damages, including (but not limited to) personal injury, complications, or adverse outcomes allegedly caused by using the site’s content. We expressly disclaim all warranties, express or implied, regarding the website and its content, and in no event will Lokmanya Hospitals be liable for any direct, indirect, special, or consequential damages resulting from the use of or inability to use this website​. This includes, without limitation, any claims for errors or omissions in the content or any misinterpretation or misuse of the information provided.
                </p>
                <p>
                    Furthermore, Lokmanya Hospitals does not guarantee that the website will be available at all times or free from technical issues​. We make every effort to keep the site running smoothly, but take no responsibility for, and will not be liable for, the website being temporarily unavailable due to technical problems or maintenance outages beyond our control​. The hospital also assumes no liability for any harm to your computer system, loss of data, or other damages that may result from accessing or downloading material from the site (such as due to viruses or other technologically harmful content).
                </p>

                <h3>Website Availability and Technical Issues</h3>
                <p>
                    Lokmanya Hospitals does not guarantee uninterrupted access to the website or error-free operation. We are not responsible for any loss or damage arising from the website being temporarily unavailable due to technical issues, maintenance, or factors beyond our control.
                </p>
                <p>
                    We also disclaim liability for any damage to your device or data resulting from accessing or downloading any content from this site, including possible exposure to viruses, malware, or other harmful digital components.
                </p>

                <h3>Third-Party Links and Endorsements</h3>
                <p>
                    This website may include links to third-party websites for your convenience. Lokmanya Hospitals does not control and is not responsible for the content, security, or privacy practices of those external websites. Inclusion of any link does not imply endorsement by Lokmanya Hospitals.
                </p>

                <h3>Changes to This Disclaimer</h3>
                <p>
                    Lokmanya Hospitals reserves the right to amend or update this disclaimer at any time without prior notice. Continued use of the website signifies your acceptance of any such changes.
                </p>

                <h3>Consent</h3>
                <p>
                    By using this website, you acknowledge that you have read, understood, and agreed to the terms of this medical disclaimer. If you do not agree with any part of this disclaimer, please refrain from using the website.
                </p>
            </div>
        </>
    );
};

export default MedicalDisclaimer;
