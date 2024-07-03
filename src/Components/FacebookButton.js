import React from "react";
import facebooklogo from "../Assests/logos/FacebookLogo.svg";
const FacebookButton = () => {
  return (
    <div>
      <button
        className="bg-cyan-600 text-white flex shadow-md rounded-lg  p-2 m-2"
        dir="ltr"
        disabled
      >
        <img src={facebooklogo} alt="Facebook" className="h-6 w-6" />
        Facebook
      </button>
    </div>
  );
};

export default FacebookButton;
