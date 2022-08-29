import axios from "axios";

const setAuthorization = () => {
  const token = localStorage.getItem("JWT");
  if (token) {
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthorization;
