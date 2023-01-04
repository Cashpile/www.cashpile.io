class AnimParticle {
  constructor() {
    this.count = Math.floor(0.00001 * (canvas.width * canvas.height))
    this.borderRadius = 0
    this.alphaX = Math.random() * 360 + 1
    this.alphaY = Math.random() * 360 + 1
    this.direction = Math.random() * 10 < 5 ? 1 : -1
    this.speedX = this.direction * 0.0000001
    this.speedY = this.direction * 0.0000001

    this.size = Math.random() * 5 + 3
    this.width = this.size
    this.height = this.size

    this.radiusX = Math.random() * (canvas.width / 2) + 1
    this.radiusY = Math.random() * (canvas.height / 2) + 1
  }

  draw() {
    // Polar to Cartesian
    let dx =
      canvas.width / 2 + this.radiusX * Math.cos((this.alphaX / 180) * Math.PI)
    let dy =
      canvas.height / 2 + this.radiusY * Math.sin((this.alphaY / 180) * Math.PI)

    const path = this.genPath(dx, dy)
    context.fillStyle = this.fillStyle
    context.fill(path, 'evenodd')
  }
  move() {
    // calc new position in polar coordinates
    this.alphaX += this.speedX
    this.alphaY += this.speedY
  }
  genPath = (x, y) => {
    // designed for rounded rectangles (which includes circles).
    if (this.width < 2 * this.borderRadius) this.borderRadius = this.width / 2
    if (this.height < 2 * this.borderRadius) this.borderRadius = this.height / 2

    let region = new Path2D()
    region.moveTo(x + this.borderRadius, y)
    region.arcTo(
      x + this.width,
      y,
      x + this.width,
      y + this.height,
      this.borderRadius
    )
    region.arcTo(
      x + this.width,
      y + this.height,
      x,
      y + this.height,
      this.borderRadius
    )
    region.arcTo(x, y + this.height, x, y, this.borderRadius)
    region.arcTo(x, y, x + this.width, y, this.borderRadius)
    region.closePath()

    return region
  }
}
