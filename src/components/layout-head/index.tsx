import React from 'react';
import './style.scss';

interface LayoutHeadProps {
  title?: string;
  children: React.ReactNode;
}

function LayoutHead({ title = 'title', children }: LayoutHeadProps){

  return (
    <div className='LayoutHead'>
      <h1 className='LayoutHead-title'>{title}</h1>
      <div className='LayoutHead-side'>{children}</div>
    </div>
  )
}

export default LayoutHead;
