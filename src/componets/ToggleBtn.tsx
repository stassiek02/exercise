import React from 'react';

type ToggleProps = {
  onToggle: () => void;
  value: boolean;
  label: string;
};

export const ToggleBtn = ({ value, onToggle, label }: ToggleProps) => {
  return (
    <label>
      {label}
      <button className={`toggle ${value ? 'active' : ''}`} onClick={onToggle}>
        <div className={'toggle-knob'} />
      </button>
    </label>
  );
};
