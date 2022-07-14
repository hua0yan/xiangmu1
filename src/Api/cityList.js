import axios from "@/utils/request";
export const getHotcity = () => axios({ url: "/area/hot" });
export const getCityList = (level) =>
  axios({ url: "/area/city", params: { level } });
