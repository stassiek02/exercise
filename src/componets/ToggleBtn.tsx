import React from 'react';

type ToggleProps = {
  onToggle: React.Dispatch<React.SetStateAction<boolean>>;
  value: boolean;
  label: string;
};

export const ToggleBtn = ({ value, onToggle, label }: ToggleProps) => {
  return (
    <label>
      {label}
      <button
        className={`toggle ${value ? 'active' : ''}`}
        onClick={() => onToggle((prev) => !prev)}
      >
        <div className={'toggle-knob'} />
      </button>
    </label>
  );
};
