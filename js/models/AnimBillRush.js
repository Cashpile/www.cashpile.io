class AnimBillRush extends AnimBill {
  constructor() {
    super()
    this.countFactor = 10
    this.count = Math.floor(this.count * this.countFactor)
  }
}
