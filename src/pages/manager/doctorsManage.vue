<template>
  <div>
    <div class="f2Block">
      <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addDoctor">新增医生</el-button>
    </div>
    <tem-table
      :tableData="tableData"
      :tableOption="tableOption"
      :tableLabel="tableLabel"
      @handleButton="handleButton"
    ></tem-table>
    <!-- 新增医生弹窗 -->
    <el-dialog title="医生基本信息" :visible.sync="dialogFormVisible" @close="cancleForm('doctorsForm')">
      <el-form :model="form" :rules="rules" ref="doctorsForm">
        <el-form-item label="姓名" :label-width="formLabelWidth" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>

        <el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
          <el-select v-model="form.sex">
            <el-option value="男" label="男"></el-option>
            <el-option value="女" label="女"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="手机号" :label-width="formLabelWidth" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入手机号"></el-input>
        </el-form-item>

        <el-form-item label="从业年限" :label-width="formLabelWidth" prop="workYears">
          <el-select v-model="form.workYears">
            <el-option value="3" label="3"></el-option>
            <el-option value="5" label="5"></el-option>
            <el-option value="10" label="10"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="级别" :label-width="formLabelWidth" prop="level">
          <el-select v-model="form.level">
            <el-option value="副主任医生" label="副主任医生"></el-option>
            <el-option value="主任医生" label="主任医生"></el-option>
            <el-option value="金牌医生" label="金牌医生"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="上传照片" :label-width="formLabelWidth">
          <el-upload
            action="http://192.168.0.104:8080/pethospitalmanagement/ptm/upload/setFileUpload"
            :headers="token"
            ref="upload"
            :on-success="onSuccess"
            list-type="picture-card"
            :auto-upload="true"
            :limit="1"
            accept=".png, .jpeg, .jpg"
            :file-list="fileList"
          >
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{file}">
              <img class="el-upload-list__item-thumbnail" :src="file.url" alt />
              <span class="el-upload-list__item-actions">
                <span class="el-upload-list__item-delete" @click="handleRemove(file)">
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>
          </el-upload>
        </el-form-item>

        <el-form-item label="简介" :label-width="formLabelWidth" prop="details">
          <el-input
            type="textarea"
            v-model="form.details"
            autocomplete="off"
            placeholder="请输入100字以内的简介"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancleForm('doctorsForm')">取 消</el-button>
        <el-button type="primary" @click="submitForm('doctorsForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import temTable from "../../components/tem-table/tem-table";
