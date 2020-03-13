<template>
  <div>
    <div class="f2Block">客户留言板</div>
    <el-table stripe border style="width:100%;" :data="messageData">
      <el-table-column width="180" label="姓名" prop="username"></el-table-column>
      <el-table-column width="180" label="类型" prop="serveType"></el-table-column>
      <el-table-column label="评价" prop="evaluation"></el-table-column>
    </el-table>
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
import qs from "qs";
export default {
  name: "app",
  data() {
    return {
      messageData: [],
      totalSize: 0,
      pageSize: 5,
      pageNum: 1
    };
  },
  created() {
    this.getMessage();
  },
  methods: {
    //   列表数据
    getMessage() {
      let obj = {
        pageNum: this.pageNum,
        pageSize: this.pageSize
      };
      this.$http({
        method: "post",
        url: "/ptm/sdr/selectAllMessage ",
        data: obj
      }).then(res => {
        if (res.data.ID == "S") {
          this.totalSize = res.data.res.totalSize;
          this.messageData = res.data.res.content;
        } else if (res.data.ID == "E") {
        }
      });
    },
    // 点击当前分页
    currentChange(event) {
      this.pageNum = event;
      this.getMessage();
    },
    // 点击上一页
    prevClick(event) {
      this.pageNum = event;
      this.getMessage();
    },
    // 点击下一页
    nextClick(event) {
      this.pageNum = event;
      this.getMessage();
    }
  }
};
</script>