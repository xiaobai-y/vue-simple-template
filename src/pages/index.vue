<template>
  <el-container>
    <!-- 头部 -->
    <el-header>
      <div>宠物医院后台管理系统</div>
      <div>
        <span class="username">{{$store.getters.username}}</span>
        <span class="logout" @click="logout">退出</span>
      </div>
    </el-header>

    <el-container>
      <!-- 侧边菜单栏 -->
      <el-aside width="150px">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#222324"
          text-color="#8e8e8e"
          active-text-color="#fff"
        >
          <div v-for="item in newrouter[0].children" v-if="!item.hidden">
            <router-link :to="item.path" v-if="!item.hidden&&!item.children">
              <el-menu-item :index="item.path">{{item.name}}</el-menu-item>
            </router-link>
          </div>
        </el-menu>
      </el-aside>

      <!-- main -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
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
    logout() {
      this.$store
        .dispatch("Logout")
        .then(() => {
          this.$router.push({ path: "/login" });
        })
        .catch(err => {
          this.$message.error(err);
        });
    }
  }
};
</script>>
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
.username,
.logout {
  font-size: 14px;
  color: #ccc;
}
.logout {
  margin-left: 30px;
}
.el-aside {
  // position: absolute;
  // top: 60px;
  // left: 0;
  // right: 0;
  // bottom: 0;
  background-color: #222324;
  color: #8e8e8e;
}

.el-main {
  // position: absolute;
  // top: 60px;
  // left: 150px;
  // right: 0;
  // bottom: 0;
  background-color: #e9eef3;
  color: #333;
  text-align: center;
}
a {
  text-decoration: none;
}
.router-link-active {
  text-decoration: none;
}
</style>