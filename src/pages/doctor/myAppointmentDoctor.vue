<template>
  <div>
    <div class="statesCon">
      <span :class="state==0?'activeState':''" @click="clickState(0)">全部</span>
      <span :class="state==1?'activeState':''" @click="clickState(1)">待接受</span>
      <span :class="state==2?'activeState':''" @click="clickState(2)">待治疗</span>
      <span :class="state==3?'activeState':''" @click="clickState(3)">已完成</span>
    </div>
    <el-table :data="tableData" stripe border style="100%">
      <el-table-column label="预约人" prop="customerName" width="180"></el-table-column>
      <el-table-column label="宠物品种" prop="petsType" width="180"></el-table-column>
      <el-table-column label="宠物疾病" prop="petsDisease" width="180"></el-table-column>
      <el-table-column label="预约日期" prop="appointmentDate" width="180"></el-table-column>
      <el-table-column label="备注" prop="remark" width="200"></el-table-column>
      <el-table-column label="操作" prop width></el-table-column>
    </el-table>
  </div>
</template>
<script>
import qs from 'qs'
export default {
  name: "app",
  data() {
    return {
      state: 0,
      tableData: []
    };
  },
  created() {
    // 发送 POST 请求
    let data = {
        userName : "xiaoming",
        seeDoctorId : 8
    }
    this.$axios({
      method: "post",
      headers:{'Content-Type' : 'application/x-www-form-urlencoded;charset=UTF-8'},
      url: "http://192.168.0.104:8080/pethospitalmanagement/ptm/sdr/selectAllSeeDoctorByPrimaryKey",
      data: qs.stringify({data:JSON.stringify(data)})
    }).then(function(res) {
         console.log(res);
         this.tableData = res.res;
    }).catch(function(error) {
         console.log(error);
    });

    // this.$axios
    //   .post(
    //     "http://192.168.0.104:8080/pethospitalmanagement/ptm/sdr/selectAllSeeDoctorByPrimaryKey",
    //    JSON.stringify(data)
    //   )
    //   .then(function(res) {
    //     console.log(res);
    //     this.tableData = res.res;
    //   })
    //   .catch(function(error) {
    //     console.log(error);
    //   });
  },
  methods: {
    clickState(state) {
      this.state = state;
    }
  }
};
</script>
<style lang="less" scoped>
.statesCon {
  font-size: 14px;
  color: #333;
  background-color: #f2f2f2;
  height: 35px;
  line-height: 35px;
  margin: 10px 0;
}
.statesCon span {
  display: inline-block;
  cursor: pointer;
  width: 60px;
  text-align: center;
  border-right: 1px solid #e6e6e6;
}
.activeState {
  display: inline-block;
  cursor: pointer;
  width: 60px;
  text-align: center;
  border-right: 1px solid #e6e6e6;
  background-color: #fff;
}
</style>