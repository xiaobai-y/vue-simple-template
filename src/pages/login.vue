<template>
  <div class="app">
    <div class="login_box">
      <div class="xtdl">系统登录</div>
      <el-form label-position="right" label-width="0px" :model="loginfrom">
        <el-form-item>
          <el-input v-model="loginfrom.username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input type="password" v-model="loginfrom.pew" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item>
          <!-- <el-button type="primary" @click="submituUserInfo(loginfrom)">登录</el-button> -->
          <div @click="submituUserInfo(loginfrom)" class="submitBtn">登录</div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      loginfrom: {
        username: "",
        pew: "123456"
      }
    };
  },
  methods: {
    submituUserInfo(data) {
      console.log(data);
      this.$store
        .dispatch("Logins", data)
        .then(res => {
          console.log(res);
          this.$router.push(
            { path: "/" },
            onComplete => {},
            onAbort => {}
          );
        })
        .catch(error => {
          console.log(error);
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
.xtdl{
  font-size: 18px;
  font-weight: 700;
  margin:3px 0 15px;
}
.login_box {
  width: 280px;
  position: fixed;
  left: 39%;
  top: 200px;
  border-radius: 5px;
  padding: 20px 30px;
  background-color: #fff;
  box-shadow: 0px 0px 15px rgba(255,255,255,0.5);
}
</style>
