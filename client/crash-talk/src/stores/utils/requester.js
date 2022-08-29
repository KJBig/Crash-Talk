import axios from "axios";
import GV from "../CONSTANTS/global_variables";


const requester = (function () {
  axios.defaults.allowEI03 = true;
  axios.defaults.withCredentials = true;

  return {
    post: async (header, data, ENDPOINT) => {
      const response = await axios({
        url: ENDPOINT,
        method: "POST",
        mode: "cors",
        headers: { header },
        ContentType: "application/json",
        data: {
          ...data,
        },
      });
      return response;
    },

    get: async (header, data, ENDPOINT) => {
      const response = await axios({
        url: ENDPOINT,
        method: "GET",
        mode: "cors",
        headers: { header },
        ContentType: "application/json",
        data: {
          ...data,
        },
      });
      return response;
    },

    joinRoomRequest: async (header, user, room_url) => { // room 입장시 발생하는 리퀘스트
      const response = await axios.get(room_url, {
        headers: header,
        auth: user,
      });
      return response;
    },

    getExistent: async (header, inputNickname, ENDPOINT) => { // 닉네임 중복검사 리퀘스트
      const response = await axios.get(ENDPOINT, {
        headers: { header },
        ContentType: "application/json",
        data: inputNickname,
      });

      return response;
    },
  };
})();

export default requester;
