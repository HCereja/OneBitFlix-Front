import useSWR from "swr";
import styles from "../../../../styles/slideCategory.module.scss";
import courseService from "../../../services/courseServices";
import SlideComponent from "../../common/slideComponent";
import SpinnerComponent from "../../common/spinner";

const FavoriteCategory = () => {
  const { data, error } = useSWR("/favorites", courseService.getFavorites);

  if (error) {
    return error;
  }

  if (!data) {
    return <SpinnerComponent />;
  }

  return (
    <>
      <p className={styles.titleCategory}>MEUS FAVORITOS</p>
      {data.data.courses.length >= 1 ? (
        <SlideComponent course={data.data.courses} />
      ) : (
        <p className="text-center pt-3 h5">
          <strong>
            Você não possui nenhum curso na sua lista de favoritos.
          </strong>
        </p>
      )}
    </>
  );
};

export default FavoriteCategory;
