import { EpisodeType } from "../../services/courseServices";
import styles from "./styles.module.scss";

interface props {
  episode: EpisodeType;
}

const EpisodeList = ({ episode }: props) => {
  const handleEpisodeTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <>
      <div className={styles.episodeCard}>
        <div className={styles.episodeOrderTime}>
          <p className={styles.episodeOrder}>Episódio n° {episode.order}</p>
          <p className={styles.episodeTime}>
            {handleEpisodeTime(episode.secondsLong)}
          </p>
        </div>
        <div className={styles.episodeTitleDescription}>
          <p className={styles.episodeTitle}>{episode.name}</p>
          <p className={styles.episodeDescription}>{episode.synopsis}</p>
        </div>
      </div>
    </>
  );
};

export default EpisodeList;
