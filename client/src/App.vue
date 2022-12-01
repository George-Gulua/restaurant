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
  data() {
    return {
      users: [{id: 0, login: '123', password: 'pass', token: '123321'}]
    }
  },
  created() {
    if (localStorage.getItem('token')) {
      this.$store.dispatch('user', this.users[1])
    }
  },
  components: {
    NavMenu
  }
}
</script>

<style lang="scss">
@import "assets/scss/globals.scss";

</style>
