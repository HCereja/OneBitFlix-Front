import api from "./api";

interface watchTimeParams {
  episodeId: number;
  seconds: number;
}

const episodeService = {
  getWatchTime: async (episodeId: number) => {
    const token = sessionStorage.getItem("onebitflix-token");

    const res = await api.get(`/episodes/${episodeId}/watchTime`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res;
  },
  setWatchTime: async ({ episodeId, seconds }: watchTimeParams) => {
    const token = sessionStorage.getItem("onebitflix-token");

    const res = await api.post(
      `/episodes/$${episodeId}/watchTime`,
      { seconds },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res;
  },
};

export default episodeService;
