import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../types';
import { getUser } from './userReducer';

export const getUsername = (state: RootState) => state.user.username;
export const getUserId = (state: RootState) => state.user.id;
export const getUserStatus = (state: RootState) => state.user.status;

export function useUsername(dispatch: AppDispatch): string | undefined {
  const username = useSelector(getUsername);
  const status = useSelector(getUserStatus);

  useEffect(() => {
    if (status === 'none') {
      dispatch(getUser());
    }
  }, [dispatch, status]);
  return username;
}
