import React, { useState } from 'react';
import styled from 'styled-components';
import TabItem from '../app/TabItem';
import noPreview from '../../assets/no-preview.png';

const StyledContainer = styled.div`
  height: calc(100% - 7rem);
`;

const InvestmentDetail = ({ oportunity, pitches = [] }) => {
  const [activeTab, updateActiveTab] = useState('pitch');

  const tabs = [
    {
      key: 'pitch',
      label: 'Pitch',
    },
    {
      key: 'updates',
      label: 'Actualizaciones',
      disabled: true,
    },
  ];

  return (
    <StyledContainer className="w-full mt-4">
      <div className="h-[50%]">
        <img
          className="w-full max-h-[80%]"
          src={(oportunity && oportunity.image && `${oportunity.imageType},${oportunity.image}`) || noPreview}
          alt=""
        />
        <div className="w-full flex border-b border-black-200">
          {tabs.map(({ label, disabled, key }) => (
            <TabItem
              key={key}
              label={label}
              active={key === activeTab}
              onClick={() => updateActiveTab(key)}
              disabled={disabled}
            />
          ))}
        </div>
      </div>
      <div className="h-[50%]">
        <div className="overflow-auto flex-1 h-full">
          {pitches.map(({ title, description }) => (
            <div className="mb-5" key={title}>
              <div className="text-2xl font-bold">
                {title}
              </div>
              <div className="text-black-600 text-justify">
                {description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </StyledContainer>
  );
};

export default InvestmentDetail;
