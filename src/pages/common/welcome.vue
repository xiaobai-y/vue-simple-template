<template>
  <div>
    <h2>欢迎来到宠物医院后台管理系统</h2>
  </div>
</template>
<script>
export default {
  name: "app",
  data() {
    return { 
      editableTabs: [
        {
          title: "Tab 1",
          name: "1",
          content: "Tab 1 content"
        },
        {
          title: "Tab 2",
          name: "2",
          content: "Tab 2 content"
        }
      ]
    };
  },
  methods: {}
};
</script>
<style lang="less">
</style>