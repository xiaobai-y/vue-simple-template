<template>
  <div>
    <el-dialog title="修改密码" :visible.sync="dialogFormVisible" :show="show" @close="closeDialog('psdForm')">
      <el-form :model="form" :rules="rules" ref="psdForm">
        <el-form-item label="原密码" :label-width="formLabelWidth" prop="oldPsd">
          <el-input v-model="form.oldPsd" autocomplete="off" type="password"></el-input>
        </el-form-item>
        <el-form-item label="新密码" :label-width="formLabelWidth" prop="newPsd">
          <el-input v-model="form.newPsd" autocomplete="off" type="password"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog('psdForm')">取 消</el-button>
        <el-button type="primary" @click="submitPsdForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import qs from "qs";
export default {
  name: "app",
  data() {
    return {
      userId: this.$store.getters.userid,
      formLabelWidth: "120px",
      dialogFormVisible: this.show,
      form: {
        oldPsd: "",
        newPsd: ""
      },
      rules: {
        oldPsd: [{ required: true, message: "请输入原密码", trigger: "blur" }],
        newPsd: [{ required: true, message: "请输入新密码", trigger: "blur" }]
      }
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    show() {
      this.dialogFormVisible = this.show;
    }
  },
  methods: {
    closeDialog(formName) {
      this.dialogFormVisible = false;
      this.$emit('closeDialog');
      this.$refs[formName].resetFields();
    },
    submitPsdForm() {
      let obj = {
        userId: this.userId,
        oldPassword: this.form.oldPsd,
        newPassword: this.form.newPsd
      };
      this.$refs["psdForm"].validate(valid => {
        if (valid) {
          this.$http({
            method: "post",
            url: "/ptm/user/updateMyPassword",
            data: obj
          })
            .then(res => {
              console.log(res);
              if (res.data.ID == "S") {
                this.$message("请重新登录");
                this.$store.dispatch('Logout').then(res=>{
                     this.$router.push({ path: "/login" });
                });
                // sessionStorage.setItem("USERID", "");
                // sessionStorage.setItem("ROLE", "");
                // sessionStorage.setItem("USERNAME", "");
                // this.$store.commit("SET_USERNAME", "");
                // this.$store.commit("SET_ROLE", "");
                // this.$store.commit("SET_USERID", "");
                
              } else if (res.data.ID == "E") {
                this.$message(res.data.MSG);
              }
            })
            .catch(err => {});
        } else {
          console.log("error submit");
          return false;
        }
      });
    }
  }
};
</script>