import danceTheNight from "/dance-the-night.mp3";
import gsap from "gsap";
console.log(danceTheNight);

class AudioController {
  constructor() {}

  setup() {
    this.ctx = new (window.AudioContext || window.webkitAudioContext)();

    this.audio = new Audio();
    this.audio.src = danceTheNight;
    this.audio.volume = 0.1;

    this.audioSource = this.ctx.createMediaElementSource(this.audio);

    this.analyserNode = new AnalyserNode(this.ctx, {
      fftSize: 1024,
      smoothingTimeConstant: 0.8,
    });

    this.fdata = new Uint8Array(this.analyserNode.frequencyBinCount);

    this.audioSource.connect(this.analyserNode);
    this.audioSource.connect(this.ctx.destination);

    this.audio.play();

    gsap.ticker.add(this.tick);
  }

  tick = () => {
    this.analyserNode.getByteFrequencyData(this.fdata);
  };
}

const audioController = new AudioController();
export default audioController;
