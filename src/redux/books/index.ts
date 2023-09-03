import { createSlice, PayloadAction, createAsyncThunk, AnyAction } from '@reduxjs/toolkit';

type MyBooks = {
  count: number;
  next: string | null;
  previos: string | null;
  results: any[];
}

export const loadBooks = createAsyncThunk<MyBooks, undefined, { rejectValue: string }>(
  'books/loadBooks',
  async (_, { rejectWithValue }) => {
    const response = await fetch(`https://gutendex.com/books`);
    if (!response.ok) {
      return rejectWithValue('Server Error!');
    }
    return (await response.json());
  }
)

type Book = {
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
}

type BooksState = {
  list: Book[];
  loading: boolean;
  error: string | null;
  showLiked: boolean;
}

const initialState: BooksState = {
  list: [],
  loading: false,
  error: null,
  showLiked: false
}

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    remove(state, action: PayloadAction<number>) {
      const index = state.list.findIndex(e => e.id === action.payload);
      if (index !== -1) state.list.splice(index, 1);
    },
    liked(state, action: PayloadAction<number>) {
      const index = state.list.findIndex(e => e.id === action.payload);
      if (index !== -1) state.list[index].liked = !state.list[index].liked;
    },
    showLiked(state) {
      state.showLiked = !state.showLiked;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.results;
      })
      .addCase(loadBooks.rejected, (state, action: AnyAction) => {
        state.error = action.payload;
        state.loading = false;
      })
  }
});

export const { remove, liked, showLiked } = booksSlice.actions;
export default booksSlice.reducer;
