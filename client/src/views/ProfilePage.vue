<template>
  <div class='profile'>
    <div class='container'>
      <h2 class='profile__title' >Смена пароля</h2>
      <div class='profile__form'>
        <input class='profile__field' v-model='new_password' type='password' placeholder='Введите новый пароль'>
        <button class='profile__btn btn' @click='handlerClick'>Сменить пароль</button>
      </div>
    </div>
  </div>
</template>

<script>

import axios from 'axios'

export default {
  name: 'ProfilePage',
  data() {
    return {
      new_password: ''
    }
  },
  methods: {
    async handlerClick() {
      const { data } = await axios.post('http://localhost:8000/changePassword', {
        jwt:localStorage.getItem('token'),
        new_password: this.new_password
      })
      localStorage.setItem('token', data.jwt)
    }
  }
}
</script>

<style lang='scss' scoped>
.profile {
  .container {
  }
  &__title {
    font-size: 32px;
    margin: 40px 0;
  }
  &__form {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 300px;
  }
  &__field {
    padding: 12px;
    border: none;
    outline: none;
    border-radius: 4px;
    max-width: 400px;
  }
}
</style>