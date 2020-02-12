<template>
  <div class="home">
    <HelloWorld msg="Prestamype WebCam"/>

  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/example.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  }
}
</script>
