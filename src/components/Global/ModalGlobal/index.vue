<template>
  <div ref="modalContainer" :class="['modal', { opened: openEvent || open }]">
    <slot name="activator" :open="openModal" />
    <div
      v-show="openEvent || open"
      ref="modal"
      class="modal__backdrop"
      tabindex="0"
      @click.stop="closeMode && closeModal()"
      @keydown.esc="closeMode && closeModal()"
    >
      <span v-if="closeMode" class="modal__backdrop-cross" />
      <div class="modal__container">
        <header v-if="hasSlot('header') || closeMode" class="modal__header">
          <slot name="header" />
        </header>
        <section v-if="hasSlot('body')" class="modal__body">
          <div class="modal__body-container">
            <slot name="body" />
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
<script>
import {
  ref,
  watch,
  toRefs,
  reactive,
  nextTick,
  useSlots,
  onBeforeUnmount,
} from 'vue'
export default {
  name: 'ModalGlobal',
  props: {
    open: {
      type: Boolean,
      default: false,
    },
    closeMode: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const modal = ref(null)
    const modalContainer = ref(null)
    const state = reactive({ openEvent: false })
    const { openEvent } = toRefs(state)
    const openModal = () => (openEvent.value = true)
    const closeModal = () => (openEvent.value = false)
    const checkModal = () => {
      if (props.open || openEvent.value) {
        document.body.appendChild(modal.value)
        nextTick(() => modal.value.focus({ preventScroll: true }))
      } else {
        modal.value.parentNode.removeChild(modal.value)
        modalContainer.value.appendChild(modal.value)
      }
    }
    const hasSlot = (name) => {
      const slots = useSlots()
      return Boolean(slots[name])
    }
    watch(() => [props.open, openEvent.value], checkModal)
    onBeforeUnmount(() => {
      if (props.open || openEvent.value) {
        modal.value.parentNode.removeChild(modal.value)
      }
    })
    return {
      modal,
      hasSlot,
      openEvent,
      openModal,
      closeModal,
      modalContainer,
    }
  },
}
</script>

<style src="./style.scss" lang="scss" />
