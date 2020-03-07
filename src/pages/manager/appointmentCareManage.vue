<template>
  <div>
    <p class="f2Block">预约寄养列表</p>
    <temTable
      :loading="loading"
      :tableData="tableData"
      :tableLabel="tableLabel"
      :tableOption="tableOption"
    ></temTable>
  </div>
</template>
<script>
import temTable from "../../components/tem-table/tem-table";
export default {
  name: "appointmentCareManage",
  components: {
    temTable
  },
  data() {
    return {
      loading: false,
      tableLabel: [
        {
          prop: "appointmentName",
          label: "预约人",
          width: "120px"
        },
        {
          prop: "appointmentDate",
          label: "预约日期",
          width: "120px"
        },
        {
          prop: "petsType",
          label: "宠物品种",
          width: "120px"
        },
        {
          prop: "appointmentPhone",
          label: "预约人手机号",
          width: "150px"
        },
        {
          prop: "appointmentRemark",
          label: "备注",
          width: "200px"
        }
      ],
      tableData: [
        {
          appointmentName: "jp",
          appointmentDate: "2020-02-02",
          petsType: "泰迪",
          appointmentPhone: "12345678998",
          appointmentRemark: "要照顾好哦"
        }
      ],

      tableOption: {
        label: "操作",
        options: [
          {
            label: "拒单",
            type: "danger",
            icon: "el-icon-delete",
            methods: "rejectEvent"
          },
          {
            label: "接单",
            type: "primary",
            icon: "el-icon-circle-check",
            methods: "receiveEvent"
          }
        ]
      }
    };
  },

  created() {
  },
  methods: {
    // 拒单
    rejectEvent() {},
    // 接单
    receiveEvent() {}
  }
};
</script>