import CodeEmail from "../Components/CodeEmail";
import LoginImage from "../Assests/images/LoginImage.png";
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { refreshAccessToken } from "../Components/Api";
export default function VerifyEmail() {
  const [timeLeft, setTimeLeft] = useState(0); // Initialize with 0 so the button is enabled initially
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    let ref=setInterval(() => {
      let token = localStorage.getItem("access_token");

      refreshAccessToken(localStorage.getItem("access_token"));
    }, 2 * 1000 * 60);
    

    let timer;
    if (isButtonDisabled && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsButtonDisabled(false);
    }

    return () => clearInterval(timer,ref);
  }, [isButtonDisabled, timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? `0${secs}` : secs}`;
  };
  const user_name = localStorage.getItem("username");
  const email = localStorage.getItem("email");
  const formik = useFormik({
    initialValues: {},
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setIsButtonDisabled(true);
        setTimeLeft(180); // Set timer to 3 minutes
        const response = await axios.post(
          "https://task5-lina-sulaiman.trainees-mad-s.com/api/auth/resend-code",
          values
        );
        const token = response.data.token;

        setSubmitting(false);
        if (response.status >= 200 && response.status <= 250) {
          console.log("verification code re-send successfully", response.data);

          // navigate("/verify");
        } else {
          alert("failed: " + response.data.message);
        }

        // localStorage.setItem("access_token", response.data.access_token);

        const access_token = localStorage.getItem("access_token");
        console.log(access_token);
      } catch (error) {
        console.error("There was an error!", error);
        setIsButtonDisabled(false);
        setSubmitting(false);
      }
    },
  });

  return (
    <div className=" translate-x-32 ">
      <div className="relative h-full bg-contain flex items-center justify-center">
        <div
          className="  absolute top-20 bg-contain bg-no-repeat flex items-center justify-center rounded-lg  w-[1000px] h-[440px] "
          style={{ backgroundImage: `url(${LoginImage})` }}
        ></div>

        <div className="absolute top-20  bg-primary-white-l  px-14 py-8 rounded-lg w-[450px] h-[440px]">
          <h2 className=" text-primary-blue-dark text-center text-2xl font-bold  ">
            {user_name}مرحباً بك
          </h2>
          <div className="my-9 flex justify-around text-sm">
            :({email}) لقد تم إرسال رمز التأكيد إلى
          </div>
          <CodeEmail />
          <form onSubmit={formik.handleSubmit}>
            <div className="my-9 flex justify-around text-sm">
              د{isButtonDisabled && <div>{formatTime(timeLeft)}</div>}إذا لم
              يصلك الرمز يمكنك إعادة المحاولة بعد
            </div>

            <button
              type="submit"
              disabled={isButtonDisabled || formik.isSubmitting}
              className={`hover:bg-primary-green: !isButtonDisabled text-primary-blue-dark border-[1px] border-black font-bold py-2 px-4 m-3 max-w-96 rounded-2xl focus:outline-none focus:shadow-outline w-full ${"secondary"}`}
            >
              إعادة الإرسال
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
