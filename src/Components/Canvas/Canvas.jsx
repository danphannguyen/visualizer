import scene from "../../webgl/Scene";
import { useEffect, useRef } from "react";

export default Canvas = () => {
  const canvasRef = useRef();

  useEffect(() => {
    scene.setup(canvasRef.current);
  }, []);

  return <canvas ref={canvasRef}></canvas>;
};

