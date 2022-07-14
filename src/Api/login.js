import axios from "@/utils/request";
export const Userlogin = (data) =>
  axios({
    method: "POST",
    url: "/user/login",
    data,
  });
