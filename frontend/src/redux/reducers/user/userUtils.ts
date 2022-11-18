import { useEffect } from 'react';
import { AppDispatch, RootState, useAppSelector } from '../../types';
import { getUser } from './userReducer';

export const getUsername = (state: RootState) => state.user.username;
export const getUserId = (state: RootState) => state.user.id;
export const getUserStatus = (state: RootState) => state.user.status;

export function useUserId(dispatch: AppDispatch): number | undefined {
  const userId = useAppSelector(getUserId);
  const status = useAppSelector(getUserStatus);

  useEffect(() => {
    if (status === 'none') {
      dispatch(getUser());
    }
  }, [dispatch, status]);
  return userId;
}

export function useUsername(dispatch: AppDispatch): string | undefined {
  const username = useAppSelector(getUsername);
  const status = useAppSelector(getUserStatus);

  useEffect(() => {
    if (status === 'none') {
      dispatch(getUser());
    }
  }, [dispatch, status]);
  return username;
}
