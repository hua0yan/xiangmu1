<template>
  <div>
    <van-nav-bar
      title="账号登录"
      left-arrow
      style="background-color: #07c160"
      @click-left="$router.back()"
    />
    <van-form @submit="onSubmit">
      <van-field
        v-model="user.username"
        placeholder="请输入账号"
        :rules="rules.mobile"
        name="text"
      />
      <van-field
        v-model="user.password"
        type="password"
        placeholder="请输入密码"
        :rules="rules.code"
        name="password"
      />

      <van-button
        block
        native-type="submit"
        style="width: 90%; margin-left: 5%; background-color: #07c160"
        >登录</van-button
      >
    </van-form>
    <p>还没有账号，去注册~</p>
  </div>
</template>

<script>
import { Userlogin } from "@/Api/login";
import { Toast } from "vant";
export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
      rules: {
        mobile: [
          {
            required: true,
            message: "请输入账户名",
          },
          {
            pattern: /^[a-zA-Z0-9]{5,8}$/,
            message: "用户名格式5-8位的字母和数字",
          },
        ],
        code: [
          {
            required: true,
            message: "请输入密码",
          },
          {
            pattern: /^[a-zA-Z0-9]{4,12}$/,
            message: "oasdkasbdashd",
          },
        ],
      },
    };
  },
  methods: {
    async onSubmit() {
      try {
        const res = await Userlogin(this.user);
        console.log(res);
        console.log(res.data.body);
        this.$store.commit("getUser", res.data.body);

        if (res.data.status === 200) {
          Toast.success("登录成功");
          this.$router.push("/layout/my");
        } else {
          Toast.fail("登陆失败");
        }
      } catch (e) {
        Toast.fail("登陆失败");
      }
    },
  },
};
</script>

<style scoped lang="less">
/deep/.van-nav-bar__title {
  color: #fff;
}
/deep/.van-nav-bar .van-icon {
  color: #fff;
}
.van-cell {
  margin: 25px 0;
}
p {
  font-size: 16px;
  text-align: center;
  font-weight: normal;
  color: rgb(90, 88, 88);
}
</style>
