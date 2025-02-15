<script setup>
import Navbar from './components/Navbar.vue'
import { RouterView, useRoute } from 'vue-router';

const route = useRoute();
</script>


<template>
  <Navbar v-if="route.path != '/'"/>
  <RouterView />
</template>

