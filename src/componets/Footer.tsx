import React from "react";
type FooterProps = {
  children?: React.ReactNode;
};
export const Footer = ({children}:FooterProps) =><footer className='header'>
    <div className={'content--wrapper'}>
        {children}
    </div>
</footer>