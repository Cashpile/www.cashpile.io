class AnimBill extends AnimParticle {
  constructor() {
    super()
    this.countFactor = 1
    this.borderRadius = 2.5
    this.speedFactor = 2
    this.sizeFactor = 6

    this.count = Math.floor(this.count * this.countFactor)
    this.speedX = this.speedX * this.speedFactor * canvas.width * canvas.height
    this.speedY = this.speedY * this.speedFactor * canvas.width * canvas.height
    this.size = this.size * this.sizeFactor
    this.width = this.size * 2
    this.height = this.size

    this.radiusX = this.radiusX * 2
    this.radiusY = this.radiusY * 5

    this.fillStyle = context.createLinearGradient(
      0,
      0,
      canvas.width,
      canvas.height
    )
    this.fillStyle.addColorStop(0, '#43e97b')
    this.fillStyle.addColorStop(1, '#00c9ff')
  }
}

/*
// considering rectangle position relative to center of canvas
const dx3 = dx - halfX
const dy3 = dy - halfY
const distance_from_center = Math.sqrt(Math.pow(dx3, 2) + Math.pow(dy3, 2))
const force = -1.5 * Math.log(distance_from_center / 50)
dy += dx3 * force
dx += -dy3 * force

// make each rectangle gravitate towards cursor location using trigonometry
let dx2 = mousePosition.x - dx
let dy2 = mousePosition.y - dy
const distance_from_mouse = Math.sqrt(Math.pow(dx2, 2) + Math.pow(dy2, 2))
if (distance_from_mouse < 100) {
  const force = 1 * Math.log(distance_from_mouse / 100)
  dx += dx2 * force
  dy += dy2 * force
}
*/
