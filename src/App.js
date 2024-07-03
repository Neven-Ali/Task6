import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Chat from "./Components/Chat";
import MainContent from "./Pages/Logout";
import React, { useEffect } from "react";

//-------------Pages
import HomePage from "./Pages/HomePage";
import Login from "./Pages/Login";
import VerifyEmail from "./Pages/VerifyEmail";
import SignupPage from "./Pages/SignupPage";
import Logout from "./Pages/Logout";

//........................
const router = createBrowserRouter([
  {
    path: "/",

    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <SignupPage /> },
      { path: "verify", element: <VerifyEmail /> },
      { path: "refresh", element: <Chat /> },
      { path: "logout", element: <Logout /> },
    ],
  },
]);

function App() {
  
  return (
    <div className="App">
      <RouterProvider router={router}></RouterProvider>
      {/* <SignupForm/> */}
      {/* <VerifyEmail/> */}
      {/* <Basic/> */}
      {/* <Chat />
      <HomePage/> */}

      {/* <Login/> */}
    </div>
  );
}

export default App;
