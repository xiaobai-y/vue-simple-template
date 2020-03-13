<template>
  <div class="flex">
    <!-- 医生列表 -->
    <div class="doctorsCon" v-for="item in doctorsData">
      <div>
        <img :src="item.imgurl!=null?baseImgUrl+item.imgurl:imgSrc" class="imgCon" alt />
      </div>
      <div class="doctorsRight">
        <span class="borderBottmRed">
          <span class="doctorName">{{item.username}}</span>
          <span class="doctorsType">{{item.level}}</span>
        </span>
        <p>{{item.details}}</p>
        <div class="appointmentNow" @click="goAppointment(item)">立即预约</div>
      </div>
    </div>
    <!-- 新建预约就诊 -->
    <el-dialog title="新增预约就诊" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="treatForm">
        <el-form-item label="预约医生" :label-width="formLabelWidth" prop="doctorId">
          <el-input v-model="doctorName" disabled></el-input>
        </el-form-item>

        <el-form-item label="预约宠物品种" :label-width="formLabelWidth" prop="petName">
          <el-input v-model="form.petName" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="预约就诊日期" :label-width="formLabelWidth" prop="doctorTime">
          <el-date-picker v-model="form.doctorTime" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>

        <el-form-item label="预约人手机号" :label-width="formLabelWidth" prop="phone">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="我的余额" :label-width="formLabelWidth">
          <span>￥{{money}}</span>
        </el-form-item>

        <el-form-item label="需付金额" :label-width="formLabelWidth" prop="payMoney">
          <el-input v-model="form.payMoney" autocomplete="off" disabled></el-input>
          <span>就诊按次收费，每次{{unitPriceTreat}}元</span>
        </el-form-item>

        <el-form-item label="备注" :label-width="formLabelWidth" prop="details">
          <el-input type="textarea" v-model="form.details" autocomplete="off" placeholder="请备注您的需求"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancleForm('treatForm')">取 消</el-button>
        <el-button type="primary" @click="submitAppointmentCareData('treatForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import qs from "qs";
import { unitPriceTreat } from "../../util/util";
import { baseImgUrl } from "../../api/config";
export default {
  name: "app",
  data() {
    return {
      baseImgUrl: baseImgUrl,
      money: this.$store.getters.money, //余额
      unitPriceTreat: unitPriceTreat, //单价
      doctorsData: [],
      doctorName: "",
      dialogFormVisible: false,
      form: {
        doctorId: "",
        userId: this.$store.getters.userid,
        userName: this.$store.getters.username,
        petName: "",
        doctorTime: "",
        phone: "",
        payMoney: unitPriceTreat,
        details: ""
      },
      formLabelWidth: "120px",
      rules: {
        petName: [
          { required: true, message: "请输入宠物种类", trigger: "blur" }
        ],
        doctorTime: [
          { required: true, message: "请选择日期", trigger: "blur" }
        ],
        phone: [
          {
            required: true,
            pattern: /^1[34578]\d{9}$/,
            message: "请输入正确的11位手机号码",
            trigger: "blur"
          }
        ],
        details: [{ required: true, message: "请输入备注", trigger: "blur" }]
      },
      imgSrc:
        "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3663423228,2210386614&fm=26&gp=0.jpg"
    };
  },
  created() {
    this.getDoctorsData();
  },
  methods: {
    // 获取医生列表数据
    getDoctorsData() {
      this.$http({
        method: "post",
        url: "/ptm/user/selectAllDoctor"
      })
        .then(res => {
          if (res.data.ID == "S") {
            this.doctorsData = res.data.res;
          } else if (res.data.ID == "E") {
            this.$message(res.data.MSG);
          }

          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 去预约
    goAppointment(param) {
      console.log(param);
      this.dialogFormVisible = true;
      this.form.doctorId = param.id;
      this.doctorName = param.username;
    },
    // 提交就诊表单
    submitAppointmentCareData(formName) {
      console.log(this.form);
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 提交之前判断余额够用不
          if (this.money < this.form.payMoney) {
            this.$message("您的余额不足，请前往个人信息页面充值后重试");
            return false;
          }
          // 提交数据到后台
          this.$http({
            method: "post",
            url: "/ptm/sdr/insertSeeDoctor",
            data: this.form
          })
            .then(res => {
              if (res.data.ID == "S") {
                this.$message("已预约");
                // 关闭弹窗 重置表单
                this.dialogFormVisible = false;
                this.$refs[formName].resetFields();
                // 更新余额
                this.$store.commit("SET_MONEY", res.data.money);
                sessionStorage.setItem("MONEY", res.data.money);
                // 跳转到我的预约就诊列表
                this.$router.push({ path: "/myAppointmentCustomer" });
              } else if (res.data.ID == "E") {
                this.$message(res.data.MSG);
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 关闭对话框
    cancleForm(formName) {
      this.dialogFormVisible = false;
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style lang="less" scoped>
.flex {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.doctorsCon {
  position: relative;
  display: flex;
  margin-right: 50px;
  margin-bottom: 50px;
  background-color: #fff;
  border-radius: 5px;
  padding: 10px;
  width: 380px;
}
.imgCon {
  width: 180px;
  height: 200px;
  object-fit: cover;
}

.doctorsRight {
  padding: 15px;
}
.doctorsRight .doctorName {
  display: inline-block;
  width: 102px;
  font-size: 24px;
  color: #333;
  margin-bottom: 6px;
}
.doctorsRight .doctorsType {
  display: inline-block;
  width: 84px;
  font-size: 14px;
  color: #666;
  font-style: italic;
  margin-bottom: 15px;
}
.doctorsRight p {
  margin: 0;
  width: 100%;
  font-size: 14px;
  line-height: 20px;
  max-height: 150px;
  overflow: hidden;
}
.borderBottmRed {
  border-bottom: 1px solid #fd5f56;
}
.appointmentNow {
  cursor: pointer;
  position: absolute;
  right: 0;
  bottom: 0;
  background-color: #fd5f56;
  color: #fff;
  font-size: 12px;
  padding: 10px 15px;
  border-radius: 0 0 5px 0;
}
</style>