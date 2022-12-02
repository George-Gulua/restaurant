<template>
  <div id="app">
    <NavMenu/>
    <router-view/>
  </div>
</template>

<script>
import NavMenu from "@/components/NavMenu";

export default {
  name: 'App',
  components: {
    NavMenu
  }
}
</script>

<style lang="scss">
@import "assets/scss/globals.scss";

</style>
