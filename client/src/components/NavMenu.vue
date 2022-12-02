<template>
  <div class="nav-menu">
    <div class="container">
      <h1 class="logotype">iveria</h1>
      <nav class="nav" v-if="!user">
        <router-link class="nav__item" to='/login' >Войти</router-link>
        <router-link class="nav__item" to='/register'>Зарегистрироваться</router-link>
      </nav>
      <nav class="nav" v-if="user === 'user'">
        <router-link class="nav__item" to='/'>Меню</router-link>
        <a class="nav__item" href='/login' @click="handleClick">Выйти</a>
      </nav>
      <nav class="nav" v-if="user === 'admin'">
        <router-link class="nav__item" to='/'>Меню</router-link>
        <router-link class="nav__item" to='/admin'>Панель администратора</router-link>
        <a class="nav__item" href='/login' @click="handleClick">Выйти</a>
      </nav>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: 'NavMenu',
  methods: {
    handleClick() {
      localStorage.removeItem('token')
      localStorage.removeItem('role')
      this.$store.dispatch('user', null)
      this.$router.push('/login')
    }
  },
  computed: {
    ...mapGetters(['user'])
  }
}
</script>


<style lang="scss" scoped>
.nav-menu {
  background: #212121;


  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 0;
  }

  .logotype {
    color: #F1F1F1;
    text-transform: uppercase;
    cursor: default;
  }

  .nav {
    display: flex;
    gap: 20px;

    &__item {
      color: #F1F1F1;

      &:hover {
        color: #d39c72;
        transition: .3s;
      }
    }
  }
}
</style>