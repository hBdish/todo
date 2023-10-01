import {MutableRefObject, useEffect} from 'react';

type Nullable<T> = T | null

interface OutsideEventTypes {
  ref: Nullable<MutableRefObject<Nullable<HTMLElement>>>
  onOutside: (result: any) => void
}

const useOutsideEvent = ({ref, onOutside}: OutsideEventTypes) => {
  useEffect(() => {
    if (!ref?.current) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (
        ref.current
        && event.target
        && !ref.current!.contains(event.target as Node)
      ) {
        onOutside(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);


    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, onOutside]);
};

export {useOutsideEvent};
