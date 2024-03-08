import { headers } from "next/headers";
import api from "./api";

export type EpisodeType = {
  id: number;
  name: string;
  synopsis: string;
  order: number;
  videoUrl?: string;
  secondsLong: number;
};

export type CourseType = {
  id: number;
  name: string;
  thumbnailUrl: string;
  synopsis: string;
  episodes?: EpisodeType[];
};

const courseService = {
  getNewestCourses: async () => {
    const res = await api.get("/courses/newest").catch((err) => {
      return err.response;
    });

    return res;
  },
  getFeaturedCourses: async () => {
    const token = sessionStorage.getItem("onebitflix-token");

    const res = await api
      .get("/courses/featured", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((err) => {
        return err.response;
      });

    return res;
  },
  getFavorites: async () => {
    const token = sessionStorage.getItem("onebitflix-token");

    const res = await api
      .get("/favorites", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((err) => {
        return err.response;
      });

    return res;
  },
  like: async (courseId: number | string) => {
    const token = sessionStorage.getItem("onebitflix-token");

    const res = await api
      .post(
        `/likes`,
        { courseId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .catch((err) => {
        return err.response;
      });

    return res;
  },
  removeLike: async (courseId: number | string) => {
    const token = sessionStorage.getItem("onebitflix-token");

    const res = await api
      .delete(`/likes/${courseId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((err) => {
        return err.response;
      });

    return res;
  },
  addToFavorites: async (courseId: number | string) => {
    const token = sessionStorage.getItem("onebitflix-token");

    const res = await api
      .post(
        "/favorites",
        {
          courseId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .catch((err) => {
        return err.response;
      });

    return res;
  },
  removeFromFavorites: async (courseId: number | string) => {
    const token = sessionStorage.getItem("onebitflix-token");

    const res = await api
      .delete(`/favorites/${courseId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((err) => {
        return err.response;
      });

    return res;
  },
  getSearch: async (name: string) => {
    const token = sessionStorage.getItem("onebitflix-token");

    const res = await api
      .get(`/courses/search?name=${name}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((err) => {
        return err.response;
      });

    return res;
  },
  getEpisodes: async (id: number | string) => {
    const token = sessionStorage.getItem("onebitflix-token");

    const res = await api
      .get(`/courses/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((err) => {
        return err.response;
      });

    return res;
  },
};

export default courseService;
