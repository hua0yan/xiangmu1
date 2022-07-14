<template>
  <div>
    <van-nav-bar title="标题" left-arrow @click-left="onClickLeft" />
  </div>
</template>

<script>
import { getHousepages } from "@/Api/FindList";
export default {
  name: "isPages",
  created() {
    this.getHousepage();
  },
  methods: {
    async getHousepage() {
      const res = await getHousepages(this.$route.query.item.houseCode);
      //   console.log(this.$route.query);
      console.log(res);
    },
    onClickLeft() {
      this.$toast("返回");
    },
  },
};
</script>

<style scoped lang="less">

</style>
