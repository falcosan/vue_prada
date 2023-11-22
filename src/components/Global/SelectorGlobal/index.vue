<template>
  <div class="selector">
    <label v-if="label" class="selector__label" v-text="label" />
    <div v-if="view.color" class="selector__color">
      <ol class="selector__color-list">
        <li
          v-for="(color, indexColor) in items"
          :key="`${color[colorPropKey]}_${indexColor}`"
          class="selector__color-list--hex"
          :style="`background-color: ${color[colorPropKey]}`"
          @mouseleave="changeColor(current)"
          @click="changeSelect(indexColor)"
          @mouseover="changeColor(indexColor)"
        />
      </ol>
    </div>
    <div
      v-else-if="view.dropdown"
      v-click-outside:[false]="toggleShow"
      class="selector__dropdown"
    >
      <div
        :key="`${items[current][dropdownPropKey]}_selected`"
        class="selector__dropdown-selected"
        @click="toggleShow"
      >
        {{ items[current][dropdownPropKey] }}
        <span :class="['selector__dropdown-chevron', { rotated: show }]" />
      </div>
      <ol v-show="show" class="selector__dropdown-list">
        <template v-for="(dropdown, indexDropdown) in items">
          <li
            v-if="indexDropdown !== current"
            :key="`${dropdown[dropdownPropKey]}_${indexDropdown}`"
            class="selector__dropdown-list--item"
            @click="changeSelect(indexDropdown)"
          >
            {{ dropdown[dropdownPropKey] }}
          </li>
        </template>
      </ol>
    </div>
    <div v-else-if="view.number" class="selector__number">
      <div class="selector__number-minus" @click="changeSelect(current - 1)">
        <span class="selector__number-minus--icon" />
      </div>
      <ol class="selector__number-list">
        <template v-for="(number, indexNumber) in items">
          <li
            v-if="indexNumber === current"
            :key="`${setNumber(number)}_${indexNumber}`"
            class="selector__number-list--item"
          >
            {{ setNumber(number) }}
          </li>
        </template>
      </ol>
      <div class="selector__number-plus" @click="changeSelect(current + 1)">
        <span class="selector__number-plus--icon" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive, toRefs, watch } from 'vue'
export default {
  name: 'SelectorGlobal',
  props: {
    type: {
      type: String,
      required: true,
      validator: (val) => /dropdown|number|color/.test(val),
    },
    items: {
      type: [Array, Number, String],
      required: true,
      validator: (val) => Array.isArray(val) || !isNaN(+val),
    },
    label: {
      type: String,
      default: '',
    },
    colorPropKey: {
      type: String,
      default: 'hexCode',
    },
    dropdownPropKey: {
      type: String,
      default: 'value',
    },
    numberPropKey: {
      type: String,
      default: 'value',
    },
  },
  emits: ['select', 'color'],
  setup(props, { emit }) {
    const state = reactive({
      current: 0,
      show: false,
    })
    const { show, current } = toRefs(state)
    const view = computed(() => ({
      color: props.type === 'color',
      number: props.type === 'number',
      dropdown: props.type === 'dropdown',
    }))
    const changeSelect = (index) => {
      if (
        !isNaN(index) &&
        index >= 0 &&
        index < (Array.isArray(props.items) ? props.items.length : +props.items)
      ) {
        current.value = index
      }
      toggleShow()
    }
    const toggleShow = (operation) => {
      const setter = !!operation === operation ? operation : !show.value
      show.value = setter
    }
    const setNumber = (number) =>
      !isNaN(+number) ? `0${number}` : number[props.numberPropKey]
    const changeColor = (index) => emit('color', props.items[index])
    watch(
      () => current.value,
      (val) => {
        if (Array.isArray(props.items) && props.items.length) {
          emit('select', props.items[val])
        } else if (!isNaN(+props.items)) {
          emit('select', val + 1)
        }
      },
      { immediate: true },
    )
    return {
      view,
      show,
      current,
      setNumber,
      toggleShow,
      changeColor,
      changeSelect,
    }
  },
}
</script>

<style src="./style.scss" lang="scss" />
