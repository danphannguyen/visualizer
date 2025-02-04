import gsap from 'gsap'

class AudioController {
  constructor() {}

  setup() {
    this.ctx = new (window.AudioContext || window.webkitAudioContext)()

    this.audio = new Audio()
    this.audio.crossOrigin = "anonymous";
    // this.audio.src = danceTheNight;
    this.audio.volume = 0.1

    this.audioSource = this.ctx.createMediaElementSource(this.audio)

    this.analyserNode = new AnalyserNode(this.ctx, {
      fftSize: 1024,
      smoothingTimeConstant: 0.8
    })

    this.fdata = new Uint8Array(this.analyserNode.frequencyBinCount)

    this.audioSource.connect(this.analyserNode)
    this.audioSource.connect(this.ctx.destination)

    gsap.ticker.add(this.tick)
  }

  play = src => {
    this.audio.src = src
    this.audio.play()
  }

  tick = () => {
    this.analyserNode.getByteFrequencyData(this.fdata)
  }
}

const audioController = new AudioController()
export default audioController
