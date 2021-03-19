<template>
  <div id="app">
    <Cart/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Cart from './components/Cart.vue';
import { cartModule } from './store/cart';

@Component({
  components: {
    Cart,
  },
})
export default class App extends Vue {

  created() {
    cartModule.registerSocket()
  }

}
</script>

<style>
html,
body {
  font-family: "Jost", sans-serif;
}

#app {
  font-family: "Jost", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>