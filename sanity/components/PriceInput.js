import React from 'react';
// eslint-disable-next-line import/no-unresolved
import PatchEvent, { set, unset } from 'part:@sanity/form-builder/patch-event';

const createPatchFrom = (value) => {
  return PatchEvent.from(value === '' ? unset() : set(Number(value)));
};

const formatMoney = Intl.NumberFormat('en-CA', {
  style: 'currency',
  currency: 'CAD',
}).format;

const PriceInput = ({ type, value, onChange, inputComponent }) => {
  return (
    <div>
      <h2>
        {type.title} - {value ? formatMoney(value / 100) : ''}
      </h2>
      <p>{type.description}</p>
      <input
        type={type.name}
        value={value}
        onChange={(event) => onChange(createPatchFrom(event.target.value))}
        ref={inputComponent}
      />
    </div>
  );
};

PriceInput.focus = () => {
  // eslint-disable-next-line no-underscore-dangle
  this._inputElement.focus();
};

export default PriceInput;
