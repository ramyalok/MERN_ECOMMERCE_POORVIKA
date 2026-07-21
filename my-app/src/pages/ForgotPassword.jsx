import React, { useState } from "react";
import { sendOtp, verifyOtp, forgotpassword } from "../utils/ApiAuth";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState(""); //frontend otp 1
  // STEP 1 → SEND OTP
  const handleSendOtp = async () => {
    try {
      const res = await sendOtp({ email });
      toast.success(res.data.message);
      setGeneratedOtp(res.data.otp); // frontend otp 2
      setStep(2);
    } catch (error) {
      toast.error(error.response?.data?.message || "OTP Failed");
    }
  };

  // STEP 2 → VERIFY OTP
  const handleVerifyOtp = async () => {
    try {
      const res = await verifyOtp({ email, otp });
      toast.success(res.data.message);
      setGeneratedOtp(""); // remove shown otp 3
      setOtp(""); // clear entered otp 4
      //setOtp(""); //So OTP input becomes empty after success
      setStep(3);
    } catch (error) {
      toast.error(error.response?.data?.message || "OTP Invalid");
      navigate("/");
    }
  };

  // STEP 3 → RESET PASSWORD
  const handleResetPassword = async () => {
    if (password.length < 6) {
      toast.error("Minimum 6 characters");
      return;
    }
    try {
      const res = await forgotpassword({ email, password });
      toast.success(res.data.message);
      setGeneratedOtp(""); //frontend otp 6
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Password reset failed");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/b1.jpg')",
      }}
    >
      <div className="bg-white p-8 rounded-xl shadow-xl w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password</h2>
        {/* STEP 1 */}

        {step === 1 && (
          <>
            <input
              type="email"
              placeholder="Enter Email"
              className="w-full border p-2 rounded mb-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              onClick={handleSendOtp}
              className="w-full bg-blue-500 text-white p-2 rounded"
            >
              Send OTP
            </button>
          </>
        )}
        {/* STEP 2 */}
        {step === 2 && (
          <>
            {/* Show OTP on frntend screen step 5*/}
            {generatedOtp && (
              <div className="bg-green-100 p-2 rounded mb-3 text-center">
                OTP : {generatedOtp}
              </div>
            )}
            <input
              type="text"
              placeholder="Enter OTP"
              className="w-full border p-2 rounded mb-3"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            <button
              onClick={handleVerifyOtp}
              className="w-full bg-green-500 text-white p-2 rounded"
            >
              Verify OTP
            </button>
          </>
        )}
        {/* STEP 3 */}
        {step === 3 && (
          <>
            <input
              type="password"
              placeholder="Enter New Password"
              className="w-full border p-2 rounded mb-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              onClick={handleResetPassword}
              className=" w-full bg-purple-500 text-white p-2 rounded"
            >
              Reset Password
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
