import { ref, computed } from 'vue'

export default {
  install: async (app) => {
    const shop = ref([])
    // Use provide/inject instead of global store like pinia or vuex
    app.provide(
      'shop',
      computed({
        get: () => shop.value,
        set: ({ products, operation }) => {
          const setterVal = Array.isArray(products) ? products : [products]
          if (operation === 'add') {
            shop.value.push(...setterVal)
          } else {
            shop.value = products
          }
        },
      }),
    )
  },
}
