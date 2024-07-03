import React from "react";
import Input from "../Components/Input";
import Button from "../Components/Button";
import FacebookButton from "../Components/FacebookButton";
import GoogleButton from "../Components/GoogleButton";
import AppleButton from "../Components/AppleButton";
import LoginImage from "../Assests/images/LoginImage.png";
import { useFormik, FormikProvider, Field } from "formik";

import axios from "axios";
//////// كود الريفريش شغال حاليا
const Chat = () => {
  const formik = useFormik({
    initialValues: {},

    onSubmit: async (values, { setErrors }) => {
      const token = localStorage.getItem("access_token");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      axios
        .post(
          "https://task5-lina-sulaiman.trainees-mad-s.com/api/auth/refresh-token",
          {},
          config
        )
        .then((response) => {
          console.log("Login successful", response.data);
          localStorage.setItem("access_token", response.data.access_token);

          const access_token = localStorage.getItem("access_token");
          console.log(access_token);
        })
        .catch((error) => {
          // Handle errors
          console.error("There was an error!", error);
        });
    },
  });
  return (
    <div className="relative h-full bg-contain flex items-center justify-center">
      <div
        className="  absolute top-20 bg-contain bg-no-repeat flex items-center justify-center rounded-lg  w-[700px] h-[440px] "
        style={{ backgroundImage: `url(${LoginImage})` }}
      >
        <div className="min-h-screen flex items-center justify-center ">
          <form
            onSubmit={formik.handleSubmit}
            className="bg-white shadow-md rounded-lg p-8 max-w-md w-full"
          >
            <h2 className="text-2xl font-bold text-center mb-8">
              تسجيل الدخول
            </h2>
            <div className="relative my-8 w-full">
              <label className="absolute bg-primary-white right-px   text-sm font-medium  text-black  -translate-y-1/2 ">
                الايميل
              </label>
              <input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className="border-black px-3 py-2 w-full rounded-2xl  border-[1px]  focus:outline-none focus:ring focus:ring-blue-300"
              />
              {formik.touched.user_name && formik.errors.user_name ? (
                <div className=" text-red-600">{formik.errors.user_name}</div>
              ) : null}
            </div>
            <div className="relative my-8 w-full">
              <label className="absolute bg-primary-white right-px   text-sm font-medium  text-black  -translate-y-1/2 ">
                كلمة المرور
              </label>
              <input
                id="password"
                name="password"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className="border-black px-3 py-2 w-full rounded-2xl  border-[1px]  focus:outline-none focus:ring focus:ring-blue-300"
              />
              {formik.touched.user_name && formik.errors.user_name ? (
                <div className=" text-red-600">{formik.errors.user_name}</div>
              ) : null}
            </div>
            <div className="relative my-8 w-full">
              <label className="absolute bg-primary-white right-px   text-sm font-medium  text-black  -translate-y-1/2 ">
                رقم الهاتف
              </label>
              <input
                id="phone_number"
                name="phone_number"
                type="phone_number"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone_number}
                className="border-black px-3 py-2 w-full rounded-2xl  border-[1px]  focus:outline-none focus:ring focus:ring-blue-300"
              />
              {formik.touched.user_name && formik.errors.user_name ? (
                <div className=" text-red-600">{formik.errors.user_name}</div>
              ) : null}
            </div>

            <Button>تسجيل الدخول</Button>
            {/* <form dir="rtl  ">
                <div className="text-center">
                  <p className="text-gray-600">
                    ليس لديك حساب؟
                    <a href="/#" className="text-indigo-500 m-2">
                      إنشاء حساب
                    </a>
                    <a href="/#" className="text-indigo-500 m-2">
                      نسيت كلمة المرور
                    </a>
                  </p>
                </div>
                <div className="text-center mt-4">
                  <p className="text-gray-600">أو</p>
                  <div className="flex justify-around items-center">
                    <GoogleButton />
                    <AppleButton />
                    <FacebookButton />
                  </div>
                </div>
              </form> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
