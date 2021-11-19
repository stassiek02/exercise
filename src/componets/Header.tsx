import React from "react";
type HeaderProps = {
  children?: React.ReactNode;
};
export const Header = ({children}:HeaderProps) =><header className='header'>
    <div className={'content--wrapper'}>
        {children}
    </div>
</header>