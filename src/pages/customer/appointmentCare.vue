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
      >新增预约寄养</el-button>
    </div>

    <!-- 表格 -->
    <el-table :data="tableData" stripe border style="width: 100%">
      <el-table-column prop="fosterid" label="预约编号" width="150"></el-table-column>
      <el-table-column prop="petname" label="宠物品种" width="120"></el-table-column>
      <el-table-column prop="starttime" label="开始日期" width="150"></el-table-column>
      <el-table-column prop="endtime" label="结束日期" width="150"></el-table-column>
      <el-table-column prop="phone" label="手机号" width="150"></el-table-column>
      <el-table-column prop="details" label="备注" width="180"></el-table-column>
      <el-table-column prop="evaluation" label="评价" width="180"></el-table-column>
      <el-table-column prop="reason" label="拒绝原因" width="180"></el-table-column>


      <el-table-column prop="state" label="状态">
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
            @click="goComment(scope.row.fosterid)"
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
    <!-- 新增预约寄养表单 -->
    <el-dialog title="新增预约寄养" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="careForm">
        <el-form-item label="预约宠物品种" :label-width="formLabelWidth" prop="petName">
          <el-input v-model="form.petName" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="预约寄养日期" :label-width="formLabelWidth" >
          <el-date-picker
            v-model="form.startTime"
            type="date"
            placeholder="开始日期"
            @change="changeStartDate"
            prop="startTime"
          ></el-date-picker>至
          <el-date-picker
            v-model="form.endTime"
            type="date"
            placeholder="结束日期"
            @change="changeEndDate"
            prop="endTime"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="预约人手机号" :label-width="formLabelWidth" prop="phone">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="我的余额" :label-width="formLabelWidth" prop="money">
          <span>￥{{money}}</span>
        </el-form-item>

        <el-form-item label="需付金额" :label-width="formLabelWidth" prop="payMoney">
          <el-input v-model="form.payMoney" autocomplete="off" disabled></el-input>
          <span>
            寄养按每日
            <span style="color:red;">{{unitPriceCare}}</span>
            元收费，需付金额 = {{unitPriceCare}} * 预约天数
          </span>
        </el-form-item>

        <el-form-item label="备注" :label-width="formLabelWidth" prop="details">
          <el-input type="textarea" v-model="form.details" autocomplete="off" placeholder="请备注您的需求"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancleForm('careForm')">取 消</el-button>
        <el-button type="primary" @click="submitAppointmentCareData('careForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { countDateDiff, unitPriceCare } from "../../util/util";
import qs from "qs";
export default {
  data() {
    return {
      formInline:{
        state:''
      },
      unitPriceCare: unitPriceCare,
      money: this.$store.getters.money, // 余额
      fosterId: "", // 预约寄养id
      userComment: "", //用户点评
      commentDialogVisible: false,
      tableData: [],
      dialogFormVisible: false,
      form: {
        userId: this.$store.getters.userid,
        userName: this.$store.getters.username,
        petName: "",
        startTime: "",
        payMoney: 0,
        endTime: "",
        phone: "",
        details: ""
      },
      formLabelWidth: "120px",
      rules: {
        petName: [
          { required: true, message: "请输入宠物品种", trigger: "blur" }
        ],
        startTime: [
          { required: true, message: "请选择开始日期", trigger: "blur" }
        ],
        endTime: [
          { required: true, message: "请选择结束日期", trigger: "blur" }
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
    this.getListData();
  },
  methods: {
    // 获取表格数据
    getListData() {
      let data = {
        userId: this.form.userId,
        state:this.state
      };
      this.$http({
        method: "post",
        url: "/ptm/foster/selectAllFosterCareByUser",
        data: data
      })
        .then(res => {
          console.log(res);
          let data = res.data.res
          for(var i in data){
            if(data[i].state=="拒绝"){
              let reason = data[i].evaluation
              data[i].evaluation = ''
              data[i].reason = reason
            }else{

            }
          }
          this.tableData = data;
        })
        .catch(err => {});
    },
    // 根据状态查询
    onSubmit(){
      let state = this.formInline.state
      console.log(state)
      this.state = state
      // 过滤tableData
      this.getListData();
    },
    // 提交表单
    submitAppointmentCareData(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.form);
          // 提交之前判断余额够用不
          if (this.money < this.form.payMoney) {
            this.$message("您的余额不足，请前往个人信息页面充值后重试");
            return false;
          }
          // 提交数据到后台
          this.$http({
            method: "post",
            url: "/ptm/foster/insertFosterCare",
            data: this.form
          })
            .then(res => {
              if (res.data.ID == "S") {
                this.$message("已预约");
                // 关闭弹窗
                this.dialogFormVisible = false;
                //   获取表格数据
                this.getListData();
                // 重置表单
                this.$refs[formName].resetFields();
                // 更新余额
                this.$store.commit("SET_MONEY", res.data.money);
              } else if (res.data.ID == "E") {
                this.$message(res.data.MSG);
              }
            })
            .catch(err => {});
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 取消，关闭弹窗
    cancleForm(formName) {
      this.dialogFormVisible = false;
      this.$refs[formName].resetFields();
    },
    // 去评价
    goComment(id) {
      this.commentDialogVisible = true;
      this.fosterId = id;
    },
    // 提交评价
    commitComment() {
      let obj = {
        fosterId: this.fosterId,
        evaluation: this.userComment
      };
      this.$http({
        method: "post",
        url: "/ptm/foster/updateFosterCareEvaluation",
        data: obj
      })
        .then(res => {
          console.log(res);
          this.getListData();
          this.commentDialogVisible = false;
          this.userComment = "";
        })
        .catch(err => {});
    },
    // 当开始日期发生改变时
    changeStartDate(date) {
      if (this.form.endTime == "") {
        return false;
      }
      //  计算两个日期之间相差几天
      var num = countDateDiff(date, this.form.endTime);
      this.form.payMoney = num * unitPriceCare;
    },
    // 当结束日期发生改变时
    changeEndDate(date) {
      if (this.form.startTime == "") {
        return false;
      }
      //  计算两个日期之间相差几天
      var num = countDateDiff(date, this.form.startTime);
      this.form.payMoney = num * unitPriceCare;
    }
  }
};
</script>
<style lang="less" scoped>
</style>