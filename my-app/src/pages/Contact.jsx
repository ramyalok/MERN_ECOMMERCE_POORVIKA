import React from 'react'
//to use formik =>npm install formik yup
import { useFormik } from "formik";
import * as Yup from "yup";
const Contact = () => {

 // instead of usestate we use useformik
  // here we have to give initaial values
  // /const formik = useFormik({ initialValues: {},validationSChema:Yup.object({}),onsubmit:()=>{},  });
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      number: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, "*minimum 3 characters")
        .max(10, "max 10 character")
        .required(" *name is required"),

      email: Yup.string().email("*invalid email").required("*email is required"),
      //  phone number only 10 digits
      number: Yup.string()
        .matches(/^(\+91)?[6-9]\d{9}$/, "Enter valid Indian number")
        .required(" *number is required"),
    }),

    onSubmit: (values) => {
      alert("our team will contact you soon");
      console.log(values);

      // after submit we can reset the form
      formik.resetForm();

    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100  ">
      <div
        className="min-h-screen  w-full flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e')",
        }}
      >
        <form
          onSubmit={formik.handleSubmit}
          className="bg-white p-8 rounded-2xl shadow-lg w-96"
        >
          <h2 className="text-2xl font-bold mb-6 text-violet-500 text-center">
            Contact Form
          </h2>

          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur} // ✅ IMPORTANT for showing error only when user has visited the field
            value={formik.values.name}
            className="w-full p-2 mb-1 border-2  rounded-xl border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
          <p className="text-red-800 text-lg mb-3">
            {formik.touched.name && formik.errors.name}{" "}
          </p>

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur} // ✅ IMPORTANT
            value={formik.values.email}
            className="w-full p-2 mb-1 border-2  rounded-xl border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
          <p className="text-red-800 text-lg mb-3">
            {formik.touched.email && formik.errors.email}
          </p>

          {/* Password */}
          <input
            type="tel"
            name="number"
            placeholder="Enter your number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur} // ✅ IMPORTANT
            title="1 uppercase, 1 lowercase, 1 digit(s), 1 symbol(s), 6-8 length"
            value={formik.values.number}
            className="w-full p-2 mb-1 border-2  rounded-xl border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
          <p className="text-red-800 text-lg mb-3">
            {formik.touched.number && formik.errors.number}
          </p>

          <button
            type="submit"
            className="w-full font-bold bg-violet-500 text-white p-2 rounded-xl hover:bg-violet-50 hover:text-violet-500 border-2 border-violet-500 transition-colors duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
 
 
    
    
 
};
 
 

 export default Contact
 
 