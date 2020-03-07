<template>
  <el-tabs
    v-model="editableTabsValue"
    type="card"
    closable
    @tab-remove="removeTab"
    @tab-click="handleTabClick"
    style="height:100%"
  >
    <el-tab-pane
      v-for="(item, index) in editableTabs"
      :key="item.path"
      :label="item.name"
      :name="item.path"
    >
    <router-view></router-view>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
export default {
  name: "app",
  data() {console.log()
    return {
      editableTabsValue: "/welcome",
      editableTabs: []
    };
  },
  created(){
      this.editableTabs = this.$store.getters.opentabs;
      this.$router.push({path:this.editableTabs[0].path});
  },
  methods: {
    handleTabClick(target) {
      this.$router.push({path:target.name});
    },
    removeTab(targetPath) {
    // 首页不允许被关闭（为了防止el-tabs栏中一个tab都没有）
      if (targetPath === '/welcome') {
        return false
      }
      let tabs = this.editableTabs;
    //   当前打开的标签页
      let activePath = this.editableTabsValue;
    //   判断删除的是不是当前打开的标签页 如果删除的是当前打开的标签页 那就删除完毕之后取打开它前一个或者后一个标签页 同时改变路由
      if (activePath === targetPath) {
          console.log(11);
        tabs.forEach((tab, index) => {
          if (tab.path === targetPath) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activePath = nextTab.path;
            }
          }
        });
        this.$router.push({path:activePath});
      }

      this.editableTabsValue = activePath;
      this.editableTabs = tabs.filter(tab => tab.path !== targetPath);
    }
  },
  computed:{
      getActiveTab(){
          return this.$store.getters.activetab
      }
  },
  watch:{
       // 监听activetab以实现点击左侧栏时激活已存在的标签
      getActiveTab(val){
          if(val !== this.editableTabsValue){
              this.editableTabsValue = val
          }
      }
  }
};
</script>
<style lang="less" scoped>
</style>