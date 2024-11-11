import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateCurrentUser,
  updateProfile,
} from "firebase/auth";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { auth } from "./firebase.init";
import { FaEye, FaRegEyeSlash } from "react-icons/fa";

const Register = () => {
  const [success, setSuccess] = useState(false);
  const [showpassword, setShowpassword] = useState(false);
  const [errormassage, seterrormassage] = useState("");
  const handaleResistar = (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;
    const name = event.target.name.value;
    const photo = event.target.photo.value;
    const terms = event.target.terms.checked;
    console.log(email, password, terms, name, photo);
    seterrormassage("");
    setSuccess(false);
    if (!terms) {
      seterrormassage("Accept our terms And Condition");
      return;
    }

    if (password.length < 6) {
      seterrormassage("dos 6 charatro passowrd deo ");
      return;
    }
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!passwordRegex.test(password)) {
      seterrormassage(
        "at lest one uppercase,one lowercase,one number,one special character"
      );
      return;
    }

    createUserWithEmailAndPassword(auth, email, password, terms)
      .then((result) => {
        console.log(result.user);

        sendEmailVerification(auth.currentUser).then(() => {
          console.log("verificationEmailsend");
          const profile = {
            displayName: name,
            photoURL: photo,
          };
          updateProfile(auth.currentUser, profile)
            .then(() => console.log("update profile "))
            .catch((error) => console.log("update profile broblem"));
        });
      })
      .catch((error) => {
        console.log("ERRoR", error.message);
        seterrormassage(error.message);
        setSuccess(false);
      });
  };

  return (
    <div>
      <div className="hero  min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left"></div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form className="card-body" onSubmit={handaleResistar}>
              <h1 className="text-3xl font-bold">Create an account</h1>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Your email</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="name"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">photo url</span>
                </label>
                <input
                  type="text"
                  name="photo"
                  placeholder="photo"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Your email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="name@gmail.com"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control relative ">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  name="password"
                  type={showpassword ? "text" : "password"}
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowpassword(!showpassword)}
                  className=" btn btn-xs absolute right-4 top-12"
                >
                  {showpassword ? (
                    <FaRegEyeSlash></FaRegEyeSlash>
                  ) : (
                    <FaEye></FaEye>
                  )}
                </button>

                <label className="label"></label>
              </div>
              <div>
                <div className="form-control">
                  <label className="label justify-start  cursor-pointer">
                    <input type="checkbox" name="terms" className="checkbox" />
                    <span className="ml-3 label-text">
                      Accept our terms And Condition
                    </span>
                  </label>
                </div>
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">
                  Create an account
                </button>
                <NavLink to="/login" className="mt-3 text-2xl font-bold">
                  Login here
                </NavLink>
              </div>
            </form>
            <div>
              {errormassage && <p className="text-red-600">{errormassage}</p>}
              {success && <p className="text-green-700">Sign Up successfuli</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
