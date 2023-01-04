// !TRACKING MOUSE POSITION
const getMousePos = function (e) {
  const rect = canvas.getBoundingClientRect()
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top,
  }
}

let mousePosition = { x: 0, y: 0 }

onmousemove = function (e) {
  mousePosition = getMousePos(e)
}

canvas.addEventListener('mousemove', onmousemove)
