<template>
  <div class="menu">
    <div class="container">
      <h2 class="menu__title">Наше меню</h2>
      <div class="list-items">
        <div class="card">
          <img class="card__img" src="@/assets/images/pizza.png" alt="изображение еды">
          <h2 class="card__title">Пепперони</h2>
          <p class="card__text">Пепперони - это очень вкусная пицца</p>
          <button class="card__btn btn">Добавить</button>
        </div>
        <div class="card">
          <img class="card__img" src="@/assets/images/pizza.png" alt="изображение еды">
          <h2 class="card__title">Пепперони</h2>
          <p class="card__text">Пепперони - это очень вкусная пицца</p>
          <button class="card__btn btn">Добавить</button>
        </div>
        <div class="card">
          <img class="card__img" src="@/assets/images/pizza.png" alt="изображение еды">
          <h2 class="card__title">Пепперони</h2>
          <p class="card__text">Пепперони - это очень вкусная пицца</p>
          <button class="card__btn btn">Добавить</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MenuPage',
  data() {
    return {
      dishes: [
        {id: 0, title: 'Пепперони', text: 'Пепперони - это очень вкусная пицца'},
        {id: 1, title: 'Пепперони', text: 'Пепперони - это очень вкусная пицца'},
        {id: 2, title: 'Пепперони', text: 'Пепперони - это очень вкусная пицца'},
        {id: 3, title: 'Пепперони', text: 'Пепперони - это очень вкусная пицца'},
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
.menu {
  .container {
  }

  &__title {
    font-size: 32px;
    margin: 40px 0;
  }

  .list-items {
    display: flex;
    gap: 20px;
  }

  .card {
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 20px;
    gap: 20px;
    border-radius: 12px;
    background: #F1F1F1;
    flex: 1 1 calc(33.33% - 40px);
  }
}
</style>