export const update = (posts) => {
  return {
    type: "UPDATE",
    payload: posts,
  };
};
