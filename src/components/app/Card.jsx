import React from 'react';

import styled from 'styled-components';
import { Subheading } from '../typography/Index';

const Container = styled.div`
  height: 28rem;
  min-width: 18rem;
  width: 20rem;
`;

const Card = ({
  logo,
  content,
  preview,
  footer,
  title,
  onClick,
  disabled,
  className = '',
}) => {
  const dynamicClass = () => {
    if (disabled) {
      return 'cursor-default opacity-50';
    }

    return 'cursor-pointer hover:shadow-xl';
  };

  const handleClick = () => {
    if (!disabled) {
      onClick();
    }
  };

  return (
    <Container className={`rounded-xl transition-all relative border border-black-200 ${dynamicClass()} ${className}`} onClick={handleClick}>
      <div className="absolute top-[50%] left-2 w-16 h-16 mini-preview-translate">{logo}</div>
      <div className="h-[50%]">{preview}</div>
      <div className="h-[50%] space-y-2 pt-6 px-6">
        <Subheading className="h-[18%]">{title}</Subheading>
        <div className="h-[50%]">{content}</div>
        <div className="h-[20%]">{footer}</div>
      </div>
    </Container>
  );
};

export default Card;
