import React from "react";
import googlelogo from "../Assests/logos/GoogleLogo.svg";

const GoogleButton = () => {
  return (
    <div>
      <button
        className="bg-white text-black flex shadow-md rounded-lg p-2 m-2"
        dir="ltr"
        disabled
      >
        <img src={googlelogo} alt="Google" className="h-6 w-6" />
        Google
      </button>
    </div>
  );
};

export default GoogleButton;
