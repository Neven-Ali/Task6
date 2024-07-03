import React from "react";
import applelogo from "../Assests/logos/AppleLogo.svg";

const AppleButton = () => {
  return (
    <div>
      <button
        className="bg-black text-white flex shadow-md rounded-lg p-2 m-2"
        dir="ltr"
        disabled
      >
        <img src={applelogo} alt="Apple" className="h-6 w-6" />
        Apple
      </button>
    </div>
  );
};

export default AppleButton;
