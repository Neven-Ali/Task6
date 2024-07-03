//// الكود الجديد
import React, { useRef, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import Button from "../Components/Button";
import { useNavigate } from "react-router-dom";
export default function CodeEmail() {
  const [status, setStatus] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const input1Ref = useRef(null);
  const input2Ref = useRef(null);
  const input3Ref = useRef(null);
  const input4Ref = useRef(null);
  const input5Ref = useRef(null);
  const input6Ref = useRef(null);
  const formik = useFormik({
    initialValues: {
      code1: "",
      code2: "",
      code3: "",
      code4: "",
      code5: "",
      code6: "",
    },

    onSubmit: async (values, { setSubmitting, setErrors }) => {

      const token = localStorage.getItem("access_token");
      const code = `${values.code1}${values.code2}${values.code3}${values.code4}${values.code5}${values.code6}`;
      console.log("Combined Value:", code);
      const url =
        "https://task5-lina-sulaiman.trainees-mad-s.com/api/auth/confirm-code";
      const params = {
        verify_code: code,
      };

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      try {
        const response = await axios.post(url, params, config);
        setStatus(response.status);

        if (response.status >= 200 && response.status <= 250) {
          setData(response.data.message);
          console.log("Verification successful:", response.data);
          setError("");
          alert(response.data.message);
          navigate("/");
        } else if (response.status === 404) {
          setError("Invalid code");
        } else if (response.status === 401) {
          setError("neven");
        } else if (response.status === 500) {
          setError("Internal server error");
        } else {
          setError(`Unexpected status code: ${response.status}`);
        }
      } catch (error) {
        // alert("Invalid code: " + response.data.message);
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          setStatus(error.response.status);
          setError(
            `Error: ${error.response.data.message || "Something went wrong"}`
          );
        } else if (error.request) {
          // The request was made but no response was received
          setError("No response received from the server");
        } else {
          // Something happened in setting up the request that triggered an Error
          setError(`Error: ${error.message}`);
        }

        //   {status && <p>Status: {status}</p>}
        // {data && <p>Data: {JSON.stringify(data)}</p>}
        // {error && <p style={{ color: "red" }}>Error: {error}</p>}
      }
      // finally {
      //   setSubmitting(false);
      // }
    },
  });

  const handleKeyPress = (e, nextInputRef) => {
    if (e.key === "Enter") {
      e.preventDefault();
      nextInputRef.current.focus();
    }
  };
  const handleChange = (e, nextInputRef) => {
    formik.handleChange(e);
    if (e.target.value.length === 1) {
      nextInputRef.current.focus();
    }
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex flex-row container my-6 items-center justify-center ">
        <input
          required
          id="code1"
          name="code1"
          type="text"
          onChange={(e) => handleChange(e, input2Ref)}
          onBlur={formik.handleBlur}
          value={formik.values.code1}
          placeholder="_"
          maxLength={1}
          onKeyPress={(e) => handleKeyPress(e, input2Ref)}
          ref={input1Ref}
          className={`mx-2 min-w-4 max-w-16 bg-slate-200 aspect-auto rounded-xl  border border-gray-400 text-center text-3xl focus:outline-none  focus:ring-2 focus:ring-blue-400 `}
        />
        {formik.touched.code1 && formik.errors.code1 ? (
          <div>{formik.errors.code1}</div>
        ) : null}
        <input
          required
          id="code2"
          name="code2"
          type="text"
          onChange={(e) => handleChange(e, input3Ref)}
          onBlur={formik.handleBlur}
          value={formik.values.code2}
          placeholder="_"
          maxLength={1}
          onKeyPress={(e) => handleKeyPress(e, input3Ref)}
          ref={input2Ref}
          className={`mx-2 min-w-4 max-w-16 bg-slate-200 aspect-auto rounded-xl  border border-gray-400 text-center text-3xl focus:outline-none  focus:ring-2 focus:ring-blue-400 `}
        />
        {formik.touched.code2 && formik.errors.code2 ? (
          <div>{formik.errors.code2}</div>
        ) : null}
        <input
          required
          id="code3"
          name="code3"
          type="text"
          onChange={(e) => handleChange(e, input4Ref)}
          onBlur={formik.handleBlur}
          value={formik.values.code3}
          placeholder="_"
          maxLength={1}
          onKeyPress={(e) => handleKeyPress(e, input4Ref)}
          ref={input3Ref}
          className={`mx-2 min-w-4 max-w-16 bg-slate-200 aspect-auto rounded-xl  border border-gray-400 text-center text-3xl focus:outline-none  focus:ring-2 focus:ring-blue-400 `}
        />
        {formik.touched.code3 && formik.errors.code3 ? (
          <div>{formik.errors.code3}</div>
        ) : null}
        <input
          required
          id="code4"
          name="code4"
          type="text"
          onChange={(e) => handleChange(e, input5Ref)}
          onBlur={formik.handleBlur}
          value={formik.values.code4}
          placeholder="_"
          onKeyPress={(e) => handleKeyPress(e, input5Ref)}
          ref={input4Ref}
          maxLength={1}
          className={`mx-2 min-w-4 max-w-16 bg-slate-200 aspect-auto rounded-xl  border border-gray-400 text-center text-3xl focus:outline-none  focus:ring-2 focus:ring-blue-400 `}
        />
        {formik.touched.code4 && formik.errors.code4 ? (
          <div>{formik.errors.code4}</div>
        ) : null}
        <input
          required
          id="code5"
          name="code5"
          type="text"
          onChange={(e) => handleChange(e, input6Ref)}
          onBlur={formik.handleBlur}
          value={formik.values.code5}
          placeholder="_"
          onKeyPress={(e) => handleKeyPress(e, input6Ref)}
          ref={input5Ref}
          maxLength={1}
          className={`mx-2 min-w-4 max-w-16 bg-slate-200 aspect-auto rounded-xl  border border-gray-400 text-center text-3xl focus:outline-none  focus:ring-2 focus:ring-blue-400 `}
        />
        {formik.touched.code5 && formik.errors.code5 ? (
          <div>{formik.errors.code5}</div>
        ) : null}
        <input
          required
          id="code6"
          name="code6"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.code6}
          placeholder="_"
          onKeyPress={(e) => handleKeyPress(e, input1Ref)}
          ref={input6Ref}
          maxLength={1}
          className={`mx-2 min-w-4 max-w-16 bg-slate-200 aspect-auto rounded-xl  border border-gray-400 text-center text-3xl focus:outline-none  focus:ring-2 focus:ring-blue-400 `}
        />
        {formik.touched.code6 && formik.errors.code6 ? (
          <div>{formik.errors.code6}</div>
        ) : null}
      </div>
      <Button>تأكيد</Button>
      {/* {status && <p>Status: {status}</p>} */}
      {data && <p style={{ color: "green" }}>{JSON.stringify(data)}</p>}
      {error && <p style={{ color: "red" }}> {error}</p>}
    </form>
  );
}
