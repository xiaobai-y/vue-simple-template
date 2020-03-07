<template>
  <div>
    <el-dialog title="修改密码" :visible.sync="dialogFormVisible" :show="show" @close="closeDialog">
      <el-form :model="form" :rules="rules" ref="psdForm">
        <el-form-item label="原密码" :label-width="formLabelWidth" prop="oldPsd">
          <el-input v-model="form.oldPsd" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" :label-width="formLabelWidth" prop="newPsd">
          <el-input v-model="form.newPsd" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" :label-width="formLabelWidth" prop="againPsd">
          <el-input v-model="form.againPsd" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="submitPsdForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
    name:'app',
    data(){
        return {
            formLabelWidth:'120px',
            dialogFormVisible:this.show,
            form:{
                oldPsd:'',
                newPsd:'',
                againPsd:'',
            },
            rules:{
               oldPsd:[{required:true,message:'请输入原密码',trigger:'blur'}],
               newPsd:[{required:true,message:'请输入新密码',trigger:'blur'}],
               againPsd:[{required:true,message:'请再次输入新密码',trigger:'blur'}],
            }
        }
    },
    props:{
      show:{
        type:Boolean,
        default:false,
      }
    },
    watch:{
      show(){
        this.dialogFormVisible = this.show
      }
    },
    methods:{
      closeDialog(){
        this.dialogFormVisible = false
        this.$emit('closeDialog',this.dialogFormVisible);
      },
      submitPsdForm(){
        this.$refs['psdForm'].validate(valid=>{
          if(valid){
            console.log('submit');
          }else{
            console.log('error submit');
            return false;
          }
        })
      },
    }
}
</script>