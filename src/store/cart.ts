import { VuexModule, Module, Mutation, Action } from "vuex-class-modules"
import store from "@/store"
import { Item } from "@/models/item"
import socketio from 'socket.io-client'
import { TerminalCart } from "@/models/terminal-cart"
import { tools } from 'nanocurrency-web'

@Module
class CartModule extends VuexModule {
  cart: TerminalCart = {
    items: [],
    amount: 0,
    nanoRawAmount: "0",
    requestPayment: false,
    posAddress: ""
  }

  get posAddress(): string {
    return this.cart.posAddress
  }

  get uri(): string {
    return `nano:${this.cart.posAddress}?amount=${this.nanoRawAmount}`
  }

  get shouldPay(): boolean {
    return this.cart.requestPayment
  }

  get fiatAmount(): number {
    return this.cart.amount
  }

  get nanoRawAmount(): string {
    return this.cart.nanoRawAmount
  }

  get nanoAmount(): number {
    return Number(tools.convert(this.nanoRawAmount, "RAW", "NANO"))
  }

  get items(): Item[] {
    return this.cart.items
  }

  @Mutation
  setCart(cart: TerminalCart) {
    this.cart = cart
  }

  @Action
  registerSocket() {
    const socket = socketio(process.env.VUE_APP_BACKEND_WS)
    socket.on('connect', () => {
      socket.emit('register', {
        role: 'terminal'
      })
    })
    socket.on('cart', (data: TerminalCart) => {
      this.setCart(data)
    })
  }
}

export const cartModule = new CartModule({ store, name: "cart" })