<template>
  <div class="home" style="margin-top: 100px;">
    <div class="container gradient-container rounded-container mt-5">
      <HeroComponent />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HeroComponent from '@/components/Hero.vue'

export default {
  name: 'HomeView',
  components: {
    HeroComponent
  }
}
</script>
