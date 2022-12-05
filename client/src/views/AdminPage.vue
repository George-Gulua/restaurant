<template>
  <div class='admin'>
    <div class='container'>
      <div class='products'>
        <div class='add-menu'>
          <h2 class='admin__title'>Добавление товара</h2>
          <form class='form'>
            <p class='form__title'>Название продукта</p>
            <input class='form__field' type='text' v-model='title' placeholder='Введите название продукта'>
            <p class='form__title'>Описание продукта</p>
            <input class='form__field' type='text' v-model='description' placeholder='Введите описание продукта'>
            <p class='form__title'>Цена продукта</p>
            <input class='form__field' type='number' v-model='price' placeholder='Введите цену продукта'>
            <p class='form__title'>Добавить картинку</p>
            <input type="file" ref="file" accept='image/*,.png,.jpg' @change='handlerChange'>
            <button class='form__btn btn' @click='addProduct' >Добавить продукт</button>
          </form>
        </div>
        <div>
        </div>
        <div class='delete-menu'>
          <h2 class='admin__title'>Продукция</h2>
          <div class='delete-menu__item' v-for='product in products' :key='product.id'>
            <div class='delete-menu__info'>
              <p class='delete-menu__title'>Название:</p>
              <p class='delete-menu__title'>{{product.title}}</p>
            </div>
            <div class='delete-menu__info'>
              <p class='delete-menu__description'>Описание:</p>
              <p class='delete-menu__description'>{{product.description}}</p>
            </div>
            <div class='delete-menu__info'>
              <p class='delete-menu__description'>Цена:</p>
              <p class='delete-menu__price'>{{product.price}}</p>
            </div>
            <button class='delete-menu__btn btn' @click='deleteProduct(product.id)'>Удалить</button>
          </div>
        </div>
      </div>
      <div class='orders'>
        <div class='order-menu'>
          <h2 class='admin__title'>Все заказы</h2>
            <div class='order-menu__item' v-for='order in orders' :key='order.order_id'>
              <div class='order-menu__all-info'>
                <div class='order-menu__info'>
                  <p class='order-menu__title border-bottom'>ID заказа</p>
                  <p class='order-menu__title'>{{order.order_id}}</p>
                </div>
                <div class='order-menu__info'>
                  <p class='order-menu__description border-bottom'>Пользователь</p>
                  <p class='order-menu__description'>{{order.owner_login}}</p>
                </div>
                <div class='order-menu__info'>
                  <p class='order-menu__description border-bottom'>Дата заказа</p>
                  <p class='order-menu__description'>{{order.creation_date}}</p>
                </div>
                <button class='delete-menu__btn btn' @click='deleteOrder(order.order_id)'>Удалить</button>
              </div>
              <div class='order-menu__order-list' v-for='(product, index) in order.products' :key='index'>
                  <div class='order-menu__order-list-info'>
                    <p class='order-menu__order-list-title border-bottom'>Название товара</p>
                    <p class='order-menu__order-list-title'>{{product.title}}</p>
                  </div>
                <div class='order-menu__order-list-info'>
                  <p class='order-menu__order-list-description border-bottom'>Цена</p>
                  <p class='order-menu__order-list-description'>{{product.price}}</p>
                </div>
                  <div class='order-menu__order-list-info'>
                    <p class='order-menu__order-list-description border-bottom'>Количество продукта</p>
                    <p class='order-menu__order-list-description'>{{product.product_quantity}}</p>
                  </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'AdminPage',
  data() {
    return {
      title: '',
      description: '',
      price: null,
      img: null,
      products: null,
      orders: null
    }
  },
  methods: {
    handlerChange(event) {
      const reader = new FileReader()
      reader.readAsDataURL(event.target.files[0])
      reader.onload = () => {
        console.log(reader.result);
        this.file = reader.result
      };
    },
    async addProduct() {
      await axios.post('http://localhost:8000/addProduct', {
        jwt: localStorage.getItem('token'),
        title: this.title,
        description: this.description,
        price: this.price,
        img: this.file
      })

      const { data } = await axios.get('http://localhost:8000/getProductsAll')
      this.products = data
    },
    async deleteProduct(id) {
      await axios.post('http://localhost:8000/removeProduct', {
          product_id: id,
          jwt: localStorage.getItem('token')
        }
      )
      const { data } = await axios.get('http://localhost:8000/getProductsAll')
      this.products = data
    },
    async deleteOrder(id) {
      await axios.post('http://localhost:8000/removeOrder', {
          order_id: id,
          jwt: localStorage.getItem('token')
        }
      )
      const orders = await axios.get(`http://localhost:8000/getOrdersAll?jwt=${localStorage.getItem('token')}`)
      this.orders = orders.data
    }
  },
  async mounted() {
    const products = await axios.get('http://localhost:8000/getProductsAll')
    this.products = products.data
    const orders = await axios.get(`http://localhost:8000/getOrdersAll?jwt=${localStorage.getItem('token')}`)
    this.orders = orders.data
    console.log(orders.data)
  }
}
</script>

<style lang='scss' scoped>
.admin {
  .products {
    display: flex;
    justify-content: space-between;
  }
  &__title {
    font-size: 32px;
    margin: 40px 0;
  }
  .form {
    display: flex;
    flex-direction: column;
    gap: 20px;

    &__title {

    }
    &__field {
      padding: 12px;
      border: none;
      outline: none;
      border-radius: 4px;
      max-width: 400px;
    }
    &__btn {
      max-width: 400px;
    }
  }
  .delete-menu {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 20px;

    &__item {
      display: flex;
      align-items: center;
      background: #F1F1F1;
      padding: 20px;
      border-radius: 4px;
    }
    &__info {
      display: flex;
      flex-direction: column;
      gap: 20px;
      border-left: 1px solid #212121;
      padding: 0 20px;
    }
    &__title {
      font-size: 24px;
    }
    &__description {
      font-size: 24px;
      width: 120px;
      white-space: break-spaces;
      word-break: break-word;
    }
    &__price {
      color: #b4805b;
      font-size: 24px;
      font-weight: 700;
    }
    &__btn {
      background: #ce2929;
    }
  }
  .order-menu {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 80px;
    &__all-info {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    &__order-list {
      display: flex;
      gap: 40px;
      border: 1px solid #212121;
      padding: 20px;
    }
    &__item {
      display: flex;
      background: #F1F1F1;
      padding: 20px;
      border-radius: 4px;
      gap: 20px;
      flex-direction: column;
    }
    &__info {
      display: flex;
      flex-direction: column;
      gap: 20px;
      border-left: 1px solid #212121;
      padding: 0 20px;
    }
    &__title {
      font-size: 24px;
    }
    &__description {
      font-size: 24px;
    }
    &__price {
      color: #b4805b;
      font-size: 24px;
      font-weight: 700;
    }
    &__btn {
      background: #ce2929;
    }

  }

}
.border-bottom {
  border-bottom: 4px solid #212121;
}
</style>