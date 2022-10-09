import React, { useContext } from 'react';
import axios from 'axios';
import { AppContext } from './AppProvider';

const QueryContext = React.createContext({});

const QueryProvider = ({
  children,
}) => {
  const { user } = useContext(AppContext);

  const axiosInstance = axios.create({
    baseURL: 'http://flamingo-env.eba-astgaf32.eu-west-1.elasticbeanstalk.com',
  });

  const getInvestments = (filters) => new Promise(async (resolve) => {
    try {
      const resp = await axiosInstance.post('/oportunity/allGrouped', filters);
      resolve(resp.data);
    } catch (err) {
      resolve([]);
    }
  });

  const getInvestment = (id) => new Promise(async (resolve) => {
    try {
      const resp = await axiosInstance.get(`/oportunity/${id}`);
      resolve(resp.data);
    } catch (err) {
      resolve({});
    }
  });

  const getInvestmentByUser = () => new Promise(async (resolve) => {
    try {
      const resp = await axiosInstance.get(`/investment/allByUser/${user.id}`);
      resolve(resp.data);
    } catch (err) {
      resolve([]);
    }
  });

  const addInvestment = (form) => new Promise(async (resolve, reject) => {
    try {
      await axiosInstance.post('/investment', form);
      resolve();
    } catch (err) {
      reject(err);
    }
  });

  const login = (form) => new Promise(async (resolve, reject) => {
    try {
      const resp = await axiosInstance.post('/auth/signin', form);
      resolve(resp.data);
    } catch (err) {
      reject(new Error('Login error'));
    }
  });

  return (
    <QueryContext.Provider value={{
      getInvestments,
      getInvestment,
      getInvestmentByUser,
      addInvestment,
      login,
    }}
    >
      {children}
    </QueryContext.Provider>
  );
};

export { QueryContext, QueryProvider };
