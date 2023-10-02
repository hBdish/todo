import { SearchActionTypes } from "../consts";

export const setSearchValue = (value: string) => {
  return { type: SearchActionTypes.SET_SEARCH, payload: value };
};
