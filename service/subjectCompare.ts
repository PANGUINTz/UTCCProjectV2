import api from "./api";

export const compareSubject = async (data: Object) => {
  return api.post("/course/compare", data).then((res) => res.data);
};
