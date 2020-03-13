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
      userId:this.$store.getters.userid,
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
        state: "待审核",
        doctorId:this.userId
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
      console.log(obj);
      this.$http({
        method: "post",
        url: "/ptm/sdr/updateRefuseTreatment",
        data: obj
      }).then(res => {
        if (res.data.ID == "S") {
          this.$message("已拒单,费用将在24小时之内退回到顾客账户");
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
    closeDialog(){
      this.changeDoctorDialogVisible = false
      this.doctorId = ''
    }
  }
};
</script>