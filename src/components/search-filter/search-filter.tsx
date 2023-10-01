import styles from './search-filter.module.scss';
import {classNames, useAppDispatch, useAppSelector, useDebounce} from "../../shared";
import {Input} from "../../ui/input";
import {setSearchValue} from "./model/slice";
import {TaskTableActionTypes} from "../task-table/model/consts";

interface SearchFilterProps {
  className?: string
}

const SearchFilter = (props: SearchFilterProps) => {
  const {className} = props;
  const {search} = useAppSelector(state => state.search)
  const dispatch = useAppDispatch()

  const debounce = useDebounce(() => dispatch({type: TaskTableActionTypes.FETCH_TASKS}), 800)


  return (
    <div className={classNames(styles.SearchFilter, {}, [className])}>
      <Input label={"Поиск"} value={search ?? ''} onChange={(value) => {
        dispatch(setSearchValue(value))
        debounce()
      }}/>
    </div>
  );
};

export {SearchFilter};
