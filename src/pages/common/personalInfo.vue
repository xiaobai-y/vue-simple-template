<template>
  <div>
    <div class="f2Block font18">个人信息</div>

    <div class="info">
      <div class="marginT20">
        <span class="marginR20">账号</span>
        <span >{{this.$store.getters.username}}</span>
      </div>
      <div class="marginT20">
        <span class="marginR20">手机号</span>
        <span >{{this.$store.getters.username}}</span>
      </div>
    </div>
    

    <!-- 修改密码 -->
    <el-button type="danger" size="mini" class="changePsd" @click="changePsd">修改密码</el-button>
    <changePsd :show.sync="show" @closeDialog="closeDialog"></changePsd>
  </div>  

</template>
<script>
import changePsd from "../../components/changePsd/changePsd";
export default {
  name: "app",
   components:{
     changePsd,
  },
  data() {
    return {
      show:false,
      tableData: [
        {
          name: "11",
          psd: "11"
        }
      ]
    };
  },
  methods: {
    changePsd() {
      this.show = true
    },
    closeDialog(visible){
      this.show = visible
    },
  },
 
};
</script>
<style lang="less" scoped>
.info{
  margin:30px 0 0 0;
  padding: 0px 70px;
  font-size: 16px;
}
.marginR20{
  display: inline-block;
  width: 60px;
  text-align: right;
  margin-right: 20px;
  color: #333;
}
.marginT20{
  margin-top: 15px;
}
.changePsd{
  margin: 20px 80px 0;
}
</style>