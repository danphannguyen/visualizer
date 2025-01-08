import s from "./Landing.module.scss";
import audioController from "../../utils/AudioController";
import { useState } from "react";
import Button from "../Button/Button";

const Landing = () => {

    const [hasClicked, setHasClicked] = useState(false);

    const onClick = () => {
        audioController.setup();
        setHasClicked(true);
    };

    return <div className={`${s.landing} ${hasClicked ? s.landingHidden : ''}`}>
        <div className={s.wrapper}>
            <h1 className={s.title}>Music Visualizer</h1>
            <p>Projets conçu dans le cadre d'un projet universitaire</p>
            <p>React | Gsap | Three.js | Web Audio API</p>
            <p>Drag & drop de fichier mp3</p>
            <Button label={"Commencer"} onClick={onClick}/>
        </div>
    </div>;
};

export default Landing;