import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Main from './main';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path={'lists-of-books'} element={<Main/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;