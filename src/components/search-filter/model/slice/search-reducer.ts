import { SearchAction, SearchSchema } from "../types";
import { SearchActionTypes } from "../consts";

const initialState: SearchSchema = {
  search: "",
};

export const searchReducer = (
  state = initialState,
  action: SearchAction,
): SearchSchema => {
  switch (action.type) {
    case SearchActionTypes.SET_SEARCH: {
      return { search: action.payload };
    }

    default: {
      return state;
    }
  }
};
