import styles from "../../../../styles/slideCategory.module.scss";
import useSWR from "swr";
import categoriesService from "../../../services/categoriesService";
import SlideComponent from "../../common/slideComponent";
import SpinnerComponent from "../../common/spinner";

interface props {
  categoryId: number;
  categoryName: string;
}

const ListCategoriesSlide = ({ categoryId, categoryName }: props) => {
  const { data, error } = useSWR(`categoryCourses/${categoryId}`, () =>
    categoriesService.getCourses(categoryId)
  );

  if (error) {
    return error;
  }

  if (!data) {
    return <SpinnerComponent />;
  }

  return (
    <>
      <p className={styles.titleCategory}>{categoryName}</p>
      <SlideComponent course={data.data.courses} />
    </>
  );
};

export default ListCategoriesSlide;
