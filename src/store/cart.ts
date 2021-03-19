import { VuexModule, Module, Mutation, Action } from "vuex-class-modules"
import store from "@/store"
import { Item } from "@/models/item"
import socketio from 'socket.io-client'

@Module
class CartModule extends VuexModule {
  items: Item[] = []

  @Mutation
  setItems(items: Item[]) {
    this.items = items
  }

  @Action
  registerSocket() {
    const socket = socketio(process.env.VUE_APP_BACKEND_WS)
    socket.on('connect', () => {
      socket.emit('register', {
        role: 'terminal'
      })
    })
    socket.on('cart', (data: Item[]) => {
      this.setItems(data)
    })
  }
}

export const cartModule = new CartModule({ store, name: "cart" })