<template>
  <div class="flex">
    <!-- 医生列表 -->
    <div class="doctorsCon" v-for="item in doctorsData">
      <div>
        <img :src="imgSrc" class="imgCon" alt />
      </div>
      <div class="doctorsRight">
        <span class="borderBottmRed">
          <span class="doctorName">{{item.doctorName}}</span>
          <span class="doctorsType">{{item.doctorsType}}</span>
        </span>
        <p>{{item.introduce}}</p>
        <div class="appointmentNow" @click="dialogFormVisible=true">立即预约</div>
      </div>
    </div>
    <!-- 新建预约就诊 -->
    <el-dialog title="新增预约就诊" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="careForm">
        <el-form-item label="预约医生" :label-width="formLabelWidth" prop="doctorsName">
          <el-input v-model="form.doctorsName" autocomplete="off" disabled></el-input>
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
        <el-button type="primary" @click="submitAppointmentTreatData('careForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "app",
  data() {
    return {
      doctorsData: [
        {
          doctorName: "王医生",
          doctorsType: "金牌医生",
          introduce:
            "Java企业级应用专家、WEB技术专家，中科院软件工程硕士。07年起曾主持研发过多套软件培训课程与教材，精通JAVAEE、PHP、RUBY、JavaSCRIPT、RIA等多种主流开发语言"
        },
        {
          doctorName: "王医生",
          doctorsType: "金牌医生",
          introduce:
            "Java企业级应用专家、WEB技术专家，中科院软件工程硕士。07年起曾主持研发过多套软件培训课程与教材，精通JAVAEE、PHP、RUBY、JavaSCRIPT、RIA等多种主流开发语言"
        },
        {
          doctorName: "王医生",
          doctorsType: "金牌医生",
          introduce:
            "Java企业级应用专家、WEB技术专家，中科院软件工程硕士。07年起曾主持研发过多套软件培训课程与教材，精通JAVAEE、PHP、RUBY、JavaSCRIPT、RIA等多种主流开发语言"
        },
        {
          doctorName: "王医生",
          doctorsType: "金牌医生",
          introduce:
            "Java企业级应用专家、WEB技术专家，中科院软件工程硕士。07年起曾主持研发过多套软件培训课程与教材，精通JAVAEE、PHP、RUBY、JavaSCRIPT、RIA等多种主流开发语言"
        }
      ],
      dialogFormVisible: false,
      form: {
        doctorsName: "",
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
      },
      imgSrc:
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583319300689&di=764bdc990e960d8746356ae255db3039&imgtype=0&src=http%3A%2F%2Fimage.biaobaiju.com%2Fuploads%2F20181007%2F16%2F1538899381-EgpxCdzkmV.jpg"
    };
  },
  methods: {
    submitAppointmentTreatData(formName) {
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
  width: 150px;
  height: 220px;
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
  width: 64px;
  font-size: 14px;
  color: #666;
  font-style: italic;
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