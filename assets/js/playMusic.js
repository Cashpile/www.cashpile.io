const button = document.getElementById('music-btn')
const audio = document.querySelector('audio')

button.addEventListener('click', () => {
  if (audio.paused) {
    audio.play()
    button.innerText = 'PAUSE.'
  } else {
    audio.pause()
    button.innerText = 'CUE THE MUSIC.'
  }
  button.style.fontWeight = 'bold'
  button.style.backgroundColor = 'rgb(255, 255, 255, 0.1)'
  button.style.border = '0.35vw solid white'
})
