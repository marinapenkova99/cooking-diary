export const setUser = (state, payload) => {
  return {
    ...state,
    user: payload.user,
  };
};
export const setAdminPanel = (state, payload) => {
  return {
    ...state,
    isAdminPanel: payload.isAdminPanel,
  };
};
