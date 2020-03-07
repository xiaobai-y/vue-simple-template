<template>
  <!-- 头部 -->
  <div class="navHeader">
    <div>宠物医院后台管理系统</div>
    <div>
      <span class="username">{{$store.getters.username}}</span>
      <span class="logout" @click="logout">退出</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "app",
  data() {
    return {};
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
</script>
<style lang="less" scoped>
.navHeader{
    width: 100%;
    display: flex;
    justify-content: space-between;
}
.username,
.logout {
  font-size: 14px;
  color: #ccc;
}
.logout {
  margin-left: 30px;
}
</style>