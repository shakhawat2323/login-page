import React, { useRef, useState } from "react";
import { IoLogoFacebook } from "react-icons/io5";
import { FaGoogle } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./firebase.init";

const Login = () => {
  const [success, setSuccess] = useState(false);
  const [loginError, setLoginError] = useState("");
  const emailref = useRef();
  const Loginform = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);
    setSuccess(false);
    setLoginError("");
    signInWithEmailAndPassword(auth, email, password)
      .then((reuslt) => {
        console.log(reuslt.user);
        if (!reuslt.user.emailVerified) {
          setLoginError("plz verification your email");
          return;
        } else {
          setSuccess(true);
        }
      })
      .catch((error) => {
        console.log("ERROR", error.message);
        setSuccess(false);
        setLoginError(error.message);
      });
  };
  const forgotpassword = () => {
    console.log("notpassword", emailref.current.value);
    const email = emailref.current.value;
    if (!email) {
      console.log("plz provid your vaild email addresh");
    } else {
      sendPasswordResetEmail(auth, email).then(() => {
        alert("password rest chek your email");
      });
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={Loginform} className="card-body">
            <h1 className="text-3xl font-bold">Login to account</h1>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                ref={emailref}
                placeholder="email"
                name="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <a
                  onClick={forgotpassword}
                  href="#"
                  className="label-text-alt link link-hover"
                >
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
              <p className="mt-3 text-xl font-bold">Or login with</p>
            </div>
            <div className="flex justify-center gap-5">
              <button>
                <IoLogoFacebook className="text-blue-500 text-3xl"></IoLogoFacebook>
              </button>
              <button>
                <FaGoogle className=" text-[#E94235] text-3xl"></FaGoogle>
              </button>
              <button>
                <FaSquareXTwitter className="  text-3xl"></FaSquareXTwitter>
              </button>
            </div>
            <div className="mt-3 text-2xl font-bold">
              <NavLink to="/register">Register new account</NavLink>
            </div>
          </form>
          {success && <h1 className="text-green-700"> Login successfuli</h1>}
          {loginError && <h1 className="text-red-800">{loginError}</h1>}
        </div>
      </div>
    </div>
  );
};

export default Login;
