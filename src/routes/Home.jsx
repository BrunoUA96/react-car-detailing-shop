import { useEffect, useState } from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import ProductCard from '../components/ProductCard';
import Skeleton from '../components/ProductCard/Skeleton';

import axios from 'axios';

const Home = () => {
   const baseAPI = 'http://localhost:3000/products';

   const [products, setProducts] = useState([]);
   const [isLoading, setIsLoading] = useState(true);

   // State for Category component
   const [categoryId, setCategoryId] = useState(0);

   // State for Sort component
   const [sortId, setSortId] = useState(0);

   // Pagination state
   const [page, setPage] = useState(1);

   const [paginationCount, setPaginationCount] = useState(1);

   // Im use these two functions (changeCategory,changeSort) to reset pagination
   // If (Category || Sort) has been changet
   function changeCategory(id) {
      setCategoryId(id);
      if (categoryId != id) setPage(1);
   }

   function changeSort(id) {
      setSortId(id);
      if (sortId != id) setPage(1);
   }

   useEffect(() => {
      const categoryFirter = categoryId ? `category=${categoryId}` : '';

      const typeOfSort = sortId < 2 ? 'price' : 'title';
      const ascDescSort = sortId == 0 || sortId == 2 ? 'asc' : 'desc';

      const sortFilter = `_sort=${typeOfSort}&_order=${ascDescSort}`;

      const pageFilter = `&_page=${page}`;

      try {
         axios
            .all([
               axios.get(
                  `${baseAPI}?${
                     categoryFirter ? categoryFirter + '&' : ''
                  }${sortFilter}${pageFilter}`,
               ),
               axios.get(`${baseAPI}?${categoryFirter ? categoryFirter + '&' : ''}${sortFilter}`),
            ])
            .then(
               axios.spread((items, pagination) => {
                  // output of req.
                  setProducts(items.data);
                  setPaginationCount(Math.round(pagination.data.length / 10));

                  setIsLoading(false);
               }),
            );
      } catch (error) {
         setIsLoading(true);
         console.error(error);
      }
   }, [categoryId, sortId, page]);

   return (
      <>
         {/* Categories & Sort */}
         <div className="content__top">
            <Categories categoryId={categoryId} setCategoryId={(id) => changeCategory(id)} />
            <Sort sortId={sortId} setSortId={(id) => changeSort(id)} />
         </div>
         <h2 className="content__title">All products</h2>
         {/* Product List */}
         <div className="content__items">
            {isLoading
               ? [...new Array(8)].map((_, index) => <Skeleton key={index} />)
               : products.map((obj, index) => <ProductCard key={index + obj.title} {...obj} />)}
         </div>
         {/* Pagination */}
         {paginationCount > 1 && (
            <ul className="content__pagination">
               <li
                  className={page != 1 ? 'active' : 'cursor-none'}
                  onClick={page != 1 ? () => setPage(page - 1) : null}>
                  <span>Prev</span>
               </li>

               {[...new Array(paginationCount)].map((_, index) => (
                  <li
                     className={page === index + 1 ? 'active  cursor-none' : ''}
                     key={index}
                     onClick={() => setPage(index)}>
                     <span>{++index}</span>
                  </li>
               ))}

               <li
                  className={page != paginationCount ? 'active' : 'cursor-none'}
                  onClick={page != paginationCount ? () => setPage(page + 1) : null}>
                  <span>Next</span>
               </li>
            </ul>
         )}
      </>
   );
};

export default Home;
