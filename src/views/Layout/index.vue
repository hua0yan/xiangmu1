<template>
  <div>
    <router-view></router-view>
    <van-tabbar v-model="active" route active-color="rgb(33, 185, 122)">
      <van-tabbar-item icon="home-o" to="/layout/home">首页</van-tabbar-item>
      <van-tabbar-item icon="search" to="/layout/findhouse">找房</van-tabbar-item>
      <van-tabbar-item icon="more-o" to="/layout/news">资讯</van-tabbar-item>
      <van-tabbar-item icon="manager-o" to="/layout/my">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'Layout',
  data () {
    return {
      active: 0
    }
  }
}
</script>

<style scoped lang="less">
</style>
