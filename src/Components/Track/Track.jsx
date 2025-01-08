import s from './Track.module.scss'

const Track = ({ title, cover, duration, artists, index }) => {

    const getSeconds = () => {
        const minutes = Math.floor(duration / 60);
        const seconds = duration - minutes * 60;

        return minutes + ":" + seconds;
    };

    return (
        <div className={s.track}>
            <span className={s.order}>{index + 1}</span>
            <div className={s.title}>
                <img className={s.cover} src={cover} alt="" />
                <div className={s.details}>
                    <span className={s.trackName}>{title}</span>
                    <span className={s.artistName}>{artists.map((artist, i) => (
                        <span key={artist + i}>{artist}</span>
                    ))}</span>
                </div>
            </div>
            <span className={s.duration}>
                {getSeconds()}
            </span>
        </div>
    )
}

export default Track;