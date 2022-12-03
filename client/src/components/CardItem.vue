<template>
  <div class="card">
    <img class="card__img" :src="product.img" alt="изображение еды">
    <h2 class="card__title">{{product.title}}</h2>
    <p class="card__text">{{product.description}}</p>
    <span class='card__price'>{{product.price}}Р</span>
    <button class="card__btn btn" @click='addProduct()'>Добавить</button>
  </div>
</template>

<script>
export default {
  name: 'CardItem',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  methods: {
    addProduct() {
      this.$emit('addProduct',this.product)
    }
  }
}
</script>

<style lang='scss' scoped>
.card {
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 20px;
  gap: 20px;
  border-radius: 12px;
  background: #F1F1F1;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  width: 386px;
  min-height: 455px;
}
</style>