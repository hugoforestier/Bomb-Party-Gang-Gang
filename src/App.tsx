import React from 'react';
import {
  BrowserRouter, Navigate, Route, Routes,
} from 'react-router-dom';
import ProtectedRoute from './components/utils/ProtectedRoute';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import PageNotFound from './pages/PageNotFound';
import Lobby from './pages/Lobby/Lobby';
import Room from './pages/Room/Room';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoute loggedIn redirectTo="/signin" />}>
            <Route element={<Lobby />} path="/lobby" />
            <Route element={<Room />} path="/room/:name" />
          </Route>
          <Route element={<Navigate to="/lobby" replace />} path="/" />
          <Route element={<ProtectedRoute loggedIn={false} redirectTo="/lobby" />}>
            <Route element={<SignIn />} path="/signin" />
            <Route element={<SignUp />} path="/signup" />
          </Route>
          <Route element={<PageNotFound />} path="*" />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
