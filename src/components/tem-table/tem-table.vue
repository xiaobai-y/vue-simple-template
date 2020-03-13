<template>
  <el-table
    ref="table"
    :data="tableData"
    stripe
    border
    v-loading="loading"
    element-loading-text="Loading"
  >
    <el-table-column
      v-for="(item,index) in tableLabel"
      :key="index"
      :prop="item.prop"
      :label="item.label"
      :width="item.width?item.width:''"
    >
      <template  slot-scope="scope">

        <el-tag v-if="item.render" :type="item.render(scope.row).type" size="small">{{item.render(scope.row).state}}</el-tag>
        <span v-else>{{scope.row[item.prop]}}</span>

      </template>
    </el-table-column>
    
    <el-table-column
      v-if="tableOption.label"
      :width="tableOption.width"
      :label="tableOption.label"
      class-name="small-padding fixed-width"
    >
      <template slot-scope="scope">
        <el-button
          v-for="(item,index) in tableOption.options"
          :key="index"
          :type="item.type"
          @click="handleButton(item.methods,scope.row)"
          size="mini"
        >{{item.label}}</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    tableData: {
      type: Array,
      default() {
        return [];
      }
    },
    tableLabel: {
      type: Array,
      default() {
        return [];
      }
    },
    tableOption: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {};
  },
  mounted(){
      //  console.log('children mounted')
      //  console.log(this.tableData)
  },
  created(){
  },
  methods:{
    handleButton(methods,row){
      this.$emit('handleButton',{'methods':methods,'row':row});
    }
  }
};
</script>