const musicButton = document.getElementById('music-btn')
const audio = document.querySelector('audio')

musicButton.addEventListener('click', () => {
  if (audio.paused) {
    audio.play()
    musicButton.innerText = 'PAUSE.'
  } else {
    audio.pause()
    musicButton.innerText = 'MAKE IT RAIN.'
  }
  musicButton.style.fontWeight = 'bold'
  musicButton.style.backgroundColor = 'rgb(255, 255, 255, 0.1)'
  musicButton.style.border = '0.15vw solid white'
})
