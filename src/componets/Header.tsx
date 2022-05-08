import React, { useEffect } from 'react';
import { ToggleBtn } from './ToggleBtn';
type HeaderProps = {
  children?: React.ReactNode;
};
export const Header = ({ children }: HeaderProps) => {
  const [isDark, setIsDark] = React.useState(false);
  useEffect(() => {
    if (isDark) {
    }
  }, [isDark]);
  return (
    <header className={'header'}>
      <ToggleBtn onToggle={setIsDark} value={isDark} label={'Theme'} />
      <div className={'content-wrapper'}>{children}</div>
    </header>
  );
};
