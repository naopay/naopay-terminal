<template>
  <div>
    <div class="flex font-medium text-2xl">
      <div class="w-14">x{{ item.count }}</div>
      <div class="flex-1 flex justify-between">
        <div>{{ item.name }}</div>
        <div>${{ item.price.toFixed(2) }}</div>
      </div>
    </div>
    <ul v-if="item.extras.length" class="font-light text-xl text-gray-400">
      <li
        v-for="extra in item.extras"
        :key="extra._id"
        class="ml-14 flex justify-between"
      >
        <div>{{ extra.name }}</div>
        <div>+ ${{ extra.price.toFixed(2) }}</div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"
import { Item } from "@/models/item"

@Component
export default class CartItem extends Vue {
  @Prop()
  private item!: Item;
}
</script>
