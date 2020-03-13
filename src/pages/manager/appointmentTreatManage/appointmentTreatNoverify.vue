<template>
  <div>
    <p class="f2Block">预约就诊列表-待审核</p>
    <temTable
      :tableData="tableData"
      :tableLabel="tableLabel"
      :tableOption="tableOption"
      @handleButton="handleButton"
    ></temTable>
    <!-- 拒单 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <el-input placeholder="请输入拒单原因" v-model="evaluation"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="rejectInterface">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 更换医生 -->
    <el-dialog title="分配医生" :visible.sync="changeDoctorDialogVisible" width="30%" @close="closeDialog">
      <el-select v-model="doctorId">
        <el-option
          v-for="(item,index) in doctorList"
          :label="item.label"
          :value="item.value"
          :key="index"
        ></el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="changeDoctorInterface">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import qs from "qs";
import temTable from "../../../components/tem-table/tem-table";
export default {
  name: "appointmentCareManage",
  components: {
    temTable
  },
  data() {
    return {
      doctorId:'',
      doctorList:[],
      changeDoctorDialogVisible: false,
      dialogVisible: false,
      evaluation: "",
      tableLabel: [
        {
          prop: "seedoctorid",
          label: "预约编号",
          width: "150px"
        },
        {
          prop: "username",
          label: "预约人",
          width: "120px"
        },

        {
          prop: "doctortime",
          label: "预约日期",
          width: "120px"
        },
        {
          prop: "petname",
          label: "宠物品种",
          width: "120px"
        },
        {
          prop: "phone",
          label: "预约人手机号",
          width: "150px"
        },
        {
          prop: "details",
          label: "备注",
          width: "300px"
        },
        {
          prop: "doctorname",
          label: "预约医生",
          width: "120px"
        },
        {
          prop: "state",
          label: "状态",
          width: "100px",
          render(row) {
            if (row.state == "待审核") {
              return {
                state: "待审核",
                type: "danger"
              };
            } else if (row.state == "预约成功") {
              return {
                state: "预约成功",
                type: "primary"
              };
            } else if (row.state == "已完成") {
              return {
                state: "已完成",
                type: "success"
              };
            }
          }
        }
      ],
      tableData: [],

      tableOption: {
        label: "操作",
        options: [
          {
            label: "拒单",
            type: "danger",
            methods: "rejectEvent"
          },
          {
            label: "接单",
            type: "primary",
            methods: "receiveEvent"
          },
          {
            label: "更换医生",
            type: "success",
            methods: "changeDoctorEvent"
          }
        ]
      }
    };
  },

  created() {
    this.getTableData();
    console.log(this.dialogVisible);
  },
  methods: {
    // 获取tab数据
    getTableData() {
      let obj = {
        state: "待审核"
      };
      this.$http({
        method: "post",
        url: "/ptm/sdr/selectAllSeeDoctorByPrimaryKey",
        data: obj
      }).then(res => {
        if (res.data.ID == "S") {
          this.tableData = res.data.res;
          console.log(this.tableData);
        } else if (res.data.ID == "E") {
          this.$message(res.data.MSG);
        }
      });
    },
    // 操作按钮
    handleButton(obj) {
      console.log(obj);
      this.seeDoctorId = obj.row.seedoctorid;
      if (obj.methods == "rejectEvent") {
        this.rejectEvent();
      } else if (obj.methods == "receiveEvent") {
        this.receiveEvent(obj.row.seedoctorid);
      } else if (obj.methods == "changeDoctorEvent") {
        this.changeDoctorEvent(obj.row.doctorid);
      }
    },
    // 点击拒单
    rejectEvent() {
      this.dialogVisible = true;
    },
    // 拒单接口
    rejectInterface() {
      let obj = {
        seeDoctorId: this.seeDoctorId,
        evaluation: this.evaluation
      };
      console.log(obj)
      this.$http({
        method: "post",
        url: "/ptm/sdr/updateRefuseTreatment",
        data: obj
      }).then(res => {
        if (res.data.ID == "S") {
          this.$message("已拒单，费用将在24小时之内退回到顾客账户");
          this.dialogVisible = false;
          this.evaluation = "";
          this.getTableData();
        } else if (res.data.ID == "E") {
          this.$message(res.data.MSG);
        }
      });
    },
    // 接单
    receiveEvent(id) {
      let obj = {
        seeDoctorId: this.seeDoctorId
      };
      this.$http({
        method: "post",
        url: "/ptm/sdr/updateSeeDoctorToArrange",
        data: obj
      }).then(res => {
        if (res.data.ID == "S") {
          this.$message("已接单");
          this.getTableData();
        } else if (res.data.ID == "E") {
          this.$message(res.data.MSG);
        }
      });
    },
    // 更换医生
    changeDoctorEvent(id) {
      this.changeDoctorDialogVisible = true;
      this.getDoctorsData();
      this.doctorId = id
      console.log('this.doctorId '+ id)
    },
    // 提交更换医生接口
    changeDoctorInterface() {
      let obj = {
          doctorId:this.doctorId,
          seeDoctorId:this.seeDoctorId
      }
      this.$http({
        method: "post",
        url: "/ptm/sdr/updateSeeDoctorByPrimaryKey",
        data: obj
      })
        .then(res => {
          if (res.data.ID == "S") {
            this.changeDoctorDialogVisible = false
            this.$message('更换医生成功');
            this.getTableData();
          } else if (res.data.ID == "E") {
            this.$message(res.data.MSG);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 获取医生列表
    getDoctorsData() {
      this.doctorList=[]
      this.$http({
        method: "post",
        url: "/ptm/user/selectAllDoctor"
      })
        .then(res => {
          console.log(res)
          if (res.data.ID == "S") {
            let doctorData = res.data.res;
            for (var i in doctorData) {
              let obj = {};
              obj.value = doctorData[i].id;
              obj.label = doctorData[i].username;
              this.doctorList.push(obj);
            }
            console.log(this.doctorList);

          } else if (res.data.ID == "E") {
            this.$message(res.data.MSG);
          }

          
        })
        .catch(err => {
          console.log(err);
        });
    },
    closeDialog(){
      this.changeDoctorDialogVisible = false
      this.doctorId = ''
    }
  }
};
</script>