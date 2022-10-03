import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SIGN_IN_URL } from '../keys';
import { resetLoginReducer } from '../redux/reducers/login/loginReducer';
import { useAppDispatch } from '../redux/types';
import { removeAuthTokenFromClient } from '../webClient';

export default function Lobby() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onLogout = () => {
    removeAuthTokenFromClient();
    dispatch(resetLoginReducer());
    navigate(SIGN_IN_URL);
  };

  return (
    <div className="Lobby">
      <h1>Lobby</h1>
      <button type="button" onClick={onLogout}>
        Logout
      </button>
    </div>
  );
}
