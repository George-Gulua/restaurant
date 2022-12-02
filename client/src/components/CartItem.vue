<template>
  <div class='cart-item'>
    <div class='cart-item__info'>
      <p class='cart-item__title'>{{cart_item.title}}</p>
      <p class='cart-item__price'>{{cart_item.price}}руб.</p>
    </div>
    <div class='cart-item__quantity'>
      <p>Количество:</p>
      {{cart_item.quantity}}
    </div>
    <button class='cart-item__btn btn' @click='deleteFromCart'>Удалить</button>
  </div>
</template>

<script>
export default {
  name: 'CartItem',
  props: {
    cart_item: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    deleteFromCart() {
      this.$emit('deleteFromCart')
    }
  },
  mounted() {
    this.$set(this.cart_item, 'quantity', 1)
  }
}
</script>

<style lang='scss' scoped>
.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
  background: #F1F1F1;
  padding: 20px;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

  &__info{
    display: flex;
    align-items: center;
    gap: 40px;
  }
  &__title {
    font-size: 24px;
    border-bottom: 3px solid #d39c72;
  }
  &__price {
    color: #b4805b;
    font-size: 24px;
    font-weight: 700;
  }
  &__quantity {
    display: flex;
    gap: 20px;
  }
  &__btn {
    background: #ce2929;
  }
}
</style>