import Canvas from '../src/components/Canvas/Canvas'
import Landing from '../components/Landing/Landing'
import Dropzone from '../components/Dropzone/Dropzone'
import Tracks from '../components/Tracks/Tracks'
import Picker from '../components/Picker/Picker'

function App() {
  return (
    <>
      <Landing />
      <Dropzone />
      <Picker />
      <Tracks />
      <Canvas />
    </>
  )
}

export default App
