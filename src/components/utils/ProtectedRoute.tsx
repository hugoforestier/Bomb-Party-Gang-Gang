import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { JWT_LOCAL_STORAGE } from '../../keys';

interface Props {
  loggedIn: boolean,
  redirectTo: string,
}

export default function ProtectedRoute({
  loggedIn,
  redirectTo,
}: Props) {
  const hasToken = localStorage.getItem(JWT_LOCAL_STORAGE) !== null;
  return (
    hasToken === loggedIn ? <Outlet /> : <Navigate to={redirectTo} />
  );
}
