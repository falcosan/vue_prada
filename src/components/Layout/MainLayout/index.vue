<template>
  <main class="main">
    <component :is="view" />
  </main>
</template>

<script>
import { computed } from 'vue'
import Home from '@/views/HomeView'
export default {
  name: 'MainLayout',
  components: { Home },
  setup() {
    // Set the view based on the current route value here using switch statement
    const view = computed(() => {
      return 'Home'
    })
    return {
      view,
    }
  },
}
</script>

<style src="./style.scss" lang="scss" />
