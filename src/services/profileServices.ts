import api from "./api";

interface UserParams {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  created_at: string;
}

const profileService = {
  fetchCurrentInfo: async () => {
    const token = sessionStorage.getItem("onebitflix-token");

    const res = await api
      .get("/users/current", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((err) => {
        return err.response;
      });

    return res.data;
  },
  updateUserInfo: async (params: UserParams) => {
    const token = sessionStorage.getItem("onebitflix-token");

    const res = await api
      .put("/users/update/details", params, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((err) => {
        if (err.response.status === 400 || err.response.status === 401) {
          console.log(err);
          return err.response;
        }
        return err;
      });

    return res.status;
  },
};

export default profileService;
