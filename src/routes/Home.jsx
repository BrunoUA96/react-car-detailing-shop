import { useEffect, useState } from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import ProductCard from '../components/ProductCard';
import Skeleton from '../components/ProductCard/Skeleton';

const Home = () => {
   const baseAPI = 'http://localhost:3000/products';

   const [products, setProducts] = useState([]);
   const [isLoading, setIsLoading] = useState(true);

   // State for Category component
   const [categoryId, setCategoryId] = useState(0);

   // State for Sort component
   const [sortId, setSortId] = useState(0);

   useEffect(() => {
      fetch(baseAPI)
         .then((res) => res.json())
         .then((json) => {
            setProducts(json);
            setIsLoading(false);
         });
   }, []);

   return (
      <>
         <div className="content__top">
            <Categories categoryId={categoryId} setCategoryId={(id) => setCategoryId(id)} />
            <Sort sortId={sortId} setSortId={(id) => setSortId(id)} />
         </div>
         <h2 className="content__title">All products</h2>
         <div className="content__items">
            {isLoading
               ? [...new Array(8)].map((_, index) => <Skeleton key={index} />)
               : products.map((obj, index) => <ProductCard key={index + obj.title} {...obj} />)}
         </div>
      </>
   );
};

export default Home;
