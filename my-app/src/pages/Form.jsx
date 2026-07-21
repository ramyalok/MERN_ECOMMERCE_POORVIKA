import React from 'react'
import { useFormik } from "formik";
import * as Yup from "yup";
const Form = () => {
// instead of usestate we use useformik
  // here we have to give initaial values
  // /const formik = useFormik({ initialValues: {},validationSChema:Yup.object({}),onsubmit:()=>{},  });
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmpassword: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, "*minimum 3 characters")
        .max(10, "*max 10 character")
        .required("*name is required"),

      email: Yup.string().email("*invalid email").required("*email is required"),

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
    }),

    onSubmit: (values) => {
      alert("Login successfully");
      console.log(values);
    },
  });


  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-100"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d')",
      }}
    >
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-96"
      >
        <h2 className="text-2xl text-violet-600 font-bold mb-6 text-center">
          Login
        </h2>

        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          onChange={formik.handleChange}
          value={formik.values.name}
          className="w-full p-2 mb-1 border-2  rounded-xl border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
        />
        <p className="text-red-500 text-lg mb-3">{formik.errors.name}</p>

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          onChange={formik.handleChange}
          value={formik.values.email}
          className="w-full p-2 mb-1 border-2  rounded-xl border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
        />
        <p className="text-red-500 text-lg mb-3">{formik.errors.email}</p>

        {/* Password */}
        <input
          type="text"
          name="password"
          placeholder="Enter your password"
          onChange={formik.handleChange}
          title="1 uppercase, 1 lowercase, 1 digit(s), 1 symbol(s), 6-8 length"
          value={formik.values.password}
          className="w-full p-2 mb-1 border-2  rounded-xl border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
        />
        <p className="text-red-500 text-lg mb-3">{formik.errors.password}</p>

        {/* Confirm Password */}
        <input
          type="password"
          name="confirmpassword"
          placeholder="Confirm password"
          onChange={formik.handleChange}
          value={formik.values.confirmpassword}
          className="w-full p-2 mb-1 border-2  rounded-xl border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
        />
        <p className="text-red-500 text-lg mb-3">
          {formik.errors.confirmpassword}
        </p>

        <button
          type="submit"
          className="w-full bg-violet-500 text-white p-2 rounded hover:bg-violet-600 transition-colors duration-300 font-bold"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Form