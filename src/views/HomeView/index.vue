<script setup>
import { computed } from 'vue'
import Product from '@/components/Global/ProductGlobal'

const res = await fetch('/product.json')
  .then((res) => {
    if (res.ok) return res.json()
    throw new Error('Generic error')
  })
  .catch((err) => console.error(err))
const data = computed(() => {
  if (res?.data?.length && res.data[0].catalogEntryView?.length) {
    const source = res.data[0].catalogEntryView[0]
    return {
      title: source.name,
      description: source.longDescription,
      price: source.price.find(
        (price) => price.usage?.toLowerCase() === 'display',
      ),
      gallery:
        source.attachments?.map(
          (attach) => attach?.attachmentAssetPath || '',
        ) ?? [],
    }
  } else {
    return null
  }
})
</script>
<template>
  <div class="home">
    <Product :data="data" />
  </div>
</template>
<script>
export default { name: 'HomeView' }
</script>
<style src="./style.scss" lang="scss" />
