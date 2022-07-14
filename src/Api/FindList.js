import axios from "@/utils/request";
export const AreaList = (params) =>
  axios({
    url: "/houses/condition",
    params: {
      id: params,
    },
  });
export const FindHouse = (cityid, start, end, area, rentType, price) =>
  axios({
    url: "/houses",
    params: {
      cityid,
      start,
      end,
      area,
      rentType,
      price,
      more: null,
    },
  });
export const getHousepages = (id) => axios({ url: `/houses/${id}` });
