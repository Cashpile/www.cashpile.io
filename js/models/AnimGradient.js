class AnimGradient {
  constructor(context, width, height, setting) {
    this.context = context
    this.width = width
    this.height = height
    this.setting = setting
    this.colorStops = []
    this.currentStop = 0
  }
  addStop(pos, colors) {
    const stop = { pos: pos, colors: colors, currColor: null }
    this.colorStops.push(stop)
  }
  updateStops() {
    //interpolate colors of stops
    const steps = this.setting.duration / this.setting.interval,
      stepU = this.setting.stepUnit / steps
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
      r = Math.floor(
        this.interpolate(startColor.r, endColor.r, this.setting.currUnit)
      )
      g = Math.floor(
        this.interpolate(startColor.g, endColor.g, this.setting.currUnit)
      )
      b = Math.floor(
        this.interpolate(startColor.b, endColor.b, this.setting.currUnit)
      )

      stop.currColor = 'rgb(' + r + ',' + g + ',' + b + ')'
    }

    // update current stop and animation units if interpolation is composite
    if (this.setting.currUnit >= 1.0) {
      this.setting.currUnit = 0
      if (this.currentStop < stopsLength) {
        this.currentStop++
      } else {
        this.currentStop = 0
      }
    }

    this.setting.currUnit += stepU //increment animation unit
  }
  draw() {
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
  interpolate(a, b, u) {
    return (1 - u) * a + u * b
  }
}
