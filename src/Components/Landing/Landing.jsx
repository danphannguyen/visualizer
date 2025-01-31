import s from "./Landing.module.scss";
import AudioController from "../../utils/AudioController";
import { useState } from "react";
import Button from "../Button/Button";

const Landing = () => {
  const [hasClicked, setHasClicked] = useState(false);

  const onClick = () => {
    AudioController.setup();
    setHasClicked(true);
  };

  return (
    <section className={`${s.landing} ${hasClicked ? s.landingHidden : ""}`}>
      <div className={s.wrapper}>
        <h1 className={s.title}>Music Visualizer</h1>
        <p>
          Projet conçu dans le cadre du cours Dispositifs interactifs à l'IUT de
          Champs-sur-Marne.
        </p>
        <p>Découverte et usage de three.js, gsap, react, la Web Audio API.</p>
        <p>Drag and drop de fichiers mp3 pour pouvoir les visualiser en 3D.</p>
        <Button label={"Commencer"} onClick={onClick} />
      </div>
    </section>
  );
};

export default Landing;
