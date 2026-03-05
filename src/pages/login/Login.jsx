import React, { useCallback, useState } from "react";
// import "./login.css";
import { InputField, PrimaryButton } from "../../components";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from "../../store/auth/authActions";
import { isValidUsername } from "../../Validation/Validation";
import { promiseToast } from "../../utils/Toast";
import Link from "next/link";


const Login = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch()
  const navigate = useRouter();
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });
  const [userExist, setUserExist] = useState(2);
  const [loading, setLoading] = useState(false);
  const [passErr, setPassErr] = useState("");

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setUserData({ ...userData, password: newPassword });
  };

  const handleUsername = async (e) => {
    const username = e.target.value
    setUserData({ ...userData, username });
    await validateUsername(username?.trim())
  };

  const validateUsername = useCallback(async (username) => {
    if (!username.length) return setUserExist(2);
    if (!isValidUsername(username)) return setUserExist(0);
    setLoading(true);
    let res = await dispatch(loginUser({ username }));
    setLoading(false);
    setUserExist(res?.payload?.success);
  }, [setUserExist, dispatch])

  const handleSubmit = async (e) => {
    e.preventDefault();
    await promiseToast(dispatch(loginUser({ username: userData.username, password: userData.password })), "logging in...","Logged in")
  };

  return (
    <div className="login-wrapper sidespace">
      <div className="login-outer">
        <div className="login-inner">
          <div className="login-logo">
            <img src="/images/new-theme/lokmanya-new-png-logo.webp" height="100" width="100px" />
          </div>
          <form className="input-fields" onSubmit={handleSubmit}>
            <InputField
              id="email"
              type={'text'}
              label={"Login via Email Id"}
              value={userData.username}
              onChange={(e) => handleUsername(e)}
              valid={userExist}
              loading={loading}
              placeholder="Type your email.."
              required
            />
            {userExist === 1 && (
              <>
                <InputField
                  type="password"
                  id="password"
                  label={"Login Password"}
                  value={userData.password}
                  onChange={handlePasswordChange}
                  error={passErr}
                  onFocus={() => setPassErr(null)}
                  icon={false}
                  isPass={true}
                  placeholder="Type your password"
                  required
                />

                <PrimaryButton type="submit" >
                  Sign in
                </PrimaryButton>
              </>
            )}
          </form>
          <div className="forget-pass">
            <Link href="/forgot">Forgot Password</Link>
          </div>
        </div>
        <div className="copyright">
          <span>&copy; {new Date().getFullYear()} Lokmanya Hospital. All Right Reserved. Powered by <a href="https://www.hatsoffdigital.com/" target="blank"> Hats-Off</a></span>
        </div>
      </div>
    </div>
  );
};



export default Login;
