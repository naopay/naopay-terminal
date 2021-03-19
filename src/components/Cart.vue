<template>
  <div>
    <ul class="flex-1 flex flex-col gap-8 w-full overflow-y-scroll scrollbar-hidden">
      <li v-for="item in items" :key="item._id + item.extras.map(e => e._id).join('-')">
        <CartItem :item="item"/>
      </li>
    </ul>
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

  get items(): Item[] {
    return cartModule.items
  }

}
</script>

