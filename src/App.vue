<template>
  <div id="app">
    <router-view></router-view>
    <loading v-if="$store.getters.isShow"></loading>
  </div>
</template>

<script>
import loading from './components/loading'
export default {
  name: 'app',
  components:{
    loading
  }
}
</script>

<style>
</style>
