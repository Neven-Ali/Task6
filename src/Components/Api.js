import axios from "axios";

const Api = axios.create({
  baseURL: "https://task5-lina-sulaiman.trainees-mad-s.com/api",
});

export const refreshAccessToken = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  Api.post("/auth/refresh-token", {}, config)
    .then((response) => {
      console.log("Login successful", response.data);
      localStorage.setItem("access_token", response.data.access_token);
      // localStorage.setItem("token", response.data.access_token);

      const access_token = localStorage.getItem("access_token");
      console.log(access_token);
    })
    .catch((error) => {
      // Handle errors
      console.error("There was an error!", error);
    });
};

export default Api;
