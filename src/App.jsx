import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './scss/app.scss';
import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import CarPartBlock from './components/CarPartBlock';
import products from './data/products.json';

function App() {
   const [count, setCount] = useState(0);

   return (
      <div className="wrapper">
         <Header />
         <div className="content">
            <div className="container">
               <div className="content__top">
                  <Categories />
                  <Sort />
               </div>
               <h2 className="content__title">All parts</h2>
               <div className="content__items">
                  {products.map((obj, index) => (
                     <CarPartBlock key={index + obj.title} {...obj} />
                  ))}
               </div>
            </div>
         </div>
      </div>
   );
}

export default App;
