import React, { useCallback, useEffect, useRef, useState } from "react";
import Logo from '@/assets/images/lokmanya-logo.webp'
import { isValidUsername, validateEmail } from "@/Validation/Validation";
import { forgotPassword, loginUser } from "@/store/auth/authActions";
import { useDispatch } from "react-redux";
import { errorToast, promiseToast, successToast } from "@/utils/Toast";
import Link from "next/link";
import { InputField, PrimaryButton } from "@/components";


const Forgot = () => {
	const dispatch = useDispatch()
	const ref = useRef(null)
	const [email, setEmail] = useState('');
	const [userExist, setUserExist] = useState(2);

	const handleEmail = async (e) => {
		const email = e.target.value.trim()
		setEmail(email);
		if (!email.length) return setUserExist(2);
		if (!isValidUsername(email)) {
			return setUserExist(0);
		} else {
			return setUserExist(2);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!validateEmail(email)) return errorToast("Invalid email address. Please check your input and try again.");
		let res = await promiseToast(dispatch(forgotPassword({ email })), "validating...")
		if (res?.error) return setUserExist(0);
		setEmail('');
		ref.current.click();
	};

	return (
		<div className="login-wrapper sidespace">
			<div className="login-outer">
				<div className="login-inner">
					<div className="login-logo">
					<img src={Logo.src} height="100" width="100px" />
					</div>
					<form className="input-fields" onSubmit={handleSubmit}>
						<InputField
							id="email"
							type={'email'}
							label={"Enter Email ID "}
							value={email}
							onChange={handleEmail}
							valid={userExist}
							placeholder="Type your email"
							required
						/>
						<PrimaryButton type="submit"  >
							Submit
						</PrimaryButton>
					</form>
					<div className="forget-pass">
						<Link href={'/adminpanel'} ref={ref} >Back To Login</Link>
					</div>
				</div>
				<div className="copyright">
					<span>&copy; {new Date().getFullYear()} Lokmanya Hospital. All Right Reserved. Powered by <a href="https://www.hatsoffdigital.com/" target="blank"> Hats-Off</a></span>
				</div>
			</div>
		</div>
	);
};

export default Forgot;
