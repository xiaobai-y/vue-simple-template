<template>
  <div>
    <p class="f2Block">预约就诊列表-已完成</p>
    <temTable
      :tableData="tableData"
      :tableLabel="tableLabel"
          :tableOption="tableOption"
      @handleButton="handleButton"
    ></temTable>
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
      userId: this.$store.getters.userid,
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
            label: "完成治疗",
            type: "success",
            methods: "completeTreat"
          }
        ]
      }
    };
  },

  created() {
    this.getTableData();
  },
  methods: {
    // 获取tab数据
    getTableData() {
      console.log(this.userId)
      let obj = {
        state: "预约成功",
        doctorId: this.userId
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
      if (obj.methods == "completeTreat") {
        this.completeTreat();
      }
    },
    // 完成治疗
    completeTreat() {
      let obj = {
        seeDoctorId: this.seeDoctorId
      };
      this.$http({
        method: "post",
        url: "/ptm/sdr/updateSeeDoctorToTreatment ",
        data: obj
      }).then(res => {
        if (res.data.ID == "S") {
          this.$message('治疗已完成');
          this.getTableData();
        } else if (res.data.ID == "E") {
          this.$message(res.data.MSG);
        }
      });
    }
  }
};
</script>