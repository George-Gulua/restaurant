<template>
  <div class="register">
    <div class="container">
      <form class="form" @submit.prevent="handleSubmit">
        <span class="form__title">Регистрация</span>
        <div class="register-form">
          <input class='register-form__field' v-model="first_name" type="text" placeholder="Имя" required>
          <input class='register-form__field' v-model="last_name" type="text" placeholder="Фамилия" required>
          <input class='register-form__field' v-model="login" type="text" placeholder="Логин" required>
          <input class='register-form__field' v-model="password" type="password" placeholder="Пароль" required>
          <button class='register-form__btn'>Зарегистрироваться</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'RegisterPage',
  data() {
    return {
      first_name: '',
      last_name: '',
      login: '',
      password: ''
    }
  },
  methods: {
    handleSubmit() {
      axios.post('http://localhost:8000/signup', {
        first_name: this.first_name,
        last_name: this.last_name,
        login: this.login,
        password: this.password
      })
      this.$router.push('/login')
    }
  }
}
</script>
<style lang="scss" scoped>
.register {
  width: 360px;
  padding: 8% 0 0;
  margin: auto;

  .form {
    background: #00BFFF;
    border-radius: 10px;
    max-width: 360px;
    margin: 0 auto 100px;
    padding: 45px;
    text-align: center;

    .register-form {
      margin-top: 15px;

      &__field {
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
      &__btn {
        text-transform: uppercase;
        outline: 0;
        background: #F1F1F1;
        width: 100%;
        cursor: pointer;
        margin-bottom: 15px;
        border: 0;
        border-radius: 5px;
        padding: 15px;
        color: #212121;
        font-size: 14px;
        transition: .3s;
        &:hover {
          background: #212121;
          color: #F1F1F1;
        }
      }
    }

    .subtitle {
      font-size: 12px;
      text-decoration: underline;
      cursor: pointer;
    }
  }
}
</style>