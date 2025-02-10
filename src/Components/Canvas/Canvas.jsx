import s from "./Canvas.module.scss";
import scene from "../../webgl/Scene";
import { useEffect, useRef } from "react";

const Canvas = () => {
  const canvasRef = useRef();

  useEffect(() => {
    scene.setup(canvasRef.current);
  }, []);

  return <canvas ref={canvasRef}></canvas>;
};

export default Canvas;
