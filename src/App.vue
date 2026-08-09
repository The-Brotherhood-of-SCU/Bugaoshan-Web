<script setup lang="ts">
import NavBar from './components/NavBar.vue'
import Hero from './components/Hero.vue'
import Downloads from './components/Downloads.vue'
import Features from './components/Features.vue'
import Screenshots from './components/Screenshots.vue'
import OpenSource from './components/OpenSource.vue'
import Disclaimer from './components/Disclaimer.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <NavBar />
  <main>
    <Hero />
    <Downloads />
    <Features />
    <Screenshots />
    <OpenSource />
    <Disclaimer />
  </main>
  <Footer />
</template>
