<template>
  <section class="product">
    <div class="product__left">
      <Gallery v-if="data.gallery.length" :images="data.gallery" />
    </div>
    <div class="product__right">
      <h1 v-if="data.title" class="product_title" v-text="data.title" />
      <Review type="star" quantity="5" />
      <span
        v-if="data.price"
        class="product__price"
        v-text="`${currency}${data.price.value}`"
      />
      <p
        v-if="data.description"
        class="product__description"
        v-text="data.description"
      />
      <hr />
    </div>
  </section>
</template>

<script>
import Review from '@/components/Global/ReviewGlobal'
import Gallery from '@/components/Global/GalleryGlobal'
import { computed } from 'vue'
export default {
  name: 'ProductGlobal',
  components: { Review, Gallery },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const currency = computed(() => {
      switch (props.data?.price.currency?.toLowerCase()) {
        case 'try':
          return '₺ '
        case 'usd':
          return '$ '
        default:
          return ''
      }
    })
    return {
      currency,
    }
  },
}
</script>

<style src="./style.scss" lang="scss" />
