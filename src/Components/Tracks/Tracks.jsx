import Track from "../Track/Track";
import s from "./Tracks.module.scss"
import { useEffect } from "react";

import danceTheNight from "/dance-the-night.mp3";

const Tracks = () => {

    // const {tracks, setTracks} = useStore();

    useEffect(() => {


        const audio = new Audio(danceTheNight);
        audio.addEventListener('loadedmetadata', () => {
            console.log(`Duration: ${audio.duration}`);
            console.log(`Title: ${audio.title}`);

            // setTracks(prevTracks => [
            // ...prevTracks,
            // {
            //     title: audio.title || 'Unknown Title',
            //     duration: audio.duration,
            //     artists: ['Unknown Artist'],
            //     cover: 'https://placehold.co/600x400'
            // }
            // ]);
        });
    }, [])

    const tracks = [
        {
            title: 'New Drop NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN',
            duration: '147',
            artists: ['DonToLiver'],
            duration: '227',
            cover: 'https://placehold.co/600x400'
        },
        {
            title: 'Ola',
            duration: '147',
            artists: ['DonToLiver'],
            duration: '278',
            cover: 'https://placehold.co/600x400'
        },
        {
            title: 'Oli',
            duration: '147',
            artists: ['DonToLiver'],
            duration: '358',
            cover: 'https://placehold.co/600x400'
        }
    ]

    return (
        <section className={s.wrapper}>
            <div className={s.tracks}>
                <div className={s.header}>
                    <span className={s.order}>Numéro</span>
                    <span className={s.title}>Titre</span>
                    <span className={s.duration}>Durée</span>
                </div>

                {tracks.map((track, i) => (
                    <Track
                        key={track.title + i }
                        title={track.title}
                        cover={track.cover}
                        duration={track.duration}
                        artists={track.artists}
                        index={i}
                    />
                ))}

            </div>
        </section>
    )
};

export default Tracks;