<template>
  <div>
    <p class="f2Block">预约就诊列表-已拒绝</p>
    <temTable
      :tableData="tableData"
      :tableLabel="tableLabel"
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
          width: "200px"
        },
        {
          prop: "state",
          label: "状态",
          width: "120px",
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
            }else if (row.state == "拒绝") {
              return {
                state: "已拒绝",
                type: "info"
              };
            }
          }
        },
               {
          prop: "evaluation",
          label: "拒绝原因",
          width: "200px"
        },
         {
          prop: "doctorname",
          label: "预约医生",
          
        },
      ],
      tableData: [],
    };
  },

  created() {
    this.getTableData();
  },
  methods: {
    // 获取tab数据
    getTableData() {
      let obj = {
        state: "拒绝",
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

  }
};
</script>