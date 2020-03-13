<template>
  <div>
    <p class="f2Block">顾客列表</p>
    <temTable
      :tableData="tableData"
      :tableLabel="tableLabel"
      :tableOption="tableOption"
      @handleButton="handleButton"
    ></temTable>
  </div>
</template>
<script>
import temTable from "../../components/tem-table/tem-table";
import qs from "qs";
export default {
  name: "customerManage",
  components: {
    temTable
  },
  data() {
    return {
      tableData: [],
      tableLabel: [
        {
          prop: "id",
          label: "顾客编号",
          width: "150px"
        },
        {
          prop: "username",
          label: "顾客姓名",
          width: "150px"
        },
        {
          prop: "phone",
          label: "顾客手机号",
          width: "150px"
        }
      ],
      tableOption: {
        label: "操作",
        options: [
          {
            label: "重置密码",
            type: "danger",
            methods: "resetPsd"
          }
        ]
      }
    };
  },
  created() {
    this.getTableData();
  },
  methods: {
    // 获取顾客列表数据
    getTableData() {
      this.$http({
        method: "post",
        url: "/ptm/user/selectAllCustomer"
      }).then(res => {
        if (res.data.ID == "S") {
          this.tableData = res.data.res;
        } else if (res.data.ID == "E") {
          this.$message(res.data.MSG);
        }
      });
    },
    handleButton(e){
      console.log(e);
      let id = e.row.id
      if(e.methods=='resetPsd'){
        this.resetPsdDialog(id);
      }
    },
    // 重置密码
    resetPsdDialog(id) {
      // 弹出确认提示框
      this.$confirm("此操作将重置顾客密码, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.resetPsd(id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消重置"
          });
        });  
    },
    // 重置密码接口
    resetPsd(id){
        let obj = {
        id: id
      };
      this.$http({
        method: "post",
        url: "/ptm/user/resetPassword",
        data: obj
      }).then(res => {
        if (res.data.ID == "S") {
          this.$message('顾客密码已重置为111111')
        } else if (res.data.ID == "E") {
          this.$message(res.data.MSG);
        }
      })
    },

  }
};
</script>