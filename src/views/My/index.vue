<template>
  <div class="qwe">
    <!-- 未登录页面 -->
    <div v-if="!user">
      <img src="http://liufusong.top:8080/img/profile/bg.png" alt="" />
      <van-empty
        description="游客"
        image="http://liufusong.top:8080/img/profile/avatar.png"
        image-size="60px"
      >
        <van-button
          type="danger"
          class="bottom-button"
          style="border: 1px solid #fff"
          to="/login"
          >登录</van-button
        >
      </van-empty>
    </div>
    <!-- 已登录页面 -->
    <div v-else>
      <img src="@/assets/pic/beijing.png" alt="" />
      <van-empty
        description="花言"
        image="http://liufusong.top:8080/img/avatar.png"
        image-size="60px"
      >
        <van-button
          type="danger"
          class="bottom-button"
          style="border: 1px solid #fff"
          to="/login"
          >退出</van-button
        >
      </van-empty>
    </div>
    <van-grid :column-num="3" :border="false">
      <van-grid-item icon="star-o" text="我的收藏" />
      <van-grid-item icon="wap-home-o" text="我的出租" />
      <van-grid-item icon="clock-o" text="看房记录" />
      <van-grid-item icon="debit-pay" text="成为房主" />
      <van-grid-item icon="manager-o" text="个人资料" />
      <van-grid-item icon="service-o" text="联系我们" />
      <img
        src="http://liufusong.top:8080/img/profile/join.png"
        style="width: 90%"
        class="hello"
      />
    </van-grid>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name:'My',
  computed: {
    ...mapState(["user"]),
  },
};
</script>

<style scoped lang="less">
.qwe {
  position: relative;
  /deep/.van-empty {
    position: absolute !important;
    width: 318px;
    height: 165px;
    top: 130px;
    left: 26px;
    background-color: rgb(255, 255, 255);
    box-shadow: 0 0 10px 3px #ddd;
    .van-empty__description {
      color: black;
    }
    .van-empty__image {
      display: block;
      position: absolute;
      top: -30px;
    }
    .van-empty__bottom {
      margin-top: 0px !important;
      .bottom-button {
        width: 70px;
        height: 28px;
        background-color: #21b97a;
        border-radius: 6px;
        .van-button--normal {
          padding: 0 0 !important;
        }
      }
    }
  }
  .van-grid {
    position: fixed;
    top: 310px;
    width: 100%;
  }
  .hello {
    margin-left: 5%;
  }
}
img {
  width: 100%;
}
.bottom-button {
  width: 50px;
  height: 20px;
}
</style>
