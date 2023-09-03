import { useEffect, useCallback } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { RootState } from '../../redux/store';
import { useAppDispatch } from '../../redux/hook';
import { loadBooks, remove, liked, showLiked } from '../../redux/books';

import Wrapper from '../../components/wrapper';
import LayoutHead from '../../components/layout-head';
import List from '../../components/list';
import Item from '../../components/item';
import Loading from '../../components/loading';



function Main() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadBooks());
  }, [dispatch]);

  const select = useSelector((state: RootState) => ({
    list: state.books.list,
    showLiked: state.books.showLiked,
    loading: state.books.loading
  }), shallowEqual);

  const callbacks = {
    btnRemove: useCallback((id: number) =>  dispatch(remove(id)), [dispatch]),
    btnLiked: useCallback((id: number) =>  dispatch(liked(id)), [dispatch]),
    btnFilter: useCallback(() => dispatch(showLiked()), [dispatch])
  }

  interface Book {
    formats: {'image/jpeg': string};
    title: string;
    authors: {name: string, birth_year: number, death_year: number}[];
    id: number;
    liked: boolean;
  }

  const render = (item: Book) => {
    return (
      <Item
        imgURL={item.formats['image/jpeg']} 
        title={item.title} 
        author={item.authors[0]?.name}
        id={item.id}
        btnRemove={callbacks.btnRemove}
        liked={item.liked}
        btnLiked={callbacks.btnLiked}
      />
    )
  }

  if (select.loading) {
    return (
      <Wrapper>
        <Loading/>
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <LayoutHead title='Список книг'>
        <button onClick={callbacks.btnFilter} style={{fontSize: '18px', cursor: 'pointer'}}>
          {select.showLiked ? 'Показать все' : 'Показать избранные'}
        </button>
      </LayoutHead>
      <List items={select.list} renderItem={render} showLiked={select.showLiked}/>
    </Wrapper>
  )
}

export default Main;
