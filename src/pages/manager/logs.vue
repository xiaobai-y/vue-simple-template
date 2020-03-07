<template>
  <div>
    <temTable :loading="loading" :table-data="tableData" :table-label="tableLabel" :table-option="tableOption"></temTable>
  </div>
</template>
<script>
import temTable from "../../components/tem-table/tem-table";
export default {
  components: {
    temTable
  },
  data() {
    return {
      loading: false,
      tableLabel: [
        {
          prop: "logID",
          label: "日志ID",
          width: "120px"
        },
        {
          prop: "operate",
          label: "操作",
          width: "120px"
        },
        {
          prop: "operator",
          label: "操作人",
          width: "120px"
        },
        {
          prop: "operateDate",
          label: "操作时间",
        }
      ],
      tableData: [
          {
              logID:'123456',
              operate:'登录',
              operator:'yaya',
              operateDate:'1111'
          }
      ],
      tableOption:{

      }
    };
  },
  created(){
    // console.log('logs created')
  }
};
</script>