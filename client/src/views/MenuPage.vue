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
import axios from 'axios'

export default {
  name: 'MenuPage',
  components: {
    CardItem: CardItem,
    CartMenu: CartMenu
  },
  data() {
    return {
      products: null
    }
  },
  async mounted() {
    const { data } = await axios.get('http://localhost:8000/getProductsAll')
    console.log(data)
    this.products = data
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
    flex-wrap: wrap;
  }
}
</style>