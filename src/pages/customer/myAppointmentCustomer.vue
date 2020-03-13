<template>
  <div>
    <!-- 查询条件 -->
    <div>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="状态">
          <el-select v-model="formInline.state" placeholder="请选择">
            <el-option label="待审核" value="待审核"></el-option>
            <el-option label="预约成功" value="预约成功"></el-option>
            <el-option label="已完成" value="已完成"></el-option>
            <el-option label="拒绝" value="拒绝"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" size="small">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="f2Block">
      <!-- + -->
      <el-button
        type="primary"
        icon="el-icon-circle-plus-outline"
        @click="dialogFormVisible=true"
      >新增预约就诊</el-button>
    </div>

    <!-- 表格 -->
    <el-table :data="tableData" stripe border style="width: 100%">
      <el-table-column prop="seedoctorid" label="预约编号" width="150"></el-table-column>
      <el-table-column prop="doctorname" label="预约医生" width="120"></el-table-column>  
      <el-table-column prop="petname" label="宠物品种" width="120"></el-table-column>
      <el-table-column prop="doctortime" label="就诊日期" width="120"></el-table-column>
      <el-table-column prop="phone" label="手机号" width="120"></el-table-column>
      <el-table-column prop="details" label="备注" width="220"></el-table-column>
      <el-table-column prop="evaluation" label="评价" width="180"></el-table-column>
      <el-table-column prop="reason" label="拒绝原因" width="180"></el-table-column>
      <el-table-column prop="state" label="状态" width="120">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.state=='待审核'?'danger':(scope.row.state=='预约成功'?'primary':(scope.row.state=='已完成'?'success':'info'))"
          >{{scope.row.state}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="operate" label="操作">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.state=='已完成'&&scope.row.evaluation==null"
            type="danger"
            size="small"
            @click="goComment(scope.row.seedoctorid)"
          >去评价</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 点评弹窗 -->
    <el-dialog title="评价" :visible.sync="commentDialogVisible" width="30%">
      <el-input placeholder="说点什么" v-model="userComment"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="commentDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="commitComment">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 新增预约就诊表单 -->
    <el-dialog title="新增预约就诊" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="treatForm">
        <el-form-item label="预约医生" :label-width="formLabelWidth" prop="doctorId">
          <el-select v-model="form.doctorId" placeholder="请选择">
            <el-option
              v-for="item in doctorData"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
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
import { getToday, unitPriceTreat } from "../../util/util";
export default {
  data() {
    return {
      state:'',
      formInline:{
        state:''
      },
      unitPriceTreat: unitPriceTreat,
      money: this.$store.getters.money, // 余额
      userComment: "",
      commentDialogVisible: false,
      seeDoctorId: "",
      tableData: [],
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
      doctorData: [],
      formLabelWidth: "120px",
      rules: {
        doctorId: [{ required: true, message: "请选择医生", trigger: "blur" }],
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
      }
    };
  },
  created() {
    //   获取表格数据
    this.getTableData();
    // 医生数据
    this.getDoctorsData();
  },
  methods: {
    // 获取表格数据
    getTableData() {
      let obj = {
        userId: this.form.userId,
        state:this.state
      };
      this.$http({
        method: "post",
        url: "/ptm/sdr/selectAllSeeDoctorByUser",
        data: obj
      })
        .then(res => {
          console.log(res);
          let data = res.data.res;
          for (var i in data) {
            if (data[i].state == "拒绝") {
              let reason = data[i].evaluation;
              data[i].evaluation = "";
              data[i].reason = reason;
            } else {
            }
          }
          this.tableData = data;
        })
        .catch(err => {
          console.log(err);
        });
    },
        // 根据状态查询
    onSubmit(){
      let state = this.formInline.state
      this.state = state
      // 过滤tableData
      this.getTableData();
    },
    // 获取医生数据
    getDoctorsData() {
      this.$http({
        method: "post",
        url: "/ptm/user/selectAllDoctor"
      })
        .then(res => {
          let doctorData = res.data.res;
          // console.log(res);
          // 过滤医生数据
          for (var i in doctorData) {
            let obj = {};
            obj.value = doctorData[i].id;
            obj.label = doctorData[i].username;
            this.doctorData.push(obj);
          }
        })
        .catch(err => {
          console.log(err);
        });
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
                // 重新获取表格数据
                this.getTableData();
                // 更新余额
                this.$store.commit("SET_MONEY", res.data.money);
                sessionStorage.setItem("MONEY", res.data.money);
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
    },
    // 去评价
    goComment(id) {
      this.commentDialogVisible = true;
      this.seeDoctorId = id;
    },
    // 提交评价
    commitComment() {
      let obj = {
        seeDoctorId: this.seeDoctorId,
        evaluation: this.userComment
      };
      this.$http({
        method: "post",
        url: "/ptm/sdr/updateSeeDoctorEvaluation",
        data: obj
      })
        .then(res => {
          this.getTableData();
          this.commentDialogVisible = false;
          this.userComment = "";
        })
        .catch(err => {});
    }
  }
};
</script>
<style lang="less" scoped>
</style>