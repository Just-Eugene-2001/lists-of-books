import React from 'react';
import './style.scss';

interface ListProps {
  items: {
    authors: {name: string, birth_year: number, death_year: number}[];
    copyright: boolean;
    download_count: number;
    formats: {'image/jpeg': string};
    id: number;
    languages: string[];
    media_type: string;
    subjects: string[];
    title: string;
    liked: boolean;
  }[];
  renderItem: any;
  showLiked?: boolean;
}

function List({ items, renderItem, showLiked = false }: ListProps) {
  return (
    <div className='List'>{items.map((item, index) =>
      <div 
        key={index} 
        className={showLiked ? 
          (item.liked ? 'List-item' : 'List-item display-none') 
          : 'List-item'}
          >
        {renderItem(item)}
      </div>
    )}
    </div>
  )
}

export default List;
