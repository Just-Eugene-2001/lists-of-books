import React from 'react';
import './style.scss';

function Layout({ children }: { children: React.ReactNode }){

  return (
    <div className='wrapper'>
      {children}
    </div>
  )
}

export default Layout;
