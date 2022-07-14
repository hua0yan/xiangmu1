<template>
  <div>
    <van-nav-bar
      title="城市列表"
      left-arrow
      style="background-color: #07c160"
      @click-left="$router.back()"
    />
    <van-index-bar :index-list="indexList">
      <van-index-anchor>当前城市</van-index-anchor>
      <van-cell :title="currentCityName" />
      <van-index-anchor>热门城市</van-index-anchor>
      <van-cell
        :title="item.label"
        v-for="(item, index) in getHotcity"
        :key="index"
      />
      <van-index-anchor
        :index="name"
        v-for="(item, name) in getCityList"
        :key="name"
        >{{ name }}
        <van-cell
          :title="i.label"
          v-for="(i, index) in item"
          :key="index"
          @click="currentCity(i)"
          to="/layout/findhouse"
        >
        </van-cell>
      </van-index-anchor>
    </van-index-bar>
  </div>
</template>

<script>
import { getHotcity, getCityList } from "@/Api/cityList.js";
export default {
  name: "cityList",
  data() {
    return {
      indexList: [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
      ],
      getHotcity: [],
      getCityList: [],
      cityName: {},
      first: "",
      currentCityName: "重庆",
    };
  },
  created() {
    this.getHotcitys();
    this.getCityLists();
  },
  methods: {
    async getHotcitys() {
      const res = await getHotcity();
      this.getHotcity = res.data.body;
    },
    async getCityLists() {
      const res = await getCityList(1);
      this.getCityList = res.data.body;
      this.indexList.forEach((item) => {
        // console.log(item);
        this.cityName[item] = [];
        this.getCityList.forEach((el) => {
          this.first = el.pinyin.substring(0, 1);
          this.first = this.first.toUpperCase();
          if (this.first == item) {
            this.cityName[item].push(el);
          }
        });
      });
      this.getCityList = this.cityName;
    },
    currentCity(item) {
      this.currentCityName=item.label
      // console.log(label, index);
      this.$store.commit('getCityName',item);
      // console.log(this.$store);
    },
  },
};
</script>

<style scoped lang="less">
/deep/.van-nav-bar__title {
  color: #fff;
}
</style>
