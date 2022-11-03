import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/utils/ProtectedRoute';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import PageNotFound from './pages/PageNotFound';
import Lobby from './pages/Lobby/Lobby';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* <Route element={<ProtectedRoute loggedIn redirectTo="/signin" />}>
            <Route element={<Lobby />} path="/" />
          </Route> */}
          <Route element={<ProtectedRoute loggedIn={false} redirectTo="/" />}>
            <Route element={<SignIn />} path="/signin" />
            <Route element={<SignUp />} path="/signup" />
            <Route element={<PageNotFound />} path="*" />
            <Route element={<Lobby />} path="/lobby" />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
