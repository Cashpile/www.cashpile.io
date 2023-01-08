// https://color.adobe.com/Gold-gradient-color-theme-6711486
const rgb1 = hexToRgb('#6E4302')
const rgb2 = hexToRgb('#AD6B03')
const rgb3 = hexToRgb('#D48203')
const rgb4 = hexToRgb('#ED9204')
const rgb5 = hexToRgb('#FA9A04')
const rgb6 = hexToRgb('#FFB004')

// https://www.schemecolor.com/metallic-gold-gradient.php
const rgb7 = hexToRgb('#A57C01')
const rgb8 = hexToRgb('#B79001')
const rgb9 = hexToRgb('#FFDF01')
const rgb10 = hexToRgb('#EDCB01')
const rgb11 = hexToRgb('#DBB701')
const rgb12 = hexToRgb('#C9A401')

const coinBgStopColorA = [
  { r: rgb1.r, g: rgb1.g, b: rgb1.b },
  { r: rgb2.r, g: rgb2.g, b: rgb2.b },
  { r: rgb3.r, g: rgb3.g, b: rgb3.b },
  { r: rgb4.r, g: rgb4.g, b: rgb4.b },
  { r: rgb5.r, g: rgb5.g, b: rgb5.b },
  { r: rgb6.r, g: rgb6.g, b: rgb6.b },
]

const coinBgStopColorB = [
  { r: rgb7.r, g: rgb7.g, b: rgb7.b },
  { r: rgb8.r, g: rgb8.g, b: rgb8.b },
  { r: rgb9.r, g: rgb9.g, b: rgb9.b },
  { r: rgb10.r, g: rgb10.g, b: rgb10.b },
  { r: rgb11.r, g: rgb11.g, b: rgb11.b },
  { r: rgb12.r, g: rgb12.g, b: rgb12.b },
]

const coinBg = new AnimGradient(context, {
  duration: 500,
  interval: 1,
  stepUnit: 1.0,
  currUnit: 0.0,
})

coinBg.addStop(0, coinBgStopColorA)
coinBg.addStop(1, coinBgStopColorB)
