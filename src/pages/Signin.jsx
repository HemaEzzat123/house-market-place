import { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import OAuth from "../components/OAuth";
import ArrowRightIcon from "../assets/svg/keyboardArrowRightIcon.svg?react";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";
function Signin() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const navigate = useNavigate();
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  const onsubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential.user) {
        toast.success("Logged In Successfully");
        navigate("/");
      }
    } catch (error) {
      toast.error("Bad User Credentials");
    }
  };
  return (
    <>
      <div>
        <div className="pageContainer">
          <header>
            <p className="pageHeader">Welcome Back!</p>
          </header>
          <main>
            <form onSubmit={onsubmit}>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Email"
                  id="email"
                  className="emailInput"
                  value={email}
                  onChange={onChange}
                />
              </div>

              <div className="passwordInputDiv">
                <input
                  type={showPassword ? "text" : "password"}
                  className="passwordInput"
                  placeholder="Password"
                  id="password"
                  value={password}
                  onChange={onChange}
                />
                <img
                  src={visibilityIcon}
                  alt="show password"
                  className="showPassword"
                  onClick={() => setShowPassword((prevState) => !prevState)}
                />
              </div>
              <Link to="/forgot-password" className="forgotPasswordLink">
                Forgot Password
              </Link>

              <div className="signInBar">
                <p className="signInText">Sign In</p>
                <button className="signInButton">
                  <ArrowRightIcon fill="#fff" width="34px" height="34px" />
                </button>
              </div>
            </form>

            <OAuth />

            <Link to="/sign-up" className="registerLink">
              Sign Up Instead
            </Link>
          </main>
        </div>
      </div>
    </>
  );
}
export default Signin;
