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
        </div>
      </el-menu>
    </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "app",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["newrouter"])
  },
  methods: {
    // 点击左侧菜单项
    clickMenu(menu) {
      // console.log(JSON.stringify(menu));
      // 跳转
      this.$router.push({ path: menu.path });
      // 右侧标签页
      let openTabs = this.$store.getters.opentabs;
      // 判断当前点击的菜单项有没有打开
      let result = openTabs.some(item => {
        if (item.name == menu.name) {
          return true;
        }
      });
      if (result) {
        // 该标签页打开了
        this.$store.commit("changeTab", menu);
      } else {
        // 该标签页没有打开
        this.$store.commit("addTab", menu);
      }
    }
  }
};
</script>
<style lang="less" scoped>
a {
  text-decoration: none;
}
.router-link-active {
  text-decoration: none;
}
</style>