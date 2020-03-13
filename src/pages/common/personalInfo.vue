<template>
  <div>
    <p class="f2Block font18">个人信息</p>

    <div class="info">
      <div class="marginT20">
        <span class="marginR20">姓名

        </span>
        <span >{{this.$store.getters.username}}</span>
      </div>
      <div class="marginT20">
        <span class="marginR20">手机号</span>
        <span >{{this.$store.getters.phone}}</span>
      </div>
      <!-- 顾客可以充值 有余额 -->
      <div class="marginT20" v-if="$store.getters.role==2">
        <span class="marginR20">余额</span>
        <span >￥{{this.$store.getters.money}}</span>
      </div>
    </div>

    
    <!-- 充值弹窗 -->
    <el-dialog title="充值" :visible="visibleDialog" @close="closeDialog">
      <el-input placeholder="请输入充值金额" v-model="rechargeMoney"></el-input>
       <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改密码 -->
    <el-button type="danger" size="mini" class="changePsd"  @click="changePsd">修改密码</el-button>
    
    <!-- 充值 -->
    <el-button v-if="$store.getters.role==2" type="warning" size="mini"  @click="recharge" >充值</el-button>
    <changePsd :show.sync="show" @closeDialog="closeDialog"></changePsd>
  </div>  

</template>
<script>
import changePsd from "../../components/changePsd/changePsd";
import qs from 'qs'
export default {
  name: "app",
   components:{
     changePsd,
  },
  data() {
    return {
      id:this.$store.getters.userid,
      show:false,
      visibleDialog:false,
      rechargeMoney:'',
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
    closeDialog(){
      this.show = false
      this.visibleDialog = false
      this.rechargeMoney=''
    },
    recharge(){
      this.visibleDialog = true
      
    },
    // 提交充值
    submit(){
      let obj = {
       enterAmount:this.rechargeMoney,
       id:this.id
      }
     this.$http({
       method:'post',
       url:'/ptm/user/updateMyMoney',
       data:obj
     }).then(res=>{
       if(res.data.ID=="S"){
         this.visibleDialog = false
         let money = res.data.money
        this.$message('充值成功');
        this.$store.commit('SET_MONEY',money);
        sessionStorage.setItem('MONEY',money);
       }else if(res.data.ID=="E"){
         this.$message(res.data.MSG);
       }
     })
    }
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
  margin: 20px 0px 0 80px;
}
</style>