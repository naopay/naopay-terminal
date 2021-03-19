<template>
  <div id="app" class="h-screen select-none">
    <Cart />
    <div v-if="shouldPay" class="absolute top-0 w-full h-full flex justify-center items-center bg-black bg-opacity-30">
      <PaymentRequest  />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Cart from './components/Cart.vue';
import PaymentRequest from './components/PaymentRequest.vue';
import { cartModule } from './store/cart';

@Component({
  components: {
    Cart,
    PaymentRequest
  },
})
export default class App extends Vue {

  created() {
    cartModule.registerSocket()
  }

  get shouldPay() {
    return cartModule.shouldPay
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