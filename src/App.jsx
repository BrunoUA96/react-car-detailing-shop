import './scss/app.scss';
import Header from './components/Header';
import Home from './routes/Home';
import { Route, Routes } from 'react-router-dom';
import Cart from './routes/Cart';
import { useState } from 'react';

function App() {
   const [searchValue, setSearchValue] = useState('');

   return (
      <div className="wrapper">
         <Header searchValue={searchValue} setSearchValue={setSearchValue} />
         <div className="content">
            <div className="container">
               <Routes>
                  <Route index element={<Home searchValue={searchValue} />} />
                  <Route path="cart" element={<Cart />} />
                  <Route path="*" element={<h1>Not Found</h1>} />
               </Routes>
            </div>
         </div>
      </div>
   );
}

export default App;
