import React from "react";
export default function Button({
  title,
  children,
  onClick,
  type,
  color = "secondary",
}) {
  const colorClasses = {
    primary: "bg-primary-green",
    secondary: "bg-slate-200 ",
    danger: "bg-red-900 ",
 
  };
  return (
    <div>
      
      <button
        type="submit"
        className={`hover:bg-primary-green text-primary-blue-dark border-[1px] border-black font-bold py-2 px-4 m-3 max-w-96 rounded-2xl focus:outline-none focus:shadow-outline w-full ${colorClasses[color]}`}
        onClick={onClick }
        
      >
        {children}
      </button>
    </div>
  );
}
