<template>
  <div>
    <!-- 引入搜索组件 -->
    <search />
    <!-- 轮播图 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in images" :key="item.id"
        ><img v-lazy="'http://liufusong.top:8080' + item.imgSrc" class="imgs"
      /></van-swipe-item>
    </van-swipe>
    <van-grid :border="false">
      <van-grid-item :icon="require('@/assets/pic/p4.png')" text="整租" />
      <van-grid-item :icon="require('@/assets/pic/p2.png')" text="合租" />
      <van-grid-item :icon="require('@/assets/pic/p3.png')" text="地图找房" />
      <van-grid-item :icon="require('@/assets/pic/p4.png')" text="去出租" />
    </van-grid>
    <van-cell
      title="租房小组"
      value="更多"
      class="panel"
      style="background-color: #eee"
    />
    <van-grid
      direction="horizontal"
      :column-num="2"
      gutter="10px"
      style="background-color: #eee"
      class="HomeList"
    >
      <van-grid-item
        :icon="'http://liufusong.top:8080' + item.imgSrc"
        :text="item.title + item.desc"
        v-for="item in HomegroupList"
        :key="item.id"
      />
    </van-grid>
  </div>
</template>

<script>
import { getSWiper, getHomegroup } from "@/Api/home";
import search from "@/components/Search.vue";
import Vue from 'vue'
import { Lazyload } from "vant";
Vue.use(Lazyload);
export default {
  name: "Home",
  data() {
    return {
      images: [],
      HomegroupList: [],
    };
  },
  components: { search },
  created() {
    this.getSWiper();
    this.getHomegroups();
  },
  methods: {
    async getSWiper() {
      const res = await getSWiper();
      this.images = res.data.body;
    },
    async getHomegroups() {
      const res = await getHomegroup();
      this.HomegroupList = res.data.body;
    },
  },
};
</script>

<style scoped lang="less">
.my-swipe {
  width: 375px;
  height: 212px;
}
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #fff;
}
.imgs {
  width: 100%;
  height: 100%;
}
/deep/.van-grid-item__icon {
  font-size: 60px;
}
.panel {
  font-weight: 700;
}
.HomeList {
  .van-grid-item {
    margin-bottom: 15px;
    margin-top: 0 !important;
    .van-grid-item_content {
      padding: 0 !important;
      border-radius: 15px;
    }
  }
}
</style>
