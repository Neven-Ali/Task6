import BackgroundImage from "../Assests/images/backgroundImage.png";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import axios from "axios";
import { refreshAccessToken } from "../Components/Api";
import React, { useState, useEffect } from "react";

export default function HomePage() {
  const isLoggedin = localStorage.getItem("access_token") != "";
  useEffect(() => {
    let ref = setInterval(() => {
      let token = localStorage.getItem("access_token");

      refreshAccessToken(localStorage.getItem("access_token"));
    }, 2 * 1000 * 60);
    return () => clearInterval(ref);
  });
  return (
    <div className="flex flex-col ">
      <div
        className="relative bg-cover bg-center h-screen"
        style={{ backgroundImage: `url(${BackgroundImage})` }}
      >
        <Header isLoggedin={isLoggedin} />

        <section className="flex  items-start justify-center p-6">
          <div className="flex flex-col items-center justify-center md:w-2/4 ">
            <div className=" text-primary-green container m-5  text-center  ">
              Assistify احصل على الإقامة التركية بكل سهولة مع
            </div>
            <div className="text-primary-white container m-5 text-center text-4xl  ">
              استثمر من أي مكان في العالم واحصل على الإقامة التركية
            </div>
            <div className="text-primary-green text-center container  m-5 ">
              استمتع بمجموعة من الفوائد عن طريق استثمار الحد الأدنى 200,000
              دولار أمريكي من خلال منصتنا
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
