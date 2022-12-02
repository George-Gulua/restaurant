<template>
  <div class="menu">
    <div class="container">
      <h2 class="menu__title">Наше меню</h2>
      <div class="list-items">
        <card-item v-for='product in products' :key='product.id' :product='product' @addProduct='addProduct'/>
      </div>
      <cart-menu v-if="cart.length" :cart_data='this.cart'/>
    </div>
  </div>
</template>

<script>
import CardItem from '@/components/CardItem'
import CartMenu from '@/components/CartMenu'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'MenuPage',
  components: {
    CardItem: CardItem,
    CartMenu: CartMenu
  },
  data() {
    return {
      products: [
        {id: 0, title: 'Пепперони', text: 'Пепперони - это очень вкусная пицца', price: 550, path: 'pizza.png'},
        {id: 1, title: 'Маргарита', text: 'Маргарита - это очень вкусная пицца', price: 450, path: 'pizza.png'},
        {id: 2, title: 'Карбонара', text: 'Карбонара - это очень вкусная пицца', price: 350, path: 'pizza.png'}
      ]
    }
  },
  methods: {
    ...mapActions([
      'ADD_TO_CART'
    ]),
    addProduct(data) {
      this.ADD_TO_CART(data)
      console.log(this.cart)
    }
  },
  computed: {
    ...mapGetters(['cart'])
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
}
</style>