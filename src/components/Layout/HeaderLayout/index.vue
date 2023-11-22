<template>
  <header class="header">
    <div class="header__upper">
      <div class="header__navigation">
        <div :class="['header__menu', { open: menu.show }]" @click="toggleMenu">
          <span class="header__menu-bar" />
        </div>
        <nav :class="['header__nav', { side: menu.show }]">
          <ul class="header__nav-list">
            <template v-for="(link, indexLink) in navElements">
              <li
                v-if="link"
                :key="`${indexLink}_${link.value}`"
                class="header__nav-list--link"
              >
                <a :href="link.to" v-text="link.value" />
              </li>
            </template>
          </ul>
        </nav>
      </div>
      <div class="header__logo">
        <img class="header__logo-img" src="@/assets/img/logo.png" />
      </div>
      <div class="header__shop">
        <div class="header__shop-icon">
          <img class="header__shop-icon--image" src="@/assets/img/shop.png" />
          <span
            v-if="shop.length"
            class="header__shop-length"
            v-text="shop.length"
          />
        </div>
      </div>
    </div>
    <div class="header__down">
      <span class="header__down-title" v-text="'Gokoping Shop Detail'" />
      <span
        class="header__down-breadcrumbs"
        v-text="'HOME / SHOP / SPRING T-SHIRT COLLECTION'"
      />
    </div>
    <Transition name="slide">
      <div v-show="menu.show" class="header__sidebar">
        <span class="header__sidebar-cross" @click="toggleMenu(false)" />
        <ul class="header__sidebar-list">
          <template v-for="(link, indexLink) in navElements">
            <li
              v-if="link"
              :key="`${indexLink}_${link.value}`"
              class="header__sidebar-list--link"
            >
              <a :href="link.to" v-text="link.value" />
            </li>
          </template>
        </ul>
      </div>
    </Transition>
    <Transition name="fade">
      <div
        v-if="menu.show"
        class="header__overlay"
        @click="toggleMenu(false)"
      />
    </Transition>
  </header>
</template>

<script>
import { reactive, toRefs, inject } from 'vue'
export default {
  name: 'HeaderLayout',
  setup() {
    const shop = inject('shop')
    const state = reactive({
      menu: {
        show: false,
      },
    })
    const { menu } = toRefs(state)
    const navElements = [
      { value: 'shop', to: '/' },
      { value: 'blog', to: '/' },
      { value: 'contact', to: '/' },
    ]
    const toggleMenu = (operation) => {
      const setter = !!operation === operation ? operation : !menu.value.show
      menu.value.show = setter
    }

    return {
      shop,
      menu,
      toggleMenu,
      navElements,
    }
  },
}
</script>

<style src="./style.scss" lang="scss" />
