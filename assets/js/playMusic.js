const button = document.getElementById('music-btn')
const audio = document.querySelector('audio')

button.addEventListener('click', () => {
  if (audio.paused) {
    audio.play()
    button.textContent = 'PAUSE'
  } else {
    audio.pause()
    button.textContent = 'CUE THE MUSIC'
  }
  button.style.backgroundColor = 'transparent'
  button.style.border = '1px solid white'
})
