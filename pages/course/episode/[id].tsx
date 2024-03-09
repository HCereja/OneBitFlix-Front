import { useRouter } from "next/router";
import styles from "../../../styles/episodePlayer.module.scss";
import Head from "next/head";
import HeaderGeneric from "../../../src/components/common/headerGeneric";
import { useEffect, useRef, useState } from "react";
import courseService, {
  CourseType,
} from "../../../src/services/courseServices";
import SpinnerComponent from "../../../src/components/common/spinner";
import { Button, Container } from "reactstrap";
import ReactPlayer from "react-player";
import episodeService from "../../../src/services/episodeServices";

const EpisodePlayer = () => {
  const router = useRouter();

  useEffect(() => {
    if (!sessionStorage.getItem("onebitflix-token")) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, []);

  const episodeId = parseFloat(router.query.episodeid?.toString() || "");
  const episodeOrder = parseFloat(router.query.id?.toString() || "");
  const courseId = router.query.courseid?.toString() || "";

  const [course, setCourse] = useState<CourseType>();

  const [episodeTime, setEpisodeTime] = useState(0);
  const [getEpisodeTime, setGetEpisodeTime] = useState(0);

  const [isReady, setIsReady] = useState(false);

  const [loading, setLoading] = useState(true);

  const playerRef = useRef<ReactPlayer>(null);

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
    router.push(
      `/course/episode/${episodeOrder - 1}?courseid=${courseId}&episodeid=${
        episodeId - 1
      }`
    );
  };

  const handleNextEpisode = () => {
    router.push(
      `/course/episode/${episodeOrder + 1}?courseid=${courseId}&episodeid=${
        episodeId + 1
      }`
    );
  };

  const handleGetEpisodeTime = async () => {
    const res = await episodeService.getWatchTime(episodeId);
    console.log(res);
    if (res.data !== null) {
      setGetEpisodeTime(res.data.seconds);
    }
  };

  const handleSetEpisodeTime = async () => {
    await episodeService.setWatchTime({
      episodeId,
      seconds: Math.round(episodeTime),
    });
  };

  const handlePlayerTime = () => {
    playerRef.current?.seekTo(getEpisodeTime);
    setIsReady(true);
  };

  if (isReady) {
    setTimeout(() => {
      handleSetEpisodeTime();
    }, 1000 * 3);
  }

  useEffect(() => {
    if (courseId) {
      getCourse();
    }
  }, [courseId]);

  useEffect(() => {
    if (episodeId) {
      handleGetEpisodeTime();
    }
  }, [router]);

  if (course?.episodes === undefined) {
    return <SpinnerComponent />;
  }

  if (loading) {
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
              ref={playerRef}
              onStart={handlePlayerTime}
              onProgress={(progess) => {
                setEpisodeTime(progess.playedSeconds);
              }}
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
