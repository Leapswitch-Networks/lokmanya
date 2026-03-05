import React, {  useState } from 'react';
import './privacyPolicy.css'
import { PrimaryButton } from '../../components';
import { useDispatch } from 'react-redux';
import { verifyPolicy } from '../../store/auth/authActions';
import { useRouter } from 'next/router';

const PrivacyPolicy = () => {
    const router = useRouter();
    const [isPopupOpen, setIsPopupOpen] = useState('show');
    const [isChecked, setIsChecked] = useState(false);
    const dispatch = useDispatch()
    const navigation = useNavigate()
    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!isChecked) return;
        router.push("/edit-profile")
        setIsPopupOpen('hide')
        await dispatch(verifyPolicy())
    }


    return (
        <div className="policy-main-container">
            <div className={`policy-body swal2-${isPopupOpen}`}>
                <div className="policy-header shadow-sm">
                    <h2 className=' main-heading'>Privacy & Policy</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    {/* <ul className='policy-list'>
                        <li>1. Authorization: Data Subject hereby authorizes DA to collect, process, store, and use the Data for the following purposes: a. [Specify the purpose(s) for which the data will be used, e.g., marketing, analytics, research, etc.] b. [Include any specific limitations or restrictions on the use of the data, if applicable.]</li>
                        <li>2. Scope of Use: DA agrees to use the Data solely for the purposes outlined in Section 1 of this Agreement. DA shall not disclose or transfer the Data to any third party without the prior written consent of Data Subject, except as required by law.</li>
                        <li>3. Confidentiality: DA agrees to maintain the confidentiality and security of the Data and to implement appropriate technical and organizational measures to protect the Data against unauthorized access, disclosure, alteration, or destruction.</li>
                        <li>4. Data Accuracy: DA shall make reasonable efforts to ensure the accuracy and completeness of the Data provided by Data Subject. Data Subject agrees to promptly inform DA of any changes or updates to the Data.</li>
                        <li>5. Data Retention: DA shall retain the Data only for as long as necessary to fulfill the purposes outlined in Section 1 of this Agreement or as required by law. Upon termination of this Agreement, DA shall securely delete or destroy all copies of the Data in its possession.</li>
                        <li>6. Indemnification: Data Subject agrees to indemnify and hold harmless DA from any claims, damages, or liabilities arising out of or related to the use of the Data in accordance with this Agreement.</li>
                        <li>7. Governing Law: This Agreement shall be governed by and construed in accordance with the laws of [Specify Jurisdiction].</li>
                        <li>8. Amendment: This Agreement may be amended or modified only by a written instrument signed by both parties.</li>
                        <li>9. Entire Agreement: This Agreement constitutes the entire agreement between the parties concerning the subject matter hereof and supersedes all prior and contemporaneous agreements and understandings, whether oral or written.</li>
                        <li>IN WITNESS WHEREOF, the parties hereto have executed this Agreement as of the date first above written.</li>
                    </ul> */}
                    <div className=" policy-footer ">
                        <div className="form-check chekcbox">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id={"privacyPolicyCheckbox"}
                                onChange={handleCheckboxChange}
                            />
                            <label htmlFor={"privacyPolicyCheckbox"} className="form-check-label ml-2 policy-checkbox-label">
                                I agree
                                {/* with the <span> Privacy & Policy</span> */}
                            </label>
                        </div>
                        <PrimaryButton type="submit" disabled={!isChecked}>Accept</PrimaryButton>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default PrivacyPolicy