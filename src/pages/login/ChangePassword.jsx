import React, { useRef, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import "@/styles/login.css";
import { InputField, PrimaryButton } from "../../components";
import Logo from '../../assets/images/lokmanya-logo.webp';
import { errorToast, promiseToast } from "../../utils/Toast";
import { validatePassword } from "../../Validation/Validation";
import { useDispatch } from "react-redux";
import { modifyPassword } from "../../store/auth/authActions";

const ChangePassword = () => {
	const dispatch = useDispatch();
	const router = useRouter();
	const ref = useRef(null);
	const { token } = router.query;

	const [password, setPassword] = useState({
		newPass: "",
		cnfPass: "",
	});
	const [passErr, setPassErr] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		const { newPass, cnfPass } = password;
		const isValidPassword = validatePassword(newPass);
		if (isValidPassword && newPass === cnfPass) {
			let res = await promiseToast(
				dispatch(modifyPassword({ password: newPass, token })),
				"Validating...",
				"Password has been updated successfully!"
			);
			if (res?.error) return;
			router.push("/adminpanel"); // redirect after success
		} else if (!isValidPassword) {
			errorToast("Password must contain at least one digit, uppercase, lowercase, and special character.");
		} else {
			errorToast("Passwords do not match.");
		}
	};

	return (
		<div className="login-wrapper">
			<div className="login-outer">
				<div className="login-inner">
					<div className="login-logo">
						<Image src={Logo} height={100} width={100} alt="Lokmanya Logo" />
					</div>
					<form className="input-fields" onSubmit={handleSubmit}>
						<InputField
							type="password"
							id="newPass"
							label="New Password"
							value={password.newPass}
							onChange={e => setPassword({ ...password, newPass: e.target.value })}
							error={passErr}
							onFocus={() => setPassErr(null)}
							icon={false}
							isPass={true}
							placeholder="Type your new password"
							required
						/>
						<InputField
							type="password"
							id="cnfPass"
							label="Confirm Password"
							value={password.cnfPass}
							onChange={e => setPassword({ ...password, cnfPass: e.target.value })}
							error={passErr}
							onFocus={() => setPassErr(null)}
							icon={false}
							isPass={true}
							placeholder="Type confirm password"
							required
						/>

						<PrimaryButton type="submit">Submit</PrimaryButton>
					</form>
					<div className="forget-pass">
						<Link href="/adminpanel" legacyBehavior>
							<a ref={ref}>Back to login</a>
						</Link>
					</div>
				</div>
				<div className="copyright">
					<span>
						&copy; {new Date().getFullYear()} Lokmanya Hospital. All Right Reserved. Powered by{" "}
						<a href="https://www.hatsoffdigital.com/" target="_blank" rel="noopener noreferrer">
							Hats-Off
						</a>
					</span>
				</div>
			</div>
		</div>
	);
};

export default ChangePassword;
