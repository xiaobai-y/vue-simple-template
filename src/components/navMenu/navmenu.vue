<template>
   <div>
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        background-color="#222324"
        text-color="#8e8e8e"
        active-text-color="#fff"
      >
        <div v-for="item in newrouter[0].children" v-if="!item.hidden">
          <el-menu-item
            :index="item.path"
            @click="clickMenu(item)"
            v-if="!item.hidden&&!item.children"
          >{{item.name}}</el-menu-item>

           <el-submenu v-else :index="item.path">
             <template slot="title">{{item.name}}</template>
             <div v-for="item2 in item.children">              
               <el-menu-item
               :index="item2.path"
                @click="clickMenu(item2)"
                v-if="!item2.hidden&&!item2.children"
               >{{item2.name}}</el-menu-item>
             </div>
             
          </el-submenu>

        </div>
      </el-menu>
    </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "app",
  data() {
    return {
      openTabs:this.$store.getters.opentabs
    };
  },
  created(){
  },
  computed: {
    ...mapGetters(["newrouter"])
  },
  methods: {
    // 点击左侧菜单项
    clickMenu(menu) {
      this.openTabs = this.$store.getters.opentabs
      // 右侧标签页
      console.log(this.openTabs)
      // 判断当前点击的菜单项有没有打开
      let result = this.openTabs.some(item => {
        if (item.path == menu.path) {
          return true;
        }
      });
      if (result) {
        // 该标签页打开了
        this.$store.commit("changeTab", menu.path);
      } else {
        // 该标签页没有打开
        this.$store.commit("addTab", menu);
      }
       // 跳转
      this.$router.push({ path: menu.path });
    }
  }
};
</script>
<style lang="less" scoped>
</style>