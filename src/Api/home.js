import axios from "@/utils/request";
export const getSWiper = () => axios({ url: "/home/swiper" });
export const getHomegroup = () => axios({ url: "/home/groups" });