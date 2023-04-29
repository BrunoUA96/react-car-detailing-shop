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
                  <span>
                     <svg
                        viewBox="-4.5 0 20 20"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink">
                        <g
                           id="Page-1"
                           stroke="none"
                           stroke-width="1"
                           fill="none"
                           fill-rule="evenodd">
                           <g
                              id="Dribbble-Light-Preview"
                              transform="translate(-345.000000, -6679.000000)"
                              fill="#000000">
                              <g id="icons" transform="translate(56.000000, 160.000000)">
                                 <path
                                    d="M299.633777,6519.29231 L299.633777,6519.29231 C299.228878,6518.90256 298.573377,6518.90256 298.169513,6519.29231 L289.606572,6527.55587 C288.797809,6528.33636 288.797809,6529.60253 289.606572,6530.38301 L298.231646,6538.70754 C298.632403,6539.09329 299.27962,6539.09828 299.685554,6538.71753 L299.685554,6538.71753 C300.100809,6538.32879 300.104951,6537.68821 299.696945,6537.29347 L291.802968,6529.67648 C291.398069,6529.28574 291.398069,6528.65315 291.802968,6528.26241 L299.633777,6520.70538 C300.038676,6520.31563 300.038676,6519.68305 299.633777,6519.29231"
                                    id="arrow_left-[#335]"></path>
                              </g>
                           </g>
                        </g>
                     </svg>
                  </span>
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
                  <span>
                     <svg
                        width="800px"
                        height="800px"
                        viewBox="-4.5 0 20 20"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink">
                        <g
                           id="Page-1"
                           stroke="none"
                           stroke-width="1"
                           fill="none"
                           fill-rule="evenodd">
                           <g
                              id="Dribbble-Light-Preview"
                              transform="translate(-305.000000, -6679.000000)"
                              fill="#000000">
                              <g id="icons" transform="translate(56.000000, 160.000000)">
                                 <path
                                    d="M249.365851,6538.70769 L249.365851,6538.70769 C249.770764,6539.09744 250.426289,6539.09744 250.830166,6538.70769 L259.393407,6530.44413 C260.202198,6529.66364 260.202198,6528.39747 259.393407,6527.61699 L250.768031,6519.29246 C250.367261,6518.90671 249.720021,6518.90172 249.314072,6519.28247 L249.314072,6519.28247 C248.899839,6519.67121 248.894661,6520.31179 249.302681,6520.70653 L257.196934,6528.32352 C257.601847,6528.71426 257.601847,6529.34685 257.196934,6529.73759 L249.365851,6537.29462 C248.960938,6537.68437 248.960938,6538.31795 249.365851,6538.70769"
                                    id="arrow_right-[#336]"></path>
                              </g>
                           </g>
                        </g>
                     </svg>
                  </span>
               </li>
            </ul>
         )}
      </>
   );
};

export default Home;
