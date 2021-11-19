import React from "react";
type ToggleProps = {
  onToggle: React.Dispatch<React.SetStateAction<boolean>>;
  value: boolean;
  label: string;
};
export const Toggle = ({ value, onToggle, label }: ToggleProps) => {
  return (
    <label>
      {label}
      <button
        className={`switch ${value ? "active" : ""}`}
        onClick={() => onToggle((prev) => !prev)}
      >
        <div className={"switch-knob"} />
      </button>
    </label>
  );
};
