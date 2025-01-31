import s from "./Dropzone.module.scss";
import { useDropzone } from "react-dropzone";
import { useCallback } from "react";
import useStore from "../../utils/store";
import { fetchMetadata } from "../../utils/utils";

import Button from "../Button/Button";

const Dropzone = () => {
  const { tracks, setTracks } = useStore();

  const onDrop = useCallback(
    (acceptedFiles) => {
      // Créer un tableau temporaire
      const tracksArray = [];

      acceptedFiles.forEach((file, i) => {
        const path = URL.createObjectURL(file);

        //   // Créer un objet avec la structure similaire à celle de TRACKS dans TRACKS.js
        const _track = {
          name: file.name,
          path: path,
          id: tracks.length + i,
        };

        tracksArray.push(_track);
      });

      fetchMetadata(tracksArray, tracks, setTracks);
    },
    [tracks]
  );

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop: onDrop,
    noClick: true,
    accept: {
      "audio/mpeg": [],
      "audio/mp3": [],
      "audio/wav": [],
    },
  });

  return (
    <div
      {...getRootProps()}
      className={`
      ${s.dropzone} 
      ${isDragActive ? s.dropzone_active : ""}
      `}
    >
      <input {...getInputProps()} />

      {isDragActive && (
        // l'utilisateur est en train de drag and drop, afficher la dropzone
        <div className={s.outer}>
          <div className={s.inner}>
            <p>Déposez vos fichiers dans cette zone</p>
          </div>
        </div>
      )}

      <div className={s.import}>
        <p>
          Importez vos fichiers .mp3 avec un drag and drop ou en cliquant sur le
          bouton.
        </p>
        <Button label={"Browse"} onClick={open} />
      </div>
    </div>
  );
};

export default Dropzone;
