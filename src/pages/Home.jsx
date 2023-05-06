import { useContext, useEffect, useState } from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import ProductCard from '../components/ProductCard';
import Skeleton from '../components/ProductCard/Skeleton';
import Pagination from '../components/Pagination';

import axios from 'axios';
import { SearchContext } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId, setFilters, setSortItem } from '../redux/slices/fitersSlice';
import { setIsLoading } from '../redux/slices/loadingSlice';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { setCurrentPage, setPaginationCount } from '../redux/slices/fitersSlice';
import { sortOptions } from '../components/Sort';

const Home = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   // State for Category
   const categoryId = useSelector((state) => state.filters.category);
   const isLoading = useSelector((state) => state.loading.isLoading);
   const currentPage = useSelector((state) => state.filters.pagination.currentPage);

   // State for SortBy
   const sortItem = useSelector((state) => state.filters.sortItem);

   const [products, setProducts] = useState([]);

   const { searchValue } = useContext(SearchContext);

   // Im use these two functions (changeCategory,changeSort) to reset pagination
   // If (Category || Sort) has been changet
   function changeCategory(id) {
      dispatch(setCategoryId(id));
      if (categoryId != id) dispatch(setCurrentPage(1));
   }

   function changeSort(obj) {
      dispatch(setSortItem(obj));
      if (sortItem != obj) dispatch(setCurrentPage(1));
   }

   useEffect(() => {
      if (window.location.search) {
         const params = qs.parse(window.location.search, { ignoreQueryPrefix: true });

         // To find selected sort obj in the sortOptions list
         const sortObj = sortOptions.find(
            (obj) => obj.property == params._sort && obj.orderBy == params._order,
         );

         dispatch(setFilters({ ...params, sortObj }));
      }
   }, []);

   const baseAPI = 'http://localhost:3000/products';
   useEffect(() => {
      window.scrollTo(0, 0);
      const params = {
         // if category 'All products' is selected, i dont need param 'category' in params
         ...(categoryId && { category: categoryId }),
         _sort: sortItem.property,
         _order: sortItem.orderBy,
         _page: currentPage,
         // _limit has static number, thus i limit number of items per page
         _limit: '12',
         ...(searchValue && { q: searchValue }),
      };

      const queryParams = qs.stringify({ ...params }, { addQueryPrefix: true });

      navigate(queryParams);

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
                  dispatch(setPaginationCount(Math.ceil(pagination.data.length / 12)));

                  dispatch(setIsLoading(false));
               }),
            );
      } catch (error) {
         dispatch(setIsLoading(true));
         console.error(error);
      }
   }, [categoryId, sortItem, currentPage, searchValue]);

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
         <Pagination />
      </>
   );
};

export default Home;
