import { useContext, useEffect, useState } from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import ProductCard from '../components/ProductCard';
import Skeleton from '../components/ProductCard/Skeleton';
import Pagination from '../components/Pagination';

import axios from 'axios';
import { SearchContext } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId, setSortItem } from '../redux/slices/fiterSlice';
import { setIsLoading } from '../redux/slices/loadingSlice';

const Home = () => {
   const dispatch = useDispatch();
   // State for Category
   const categoryId = useSelector((state) => state.filters.category);
   const isLoading = useSelector((state) => state.loading.isLoading);

   console.log(isLoading);

   // State for SortBy
   const sortItem = useSelector((state) => state.filters.sortItem);

   const [products, setProducts] = useState([]);
   // const [isLoading, setIsLoading] = useState(true);

   // Use to calculate number of pages
   const [paginationCount, setPaginationCount] = useState(1);

   // Pagination state
   const [page, setPage] = useState(1);

   const { searchValue } = useContext(SearchContext);

   // Im use these two functions (changeCategory,changeSort) to reset pagination
   // If (Category || Sort) has been changet
   function changeCategory(id) {
      dispatch(setCategoryId(id));
      if (categoryId != id) setPage(1);
   }

   function changeSort(obj) {
      dispatch(setSortItem(obj));
      if (sortItem != obj) setPage(1);
   }

   const baseAPI = 'http://localhost:3000/products';
   useEffect(() => {
      const params = {
         // if category 'All products' is selected, i dont need param 'category' in params
         ...(categoryId && { category: categoryId }),
         _sort: sortItem.property,
         _order: sortItem.orderBy,
         _page: page,
         // _limit has static number, thus i limit number of items per page
         _limit: '12',
         ...(searchValue && { q: searchValue }),
      };

      try {
         dispatch(setIsLoading(true));

         axios
            .all([
               axios.get(baseAPI, { params: { ...params } }),
               axios.get(baseAPI, {
                  params: { category: params.category, q: params.q },
               }),
            ])
            .then(
               axios.spread((items, pagination) => {
                  // output of req.
                  setProducts(items.data);
                  // Count number of pages
                  setPaginationCount(Math.ceil(pagination.data.length / 12));

                  dispatch(setIsLoading(false));
               }),
            );
      } catch (error) {
         dispatch(setIsLoading(true));
         console.error(error);
      }
   }, [categoryId, sortItem, page, searchValue]);

   return (
      <>
         {/* Categories & Sort */}
         <div className="content__top">
            <Categories categoryId={categoryId} setCategoryId={(id) => changeCategory(id)} />
            <Sort sortItem={sortItem} setSortItem={(obj) => changeSort(obj)} />
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
            <Pagination
               page={page}
               setPage={(pageNum) => setPage(pageNum)}
               paginationCount={paginationCount}
            />
         )}
      </>
   );
};

export default Home;
