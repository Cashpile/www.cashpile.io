// !INITIALIZATION
canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')

const maxX = document.body.clientWidth
const maxY = document.body.clientHeight
const halfX = maxX / 2
const halfY = maxY / 2

canvas.width = maxX
canvas.height = maxY

const rectangleCount = Math.floor((maxX * maxY) / 75000)
const rectangleRatio = rectangleCount / 500
const rectangleSpeedFactor = (1 / rectangleRatio) * 0.025
const rectangleSizeFactor = 7
// const roundRectRadii = [50 / 10, 20 / 40]
const roundRectRadii = 2.5

// !ANIMATED GRADIENT BACKGROUND
// animation settings
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
  const bodyGradient = context.createLinearGradient(
    0,
    this.width,
    this.height,
    0
  )

  for (let i = 0; i < this.colorStops.length; i++) {
    const stop = this.colorStops[i],
      pos = stop.pos,
      color = stop.currColor

    bodyGradient.addColorStop(pos, color)
  }

  context.clearRect(0, 0, this.width, this.height)
  context.fillStyle = bodyGradient
  context.fillRect(0, 0, this.width, this.height)
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

const bodyBgAnimatedGradient = new AnimatedGradient(
  context,
  canvas.width,
  canvas.height
)
bodyBgAnimatedGradient.addStop(0, stopAColor)
bodyBgAnimatedGradient.addStop(1, stopBColor)

// !ANIMATED RECTANGLES
// create rectangles
const rectangles = []
for (let i = 0; i < rectangleCount; i++) {
  rectangles.push(new rectangle())
}

const rectangleBgStaticGradient = context.createLinearGradient(
  0,
  0,
  canvas.width,
  canvas.height
)
rectangleBgStaticGradient.addColorStop(0, '#43e97b')
rectangleBgStaticGradient.addColorStop(1, '#00c9ff')

const roundRectPath = function (x, y, width, height, radius) {
  if (width < 2 * radius) radius = width / 2
  if (height < 2 * radius) radius = height / 2

  let region = new Path2D()
  region.moveTo(x + radius, y)
  region.arcTo(x + width, y, x + width, y + height, radius)
  region.arcTo(x + width, y + height, x, y + height, radius)
  region.arcTo(x, y + height, x, y, radius)
  region.arcTo(x, y, x + width, y, radius)
  region.closePath()

  return region
}

// drawing rectangle
rectangle.prototype.draw = function () {
  // calculate values
  const newSizeX = 2 * this.size * rectangleSizeFactor
  const newSizeY = this.size * rectangleSizeFactor

  // convert Polar coordinates to Cartesian
  let dx = halfX + this.radX * Math.cos((this.alpha / 180) * Math.PI)
  let dy = halfY + this.radY * Math.sin((this.alpha / 180) * Math.PI)

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

  /*
  // only show money when music is playing
  musicIsPlaying = document.getElementById('music-btn').innerText === 'PAUSE.'
  context.fillStyle = musicIsPlaying
    ? rectangleBgAnimatedGradient
    : bodyBgAnimatedGradient
  */

  // draw rectangle
  context.fillStyle = rectangleBgStaticGradient
  roundRect = roundRectPath(dx, dy, newSizeX, newSizeY, roundRectRadii)
  context.fill(roundRect, 'evenodd')
}

// calc new position in polar coord
rectangle.prototype.move = function () {
  this.alpha += this.speed
}

// rectangles class
// @constructor
function rectangle() {
  this.radX = (2 * Math.random() * halfX + 1) * 1.25
  this.radY = (1.2 * Math.random() * halfY + 1) * 0.9
  this.alpha = Math.random() * 360 + 1
  this.speed = Math.random() * 100 < 50 ? 1 : -1
  this.speed *= 0.15
  this.speed *= rectangleSpeedFactor
  this.size = Math.random() * 5 + 3.5
}

// rectangles animation
function render() {
  context.fillStyle = bodyBgAnimatedGradient
  bodyBgAnimatedGradient.updateStops()
  bodyBgAnimatedGradient.draw()

  for (let i = 0; i < rectangleCount; i++) {
    rectangles[i].draw()
    rectangles[i].move()
  }

  requestAnimationFrame(render)
}

/*
// !TRACKING MOUSE POSITION
const getMousePosition = function (e) {
  const rect = canvas.getBoundingClientRect()
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top,
  }
}

onmousemove = function (e) {
  mousePosition = getMousePosition(e)
}

let mousePosition = { x: 0, y: 0 }

// add mousemove event listener
canvas.addEventListener('mousemove', onmousemove)
*/

// begin animation
render()
