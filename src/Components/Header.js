import React from "react";
import Button from "../Components/Button";
import { ReactComponent as Logo } from "../Assests/logos/Logo.svg";
import { useNavigate } from "react-router-dom";
const Header = ({ isLoggedin }) => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    if (isLoggedin) {
      navigate("/logout");
    } else {
      navigate("/signup");
    }
  };
  return (
    <header className="bg-white flex  shadow-md py-2 ">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="flex ">
          <Button> ابدأ</Button>
          <Button onClick={handleLoginClick}>
            {" "}
            {isLoggedin ? "سجل الخروج" : "سجل الدخول"}
          </Button>
        </div>
        <div>
          <nav className="flex flex-row-reverse space-x-5 space-x-reverse ">
            <a href="#/" className="text-gray-700 hover:text-gray-900">
              العقارات
            </a>
            <a href="#/" className="text-gray-700 hover:text-gray-900">
              حول
            </a>
            <a href="#/" className="text-gray-700 hover:text-gray-900">
              برامج الجنسية لدى اسيستفاي
            </a>
            <a href="#/" className="text-gray-700 hover:text-gray-900">
              البيع
            </a>
            <a href="#/" className="text-gray-700 hover:text-gray-900">
              المزيد
            </a>
          </nav>
        </div>
        <Logo />
      </div>
    </header>
  );
};

export default Header;
