import {SearchActionTypes} from "../consts";

export interface SearchSchema {
  search?: string
}

interface SearchActionSetValue {
  type: SearchActionTypes.SET_SEARCH;
  payload: string;
}

type SearchAction = SearchActionSetValue

export type {SearchAction};
