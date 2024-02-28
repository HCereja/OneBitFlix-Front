import api from "./api";

interface RegisterParams {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  birth: string;
  password: string;
}

const authService = {
  register: async (params: RegisterParams) => {
    const res = await api.post("/auth/register", params).catch((err) => {
      if (err.response.status === 400) {
        return err.response;
      }
      return err;
    });

    return res;
  },
};

export default authService;
