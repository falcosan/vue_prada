import { ref, computed } from 'vue'

export default {
  install: async (app) => {
    const shop = ref([])
    // Use provide/inject instead of global store like pinia or vuex
    app.provide(
      'shop',
      computed({
        get: () => shop.value,
        set: (val) => (shop.value = val),
      }),
    )
  },
}
