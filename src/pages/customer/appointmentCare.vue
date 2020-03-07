<template>
  <div>
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
      <el-table-column prop="name" label="预约人" width="180"></el-table-column>
      <el-table-column prop="petsName" label="预约宠物品种" width="180"></el-table-column>
      <el-table-column prop="careDate" label="预约寄养日期" width="240"></el-table-column>
      <el-table-column prop="phone" label="预约人手机号" width="180"></el-table-column>
      <el-table-column prop="operateTime" label="操作时间" width="180"></el-table-column>
      <el-table-column prop="remark" label="备注" width="180"></el-table-column>
      <el-table-column prop="state" label="状态"></el-table-column>
    </el-table>

    <!-- 新增预约寄养表单 -->
    <el-dialog title="新增预约寄养" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="careForm">
        <el-form-item label="预约人" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="预约宠物品种" :label-width="formLabelWidth">
          <el-input v-model="form.petsName" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="预约寄养日期" :label-width="formLabelWidth" prop="careDate">
          <el-date-picker
            v-model="form.careDate"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="预约人手机号" :label-width="formLabelWidth" prop="phone">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="form.remark" autocomplete="off" placeholder="请备注您的需求"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitAppointmentCareData('careForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [
        {
          name: "王小虎",
          petsName: "泰迪",
          careDate: "2020-03-02至2020-03-05",
          phone: "12345678909",
          remark: "无",
          operateTime: "2020-03-02 15:12",
          state: ""
        }
      ],
      dialogFormVisible: false,
      form: {
        name: "",
        petsName: "",
        careDate: "",
        phone: "",
        remark: ""
      },
      formLabelWidth: "120px",
      rules: {
        name: [{ required: true, message: "请输入您的姓名", trigger: "blur" }],
        careDate: [{ required: true, message: "请选择日期", trigger: "blur" }],
        phone: [
          { required: true, message: "请输入您的联系方式", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    //   获取表格数据
  },
  methods: {
    submitAppointmentCareData(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
        //   alert("submit!");
            // 提交数据到后台
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>

</style>