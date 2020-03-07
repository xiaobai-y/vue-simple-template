<template>
  <div>
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
      <el-table-column prop="doctorName" label="预约医生" width="120"></el-table-column>
      <el-table-column prop="name" label="预约人" width="120"></el-table-column>
      <el-table-column prop="petsName" label="预约宠物品种" width="120"></el-table-column>
      <el-table-column prop="serveType" label="预约服务类型" width="150"></el-table-column>
      <el-table-column prop="careDate" label="预约就诊日期" width="150"></el-table-column>
      <el-table-column prop="phone" label="预约人手机号" width="180"></el-table-column>
      <el-table-column prop="operateTime" label="操作时间" width="180"></el-table-column>
      <el-table-column prop="remark" label="备注" width="180"></el-table-column>
      <el-table-column prop="state" label="状态"></el-table-column>
    </el-table>

    <!-- 新增预约寄养表单 -->
    <el-dialog title="新增预约寄养" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="treatForm">

        <el-form-item label="预约医生" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.doctorName" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="预约人" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="预约宠物品种" :label-width="formLabelWidth">
          <el-input v-model="form.petsName" autocomplete="off"></el-input>
        </el-form-item>

         <el-form-item label="预约服务类型" :label-width="formLabelWidth">
          <el-input v-model="form.serveType" autocomplete="off" placeholder="描述您宠物的疾病类型"></el-input>
        </el-form-item>

        <el-form-item label="预约就诊日期" :label-width="formLabelWidth" prop="treatDate">
             <el-date-picker v-model="form.treatDate" type="date" placeholder="选择日期"></el-date-picker>
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
        <el-button type="primary" @click="submitAppointmentCareData('treatForm')">确 定</el-button>
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
          doctorName:'王医生',
          name: "王小虎",
          petsName: "泰迪",
          serveType:'肠炎',
          careDate: "2020-03-02",
          phone: "12345678909",
          remark: "无",
          operateTime: "2020-03-02 15:12",
          state: ""
        }
      ],
      dialogFormVisible: false,
      form: {
          doctorName:'',
        name: "",
        petsName: "",
        serveType:'',
        treatDate: "",
        phone: "",
        remark: ""
      },
      formLabelWidth: "120px",
      rules: {
        name: [{ required: true, message: "请输入您的姓名", trigger: "blur" }],
        treatDate: [{ required: true, message: "请选择日期", trigger: "blur" }],
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