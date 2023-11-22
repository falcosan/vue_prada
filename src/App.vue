<script setup>
import Header from '@/components/Layout/HeaderLayout'
import Main from '@/components/Layout/MainLayout'
import Footer from '@/components/Layout/FooterLayout'
</script>

<template>
  <Header />
  <Suspense>
    <Main />
  </Suspense>
  <Footer />
</template>
