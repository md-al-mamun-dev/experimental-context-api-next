import { useContext } from 'react';
import { DataContext } from './Provider';

export default function useData() {
  return useContext(DataContext);
}
