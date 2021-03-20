import { VuexModule, Module, Mutation, Action } from "vuex-class-modules"
import store from "@/store"
import { Item } from "@/models/item"
import socketio from 'socket.io-client'
import { TerminalCart } from "@/models/terminal-cart"
import { tools } from 'nanocurrency-web'
import { TransactionStatus } from "@/models/transaction-status"
import { TransactionNotification } from "@/models/transaction-notification"

@Module
class CartModule extends VuexModule {
  cart: TerminalCart = {
    items: [],
    amount: 0,
    nanoRawAmount: "0",
    requestPayment: false,
    posAddress: ""
  }

  transactionStatus: TransactionStatus = TransactionStatus.NONE

  get noTransactionReceived() {
    return this.transactionStatus === TransactionStatus.NONE
  }

  get transactionIsAccepted() {
    return this.transactionStatus === TransactionStatus.ACCEPTED
  }

  get transactionIsRejected() {
    return this.transactionStatus === TransactionStatus.REJECTED
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
  setTransactionStatus(transactionStatus: TransactionStatus) {
    this.transactionStatus = transactionStatus
  }

  @Mutation
  setCart(cart: TerminalCart) {
    this.cart = cart
  }

  @Action
  emptyCart() {
    this.setCart({
      items: [],
      amount: 0,
      nanoRawAmount: "0",
      requestPayment: false,
      posAddress: ""
    })
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
    socket.on('transaction', (data: TransactionNotification) => {
      if (data.accepted) {
        this.setTransactionStatus(TransactionStatus.ACCEPTED)
        setTimeout(() => {
          this.emptyCart()
          this.setTransactionStatus(TransactionStatus.NONE)
        }, 2000)
      } else {
        this.setTransactionStatus(TransactionStatus.REJECTED)
        setTimeout(() => {
          this.setTransactionStatus(TransactionStatus.NONE)
        }, 2000)
      }
    })
  }
}

export const cartModule = new CartModule({ store, name: "cart" })