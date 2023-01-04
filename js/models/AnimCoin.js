class AnimCoin extends AnimParticle {
  constructor() {
    super()
    this.countFactor = 1
    this.borderRadius = 100
    this.speedFactor = 2
    this.sizeFactor = 2.2

    this.count = Math.floor(this.count * this.countFactor)
    this.speedX = this.speedX * this.speedFactor * canvas.width * canvas.height
    this.speedY = this.speedY * this.speedFactor * canvas.width * canvas.height
    this.size = this.size * this.sizeFactor
    this.width = this.size
    this.height = this.size

    this.radiusX = this.radiusX * 1.25
    this.radiusY = this.radiusY * 5

    this.fillStyle = context.createLinearGradient(
      0,
      0,
      canvas.width,
      canvas.height
    )
    this.fillStyle.addColorStop(0, '#F6FF00')
    this.fillStyle.addColorStop(1, '#FFBB00')
  }
}
