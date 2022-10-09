import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '../app/Button';
import DropdownFilter from '../filters/DropdownFilter';
import Searchbar from '../filters/Searchbar';

const FiltersContainer = styled.div`
  transform: translate(-25%);
  left: 25%;

  @media (min-width: 1024px) {
    transform: translate(0%);
    left: 0%;
  }
`;

const InvestmentsFilter = ({
  onChange,
}) => {
  const [filters, updateFilters] = useState({});
  const [showFilters, updateFiltersVisibility] = useState(false);

  const onFiltersChange = ({ type, value }) => {
    updateFilters({ ...filters, [type]: value });
  };

  const checkFiltersStatus = () => {
    if (window.matchMedia('(min-width: 1024px)').matches) {
      updateFiltersVisibility(true);
    } else {
      updateFiltersVisibility(false);
    }
  };

  useEffect(
    () => {
      onChange(filters);
    },
    [filters],
  );

  useEffect(
    () => checkFiltersStatus(),
    [],
  );

  document.addEventListener('resize', () => {
    checkFiltersStatus();
  });

  const filtersOptions = [
    {
      label: 'Tipo',
      value: 'type',
      options: [
        {
          key: 'A',
          optionLabel: 'Tipo 1',
        },
        {
          key: 'B',
          optionLabel: 'Tipo 2',
        },
      ],
    },
    {
      label: 'Sector',
      value: 'sector',
      options: [
        {
          key: 'C',
          optionLabel: 'Sector 1',
        },
        {
          key: 'D',
          optionLabel: 'Sector 2',
        },
      ],
    },
    {
      label: 'Tecnología',
      value: 'tech',
      options: [
        {
          key: 'E',
          optionLabel: 'Tech 1',
        },
        {
          key: 'F',
          optionLabel: 'Tech 2',
        },
      ],
    },
    {
      label: 'Facturación',
      value: 'invoice',
      options: [
        {
          key: 'G',
          optionLabel: 'Opción 1',
        },
        {
          key: 'H',
          optionLabel: 'Opción 2',
        },
      ],
    },
  ];

  return (
    <>
      <Button
        className={`${showFilters && 'bg-black-300 text-black'} flex space-x-2 w-12 block xl:hidden relative`}
        onClick={() => updateFiltersVisibility(!showFilters)}
      >
        <FontAwesomeIcon icon={faFilter} />
      </Button>
      {showFilters && (
        <FiltersContainer className="xl:flex items-center ml-3 h-8 bg-white rounded-lg z-10 absolute xl:relative p-4 xl:px-0 space-y-4 xl:space-y-0 h-72 xl:h-6 border xl:border-none">
          <Searchbar value={filters.search} onSearch={(value) => onFiltersChange({ type: 'search', value })}/>
          {filtersOptions.map(({ label, value, options }) => (
            <DropdownFilter key={label} label={label} value={filters[value]} className="w-full xl:w-32 xl:mx-4">
              {options.map(({ key, optionLabel }) => (
                <div className="cursor-pointer px-4 py-2 hover:bg-black-200 text-black-400" key={key} onClick={() => onFiltersChange({ type: value, value: key })}>
                  {optionLabel}
                </div>
              ))}
            </DropdownFilter>
          ))}
          <div className="flex space-x-2 xl:mx-4">
            <span className="text-gray-400">
              Ordenar por:
            </span>
            <DropdownFilter label="fecha" />
          </div>
        </FiltersContainer>
      )}
    </>
  );
};

export default InvestmentsFilter;
