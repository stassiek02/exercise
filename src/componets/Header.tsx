import React from 'react';
type HeaderProps = {
  children?: React.ReactNode;
};
export const Header = ({ children }: HeaderProps) => {
  return (
    <header className={'header'}>
      <div className={'content-wrapper'}>{children}</div>
    </header>
  );
};
