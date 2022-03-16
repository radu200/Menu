import request from "./";

export const getItems = async (searchQuery) => {
  try {
    const url = `/items?search=${searchQuery}`;
    const res = await request.get(url);
    return res;
  } catch (err) {
    return err;
  }
};
