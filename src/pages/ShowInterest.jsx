import React, {
  useEffect,
  useState,
  useContext,
  useRef,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Loader from '../components/app/Loader';
import { Heading, Subheading } from '../components/typography/Index';
import OpportunityDetails from '../components/investments/OpportunityDetails';
import SubmitInterest from '../components/investments/SubmitInterest';
import Button from '../components/app/Button';
import InvestmentDetail from '../components/investments/InvestmentDetail';
import noPreview from '../assets/no-preview.png';
import { QueryContext } from '../contexts/QueryProvider';

const ShowInterest = () => {
  const [loading, updateLoading] = useState(true);
  const [interest, updateInterest] = useState(null);
  const [showInterest, updateShowInterest] = useState(false);
  const [investmentId, updateId] = useState(null);
  const [searchParams] = useSearchParams();

  const { getInvestment } = useContext(QueryContext);

  const oportunityRef = useRef();

  const fetchInvestment = async () => {
    if (!investmentId) {
      return;
    }
    const res = await getInvestment(investmentId);
    updateInterest(res);
    updateLoading(false);
  };

  useEffect(
    () => {
      fetchInvestment();
    },
    [investmentId],
  );

  useEffect(
    () => {
      updateLoading(true);
      updateId(searchParams.get('id'));
    },
    [],
  );

  const pitches = [
    {
      title: 'Resumen de la inversión',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    },
    {
      title: 'Problema y oportunidad',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    },
    {
      title: 'Solución y Producto',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    },
  ];

  const handleShowInterest = () => {
    oportunityRef.current.scrollTop = 0;
    updateShowInterest(true);
  };

  return (
    <div className="flex xl:p-6 h-full flex justify-center">
      {loading && <Loader className="stroke-primary" size="14" />}
      {!loading && (
        <div ref={oportunityRef} className="xl:flex xl:w-full overflow-auto xl:overflow-hidden scroll-smooth">
          <div className="w-full xl:w-[70%] h-full xl:pr-8">
            <div className="flex space-x-2 items-center">
              <div className="w-16 h-16">
                <img src={(interest.logo && `${interest.logoType},${interest.logo}`) || noPreview} alt="" className="w-full h-full rounded-lg border border-black-200" />
              </div>
              <Heading className="text-2xl">
                {interest.title}
              </Heading>
            </div>
            <Subheading className="text-black-600">
              {interest.slogan}
            </Subheading>

            {showInterest && <SubmitInterest oportunity={interest} />}
            {!showInterest && <InvestmentDetail pitches={pitches} oportunity={interest} />}

          </div>
          <div className="w-full xl:w-[30%] mt-8 xl:mt-0">
            <div className="w-full flex justify-end space-x-5 mb-4">
              <FontAwesomeIcon className="cursor-pointer text-black-400" icon={faStar} size="xl" />
              <FontAwesomeIcon className="cursor-pointer text-black-400" icon={faArrowUpFromBracket} size="xl" />
            </div>
            {!showInterest && (
              <Button type="primary" onClick={handleShowInterest}>Mostrar interés</Button>
            )}
            <OpportunityDetails figures={interest.figures}/>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowInterest;
