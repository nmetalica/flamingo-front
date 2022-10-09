import React from 'react';
import noPreview from '../../assets/no-preview.png';
import Card from '../app/Card';

const InvestmentCard = ({
  onClick,
  disabled,
  id,
  logo,
  logoType,
  image,
  imageType,
  slogan,
  location,
  tags,
  title,
  investment,
}) => {
  const formatNumber = (labelValue) => (
    Math.abs(Number(labelValue)) >= 1.0e+9
      ? `${Number((Math.abs(Number(labelValue)) / 1.0e+9).toFixed(2))} B`
      : Math.abs(Number(labelValue)) >= 1.0e+6
        ? `${Number((Math.abs(Number(labelValue)) / 1.0e+6).toFixed(2))} M`
        : Math.abs(Number(labelValue)) >= 1.0e+3
          ? `${Number((Math.abs(Number(labelValue)) / 1.0e+3).toFixed(2))} K`
          : `${Math.abs(Number(labelValue))} `
  );

  const getFooter = () => {
    if (investment) {
      return (
        <p className="text-black-400 text-xl">
          Interés mostrado: &nbsp;
          €
          {formatNumber(investment)}
        </p>
      );
    }

    return (
      <div className="leading-4">
        <p className="text-black-400">
          {location}
        </p>
        {tags && tags.map((tag) => (
          <span key={tag} className="text-white bg-black-400 rounded-sm px-2 text-xs">
            {tag}
          </span>
        ))}
      </div>
    );
  };

  return (
    <Card
      onClick={() => onClick(id)}
      disabled={disabled}
      logo={(
        <div className="w-full h-full text-primary rounded-lg">
          <img alt="" src={logo ? `${logoType},${logo}` : noPreview} className="w-full h-full" />
        </div>
      )}
      preview={(
        <div className="w-full h-full text-white">
          <img alt="" src={image ? `${imageType},${image}` : noPreview} className="w-full h-full rounded-t-lg" />
        </div>
      )}
      content={
        (
          <span className="multiline-ellipsis text-sm text-justify leading-4 text-black-400">
            {slogan}
          </span>
        )
      }
      title={title}
      footer={getFooter()}
    />
  );
};

export default InvestmentCard;
