import s from "./Dropzone.module.scss";
import { useDropzone } from "react-dropzone";
import { useCallback } from "react";
import Button from "../Button/Button";

const Dropzone = () => {
    const onDrop = useCallback((acceptedFiles) => {
        // Do something with the files
        // Passer le mp3 au store
    }, []);

    const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
        onDrop: onDrop,
        noClick: true,
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