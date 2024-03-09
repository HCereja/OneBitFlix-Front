import { useRouter } from "next/router";
import { CourseType, EpisodeType } from "../../services/courseServices";
import styles from "./styles.module.scss";

interface props {
  episode: EpisodeType;
  course: CourseType;
}

const EpisodeList = ({ episode, course }: props) => {
  const router = useRouter();

  const handleEpisodeTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handleEpisodePlayer = () => {
    router.push(`/course/episode/${episode.order - 1}?courseid=${course.id}`);
  };

  return (
    <>
      <div className={styles.episodeCard} onClick={handleEpisodePlayer}>
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
