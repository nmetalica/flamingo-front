import { faEye, faEyeLowVision } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useMemo, useState } from 'react';

const Input = ({
  value,
  onChange,
  onFocus,
  placeholder,
  disabled,
  label = '',
  type = 'text',
  className,
  borderless,
  rows = 1,
  error = '',
  preIcon,
  preIconClass,
}) => {
  const [inputKey, updateInputKey] = useState(Math.random());
  const [showPassword, updateShowPassword] = useState(false);

  const bordered = () => {
    if (error) {
      return 'border border-red-600';
    }

    if (borderless) {
      return '';
    }

    return 'border border-black-400';
  };

  const handleInput = (e) => {
    if (rows === 1 && /\n/g.test(e.target.value)) {
      updateInputKey(Math.random());
      return;
    }

    onChange(e.target.value);
  };

  const isPassword = useMemo(
    () => type === 'password',
    [],
  );

  return (
    <div className={`leading-6 ${className}`}>
      <div className="text-black-400 text-md">
        {label}
      </div>
      <div className={`flex items-center rounded-lg ${bordered()}`}>
        {preIcon && <FontAwesomeIcon icon={preIcon} className={`pl-3 text-black-400 ${preIconClass}`} />}
        <textarea
          key={inputKey}
          type={type}
          className={`outline-none rounded-lg p-3 w-full resize-none ${rows === 1 ? 'overflow-hidden' : ''} ${value && isPassword && !showPassword && 'hide-password'}`}
          value={value}
          onChange={handleInput}
          onFocus={onFocus}
          placeholder={placeholder}
          rows={rows}
          readOnly={disabled}
        />
        { isPassword && <FontAwesomeIcon icon={!showPassword ? faEye : faEyeLowVision} className="cursor-pointer opacity-50 pr-3" onClick={() => updateShowPassword(!showPassword)} /> }
      </div>
      <div className="text-red-600 text-sm">
        {error}
      </div>
    </div>
  );
};
export default Input;
