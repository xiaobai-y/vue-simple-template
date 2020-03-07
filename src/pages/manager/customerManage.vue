<template>
  <div>
    <p class="f2Block">顾客列表</p>
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
    name:'customerManage',
    components: {
      temTable
    },
    data(){
        return{
            loading:false,
            tableData:[],
            tableLabel:[
                {
                    
                }
            ],
            tableOption:{}
        }
    }

}
</script>