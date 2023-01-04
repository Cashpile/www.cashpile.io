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

const background = new AnimGradient(context, canvas.width, canvas.height, {
  duration: 750,
  interval: 1,
  stepUnit: 1.0,
  currUnit: 0.0,
})

background.addStop(0, stopAColor)
background.addStop(1, stopBColor)
