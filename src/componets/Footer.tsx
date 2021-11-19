import React from "react";
type FooterProps = {
  children?: React.ReactNode;
};
export const Footer = ({children}:FooterProps) =><footer className='footer'>
    <div className={'content--wrapper'}>
        <div className={'box'}>
        {children}
        </div>
    </div>
</footer>