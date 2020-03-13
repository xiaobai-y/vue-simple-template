<template>
    <el-container>

    <el-header>
      <navHeader></navHeader>
    </el-header>

    <el-container>
      <!-- 侧边菜单栏 -->
      <el-aside width="150px">
        <navMenu></navMenu>
      </el-aside>

      <!-- main -->
      <el-main>
        <navMain></navMain>
        <router-view></router-view>
        
      </el-main>

    </el-container>

  </el-container>
  
</template>
<script>
import navHeader from "../components/header/header";
import navMenu from "../components/navMenu/navmenu";
import navMain from "../components/navMain/navTabs";

export default {
  name: "app",
  data() {
    return {};
  },
  components: {
    navHeader,
    navMenu,
    navMain,
  },
  methods: {}
};
</script>
<style lang="less" >
html,
body,
#app,
.el-container {
  height: 100%;
  
}
.el-header {
  display: flex;
  justify-content: space-between;
  background-color: #111;
  color: #fff;
  line-height: 60px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.8);
}
.el-aside {
  background-color: #222324;
  color: #8e8e8e;
}

.el-main {
  background-color: #f8f8f8;
  color: #333;
}
</style>