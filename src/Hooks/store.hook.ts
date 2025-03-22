import { AppDispatch, AppState } from '@/Store/Store';
import { useDispatch, useSelector } from 'react-redux';

export const useAppSelector= useSelector.withTypes<AppState>()
export const useAppDispatch= useDispatch.withTypes<AppDispatch>()