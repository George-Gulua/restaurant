<template>
  <div class="card">
    <img class="card__img" src="@/assets/images/pizza.png" alt="изображение еды">
    <h2 class="card__title">Пепперони</h2>
    <p class="card__text">Пепперони - это очень вкусная пицца</p>
    <button class="card__btn btn">Добавить</button>
  </div>
</template>

<script>
export default {
  name: 'CardItem',
}
</script>

<style>
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
</style>