import React from "react";
import { Formik, Field, Form, useFormik, FormikProvider } from "formik";

export default function Input({
  title,
  children,
  type,
  id,
  s,
  onChange,
  value,
}) {
  // function validateEmail(value) {
  //   let error;

  //   if (!value) {
  //     error = "Required";
  //   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
  //     error = "Invalid email address";
  //   }

  //   return error;
  // }
  // const formik = useFormik({
  //   initialValues: {
  //     email: "",
  //     password: "",
  //     toggle: false,
  //   },
  // });
  return (
    <div>
      <div className="relative my-8 w-full">
        <label className="absolute bg-primary-white right-px   text-sm font-medium  text-black  -translate-y-1/2 ">
          {title}
        </label>

        {/* <input
            type="text"
            id="username"
            required
            className="border-black px-3 py-2 w-full rounded-2xl  border-[1px]  focus:outline-none focus:ring focus:ring-blue-300"
          /> */}
        <Field
          id={id}
          s={id}
          type={type}
          onChange={onChange}
          value={value}
          // id="email"
          // name="email"
          // type="email"
          // onChange={formik.handleChange}
          // value={formik.values.email}
         
          className="border-black px-3 py-2 w-full rounded-2xl  border-[1px]  focus:outline-none focus:ring focus:ring-blue-300"
        />
        {/* {formik.errors.email && formik.touched.email && (
            <div className=" text-red-600">{formik.errors.email}</div>
          )} */}
      </div>
    </div>
  );
}
