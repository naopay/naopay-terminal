import { Item } from "./item";

export interface TerminalCart {
  items: Item[]
  amount: number
  nanoRawAmount: string
  requestPayment: boolean
  posAddress: string
}