import React from "react";
import { useFormik } from "formik";
import axios from "axios";
import Button from "../Components/Button";
import LoginImage from "../Assests/images/LoginImage.png";
import { useNavigate } from "react-router-dom";
export default function Logout() {
  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate("/");
  };

  const formik = useFormik({
    initialValues: {},

    onSubmit: async (values, { setErrors }) => {
      const token = localStorage.getItem("access_token");
      console.log(token);
      localStorage.setItem("access_token", "");
      navigate("/");
      const url =
        "https://task5-lina-sulaiman.trainees-mad-s.com/api/auth/logout/122";

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await axios.post(url, {}, config);
        console.log("Logged out successfully", response.data);
        localStorage.setItem("access_token", "");
        navigate("/");
      } catch (error) {
        console.error("Logged out failed:", error);
        setErrors({ code: "Verification failed" });
        console.log("hiii");
      }
    },
  });

  return (
    <div className="relative h-full bg-contain flex items-center justify-center">
      <form
        onSubmit={formik.handleSubmit}
        className="  absolute top-40 bg-contain bg-no-repeat flex items-center justify-center rounded-lg  w-[600px] h-[255px] "
        style={{ backgroundImage: `url(${LoginImage})` }}
      >
        <div className=" flex items-center justify-center bg-gray-100 rounded-lg">
          <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold text-center mb-8">
              هل أنت متأكد من تسجيل الخروج
            </h2>

            <div>
              <div>
                <Button onSubmit>تأكيد</Button>
                <Button onClick={handleLoginClick}>تراجع</Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
