<template>
  <div>
    <div class="logs">
      <span :class="logType=='ERROR'?'':'activeSpan'" @click="switchLogs(0)">用户日志</span>
      <span :class="logType=='INFO'?'':'activeSpan'" @click="switchLogs(1)">系统日志</span>
    </div>
    <temTable :table-data="tableData" :table-label="tableLabel"></temTable>
    <div class="f2Block" style="margin:20px 0;">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="totalSize"
        :page-size="pageSize"
        style="text-align:center;"
        @current-change="currentChange"
        @prev-click="prevClick"
        @next-click="nextClick"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import temTable from "../../components/tem-table/tem-table";
import qs from "qs";
export default {
  components: {
    temTable
  },
  data() {
    return {
      tableLabel: [
        {
          prop: "logid",
          label: "日志ID",
          width: "180px"
        },
        {
          prop: "description",
          label: "操作",
          width: "180px"
        },
        {
          prop: "createby",
          label: "操作人",
          width: "180px"
        },
        {
          prop: "createdate",
          label: "操作时间",
          width: "180px"
        },
        {
          prop: "exceptiondetail",
          label: "记录"
        },
      ],
      tableData: [],
      pageNum: 1,
      pageSize: 5,
      totalSize: 0,
      logType:'INFO',
    };
  },
  created() {
    this.getLogsData();
  },
  methods: {
    getLogsData() {
      let obj = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        logType: this.logType
      };
      this.$http({
        method: "post",
        url: "/ptm/log/selectAllLogByPaging ",
        data: obj
      }).then(res => {
        if (res.data.ID == "S") {
          this.totalSize = res.data.res.totalSize;
          this.tableData = res.data.res.content;
        } else if (res.data.ID == "E") {
          this.$message(res.data.MSG);
        }
      });
    },
    currentChange(event) {
      this.pageNum = event;
      this.getLogsData();
    },
    prevClick(event) {
      this.pageNum = event;
      this.getLogsData();
    },
    nextClick(event) {
      this.pageNum = event;
      this.getLogsData();
    },
    switchLogs(n) {
      if(n==0){
        this.logType = 'INFO'
         this.getLogsData();
      }else if(n==1){
       this.logType = 'ERROR'
        this.getLogsData();
      }
    }
  }
};
</script>
<style lang="less" scoped>
.logs{
  font-size: 14px;
  background-color: #f2f2f2;
  margin-bottom: 20px;
}
.logs span{
  display: inline-block;
  widows: 40px;
  height: 40px;
  line-height: 40px;
  padding: 0 10px;
  cursor: pointer;
}
.activeSpan{
  display: inline-block;
  widows: 40px;
  height: 40px;
  line-height: 40px;
  cursor: pointer;
  background-color: #fff;
  border: 1px solid pink;
}
</style>