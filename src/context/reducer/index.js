const reducer = (state, action) => {
  switch (action.type) {
    case "SOCKET":
      return {
        ...state,
        socket: action.payload,
      };
    case "USER":
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
