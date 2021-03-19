<template>
  <div class="bg-white p-8 w-80 rounded shadow text-center break-words">
    <div>
      <LottieAnimation path="check_animation.json" :speed="2" :loop="false"/>
      <QrcodeVue :value="uri" :size="250" class="flex justify-center"></QrcodeVue>
    </div>
    <div class="mt-6 text-3xl">
      {{ nanoAmount }} ⋰⋅⋰
    </div>
    <div class="mt-2">
      <span class="text-blue-600">nano_3knu7sj</span>
      <span>erngfxtfndgxntsh1h8qrdim5b8wfgbq14w71wmg9fcetjs</span>
      <span class="text-blue-600">zzidiu</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"
import LottieAnimation from "lottie-vuejs/src/LottieAnimation.vue"
import QrcodeVue from 'qrcode.vue'
import { cartModule } from "@/store/cart"

@Component({
  components: {
    QrcodeVue,
    LottieAnimation
  }
})
export default class PaymentRequest extends Vue {

  get uri() {
    return cartModule.uri
  }

  get posAddress() {
    return cartModule.posAddress
  }

  get nanoAmount() {
    return cartModule.nanoAmount
  }

}
</script>
