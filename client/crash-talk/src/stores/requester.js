import axios from "axios";
import GV from "./global_variables";

const requester = (function () {
  axios.defaults.allowEI03 = true;
  axios.defaults.withCredentials = true;

  return {
    postUserData: async (header, data, url) => {
      const response = await axios({
        url: `https://cors.io/?${url}`,
        method: "POST",
        mode: "cors",
        headers: header,
        ContentType: "application/json",
        data: {
          ...data,
        },
      }).then((response) => {
        console.log(response);
      });
      return response;
    },
    joinRoomRequest: async (header, user, room_url) => {
      const response = await axios.get(room_url, {
        headers: header,
        auth: user,
      });

      return response;
    },
  };
})();

export default requester;
