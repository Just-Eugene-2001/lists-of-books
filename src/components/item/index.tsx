import React, { useCallback } from 'react';
import './style.scss';

interface ItemProps {
  imgURL: string;
  title: string;
  author: string;
  id: number;
  btnRemove: (id: number) => void;
  liked: boolean;
  btnLiked: (id: number) => void;
}


function Item({ imgURL, title, author, id, btnRemove, liked, btnLiked }: ItemProps) {

  const callbacks = {
    btnRemove: useCallback(() => btnRemove(id), [btnRemove, id]),
    btnLiked: useCallback(() => btnLiked(id), [btnLiked, id])
  };

  return (
    <div className='Item'>
      <div className='Item-left'>
        <img src={imgURL} alt='book'></img>
      </div>
      <div className='Item-right'>
        <div className='Item-title'><b>Название книги: </b>{title}</div>
        <div className='Item-author'><b>Автор: </b>{author}</div>
        <div className='Item-buttons'>
          <label className='Item-button-like'>
            <input type='checkbox' checked={liked} onChange={callbacks.btnLiked}/>
            <i className='fa-solid fa-heart'></i>
          </label>
          <i onClick={callbacks.btnRemove} className='fa-solid fa-trash Item-button-delete'></i>
        </div>
      </div>
    </div>
  )
}

export default Item;
