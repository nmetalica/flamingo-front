import React, { useContext } from 'react';
import {
  HashRouter,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import styled from 'styled-components';
import { AppContext } from '../contexts/AppProvider';
import Investments from '../pages/Investments';
import Login from '../pages/LoginPage';
import Profile from '../pages/Profile';
import Header from '../components/app/Header';
import Footer from '../components/app/Footer';
import ShowInterest from '../pages/ShowInterest';

const AppContainer = styled.div`
  height: calc(100% - 7.5rem);
`;

const Router = () => {
  const { user } = useContext(AppContext);

  const AuthGuard = (component) => {
    if (!user) {
      return <Login />;
    }

    return component;
  };

  return (
    <HashRouter>
      <Header />
      <AppContainer>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={AuthGuard(<Profile />)} />
          <Route path="/show-interest" element={AuthGuard(<ShowInterest />)} />
          <Route path="/" element={AuthGuard(<Investments />)} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AppContainer>
      <Footer />
    </HashRouter>
  );
};

export default Router;
