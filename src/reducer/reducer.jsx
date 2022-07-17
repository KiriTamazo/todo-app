export const initialState = {
  loading: true,
  data: [],
  error: null,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "success":
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case "error":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "loading":
      return { ...state };

    default:
      return state;
  }
};
