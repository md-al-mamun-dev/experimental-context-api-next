import { useContext } from 'react';
import { DispatchContext } from './Provider';

export default function useDispatch() {
  return useContext(DispatchContext);
}
