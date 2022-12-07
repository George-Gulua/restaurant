import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: localStorage.getItem('role'),
    cart: []
  },
  getters: {
    user: state => {
      return state.user
    },
    cart: state => {
      return state.cart
    }
  },
  mutations: {
    user(state, user) {
      state.user = user
    },
    cart(state, cart) {
      state.cart = cart
    },
    setCart(state, product) {
      if(state.cart.length) {
        let isProductExists = false;
        state.cart.map(item => {
          if (item.id === product.id) {
            isProductExists = true
            item.product_quantity++
          }
        })
        if (!isProductExists) {
          state.cart.push(product)
        }
      }
      else {
        state.cart.push(product)
      }
    },
    removeFromCart(state, index) {
      state.cart.splice(index, 1)
    }
  },
  actions: {
    user(context, user) {
      context.commit('user', user)
    },
    ADD_TO_CART({commit}, product) {
      commit('setCart', product)
    },
    DELETE_FROM_CART({commit}, index) {
      commit('removeFromCart', index)
    },
    cart(context, cart) {
      context.commit('cart', cart)
    }
  },
  modules: {}
})
