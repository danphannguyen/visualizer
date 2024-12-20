import Canvas from './Components/Canvas/Canvas'
import AudioController from './utils/AudioController'

function App() {

  const onClick = () => {
    AudioController.setup()
  }

  return (
    <>
    <button class='play' onClick={onClick()}>Play</button>
      <Canvas />
    </>
  )
}

export default App
