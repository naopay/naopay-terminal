<template>
  <div class="bg-white p-8 w-80 rounded shadow text-center break-words">
    <div>
      <transition name="pop">
        <QrcodeVue v-if="noPaymentReceived" :value="uri" :size="250" class="flex justify-center"></QrcodeVue>
        <LottieAnimation v-else-if="paymentAccepted" path="check_animation.json" :speed="2" :loop="false"/>
        <LottieAnimation v-else-if="paymentRejected" path="error_animation.json" :speed="1" :loop="false"/>
      </transition>
    </div>
    <div class="mt-6 text-3xl select-text">
      {{ nanoAmount }} ⋰⋅⋰
    </div>
    <div class="mt-2 select-text">
      <span class="text-blue-600">{{ posAddress.substring(0, 11) }}</span>
      <span>{{ posAddress.substring(11, 50) }}</span>
      <span class="text-blue-600">{{ posAddress.substring(50) }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
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

  get noPaymentReceived(): boolean {
    return cartModule.noPaymentReceived;
  }

  get paymentAccepted(): boolean {
    return cartModule.paymentIsAccepted;
  }

  get paymentRejected(): boolean {
    return cartModule.paymentIsRejected;
  }

  get uri(): string {
    return cartModule.uri;
  }

  get posAddress(): string {
    return cartModule.posAddress;
  }

  get nanoAmount(): number {
    return cartModule.nanoAmount;
  }

}
</script>

<style scoped>
.pop-enter-active, .pop-leave-active {
  transition: all 200ms ease-in-out;
}

.pop-enter, .pop-leave-to {
  position: absolute;
  transform: scale(0);
  opacity: 0.5;
}
</style>