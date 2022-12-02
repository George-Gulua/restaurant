<template>
  <div class='cart-menu'>
    <h2 class="cart-menu__title">Оформление заказа</h2>
    <div class='cart-menu__list'>
      <cart-item
        v-for='(item, index) in cart_data'
        :key='item.id'
        :cart_item='item'
        @deleteFromCart='deleteFromCart(index)'
      />
    </div>
  </div>
</template>

<script>
import CartItem from '@/components/CartItem'
import { mapActions } from 'vuex'

export default {
  name: 'CartMenu',
  components: {
    CartItem: CartItem
  },
  props: {
    cart_data: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    ...mapActions(['DELETE_FROM_CART']),
    deleteFromCart(index) {
      this.DELETE_FROM_CART(index)
    }
  }

}
</script>

<style lang='scss' scoped>
.cart-menu {
  &__title {
     font-size: 32px;
     margin: 40px 0;
  }
  &__list {
    display: flex;
    flex-direction: column;
    gap: 20px
  }
}
</style>