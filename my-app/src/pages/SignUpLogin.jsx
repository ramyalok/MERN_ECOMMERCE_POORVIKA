import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

//import apiauth from utils with baseurl of  backend
import { registerUser, loginUser } from "../utils/ApiAuth";
import { setUser } from "../feature/authSlice";

const SignUpLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentUser, error } = useSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmpassword: "",
    },
    validationSchema: Yup.object(
      isLogin
        ? {
            email: Yup.string()
              .email("*invalid email")
              .required("*email is required"),

            password: Yup.string()
              .min(6, "*minimum 6 characters")
              .matches(
                /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}$/,
                "Password must contain uppercase, lowercase, number and min 6 chars",
              )
              .required("*password is required"),
          }
        : {
            username: Yup.string()
              .min(3, "*minimum 3 characters")
              .max(20, "*max 20 characters")
              .required("*username is required"),

            email: Yup.string()
              .email("*invalid email")
              .required("*email is required"),

            password: Yup.string()
              .min(6, "*minimum 6 characters")
              .matches(
                /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}$/,
                "Password must contain uppercase, lowercase, number and min 6 chars",
              )
              .required("*password is required"),

            confirmpassword: Yup.string()
              .oneOf([Yup.ref("password")], "*password must match")
              .required("*confirm password is required"),
          },
    ),

    onSubmit: async (values) => {
      if (isLogin && !rememberMe) {
        toast.error("Please check Remember Me");

        return;
      }

      if (isLogin) {
        await handleLogin(values);
        return;
      } else {
        await handleSignup(values);
      }
    },
  });
  // ✅ Signup
  const handleSignup = async (values) => {
    try {
      const res = await registerUser({
        username: values.username,
        email: values.email.trim().toLowerCase(),
        password: values.password,
      });
      //getting backend response sucess register
      toast.success(res.data.message);
      setIsLogin(true);
      formik.resetForm();
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };
 

  const handleLogin = async (values) => {
    try {
      const res = await loginUser({
        email: values.email.trim().toLowerCase(),
        password: values.password,
      });
      dispatch(
        setUser({
          user: res.data.data,
          token: res.data.token,
        }),
      ); //stores the token
      localStorage.setItem("token", res.data.token);
      toast.success("Login Successful ✅");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };
 
  return (
    <>
      <div className="flex items-center bg-white min-h-screen ">
        <div className=" mx-auto ">
          <div className="flex flex-col lg:flex-row rounded-xl  gap-4 shadow-xl overflow-hidden  ">
            {/* leftside */}
            <div className="lg:w-1/2">
              <div
                className={`flex flex-col justify-center transition-all duration-500 ${
                  isLogin
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-1 opacity-200"
                }`}
              >
                <img
                  width="100px"
                  height="100px"
                  className="  rounded-xl shadow-lg object-cover hover:scale-100 hover:-translate-y-2
                         hover:shadow-xl m-2 "
                  src="/images/logo.png"
                  alt="founder"
                />
                <h3 className="text-2xl md:text-3xl text-gray-700 mb-1 font-bold text-center">
                  {isLogin ? "Welcome Back Buddy!" : "Create Account"}
                </h3>
                <p className="text-gray-600 text-center mb-1">
                  {isLogin ? "Login to Account" : "SignUp To The Account"}
                </p>

                {/* authentication form  using yup*/}
                <form
                  onSubmit={formik.handleSubmit}
                  className="bg-white p-5 sm:p-6 lg:p-7 rounded-2xl shadow-lg"
                >
                  {/* first name Last name */}
                  {!isLogin && (
                    <div className="grid grid-cols-1">
                      {/* Add name fields here */}
                      <div>
                        <label className="block text-gray-700 font-medium mb-1">
                          UserName
                        </label>
                        <input
                          type="text"
                          name="username"
                          placeholder="Enter your first name"
                          onChange={formik.handleChange}
                          value={formik.values.username}
                          className="w-full px-4 py-3 border border-gray-700 rounded-xl outline-none transition-all duration-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 hover:border-gray-400"
                        />
                        <p className="text-red-500 text-lg mb-3">
                          {formik.touched.username && formik.errors.username}
                        </p>
                      </div>
                    </div>
                  )}
                  {/* Email */}
                  <div className="mt-2">
                    <label className="block text-gray-700 font-medium mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      // onChange={formik.handleChange}
                      onChange={(e) =>
                        formik.setFieldValue(
                          "email",
                          e.target.value.trimStart().toLowerCase(),
                        )
                      }
                      value={formik.values.email}
                      className="w-full px-4 py-3 border border-gray-700 rounded-xl outline-none transition-all duration-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 hover:border-gray-400"
                    />
                    <p className="text-red-500 text-lg mb-3">
                      {formik.touched.email && formik.errors.email}
                    </p>
                  </div>
                  {/* Password */}
                  <div className=" mt-2">
                    <label className="block text-gray-700 font-medium mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Enter your password"
                        onChange={formik.handleChange}
                        title="1 uppercase, 1 lowercase, 1 digit(s), 1 symbol(s), 6-8 length"
                        value={formik.values.password}
                        className="leading-6 text-base  w-full pl-4 pr-12 py-3 border border-gray-700 rounded-xl outline-none transition-all duration-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 hover:border-gray-400"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>

                    <p className="text-red-500 text-lg mb-3">
                      {formik.touched.password && formik.errors.password}
                    </p>
                  </div>
                  {/* Confirm Password */}
                  {!isLogin && (
                    <div className="mb-4 mt-2">
                      <label className="block text-gray-700 font-medium mb-1">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          name="confirmpassword"
                          placeholder="Enter your confirm password"
                          onChange={formik.handleChange}
                          title="1 uppercase, 1 lowercase, 1 digit(s), 1 symbol(s), 6-8 length"
                          value={formik.values.confirmpassword}
                          className="leading-6 text-base w-full pl-4 pr-12 py-3 border border-gray-700 rounded-xl outline-none transition-all duration-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 hover:border-gray-400"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="absolute right-4 top-1/2 -transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                          {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>

                      <p className="text-red-500 text-lg mb-3">
                        {formik.touched.confirmpassword &&
                          formik.errors.confirmpassword}
                      </p>
                    </div>
                  )}

                  {/* rember Checkup */}
                  {isLogin && (
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          className="w-4 h-4"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                        />
                        <span className="text-sm text-gray-700 font-semibold">
                          Remember Me
                        </span>
                      </div>
                      <span
                        onClick={() => navigate("/forgotpassword")}
                        className="text-amber-600 text-sm font-semibold cursor-pointer hover:underline"
                      >
                        Forgot Password?
                      </span>
                    </div>
                  )}

                  {/* login btn */}
                  <div className="mt-6 mb-2"></div>
                  <button
                    type="submit"
                    className="w-full bg-amber-600  text-white cursor-pointer py-2 rounded font-bold"
                  >
                    {isLogin ? "Login" : "SignUP"}
                  </button>
                  <p className="text-sm text-center text-gray-700 mt-2">
                    {isLogin
                      ? "Don't have a account"
                      : "If you have already account"}
                    <span
                      className="text-amber-600 cursor-pointer hover:underline ml-2"
                      onClick={() => {
                        setIsLogin(!isLogin);
                      }}
                    >
                      {isLogin ? "SignUp" : "Login"}
                    </span>
                  </p>
                </form>
              </div>
            </div>

            {/* rightside  animate-fadeIn*/}
            <div
              className="hidden xl:flex w-1/2 relative items-center justify-center bg-cover bg-center text-white  animate-fadeIn p-5 "
              style={{ backgroundImage: "url('/images/b2.jpg')" }}
            >
              <div className="absolute inset-0 bg-black opacity-40 rounded-lg"></div>

              <div className="relative text-center">
                <h3 className="text-3xl font-bold">
                  {isLogin
                    ? "Login Your Account and Explore It"
                    : "SignUp Your Account and Explore It"}
                  {/*  Login Your Account and Explore It */}
                </h3>
                <p className="max-w-sm mx-auto mt-3">
                  Try to explore our Poorvika app, reach your monthly purchases, and
                  be connected with Poorvika.
                </p>
                <button
                  type="button"
                  className="mt-6 p-4 border-2 border-none rounded-xl shadow cursor-pointer font-bold text-gray-700 bg-white  "
                >
                  {isLogin ? " Login an Account" : " Create an Account"}
                  {/* Create an Account */}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpLogin;
