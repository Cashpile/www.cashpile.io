function renderBackground() {
  context.fillStyle = background
  background.updateStops()
  background.draw()

  requestAnimationFrame(renderBackground)
}

function genParticles(Particle) {
  let particles = []
  for (let i = 0; i < new Particle().count; i++) {
    particles.push(new Particle())
  }
  return particles
}

function renderParticles(particles, renderCondition = true) {
  if (renderCondition) {
    for (let i = 0; i < particles.length; i++) {
      particle = particles[i]
      particle.draw(particle.fillStyle, particle.sizeFactor, particle.radius)
      particle.move()
    }

    requestAnimationFrame(() => renderParticles(particles))
  }
}

// generate particles
const bill = genParticles(AnimBill)
const coin = genParticles(AnimCoin)
const coinRush = genParticles(AnimCoinRush)
const billRush = genParticles(AnimBillRush)

let rushStatus = false
musicButton.addEventListener('click', () => {
  toggleRush()
})

function toggleRush() {
  rushStatus = !rushStatus
  console.log(rushStatus)

  if (rushStatus === true) {
    renderParticles(coinRush, (renderCondition = rushStatus))
    renderParticles(billRush, (renderCondition = rushStatus))
    setInterval(toggleRush, 1000 * 5)
  }
}

// render elements from back to front
renderBackground()
renderParticles(bill)
renderParticles(coin)
renderParticles(coinRush, rushStatus)
renderParticles(billRush, rushStatus)
