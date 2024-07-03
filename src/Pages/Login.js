import { React, useState } from "react";
import Input from "../Components/Input";
import Button from "../Components/Button";
import FacebookButton from "../Components/FacebookButton";
import GoogleButton from "../Components/GoogleButton";
import AppleButton from "../Components/AppleButton";
import LoginImage from "../Assests/images/LoginImage.png";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import Api from "../Components/Api";
import axios from "axios";
import * as Yup from "yup";

const Login = () => {
  const [status, setStatus] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Required"),
    phone_number: Yup.string()
      .matches(/^963 \d{9}$/, 'phone number should be like "963 985562218"')
      .required("Phone number is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters long")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      phone_number: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values, { setErrors }) => {
      // console.log("hi", localStorage.getItem("access_token"));
      try {
        const response = await axios.post(
          "https://task5-lina-sulaiman.trainees-mad-s.com/api/auth/login",
          values
        );
        setStatus(response.status);

        if (response.status >= 200 && response.status <= 250) {
          console.log("Login successful", response.data);
          localStorage.setItem("access_token", response.data.access_token);
          const access_token = localStorage.getItem("access_token");
          console.log(access_token);

          console.log(
            "acceess token is:",
            localStorage.getItem("access_token")
          );
          console.log("acceess token is:", localStorage);
          setError("");
          navigate("/");
        } else if (response.status === 401) {
          setError("Please verify your email");
        } else if (response.status === 422) {
          setError("Please verify your information");
        } else if (response.status === 500) {
          setError("Internal server error");
        } else {
          setError(`Unexpected status code: ${response.status}`);
        }
      } catch (error) {
        if (error.response) {
          setStatus(error.response.status);
          setError(
            `Error: ${
              error.response.data.message || "Please verify your information"
            }`
          );
        } else if (error.request) {
          // The request was made but no response was received
          setError("No response received from the server");
        } else {
          // Something happened in setting up the request that triggered an Error
          setError(`Error: ${error.message}`);
        }
      }
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
            dir="rtl"
          >
            <h2 className="text-2xl font-bold text-center mb-8">
              تسجيل الدخول
            </h2>
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
              {formik.touched.phone_number && formik.errors.phone_number ? (
                <div className=" text-red-600">
                  {formik.errors.phone_number}
                </div>
              ) : null}
            </div>
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

              {formik.touched.email && formik.errors.email ? (
                <div className=" text-red-600">{formik.errors.email}</div>
              ) : null}
            </div>
            <div className="relative my-8 w-full">
              <label className="absolute bg-primary-white right-px   text-sm font-medium  text-black  -translate-y-1/2 ">
                كلمة المرور
              </label>

              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className="border-black px-3 py-2 w-full rounded-2xl  border-[1px]  focus:outline-none focus:ring focus:ring-blue-300"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  left: "10px",
                  top: "50%",
                  transform: "translateY(-80%)",
                  cursor: "pointer",
                }}
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
              {formik.touched.password && formik.errors.password ? (
                <div className=" text-red-600">{formik.errors.password}</div>
              ) : null}
            </div>
            {/* {status && <p>Status: {status}</p>} */}
            {data && <p style={{ color: "green" }}>{JSON.stringify(data)}</p>}
            {error && <p style={{ color: "red" }}> {error}</p>}
            <Button>تسجيل الدخول</Button>
            <div dir="rtl  ">
              <div className="text-center">
                <p className="text-gray-600">
                  ليس لديك حساب؟
                  <a href="/signup" className="text-indigo-500 m-2">
                    إنشاء حساب
                  </a>
                  <a href="/refresh" className="text-indigo-500 m-2">
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
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
