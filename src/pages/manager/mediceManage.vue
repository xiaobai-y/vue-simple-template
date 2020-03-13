<template>
  <div>
    <div class="f2Block">
      <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addMedice">新增药品</el-button>
    </div>
    <tem-table
      :tableData="tableData"
      :tableOption="tableOption"
      :tableLabel="tableLabel"
      @handleButton="handleButton"
    ></tem-table>
    <!-- 新增药品 -->
    <el-dialog title="药品基本信息" :visible.sync="dialogFormVisible" @close="cancleForm('mediceForm')">
      <el-form :model="form" :rules="rules" ref="mediceForm">
        <el-form-item label="药品编码" :label-width="formLabelWidth" prop="drugId">
          <el-input v-model="form.drugId" :disabled="disabledFlag"></el-input>
        </el-form-item>

        <el-form-item label="药品名称" :label-width="formLabelWidth" prop="drugName">
          <el-input v-model="form.drugName"></el-input>
        </el-form-item>

        <el-form-item label="计量单位" :label-width="formLabelWidth" prop="unit">
          <el-select v-model="form.unit">
            <el-option value="瓶" label="瓶"></el-option>
            <el-option value="盒" label="盒"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="单价" :label-width="formLabelWidth" prop="price">
          <el-input v-model="form.price"></el-input>
        </el-form-item>

        <el-form-item label="库存" :label-width="formLabelWidth" prop="sl">
          <el-input v-model="form.sl"></el-input>
        </el-form-item>

        <el-form-item label="描述" :label-width="formLabelWidth" prop="description">
          <el-input
            type="textarea"
            v-model="form.description"
            autocomplete="off"
            placeholder="请输入100字以内的描述"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancleForm('mediceForm')">取 消</el-button>
        <el-button type="primary" @click="submitForm('mediceForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import qs from "qs";
import temTable from "../../components/tem-table/tem-table";
export default {
  name: "mediceManage",
  components: {
    temTable
  },
  data() {
    return {
      disabledFlag: false,
      formLabelWidth: "120px",
      dialogFormVisible: false,
      isEdit: false,
      form: {
        drugId: "",
        drugName: "",
        unit: "",
        price: "",
        sl: "",
        description: ""
      },
      rules: {
        drugId: [
          { required: true, message: "药品编码不能为空", trigger: "blur" }
        ],
        drugName: [
          { required: true, message: "药品名称不能为空", trigger: "blur" }
        ],
        unit: [
          { required: true, message: "计量单位不能为空", trigger: "change" }
        ],
        price: [
          { required: true, message: "药品单价不能为空", trigger: "blur" }
        ],
        sl: [{ required: true, message: "药品库存不能为空", trigger: "blur" }]
      },
      tableData: [],
      tableLabel: [
        {
          prop: "drugid",
          label: "药品编码",
          width: "150px"
        },
        {
          prop: "drugname",
          label: "药品名称",
          width: "150px"
        },
        {
          prop: "unit",
          label: "计量单位",
          width: "100px"
        },
        {
          prop: "price",
          label: "单价",
          width: "100px"
        },
        {
          prop: "sl",
          label: "库存",
          width: "100px"
        },
        {
          prop: "description",
          label: "描述",
          width: "400px"
        }
      ],
      tableOption: {
        label: "操作",
        options: [
          {
            label: "编辑",
            type: "",
            methods: "editEvent"
          },
          {
            label: "删除",
            type: "danger",
            methods: "delEvent"
          }
        ]
      }
    };
  },
  created() {
    this.getMediceData();
  },
  methods: {
    // 获取药品列表数据
    getMediceData() {
      console.log("getMediceData");
      this.$http({
        method: "post",
        url: "/ptm/drug/selectDrugByPrimaryKey"
      }).then(res => {
        if (res.data.ID == "S") {
          this.tableData = res.data.res;
        } else if (res.data.ID == "E") {
          this.$message(res.data.MSG);
        }
      });
    },
    handleButton(e) {
      if (e.methods == "editEvent") {
        this.editEvent(e.row);
      } else if (e.methods == "delEvent") {
        this.delEvent(e.row.drugid);
      }
    },
    // 新增药品按钮
    addMedice() {
      this.dialogFormVisible = true;
      this.disabledFlag = false;
      this.isEdit = false;
      this.form = {
        drugId: "",
        drugName: "",
        unit: "",
        price: "",
        sl: "",
        description: ""
      };
    },
    insertInterface(formName) {
      this.$http({
        method: "post",
        url: "/ptm/drug/insertDrug",
        data: this.form
      }).then(res => {
        if (res.data.ID == "S") {
          this.dialogFormVisible = false;
          this.$refs[formName].resetFields();
          this.getMediceData();
        } else if (res.data.ID == "E") {
          this.$message(res.data.MSG);
        }
      });
    },
    editInterface(formName) {
      this.$http({
        method: "post",
        url: "/ptm/drug/updateDrugByPrimaryKey",
        data: this.form
      }).then(res => {
        if (res.data.ID == "S") {
          this.dialogFormVisible = false;
          console.log(formName);
          this.$refs[formName].resetFields();
          this.getMediceData();
        } else if (res.data.ID == "E") {
          this.$message(res.data.MSG);
        }
      });
    },
    editEvent(row) {
      this.dialogFormVisible = true;
      this.isEdit = true;
      // 药品编码不能修改
      this.disabledFlag = true;
      console.log(row);
      this.form = {
        drugId: row.drugid,
        drugName: row.drugname,
        unit: row.unit,
        price: row.price,
        sl: row.sl,
        description: row.description
      };
    },
    delEvent(id) {
      // 弹出确认提示框
      this.$confirm("此操作将删除此药品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.delInterface(id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    delInterface(id) {
      let obj = {
        drugId: id
      };
      this.$http({
        method: "post",
        url: "/ptm/drug/deleteDrugByPrimaryKey",
        data: obj
      }).then(res => {
        if (res.data.ID == "S") {
          this.getMediceData();
        } else if (res.data.ID == "E") {
          this.$message(res.data.MSG);
        }
      });
    },
    // 关闭弹窗
    cancleForm(formName) {
      console.log(formName);
      this.$refs[formName].resetFields();
      this.dialogFormVisible = false;
      // 重置编码disabled
      this.disabledFlag = false;
    },
    // 药品 提交表单
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.isEdit == true) {
            this.editInterface(formName);
          } else {
            this.insertInterface(formName);
          }
        }
      });
    }
  }
};
</script>