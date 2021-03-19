<template>
  <div class="flex flex-col justify-between h-full p-10 bg-darker text-white">
    <ul class="flex-1 flex flex-col gap-8 w-full overflow-y-scroll scrollbar-hidden">
      <li v-for="item in items" :key="item._id + item.extras.map(e => e._id).join('-')">
        <CartItem :item="item"/>
      </li>
    </ul>
    <div class="flex flex-col gap-y-4 text-2xl font-light pt-8 border-t border-gray-600">
      <div class="flex justify-between">
        <div>Total</div>
        <div>${{ fiatAmount.toFixed(2) }}</div>
      </div>
      <div class="flex justify-between">
        <div>Total in NANO</div>
        <div>⋰⋅⋰ {{ nanoAmount.toFixed(2) }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Item } from '@/models/item'
import { cartModule } from '@/store/cart'
import { Component, Prop, Vue } from 'vue-property-decorator'
import CartItem from '@/components/CartItem.vue'

@Component({
  components: {
    CartItem
  }
})
export default class Cart extends Vue {

  get nanoAmount() {
    return cartModule.nanoAmount
  }

  get fiatAmount(): number {
    return cartModule.fiatAmount
  }

  get items(): Item[] {
    return cartModule.items
  }

}
</script>

