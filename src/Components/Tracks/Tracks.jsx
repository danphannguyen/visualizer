import Track from "../Track/Track";

import s from "./Tracks.module.scss";
import { useEffect, useState } from "react";
import useStore from "../../utils/store";
import { fetchMetadata } from "../../utils/utils";
import TRACKS from "../../utils/TRACKS";

import fetchJsonp from "fetch-jsonp";

const Tracks = () => {
  // permet d'alterner entre true et false pour afficher / cacher le composant
  const [showTracks, setShowTracks] = useState(false);
  const { tracks, setTracks } = useStore();

  // écouter la variable tracks qui vient du store
  useEffect(() => {
    if (tracks.length > TRACKS.length) {
      setShowTracks(true);
    }
  }, [tracks]);

  useEffect(() => {
    fetchMetadata(TRACKS, tracks, setTracks);
  }, []);

  const onKeyDown = (e) => {
    if (e.keyCode === 13 && e.target.value !== "") {

      const userInput = e.target.value;
      getSongs(userInput);
    }
  }

  const getSongs = async (userInput) => {
    try {
      let response = await fetchJsonp(`https://api.deezer.com/search?q=${userInput}&output=jsonp`);
      console.log('HELLO');

      // Résultat de l'API
      if(response.ok) {
        response = await response.json();

        const _tracks = [...tracks];

        response.data.forEach((result) => {
          _tracks.push(result)
        });

        setTracks(_tracks)
      } else {
        // erreurs
      }
      
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div
        className={s.toggleTracks}
        onClick={() => setShowTracks(!showTracks)}
      >tracklist</div>

      <section
        className={`
      ${s.wrapper}
      ${showTracks ? s.wrapper_visible : ""}`}
      >
        <div className={s.tracks}>
          <div className={s.header}>
            <span className={s.order}>#</span>
            <span className={s.title}>Titre</span>
            <span className={s.duration}>Durée</span>
          </div>

          {tracks.map((track, i) => (
            <Track
              key={track.title + i}
              title={track.title}
              duration={track.duration}
              cover={track.album.cover_xl}
              // artists={track.artists}
              src={track.preview}
              index={i}
            />
          ))}
        </div>

        <input
          type="text"
          placeholder="Chercher un artiste"
          className={s.searchInput}
          onKeyDown={onKeyDown}
        />
      </section>
    </>
  );
};

export default Tracks;
