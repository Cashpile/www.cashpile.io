function genParticles(Particle) {
  let particles = []
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
