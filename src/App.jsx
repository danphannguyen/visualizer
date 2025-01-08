import Canvas from "./components/Canvas/Canvas";
import AudioController from "./utils/AudioController";

function App() {
  const onClick = () => {
    AudioController.setup();
  };

  return (
    <>
      <button className="play" onClick={onClick}>
        Play
      </button>
      <Canvas />
    </>
  );
}

export default App;
