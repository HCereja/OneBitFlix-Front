import useSWR from "swr";
import styles from "../../../../styles/slideCategory.module.scss";
import courseService from "../../../services/courseServices";
import SlideComponent from "../../common/slideComponent";
import SpinnerComponent from "../../common/spinner";

const FeaturedCategory = () => {
  const { data, error } = useSWR("/featured", courseService.getFeaturedCourses);

  if (error) {
    return error;
  }

  if (!data) {
    return <SpinnerComponent />;
  }

  return (
    <>
      <p className={styles.titleCategory}>EM DESTAQUE</p>
      <SlideComponent course={data.data} />
    </>
  );
};

export default FeaturedCategory;
