<template>
  <div class="app">
    <div class="login_box">
      <div class="xtdl">系统注册</div>
      <el-form
        label-position="right"
        label-width="0px"
        :model="registerform"
        ref="registerform"
        :rules="rules"
      >
        <el-form-item prop="username">
          <el-input v-model="registerform.username" placeholder="姓名" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="phone">
          <el-input v-model="registerform.phone" placeholder="手机号" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="registerform.password"
            placeholder="密码"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <div @click="submituUserInfo('registerform')" class="submitBtn">注册</div>
        </el-form-item>
      </el-form>
      <div style="text-align:center;">
        <router-link to="/login" style="color:#4373a5;font-size:14px;">已有账号，去登录>></router-link>
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
      registerform: {
        username: "",
        phone: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请填写手机号", trigger: "blur" }
        ],
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
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$http({
            method: "post",
            url: "/ptm/user/insertUserForCustomer",
            data: this.registerform
          })
            .then(res => {
              var that = this;
              console.log(res);
              if (res.data.ID == "S") {
                this.$message("注册成功,去登录");
                setTimeout(function() {
                  that.$router.push({ path: "/login" });
                }, 1000);
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
