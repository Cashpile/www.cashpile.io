function renderBackground() {
  context.fillStyle = background
  background.updateStops()
  background.draw()

  requestAnimationFrame(renderBackground)
}

function genParticles(Particle) {
  let particles = []
  console.log(new Particle().count)
  for (let i = 0; i < new Particle().count; i++) {
    particles.push(new Particle())
  }
  return particles
}

function renderParticles(particles) {
  for (let i = 0; i < particles.length; i++) {
    particle = particles[i]
    particle.draw(particle.fillStyle, particle.sizeFactor, particle.radius)
    particle.move()
  }

  requestAnimationFrame(() => renderParticles(particles))
}

// generate particles
const bills = genParticles(AnimBill)
const coins = genParticles(AnimCoin)

// render elements from back to front
renderBackground()
renderParticles(bills)
renderParticles(coins)
