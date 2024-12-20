class AudioController {
    constructor(){ }

    setup(){
        this.ctx = new(window.AudioContext || window.webkitAudioContext)()

        this.audio = new Audio();
        this.audio.volume = 0.1;
        this.audio.crossOrigin = "anonymous"

        this.audioSource = this.ctx.createMediaElementSource(this.audio)

        this.analyzerNode = new AnalyserNode(this.ctx, {
            fftSize: 1024,
            smoothingTimeConstant: 0.8,
        })

        this.fdata = Uint8Array(this.analyserNode.frenquencyBinCount);

        this.audioSource.connect(this.analyserNode);
        this.audioSource.connect(this.ctx.destination)
    }
}

const AudioController = new Audio_Controller();
export default AudioController