import styles from "../../styles/coursePage.module.scss";
import Head from "next/head";
import HeaderAuth from "../../src/components/common/headerAuth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import courseService, { CourseType } from "../../src/services/courseServices";
import { Button, Container } from "reactstrap";
import SpinnerComponent from "../../src/components/common/spinner";
import EpisodeList from "../../src/components/episodeList";
import Footer from "../../src/components/common/footer";

const CoursePage = () => {
  const router = useRouter();

  useEffect(() => {
    if (!sessionStorage.getItem("onebitflix-token")) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, []);

  const [loading, setLoading] = useState(true);

  const { id } = router.query;

  const [course, setCourse] = useState<CourseType>();

  const [liked, setLiked] = useState(false);
  const [favorited, setFavorited] = useState(false);

  const getCourse = async () => {
    if (typeof id !== "string") {
      return;
    }

    const res = await courseService.getEpisodes(id);

    if (res.status === 200) {
      setCourse(res.data);
      setLiked(res.data.liked);
      setFavorited(res.data.favorited);
    }
  };

  const handleLikeCourse = async () => {
    if (typeof id !== "string") {
      return;
    }

    if (liked) {
      await courseService.removeLike(id);
      setLiked(false);
    } else {
      await courseService.like(id);
      setLiked(true);
    }
  };

  const handleFavCourse = async () => {
    if (typeof id !== "string") {
      return;
    }

    if (favorited) {
      await courseService.removeFromFavorites(id);
      setFavorited(false);
    } else {
      await courseService.addToFavorites(id);
      setFavorited(true);
    }
  };

  useEffect(() => {
    getCourse();
  }, [id]);

  if (course === undefined) {
    return <SpinnerComponent />;
  }

  if (loading) {
    return <SpinnerComponent />;
  }

  return (
    <>
      <Head>
        <title>{`OneBitFlix - ${course?.name}`}</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </Head>
      <main>
        <div
          style={{
            backgroundImage: `linear-gradient(to bottom, #6666661a, #151515), url(${process.env.NEXT_PUBLIC_BASE_URL}/${course?.thumbnailUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "550px",
          }}
        >
          <HeaderAuth />
        </div>
        <Container className={styles.courseInfo}>
          <p className={styles.courseTitle}>{course?.name}</p>
          <p className={styles.courseDescription}>{course?.synopsis}</p>
          <Button
            className={styles.courseBtn}
            outline
            disabled={course.episodes?.length === 0}
          >
            ASSISTIR AGORA!
            <img
              src="/buttonPlay.svg"
              alt="buttonImg"
              className={styles.buttonImg}
            />
          </Button>
          <div className={styles.interactions}>
            {liked ? (
              <img
                src="/course/iconLiked.svg"
                alt="likeImg"
                className={styles.interactionImg}
                onClick={handleLikeCourse}
              />
            ) : (
              <img
                src="/course/iconLike.svg"
                alt="likeImg"
                className={styles.interactionImg}
                onClick={handleLikeCourse}
              />
            )}
            {favorited ? (
              <img
                src="/course/iconFavorited.svg"
                alt="likeImg"
                className={styles.interactionImg}
                onClick={handleFavCourse}
              />
            ) : (
              <img
                src="/course/iconAddFav.svg"
                alt="likeImg"
                className={styles.interactionImg}
                onClick={handleFavCourse}
              />
            )}
          </div>
        </Container>
        <Container className={styles.episodeInfo}>
          <p className={styles.episodeDivision}>EPISÓDIOS</p>
          <p className={styles.episodeLength}>
            {course.episodes?.length} episódios
          </p>
          {course.episodes?.length === 0 ? (
            <p>
              <strong>Ainda não existem episódios para esse curso</strong>
            </p>
          ) : (
            course.episodes?.map((episode, index) => (
              <>
                <EpisodeList key={index} episode={episode} course={course} />
              </>
            ))
          )}
        </Container>
        <Footer />
      </main>
    </>
  );
};

export default CoursePage;
