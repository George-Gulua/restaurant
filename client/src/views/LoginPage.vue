<template>
  <div class="login">
    <div class="container">
      <form @submit.prevent="handleSubmit" class="form">
        <span class="form__title">Вход в аккуант</span>
        <div class="login-form">
          <input v-model="login" type="text" placeholder="Логин" required>
          <input v-model="password" type="password" placeholder="Пароль" required>
          <button>Войти</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'LoginPage',
  data() {
    return {
      login: '',
      password: ''
    }
  },
  methods: {
    async handleSubmit() {
      const { data } = await axios.post('http://localhost:8000/authorize', {
        login: this.login,
        password: this.password
      })

      const response = await axios.post('http://localhost:8000/getUser', {jwt: data.jwt})

      localStorage.setItem('token', data.jwt)
      localStorage.setItem('role', response.data.user.role)
      await this.$store.dispatch('user', localStorage.getItem('role'))
      await this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  width: 360px;
  padding: 8% 0 0;
  margin: auto;

  .form {
    background: #f1f1f1;
    border-radius: 10px;
    max-width: 360px;
    margin: 0 auto 100px;
    padding: 45px;
    text-align: center;

    .login-form {
      margin-top: 15px;

    }

    .subtitle {
      font-size: 12px;
      text-decoration: underline;
      cursor: pointer;
    }

    & input {
      outline: none;
      background: #ffffff;
      width: 100%;
      border: 0;
      border-radius: 5px;
      margin: 0 0 15px;
      padding: 15px;
      font-size: 14px;

      &:focus {
        background: #dbdbdb;
      }
    }

    & button {
      text-transform: uppercase;
      outline: 0;
      background: #d39c72;
      width: 100%;
      cursor: pointer;
      margin-bottom: 15px;
      border: 0;
      border-radius: 5px;
      padding: 15px;
      color: #F1F1F1;
      font-size: 14px;
      transition: .3s;
    }
  }
}
</style>