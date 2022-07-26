// Modules
import { useSelector } from 'react-redux'

// Types
import { State } from '../store/store'

export default function useSelectors () {
  return useSelector((state:State) => state);
}