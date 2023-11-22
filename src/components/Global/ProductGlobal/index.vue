<template>
  <section class="product">
    <div class="product__left">
      <Gallery v-if="setterData.gallery.length" :images="setterData.gallery" />
    </div>
    <div class="product__right">
      <h1
        v-if="setterData.title"
        class="product__title"
        v-text="setterData.title"
      />
      <Review type="star" quantity="5" />
      <span
        v-if="setterData.price"
        class="product__price"
        v-text="`${currency}${setterData.price.value}`"
      />
      <p
        v-if="setterData.description"
        class="product__description"
        v-text="setterData.description"
      />
      <hr />
      <div class="product__selectors">
        <Selector
          type="color"
          label="Color"
          :items="setterData.colors"
          @select="currentColor"
          @color="temporaryColor"
        />
        <Selector
          type="dropdown"
          label="Size"
          :items="setterData.sizes"
          @select="currentSize"
        />
        <div class="product__selectors-down">
          <Selector type="number" :items="7" @select="currentQuantity" />
          <div
            :class="[
              'product__buyable',
              setterData.buyable ? 'available' : 'unavailable',
            ]"
          >
            <span class="product__buyable-icon" />
            <span
              class="product__buyable-text"
              v-text="setterData.buyable ? 'In stock' : 'Not in stock'"
            />
          </div>
        </div>
      </div>
      <hr />
      <div class="product__info">
        <div class="product__info-sku">
          <span class="product__info-sku--title" v-text="'sku'" />
          <span class="product__info-sku--description" v-text="'M107-B '" />
        </div>
        <div class="product__info-category">
          <span class="product__info-category--title" v-text="'category'" />
          <span
            class="product__info-category--description"
            v-text="'Women/ T-Shirt'"
          />
        </div>
      </div>
      <div class="product__actions">
        <button class="product__actions-cart" @click="addToCart">
          add to cart
        </button>
        <button class="product__actions-favorite">
          <span class="product__actions-favorite--icon" />
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import Review from '@/components/Global/ReviewGlobal'
import Gallery from '@/components/Global/GalleryGlobal'
import Selector from '@/components/Global/SelectorGlobal'
import { computed, inject, reactive, toRefs } from 'vue'
export default {
  name: 'ProductGlobal',
  components: { Review, Gallery, Selector },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const shop = inject('shop')
    const state = reactive({
      color: {
        current: {},
        temporary: {},
      },
      size: null,
      quantity: null,
    })
    const { color, size, quantity } = toRefs(state)
    const setterData = computed(() => {
      const gallery = [...props.data.gallery]
      gallery[0] = color.value.temporary.fullImage
      return {
        ...props.data,
        gallery: [...gallery],
      }
    })
    const currency = computed(() => {
      switch (setterData.value?.price.currency?.toLowerCase()) {
        case 'try':
          return '₺ '
        case 'usd':
          return '$ '
        default:
          return ''
      }
    })
    const currentSize = (value) => (size.value = value)
    const currentQuantity = (value) => (quantity.value = value)
    const currentColor = (value) => {
      color.value.current = value
      color.value.temporary = value
    }
    const temporaryColor = (value) => (color.value.temporary = value)
    const addToCart = () => {
      const products = []
      for (let i = 0; i < quantity.value; i++) {
        // Use this to set exacts values
        // products.push({
        //   size: size.value.value,
        //   color: color.value.current.color,
        // })
        products.push({ size: size.value, color: color.value.current })
      }
      shop.value = { products, operation: 'add' }
    }
    return {
      color,
      currency,
      addToCart,
      setterData,
      currentSize,
      currentColor,
      temporaryColor,
      currentQuantity,
    }
  },
}
</script>

<style src="./style.scss" lang="scss" />
