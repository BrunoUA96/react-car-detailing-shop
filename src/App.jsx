import './scss/app.scss';
import Header from './components/Header';
import Home from './routes/Home';
import { Route, Routes } from 'react-router-dom';
import Cart from './routes/Cart';
import { createContext, useState } from 'react';

export const SearchContext = createContext();

function App() {
   const [searchValue, setSearchValue] = useState('');

   return (
      <div className="wrapper">
         <SearchContext.Provider value={{ searchValue, setSearchValue }}>
            <Header />
            <div className="content">
               <div className="container">
                  <Routes>
                     <Route index element={<Home />} />
                     <Route path="cart" element={<Cart />} />
                     <Route path="*" element={<h1>Not Found</h1>} />
                  </Routes>
               </div>
            </div>
         </SearchContext.Provider>
      </div>
   );
}

export default App;
