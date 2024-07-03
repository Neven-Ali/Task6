//الكود الجاهز من أجل ال signup
import { React, useState } from "react";
import { Field, useFormik, FormikProvider } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
//.........................................
import Button from "../Components/Button";
import FacebookButton from "../Components/FacebookButton";
import GoogleButton from "../Components/GoogleButton";
import AppleButton from "../Components/AppleButton";
import uploadlogo from "../Assests/logos/Upload.svg";
import SignupImage from "../Assests/images/Signup.png";

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Required"),
    user_name: Yup.string()
      .min(3, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    phone_number: Yup.string()
      .matches(
        /^963 \d{9}$/,
        'Invalid phone number format. It should be like "963 985562218".'
      )
      .required("Phone number is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters long")
      .required("Password is required"),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Password confirmation is required"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      user_name: "",
      phone_number: "",
      password: "",
      password_confirmation: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      localStorage.setItem("username", values.user_name);
      localStorage.setItem("email", values.email);

      try {
        const response = await axios.post(
          "https://task5-lina-sulaiman.trainees-mad-s.com/api/auth/register",
          values
        );
        const token = response.data.token;
        if (response.status >= 200 && response.status <= 250) {
          localStorage.setItem("access_token", token);
          // localStorage.setItem("Email", values.email);

          alert(response.data.message + " Please verify your email.");
          navigate("/verify");
        } else {
          alert("Signup failed: " + response.data.message);
        }
        console.log("User signed up successfully:", response.data);
        // console.log(token);
        console.log(localStorage);
        // const Email = localStorage.getItem("Email");
        // console.log(Email);
        console.log("finish signup");
      } catch (error) {
        console.error("There was an error signing up!", error);
      }
    },
  });
  return (
    <FormikProvider value={formik}>
      <div
        className="relative bg-cover bg-center h-screen"
        style={{ backgroundImage: `url(${SignupImage})` }}
      >
        <div
          className="absolute inset-y-0 right-0 grid grid-cols-2 gap-4 bg-white shadow-md rounded-lg p-8 w[250px] "
          dir="rtl"
        >
          <form className="row-span-1 col-span-2">
            <h2 className="text-2xl font-bold text-center mb-8">إنشاء حساب</h2>
          </form>
          <form onSubmit={formik.handleSubmit} className="">
            <div className="mb-4 " dir="rtl">
              <div className="relative my-8 w-full">
                <label className="absolute bg-primary-white right-px   text-sm font-medium  text-black  -translate-y-1/2 ">
                  الايميل
                </label>
                <Field
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
                  اسم المستخدم
                </label>
                <Field
                  id="user_name"
                  name="user_name"
                  type="user_name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.user_name}
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
                <Field
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
                  كلمة المرور
                </label>
                <Field
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
              <div className="relative my-8 w-full">
                <label className="absolute bg-primary-white right-px   text-sm font-medium  text-black  -translate-y-1/2 ">
                  تأكيد كلمة المرور
                </label>
                <Field
                  id="password_confirmation"
                  name="password_confirmation"
                  type={showConfirmPassword ? "text" : "password"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password_confirmation}
                  className="border-black px-3 py-2 w-full rounded-2xl  border-[1px]  focus:outline-none focus:ring focus:ring-blue-300"
                />
                <span
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{
                    position: "absolute",
                    left: "10px",
                    top: "50%",
                    transform: "translateY(-80%)",
                    cursor: "pointer",
                  }}
                >
                  {showConfirmPassword ? "🙈" : "👁️"}
                </span>
                {formik.touched.password_confirmation &&
                formik.errors.password_confirmation ? (
                  <div className=" text-red-600">
                    {formik.errors.password_confirmation}
                  </div>
                ) : null}
              </div>
            </div>
          </form>
          <form onSubmit={formik.handleSubmit} className="">
            <div>
              <div className="mb-4 bg-slate-300  p-4 outline-dashed outline-1 rounded-lg ">
                <label
                  className="block text-gray-700 text-sm text-right font-bold mb-2"
                  htmlFor="personalPhoto"
                >
                  الصورة الشخصية
                </label>
                <div className="flex text-xs text-right">
                  <p>اسحب و افلت الصورة هنا او قم برفعها من الملفات</p>
                  <img src={uploadlogo} alt="uploadlogo" />
                </div>
                <p className="text-xs text-gray-500 text-right mt-1">
                  الحجم الأقصى: 2MB
                </p>
              </div>

              <div
                className="mb-4 bg-slate-300  p-4 outline-dashed outline-1 rounded-lg "
                dir="rtl"
              >
                <label
                  className="block text-gray-700 text-sm text-right font-bold mb-2"
                  htmlFor="personalPhoto"
                >
                  إثبات شخصية
                </label>
                <div className="flex text-xs">
                  <p>اسحب و افلت الصورة هنا او قم برفعها من الملفات</p>
                  <img src={uploadlogo} alt="uploadlogo" />
                </div>
                <p className="text-xs text-gray-500 text-right mt-1">
                  الحجم الأقصى: 1MB
                </p>
              </div>
            </div>
            <Button type="submit">إنشاء حساب</Button>

            <div className="text-center">
              <p className="text-gray-600">
                لديك حساب؟
                <a href="/login" className="text-indigo-500">
                  تسجيل الدخول
                </a>
              </p>
            </div>
          </form>
          <form className="row-span-1 col-span-2">
            <div className=" text-center ">
              <p className="text-gray-600 mb-4">أو</p>
              <div className="flex justify-center  items-center text-center ">
                <div className="flex max-w-96">
                  <FacebookButton />
                  <AppleButton />
                  <GoogleButton />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </FormikProvider>
  );
};

export default SignupForm;
