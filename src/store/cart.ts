import { VuexModule, Module, Mutation, Action } from "vuex-class-modules"
import store from "@/store"
import { Item } from "@/models/item"
import socketio from 'socket.io-client'
import { TerminalCart } from "@/models/terminal-cart"
import { tools } from 'nanocurrency-web'
import { PaymentStatus } from "@/models/payment-status"
import { PaymentNotification } from "@/models/payment-notification"

@Module
class CartModule extends VuexModule {
  cart: TerminalCart = {
    items: [],
    amount: 0,
    nanoRawAmount: "0",
    requestPayment: false,
    posAddress: ""
  };

  paymentStatus: PaymentStatus = PaymentStatus.NONE;

  get noPaymentReceived() {
    return this.paymentStatus === PaymentStatus.NONE;
  }

  get paymentIsAccepted() {
    return this.paymentStatus === PaymentStatus.ACCEPTED;
  }

  get paymentIsRejected() {
    return this.paymentStatus === PaymentStatus.REJECTED;
  }

  get posAddress(): string {
    return this.cart.posAddress;
  }

  get uri(): string {
    return `nano:${this.cart.posAddress}?amount=${this.nanoRawAmount}`;
  }

  get shouldPay(): boolean {
    return this.cart.requestPayment;
  }

  get fiatAmount(): number {
    return this.cart.amount;
  }

  get nanoRawAmount(): string {
    return this.cart.nanoRawAmount;
  }

  get nanoAmount(): number {
    return Number(tools.convert(this.nanoRawAmount, "RAW", "NANO"));
  }

  get items(): Item[] {
    return this.cart.items;
  }

  @Mutation
  setPaymentStatus(paymentStatus: PaymentStatus) {
    this.paymentStatus = paymentStatus;
  }

  @Mutation
  setCart(cart: TerminalCart) {
    this.cart = cart;
  }

  @Action
  emptyCart() {
    this.setCart({
      items: [],
      amount: 0,
      nanoRawAmount: "0",
      requestPayment: false,
      posAddress: ""
    });
  }

  @Action
  registerSocket() {
    const socket = socketio(process.env.VUE_APP_BACKEND_WS);
    socket.on('connect', () => {
      socket.emit('register', {
        role: 'terminal'
      })
    });
    socket.on('cart', (data: TerminalCart) => {
      this.setCart(data);
    });
    socket.on('payment', (data: PaymentNotification) => {
      if (data.accepted) {
        this.setPaymentStatus(PaymentStatus.ACCEPTED);
        setTimeout(() => {
          this.emptyCart()
          this.setPaymentStatus(PaymentStatus.NONE)
        }, 2000);
      } else {
        this.setPaymentStatus(PaymentStatus.REJECTED)
        setTimeout(() => {
          this.setPaymentStatus(PaymentStatus.NONE)
        }, 2000);
      }
    });
  }
}

export const cartModule = new CartModule({ store, name: "cart" });