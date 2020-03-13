<template>
  <div>
    <p class="f2Block">预约寄养列表-预约成功</p>
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
      tableLabel: [
        {
          prop: "fosterid",
          label: "预约编号",
          width: "150px"
        },
        {
          prop: "username",
          label: "预约人",
          width: "120px"
        },
        {
          prop: "starttime",
          label: "预约开始日期",
          width: "120px"
        },
        {
          prop: "endtime",
          label: "预约结束日期",
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
          width: "400px"
        },
        {
          prop: "state",
          label: "状态",
          width: "200px",
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
            label: "结束寄养",
            type: "primary",
            methods: "endEvent"
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
      let obj = {
        state: "预约成功"
      };
      this.$http({
        method: "post",
        url: "/ptm/foster/selectAllFosterCareByPrimaryKey",
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
      if (obj.methods = "endEvent") {
        this.endEvent(obj.row.fosterid);
      } 
    },
    // 结束寄养
    endEvent(id) {
      let obj = {
        fosterId: id
      };
      this.$http({
        method: "post",
        url: "/ptm/foster/updateFosterCareToArrange ",
        data: obj
      }).then(res => {
        if (res.data.ID == "S") {
          this.$message('已完成寄养');
          this.getTableData();
        } else if (res.data.ID == "E") {
          this.$message(res.data.MSG);
        }
      });
    },
  }
};
</script>