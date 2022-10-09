import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// import { faHourglassHalf } from '@fortawesome/free-regular-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Heading, Subheading } from '../components/typography/Index';
import InvestmentsFilter from '../components/investments/InvestmentsFilter';
import Card from '../components/app/Card';
import { QueryContext } from '../contexts/QueryProvider';
import InvestmentCard from '../components/investments/InvestmentCard';

const Investments = () => {
  const navigate = useNavigate();

  const { getInvestments } = useContext(QueryContext);

  const [investments, updateInvestments] = useState([]);
  const [fetchLoading, setFetchLoading] = useState(false);

  const fetchInvestments = async (filters) => {
    setFetchLoading(true);
    const investmentsAPI = await getInvestments(filters);
    updateInvestments(investmentsAPI);
    setFetchLoading(false);
  };

  const handleClick = (id) => navigate(`/show-interest?id=${id}`);

  return (
    <div className="h-full w-full overflow-hidden xl:px-8 xl:pt-8">
      <Heading className="mb-2">
        Invierte ahora
      </Heading>
      <Subheading className="mb-4 text-black-400">
        Descubre las oportunidades de inversión que tenemos abiertas.
        <br />
        Todas las oportunidades han sido curadas por nuestro equipo de análisis.
      </Subheading>
      <InvestmentsFilter onChange={(filters) => fetchInvestments(filters)} />
      <div className="w-full overflow-auto mt-3 investments-container">
        {fetchLoading && (
          <>
            <Heading className="mb-4">
              <div className="h-4 bg-slate-700 rounded w-40 animate-pulse" />
            </Heading>
            <Card
              disabled
              preview={<div className="animate-pulse rounded-t-lg bg-slate-700 h-full w-full" />}
              content={(
                <div className="animate-pulse space-y-3">
                  <div className="h-2 bg-slate-700 rounded" />
                  <div className="h-2 bg-slate-700 rounded" />
                  <div className="h-2 bg-slate-700 rounded" />
                  <div className="h-2 bg-slate-700 rounded" />
                </div>
              )}
              title={<div className="animate-pulse h-2 bg-slate-700 rounded w-32" />}
            />
          </>
        )}
        {!fetchLoading && investments.map(({ name, oportunities }) => (
          <div key={name} className="my-4">
            <Heading className="mb-4">
              {name}
            </Heading>
            <div className="flex space-x-6 overflow-x-auto">
              {!oportunities.length && <Subheading className="text-black-400">No hay resultados disponibles</Subheading>}
              {oportunities.map((oportunity) => (
                <InvestmentCard
                  key={oportunity.id}
                  {...oportunity}
                  onClick={(id) => handleClick(id)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Investments;
