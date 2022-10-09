import React from 'react';
import { Subheading } from '../typography/Index';

const OpportunityDetails = ({ figures }) => (
  <div className="w-full xl:w-[32rem]">
    {figures.map(({ id, name, value }) => (
      <div
        key={id}
        className="w-full xl:flex text-center xl:text-left justify-between mb-6 border-black-200 py-2 xl:pl-4 xl:pr-8 border-b"
      >
        <div className="text-black-400 text-xl">
          {name}
        </div>
        <Subheading className="font-bold xl:text-right">
          {value}
        </Subheading>
      </div>
    ))}
  </div>
);

export default OpportunityDetails;
