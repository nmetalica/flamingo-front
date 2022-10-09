import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/app/Button';
import Loader from '../components/app/Loader';
import ProfileImg from '../components/app/ProfileImg';
import InvestmentCard from '../components/investments/InvestmentCard';
import { Heading, Subheading } from '../components/typography/Index';
import { AppContext } from '../contexts/AppProvider';
import { QueryContext } from '../contexts/QueryProvider';

const Profile = () => {
  const { user, logout } = useContext(AppContext);
  const {
    name,
    profilePic,
    lastname,
    username,
    email,
    phone,
  } = user;
  const navigate = useNavigate();
  const [loading, updateLoading] = useState(false);
  const [investments, updateInvestments] = useState([]);
  const { getInvestmentByUser } = useContext(QueryContext);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const fetchInvestments = async () => {
    const userInvestments = await getInvestmentByUser();
    updateInvestments(userInvestments);
    updateLoading(false);
  };

  useEffect(
    () => {
      updateLoading(true);
      fetchInvestments();
    },
    [],
  );

  return (
    <div className="h-full w-full">
      <div className="w-full flex justify-between items-center">
        <div className="flex space-x-6 items-center">
          <ProfileImg src={profilePic} size="32"/>
          <Heading className="space-x-2">
            <span>
              {name}
            </span>
            <span>
              {lastname}
            </span>
          </Heading>
        </div>
        <Button type="primary" onClick={handleLogout} className="h-10 w-32">Cerrar Sesión</Button>
      </div>
      <div className="w-full flex space-x-2 mb-3 items-center">
        <Subheading className="text-black-400">
          Usuario:
        </Subheading>
        <div className="text-black-400">
          {username}
        </div>
      </div>
      <div className="w-full flex space-x-2 mb-3 items-center">
        <Subheading className="text-black-400">
          Email:
        </Subheading>
        <div className="text-black-400">
          {email}
        </div>
      </div>
      <div className="w-full flex space-x-2 mb-3 items-center">
        <Subheading className="text-black-400">
          Teléfono:
        </Subheading>
        <div className="text-black-400">
          {phone}
        </div>
      </div>
      <Heading className="mb-4">
        Muestras de interés
      </Heading>
      <div className={`flex space-x-6 overflow-x-auto ${loading && 'justify-center'}`}>
        {loading && <Loader className="stroke-primary" size="14" />}
        { !loading && investments.map((investment) => (
          <InvestmentCard
            {...investment.oportunity}
            key={investment.id}
            investment={investment.amount}
          />
        ))}
        { !loading && !investments.length && (
          <Subheading className="w-full flex justify-center text-black-400 mt-5">
            Aún no se han registrado muestras de interés.
          </Subheading>
        )}
      </div>
    </div>
  );
};

export default Profile;
