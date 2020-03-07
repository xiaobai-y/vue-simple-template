<template>
  <div>
    <p class="f2Block">预约就诊列表</p>
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
  name: "appointmentTreatManage",
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
          prop: "illnessType",
          label: "宠物疾病",
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
        },
          {
          prop: "appointmentDoctor",
          label: "预约医生",
          width: "200px"
        }
      ],
      tableData: [
        {
          appointmentName: "jp",
          appointmentDate: "2020-02-02",
          petsType: "泰迪",
          illnessType:'拉肚子',
          appointmentPhone: "12345678998",
          appointmentRemark: "要照顾好哦",
          appointmentDoctor:'无'
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
            label: "分配医生",
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