<template>
  <div class="gallery">
    <div class="gallery__highlight">
      <div
        class="gallery__arrow-container--left"
        @click="changeCurrent('left')"
      >
        <span class="gallery__arrow-left" />
      </div>
      <Transition name="fade">
        <Modal
          :key="setterImages.highlight"
          class="gallery__highlight-modal"
          close-mode
        >
          <template #activator="action">
            <div
              class="gallery__highlight-modal--container"
              @click="action.open()"
            >
              <img
                :key="`${setterImages.highlight}_activator`"
                class="gallery__highlight-modal--activator"
                :src="setterImages.highlight"
              />
            </div>
          </template>
          <template #body>
            <img
              :key="`${setterImages.highlight}_content`"
              class="gallery__highlight-modal--content"
              :src="setterImages.highlight"
            />
          </template>
        </Modal>
      </Transition>
      <div
        class="gallery__arrow-container--right"
        @click="changeCurrent('right')"
      >
        <span class="gallery__arrow-right" />
      </div>
    </div>
    <div class="gallery__selectors">
      <ul class="gallery__images">
        <template v-for="(image, indexImage) in setterImages.images">
          <li
            v-if="image"
            :key="`${image}_${indexImage}`"
            class="gallery__images-item"
            @click="changeCurrent(image)"
          >
            <img class="gallery__images-item--image" :src="image" />
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<script>
import { computed, reactive, toRefs, watch } from 'vue'
import Modal from '@/components/Global/ModalGlobal'
export default {
  name: 'GalleryGlobal',
  components: { Modal },
  props: {
    images: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    const state = reactive({
      current: 0,
    })
    const { current } = toRefs(state)
    const setterImages = computed(() => ({
      highlight: props.images[current.value],
      images: props.images.filter((_, index) => index !== current.value),
    }))
    const changeCurrent = (item) => {
      if (item === 'left') {
        if (!current.value) {
          current.value = props.images.length - 1
        } else {
          current.value--
        }
      } else if (item === 'right') {
        if (current.value === props.images.length - 1) {
          current.value = 0
        } else {
          current.value++
        }
      } else {
        const index = props.images.findIndex((image) => image === item)
        if (index !== -1) current.value = index
      }
    }
    watch(
      () => props.images,
      () => (current.value = 0),
      { deep: true },
    )
    return {
      setterImages,
      changeCurrent,
    }
  },
}
</script>

<style src="./style.scss" lang="scss" />
