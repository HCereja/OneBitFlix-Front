import { useRouter } from "next/router";
import styles from "../../../styles/episodePlayer.module.scss";
import Head from "next/head";
import HeaderGeneric from "../../../src/components/common/headerGeneric";
import { useEffect, useState } from "react";
import courseService, {
  CourseType,
} from "../../../src/services/courseServices";
import SpinnerComponent from "../../../src/components/common/spinner";
import { Button, Container } from "reactstrap";
import ReactPlayer from "react-player";

const EpisodePlayer = () => {
  const router = useRouter();
  const episodeOrder = parseFloat(router.query.id?.toString() || "");
  const courseId = router.query.courseid?.toString() || "";

  const [course, setCourse] = useState<CourseType>();

  const getCourse = async () => {
    if (typeof courseId !== "string") {
      return;
    }

    const res = await courseService.getEpisodes(courseId);

    if (res.status === 200) {
      setCourse(res.data);
    }
  };

  const handlePrevEpisode = () => {
    router.push(`/course/episode/${episodeOrder - 1}?courseid=${courseId}`);
  };

  const handleNextEpisode = () => {
    router.push(`/course/episode/${episodeOrder + 1}?courseid=${courseId}`);
  };

  useEffect(() => {
    getCourse();
  }, [courseId]);

  if (course?.episodes === undefined) {
    return <SpinnerComponent />;
  }

  return (
    <>
      <Head>
        <title>{`OneBitFlix - ${course.episodes[episodeOrder].name}`}</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </Head>
      <main>
        <HeaderGeneric
          logoUrl="/home"
          btnContent={"Voltar para o curso"}
          btnUrl={`/course/${courseId}`}
        />
        <Container className="d-flex flex-column align-items-center gap-3 pt-5">
          <p className={styles.episodeTitle}>
            {course.episodes[episodeOrder].name}
          </p>
          {typeof window === "undefined" ? null : (
            <ReactPlayer
              className={styles.player}
              url={`${
                process.env.NEXT_PUBLIC_BASE_URL
              }/episodes/stream?videoUrl=${
                course.episodes[episodeOrder].videoUrl
              }&token=${sessionStorage.getItem("onebitflix-token")}`}
              controls
            />
          )}
          <div className={styles.episodeBtnDiv}>
            <Button
              className={styles.episodeBtn}
              disabled={episodeOrder === 0}
              onClick={handlePrevEpisode}
            >
              <img
                src="/episode/iconArrowLeft.svg"
                alt="previousEp"
                className={styles.arrowImg}
              />
            </Button>
            <Button
              className={styles.episodeBtn}
              disabled={episodeOrder + 1 === course.episodes.length}
              onClick={handleNextEpisode}
            >
              <img
                src="/episode/iconArrowRight.svg"
                alt="nextEp"
                className={styles.arrowImg}
              />
            </Button>
          </div>
          <p className="text-center py-4">
            {course.episodes[episodeOrder].synopsis}
          </p>
        </Container>
      </main>
    </>
  );
};

export default EpisodePlayer;
