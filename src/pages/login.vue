<template>
  <div class="app">
    <div class="login_box">
      <div class="xtdl">系统登录</div>
      <el-form
        label-position="right"
        label-width="0px"
        :model="loginfrom"
        :rules="rules"
        ref="loginfrom"
      >
        <el-form-item prop="phone">
          <el-input v-model="loginfrom.phone" placeholder="手机号" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="loginfrom.password"
            placeholder="密码"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <div @click="submituUserInfo('loginfrom')" class="submitBtn">登录</div>
        </el-form-item>
      </el-form>
      <div style="text-align:center;">
        <router-link to="/register" style="color:#4373a5;font-size:14px;">还没账号，去注册>></router-link>
      </div>
    </div>
  </div>
</template>

<script>
import qs from "qs";
export default {
  name: "login",
  data() {
    return {
      loginfrom: {
        phone: "",
        password: ""
      },
      rules: {
        phone: [
          {
            required: true,
            pattern: /^1[34578]\d{9}$/,
            message: "请输入正确的11位手机号码",
            trigger: "blur"
          }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    submituUserInfo(formName) {
      console.log(this.loginfrom)
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$http({
            method: "post",
            url: "/ptm/login/login",
            data: this.loginfrom
          })
            .then(res => {
              console.log(res);
              if (res.data.ID == "S") {
                let res1 = res.data.user;
                this.$store.commit("SET_USERNAME", res1.username);
                sessionStorage.setItem("USERNAME", res1.username); //存入 session
                this.$store.commit("SET_ROLE", res1.type);
                sessionStorage.setItem("ROLE", res1.type);
                this.$store.commit("SET_USERID", res1.id);
                sessionStorage.setItem("USERID", res1.id);
                this.$store.commit("SET_PHONE", res1.phone);
                sessionStorage.setItem("PHONE", res1.phone);
                this.$store.commit("SET_MONEY", res1.money);
                sessionStorage.setItem("MONEY", res1.money);
                // 存token
                sessionStorage.setItem("AUTH_TOKEN", res.data.token);
                this.$router.push({ path: "/" });
              } else if (res.data.ID == "E") {
                this.$message(res.data.MSG);
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    }
  }
};
</script>

<style scoped>
.app {
  height: 100%;
  background-color: #4373a5;
}
.xtdl {
  font-size: 18px;
  font-weight: 700;
  margin: 3px 0 15px;
}
.login_box {
  width: 280px;
  position: fixed;
  left: 39%;
  top: 200px;
  border-radius: 5px;
  padding: 20px 30px;
  background-color: #fff;
  box-shadow: 0px 0px 15px rgba(255, 255, 255, 0.5);
}
</style>
