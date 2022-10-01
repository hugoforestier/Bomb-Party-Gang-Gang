import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/utils/ProtectedRoute';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import PageNotFound from './pages/PageNotFound';
import Lobby from './pages/Lobby';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route element={<Lobby />} path="/" />
          </Route>
          <Route element={<SignIn />} path="/signin" />
          <Route element={<SignUp />} path="/signup" />
          <Route element={<PageNotFound />} path="*" />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
