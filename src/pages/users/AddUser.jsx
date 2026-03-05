import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from "next/router";
import { PrimaryButton } from '../../components';
import GoBack from '../../components/controls/GoBack';
import { saveEmp } from '../../store/emp/empAction';
import { errorToast, promiseToast } from '../../utils/Toast';
import "@/styles/adduser.css";


const AddUser = () => {
    const dispatch = useDispatch();
    const navigate = useRouter();
    const [name, setFull_name] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userData = { name, email, phone };
            let res = await promiseToast(dispatch(saveEmp(userData)), "Validating...");
            if (!res.error) return navigate("/");

        } catch (error) {
            errorToast('Failed to save user data');
        }
    };



    return (
        <div className="full-container addemp-wrapper">
            <div className="custom-container">
                <div className="back-button">
                    <GoBack to={'/adminpanel'} />
                </div>
                <span className='main-heading heading-both'>Add User</span>

                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className={`col-md-12 `} id="its_number_wrapper">
                            <div className='mb-3 row'>
                                <div className='col-md-6 mb-3'>
                                    <div className="form-group float-right">
                                        <label>Full Name</label>
                                        <input
                                            className="form-input_field"
                                            type="text"
                                            onChange={(e) => setFull_name(e.target.value)}
                                            placeholder="Type Full Name"
                                            value={name}
                                        />
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <div className="form-group float-left">
                                        <label>Email Id</label>
                                        <input
                                            className="form-input_field"
                                            type="email"
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Type Email Id"
                                            value={email}
                                        />
                                    </div>
                                </div>
                                <div className='col-md-12'>
                                    <div className="form-group mobile_no">
                                        <label>Contact number</label>
                                        <input
                                            className="form-input_field"
                                            type="text"
                                            onChange={(e) => setPhone(e.target.value)}
                                            placeholder="Type Mobile Number"
                                            value={phone}
                                        />
                                    </div>
                                </div>
                            </div>
                            <PrimaryButton type="submit" background={'transparent'} height={'40px'} >Submit Data</PrimaryButton>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddUser
