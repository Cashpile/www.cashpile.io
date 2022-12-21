// !INITIALIZATION

const maxX = document.body.clientWidth
const maxY = document.body.clientHeight
const halfX = maxX / 2
const halfY = maxY / 2

canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')
canvas.width = maxX
canvas.height = maxY

// !ANIMATED GRADIENT BACKGROUND

//animation settings
const Anim = {
  duration: 1000,
  interval: 1,
  stepUnit: 1.0,
  currUnit: 0.0,
}

function interpolation(a, b, u) {
  return (1 - u) * a + u * b
}
function AnimatedGradient(context, width, height) {
  this.context = context
  this.width = width
  this.height = height
  this.colorStops = []
  this.currentStop = 0
}

AnimatedGradient.prototype.addStop = function (pos, colors) {
  const stop = { pos: pos, colors: colors, currColor: null }
  this.colorStops.push(stop)
}

AnimatedGradient.prototype.updateStops = function () {
  //interpolate colors of stops
  const steps = Anim.duration / Anim.interval,
    stepU = Anim.stepUnit / steps
  const stopsLength = this.colorStops[0].colors.length - 1

  for (let i = 0; i < this.colorStops.length; i++) {
    //cycle through all stops in gradient
    const stop = this.colorStops[i]
    const startColor = stop.colors[this.currentStop] //get stop 1 color
    let endColor, r, g, b

    if (this.currentStop < stopsLength) {
      //get stop 2 color, go to first if at last stop
      endColor = stop.colors[this.currentStop + 1]
    } else {
      endColor = stop.colors[0]
    }

    //interpolate both stop 1&2 colors to get new color based on animation unit
    r = Math.floor(interpolation(startColor.r, endColor.r, Anim.currUnit))
    g = Math.floor(interpolation(startColor.g, endColor.g, Anim.currUnit))
    b = Math.floor(interpolation(startColor.b, endColor.b, Anim.currUnit))

    stop.currColor = 'rgb(' + r + ',' + g + ',' + b + ')'
  }

  // update current stop and animation units if interpolation is composite
  if (Anim.currUnit >= 1.0) {
    Anim.currUnit = 0
    if (this.currentStop < stopsLength) {
      this.currentStop++
    } else {
      this.currentStop = 0
    }
  }

  Anim.currUnit += stepU //increment animation unit
}

AnimatedGradient.prototype.draw = function () {
  const gradient = context.createLinearGradient(0, this.width, this.height, 0)

  for (let i = 0; i < this.colorStops.length; i++) {
    const stop = this.colorStops[i],
      pos = stop.pos,
      color = stop.currColor

    gradient.addColorStop(pos, color)
  }

  this.context.clearRect(0, 0, this.width, this.height)
  this.context.fillStyle = gradient
  this.context.fillRect(0, 0, this.width, this.height)
}

const stopAColor = [
  { r: '0', g: '0', b: '0' },
  { r: '10', g: '13', b: '54' },
  { r: '15', g: '16', b: '66' },
  { r: '5', g: '8', b: '28' },
]

const stopBColor = [
  { r: '3', g: '3', b: '3' },
  { r: '63', g: '0', b: '113' },
  { r: '148', g: '10', b: '55' },
  { r: '21', g: '0', b: '80' },
]

const bodyBackgroundAnimatedGradient = new AnimatedGradient(
  context,
  canvas.width,
  canvas.height
)
bodyBackgroundAnimatedGradient.addStop(0, stopAColor)
bodyBackgroundAnimatedGradient.addStop(1, stopBColor)

// !ANIMATED RECTANGLES

const particleBackgroundStaticGradient = context.createLinearGradient(
  0,
  0,
  canvas.width,
  canvas.height
)
particleBackgroundStaticGradient.addColorStop(0, '#43e97b')
particleBackgroundStaticGradient.addColorStop(1, '#00c9ff')

// manually determined optimal particleCount for MacBook Pro 14-inch screen
const desiredParticleCount = 700
const particleCount = Math.floor((maxX * maxY) / 2500)
const particleRatio = particleCount / desiredParticleCount
const particleSpeedFactor = (1 / particleRatio) * 1.5
const particleSizeFactor = 1.5

// create particles
const particles = []
for (let i = 0; i < particleCount; i++) {
  particles.push(new particle())
}

// drawing particle
particle.prototype.draw = function () {
  // convert Polar coordinates to Cartesian
  const dx = halfX + this.radX * Math.cos((this.alpha / 180) * Math.PI)
  const dy = halfY + this.radY * Math.sin((this.alpha / 180) * Math.PI)

  context.fillStyle = particleBackgroundStaticGradient
  context.fillRect(
    dx,
    dy,
    2 * this.size * particleSizeFactor,
    this.size * particleSizeFactor
  )
}

// calc new position in polar coord
particle.prototype.move = function () {
  this.alpha += this.speed
}

// particles class
// @constructor
function particle() {
  this.radX = 2 * Math.random() * halfX + 1
  this.radY = 1.2 * Math.random() * halfY + 1
  this.alpha = Math.random() * 360 + 1
  this.speed = Math.random() * 100 < 50 ? 1 : -1
  this.speed *= 0.15
  this.speed *= particleSpeedFactor
  this.size = Math.random() * 5 + 1
}

// particles animation
function render() {
  context.fillStyle = bodyBackgroundAnimatedGradient
  context.fillRect(0, 0, maxX, maxY)
  bodyBackgroundAnimatedGradient.updateStops()
  bodyBackgroundAnimatedGradient.draw()

  for (let i = 0; i < particleCount; i++) {
    particles[i].draw()
    particles[i].move()
  }

  requestAnimationFrame(render)
}

// start animation
render()