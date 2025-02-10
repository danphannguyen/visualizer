import Canvas from './components/Canvas/Canvas.jsx'
import Landing from './components/Landing/Landing.jsx'
import Dropzone from './components/Dropzone/Dropzone.jsx'
import Tracks from './components/Tracks/Tracks.jsx'
import Picker from './components/Picker/Picker.jsx'

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
