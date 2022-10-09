import React, { useContext, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { faEuroSign } from '@fortawesome/free-solid-svg-icons';
import { AppContext } from '../../contexts/AppProvider';
import { QueryContext } from '../../contexts/QueryProvider';
import Button from '../app/Button';
import Input from '../app/Input';

const SubmitInterest = ({ oportunity }) => {
  const { addInvestment } = useContext(QueryContext);
  const { user } = useContext(AppContext);
  const [error, updateError] = useState('');
  const [form, updateForm] = useState({});
  const [loading, updateLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (key) => (value) => {
    updateForm((state) => ({ ...state, [key]: value }));
  };

  const handleSubmit = async () => {
    updateLoading(true);
    try {
      await addInvestment({
        id_user: user.id,
        id_oportunity: oportunity.id,
        ...form,
      });
      navigate('/profile');
    } catch (err) {
      updateError(err);
    }
    updateLoading(false);
  };
  const validateNumber = /^[0-9]*$/;

  const validateForm = useMemo(
    () => {
      if (!form.amount) {
        updateError('');
        return false;
      }

      if (form.amount && !validateNumber.test(form.amount)) {
        updateError('Ingrese únicamente números');
        return false;
      }

      updateError('');
      return true;
    },
    [form],
  );

  return (
    <>
      <div className="text-black-400 text-2xl mt-5 mb-1">
        ¿Cuánto te gustaría invertir?
      </div>
      <Input
        placeholder="Cantidad tentativa"
        onChange={handleChange('amount')}
        value={form.amount}
        className="w-full xl:w-1/2"
        type="number"
        error={error}
        preIcon={faEuroSign}
      />

      <div className="text-black-400 text-2xl mt-5 mb-1">
        ¿Qué valor podrías añadir a la inversión además del capital?
      </div>
      <Input
        placeholder="Experiencia en el sector, network, partners, sinergias empresariales, etc."
        rows={5}
        value={form.message}
        onChange={handleChange('message')}
        className="w-full xl:w-[75%]"
      />

      <Button
        onClick={handleSubmit}
        type="primary"
        className="w-full xl:w-[25rem] text-xl mt-6 text-white"
        disabled={!validateForm || loading}
      >
        Mostrar interés
      </Button>
    </>
  );
};

export default SubmitInterest;