import qs from "qs";
import { baseImgUrl } from "../../api/config";
export default {
  name: "doctorsManage",

  components: {
    temTable
  },
  data() {
    return {
      baseImgUrl: baseImgUrl,
      fileList: [],
      token: { token: sessionStorage.getItem("AUTH_TOKEN") },
      dialogFormVisible: false,
      formLabelWidth: "200px",
      isEdit: false,
      formName: "",
      form: {
        username: "",
        sex: "",
        phone: "",
        workYears: "",
        level: "",
        details: "",
        imgUrl: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入医生姓名", trigger: "blur" }
        ],
        sex: [{ required: true, message: "性别不能为空", trigger: "blur" }],
        phone: [
          {
            required: true,
            pattern: /^1[34578]\d{9}$/,
            message: "请输入正确的11位手机号码",
            trigger: "blur"
          }
        ],
        level: [
          { required: true, message: "医生级别不能为空", trigger: "blur" }
        ],
        workYears: [
          { required: true, message: "医生工作年限不能为空", trigger: "blur" }
        ]
      },

      tableData: [],
      tableLabel: [
        {
          prop: "id",
          label: "医生编号",
          width: "120px"
        },
        {
          prop: "username",
          label: "姓名",
          width: "120px"
        },
        {
          prop: "sex",
          label: "性别",
          width: "120px"
        },
        {
          prop: "phone",
          label: "手机号",
          width: "120px"
        },
        {
          prop: "workyears",
          label: "从业年限",
          width: "120px"
        },
        {
          prop: "level",
          label: "级别",
          width: "120px"
        },
        {
          prop: "details",
          label: "简介",
          width: "400px"
        }
      ],
      tableOption: {
        label: "操作",
        options: [
          {
            type: "",
            label: "编辑",
            methods: "editDoctor"
          },
          {
            type: "danger",
            label: "删除",
            methods: "delDoctor"
          }
        ]
      }
    };
  },
  created() {
    //   获取医生列表
    this.getDoctorsData();
    console.log(this.baseImgUrl);
  },
  methods: {
    //   获取医生列表
    getDoctorsData() {
      this.$http({
        method: "post",
        url: "/ptm/user/selectAllDoctor"
      })
        .then(res => {
          console.log(res);
          if (res.data.ID == "S") {
            this.tableData = res.data.res;
          } else if (res.data.ID == "E") {
            this.$message(res.data.MSG);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 新增医生按钮
    addDoctor() {
      this.dialogFormVisible = true;
      this.isEdit = false;
      this.form = {
        username: "",
        sex: "",
        phone: "",
        workYears: "",
        level: "",
        details: ""
      };
    },
    //   修改医生资料
    editDoctor(item) {
      this.isEdit = true;
      this.dialogFormVisible = true;
      if (item.imgurl != null) {
        this.fileList = [
          {
            name: "avatal.jpeg",
            url: this.baseImgUrl + item.imgurl
          }
        ];
      }

      this.form = {
        id: item.id,
        username: item.username,
        sex: item.sex,
        phone: item.phone,
        workYears: item.workyears,
        level: item.level,
        imgUrl: this.baseImgUrl + item.imgurl,
        details: item.details
      };
    },
    //   删除医生
    delDoctor(id) {
      console.log(id);
      let obj = {
        id: id
      };
      this.$http({
        method: "post",
        url: "/ptm/user/deleteUserByPrimaryKey ",
        data: obj
      }).then(res => {
        if (res.data.ID == "S") {
          this.getDoctorsData();
        } else if (res.data.ID == "E") {
          this.$message(res.data.MSG);
        }
      });
    },
    handleButton(e) {
      if (e.methods == "delDoctor") {
        this.delDoctor(e.row.id);
      } else if (e.methods == "editDoctor") {
        this.editDoctor(e.row);
      }
    },
    // 关闭弹窗
    cancleForm(formName) {
      this.dialogFormVisible = false;
      this.$refs[formName].resetFields();
      this.$refs.upload.clearFiles();
    },
    // 医生 提交表单
    submitForm(formName) {
      this.formName = formName;
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.isEdit == true) {
            this.editDoctors();
          } else {
            this.insertDoctors();
          }
        }
      });
    },
    // 新增接口
    insertDoctors() {
      this.$http({
        method: "post",
        url: "/ptm/user/insertUserForDoctor",
        data: this.form
      }).then(res => {
        if (res.data.ID == "S") {
          this.dialogFormVisible = false;
          this.$refs[this.formName].resetFields();
          this.getDoctorsData();
        } else if (res.data.ID == "E") {
          this.$message(res.data.MSG);
        }
      });
    },
    // 编辑接口
    editDoctors() {
      this.$http({
        method: "post",
        url: "/ptm/user/updateUserByPrimaryKey",
        data: this.form
      }).then(res => {
        if (res.data.ID == "S") {
          this.dialogFormVisible = false;
          this.$refs[this.formName].resetFields();
          this.getDoctorsData();
        } else if (res.data.ID == "E") {
          this.$message(res.data.MSG);
        }
      });
    },
    // 在图片上传成功的回调里 提交表单
    onSuccess(res) {
      console.log(res);
      if (res.res == "S") {
        this.form.imgUrl = res.path;
      }
    },
    // 清空已上传的文件列表
    handleRemove(file) {
      this.$refs.upload.clearFiles();
    }
  }
};
</script>
