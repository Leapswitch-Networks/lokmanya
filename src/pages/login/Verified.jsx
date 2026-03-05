import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";
import { UnVerifiedIcon, VerifyIcon } from "../../assets/images/icons";
import { verifyUser } from '../../store/emp/empAction';
import { promiseToast } from "../../utils/Toast";
import "@/styles/login.css";

const Verified = () => {
	const dispatch = useDispatch();
	const router = useRouter();
	const ref = useRef(null);
	const { token } = router.query;

	const [emailText, setEmailText] = useState({
		title: "Email verification is under process.",
		msg: "",
		verified: null,
	});

	const verify_User = useCallback(async () => {
		if (!token) return; // Wait for token to be available
		let res = await promiseToast(
			dispatch(verifyUser({ email_verify: 'yes', token })),
			"Validating...",
			"Email verify successfully!"
		);
		if (res?.error) {
			setEmailText({
				title: "Email not verified!",
				msg: "Your email address not verified.",
				verified: false,
			});
		} else {
			setEmailText({
				title: "Email verified!",
				msg: "Your email address has been successfully verified.",
				verified: true,
			});
			setTimeout(() => {
				if (ref.current) ref.current.click();
			}, 3000);
		}
	}, [dispatch, token]);

	useEffect(() => {
		verify_User();
	}, [verify_User]);

	return (
		<div className="login-wrapper">
			<div className="login-outer" style={{ height: '400px', minHeight: '200px' }}>
				<div
					className="login-inner text-center align-align-items-center justify-content-center h-100 d-flex-column"
					style={{ marginTop: '100px' }}
				>
					<div className="login-logo">
						{emailText.verified === null ? null : emailText.verified ? (
							<VerifyIcon height="100" width="100px" />
						) : (
							<UnVerifiedIcon height="100" width="100px" />
						)}
					</div>
					<span>{emailText.title}</span>
					<p>{emailText.msg}</p>
				</div>

				<Link href="/adminpanel" className="d-none" ref={ref}>
					Back To Login
				</Link>
			</div>
		</div>
	);
};

export default Verified;
