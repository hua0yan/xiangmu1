<template>
  <div>
    <van-search
      v-model="value"
      :label="getcityName"
      placeholder="请输入搜索关键词"
      to="/citylist"
    >
      <template #left-icon>
        <van-icon name="arrow-down" @click="getcity" />
      </template>
    </van-search>
    <van-icon name="location-o" class="dingwei" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
    };
  },
  methods: {
    getcity() {
      this.$router.push({
        path: "/citylist",
      });
    },
  },
  computed: {
    getcityName() {
      return this.$store.state.CityName;
    },
  },
};
</script>

<style scoped lang="less">
.van-search {
  position: fixed;
  top: 15px;
  left: 15px;
  width: 315px;
  z-index: 666;
  padding: 0;
  border-radius: 8px;
  background-color: #eee;
}
.van-search__action {
  opacity: 0.5;
}
.dingwei {
  z-index: 666;
  position: fixed;
  top: 17px;
  right: 6px;
  font-size: 25px;
  color: #fff;
}
</style>
