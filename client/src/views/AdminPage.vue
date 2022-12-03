<template>
  <div class='admin'>
    <div class='container'>
      <div class='add-menu'>
        <h2 class='admin__title'>Добавление товара</h2>
        <div class='form'>
          <p class='form__title'>Название продукта</p>
          <input class='form__field' type='text' v-model='title' placeholder='Введите название продукта'>
          <p class='form__title'>Описание продукта</p>
          <input class='form__field' type='text' v-model='description' placeholder='Введите описание продукта'>
          <p class='form__title'>Цена продукта</p>
          <input class='form__field' type='number' v-model='price' placeholder='Введите цену продукта'>
          <p class='form__title'>Добавить картинку</p>
          <input type="file" ref="file" accept='image/*,.png,.jpg' @change='handlerChange'>
          <button class='form__btn btn' @click='clickHandler' >Добавить продукт</button>
        </div>
      </div>
      <div>

      </div>
      <div class='delete-menu'>
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
          <button class='delete-menu__btn btn' @click='deleteItem(product.id)'>Удалить</button>
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
      products: null
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
    clickHandler() {

      axios.post('http://localhost:8000/addProduct', {
        jwt: localStorage.getItem('token'),
        title: this.title,
        description: this.description,
        price: this.price,
        img: this.file
      })
    },
    async deleteItem(id) {
     await axios.post('http://localhost:8000/removeProduct', {
          product_id: id,
          jwt: localStorage.getItem('token')
        }
      )
      const { data } = await axios.get('http://localhost:8000/getProductsAll')
      this.products = data
    }
  },
  async mounted() {
    const { data } = await axios.get('http://localhost:8000/getProductsAll')
    this.products = data
  }
}
</script>

<style lang='scss' scoped>
.admin {
  .container {
    display: flex;
    align-items: center;
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

</style>