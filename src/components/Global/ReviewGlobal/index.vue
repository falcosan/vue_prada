<template>
  <div class="review">
    <div v-if="view.star" class="review__star">
      <ul class="review__star-list">
        <li
          v-for="star in max.stars"
          :key="star"
          :class="['review__star-list--item', { selected: star <= quantity }]"
        />
      </ul>
    </div>
    <span class="review__text" v-text="'Read reviews(02) | '" />
    <span class="review__write" v-text="'Write review'" />
  </div>
</template>

<script>
import { computed, reactive, toRefs } from 'vue'
export default {
  name: 'ReviewGlobal',
  props: {
    type: {
      type: String,
      required: true,
      validator: (val) => /star/.test(val),
    },
    quantity: {
      type: [Number, String],
      default: 0,
      validator: (val) => !isNaN(+val),
    },
  },
  setup(props) {
    const state = reactive({
      max: {
        stars: 5,
      },
    })
    const { max } = toRefs(state)
    const view = computed(() => ({
      star: props.type === 'star',
    }))
    return {
      max,
      view,
    }
  },
}
</script>

<style src="./style.scss" lang="scss" />
