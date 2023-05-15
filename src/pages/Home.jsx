import { useContext, useEffect, useRef } from 'react';

import Categories, { categoryList } from '../components/Categories';
import Sort from '../components/Sort';
import ProductCard from '../components/ProductCard';
import Skeleton from '../components/ProductCard/Skeleton';
import Pagination from '../components/Pagination';

import { SearchContext } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import {
   selectFilterCategory,
   selectFilterSortItem,
   setCategoryId,
   setFilters,
   setSortItem,
} from '../redux/slices/fitersSlice';
import {
   selectProductPagination,
   selectProducts,
   setCurrentPage,
   setItemsPerPage,
} from '../redux/slices/productSlice';
import qs from 'qs';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchProducts } from '../redux/slices/productSlice';
import { sortOptions } from '../components/Sort';

const Home = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const location = useLocation();

   // Use this ref to check url params
   const initialParams = useRef(false);
   const isMounted = useRef(false);

   // State for Category
   const categoryId = useSelector(selectFilterCategory);

   // State for SortBy
   const sortItem = useSelector(selectFilterSortItem);

   const { products, status } = useSelector(selectProducts);

   const pagination = useSelector(selectProductPagination);

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

   // Only first render, check url params
   // If url has parameters, use them on the first render
   useEffect(() => {
      // Check if url params exist in the first render
      if (location.search) {
         // Destructuring url params
         const { category, _sort, _order, _page, _limit } = qs.parse(location.search, {
            // Use to delete '?' from params
            ignoreQueryPrefix: true,
         });

         // if exist pagination params
         if (_page) dispatch(setCurrentPage(Number(_page)));
         if (_limit) dispatch(setItemsPerPage(_limit));

         // To find selected sort obj in the sortOptions list
         const sortObj = sortOptions.find((obj) => obj.property == _sort && obj.orderBy == _order);

         // If success find param in params list
         if (sortObj) dispatch(setFilters({ category, sortObj }));

         initialParams.current = true;
      }
   }, []);

   // First render, i need to check
   useEffect(() => {
      if (isMounted.current) {
         const params = {
            // if category 'All products' is selected, i dont need param 'category' in params
            ...(categoryId && { category: categoryId }),
            _sort: sortItem.property,
            _order: sortItem.orderBy,
            ...(pagination.itemsPerPage != 'all' && { _page: pagination.currentPage }),
            // _limit has static number, thus i limit number of items per page
            ...(pagination.itemsPerPage != 'all' && { _limit: pagination.itemsPerPage }),
            ...(searchValue && { title_like: searchValue }),
         };

         const queryParams = qs.stringify({ ...params }, { addQueryPrefix: true }); //addQueryPrefix add '?' before params

         navigate(queryParams);
      }

      isMounted.current = true;
   }, [categoryId, sortItem, pagination.currentPage, pagination.itemsPerPage, searchValue]);

   useEffect(() => {
      window.scrollTo(0, 0);

      if (!initialParams.current) {
         getProducts();
      }

      initialParams.current = false;
   }, [categoryId, sortItem, pagination.currentPage, pagination.itemsPerPage, searchValue]);

   const getProducts = async () => {
      const params = {
         // if category 'All products' is selected, i dont need param 'category' in params
         ...(categoryId && { category: categoryId }),
         _sort: sortItem.property,
         _order: sortItem.orderBy,
         ...(pagination.itemsPerPage != 'all' && { _page: pagination.currentPage }),
         // _limit has static number, thus i limit number of items per page
         ...(pagination.itemsPerPage != 'all' && { _limit: pagination.itemsPerPage }),
         ...(searchValue && { title_like: searchValue }),
      };

      // Get products
      dispatch(fetchProducts(params));
   };

   // Render skeleton component
   const skeleton = [...new Array(8)].map((_, index) => <Skeleton key={index} />);

   // Render product list
   const productList = products.map((obj, index) => (
      <ProductCard key={index + obj.title} {...obj} />
   ));

   return (
      <>
         {/* Categories & Sort */}
         <div className="content__top">
            <Categories categoryId={categoryId} setCategoryId={(id) => changeCategory(id)} />
            <Sort sortItem={sortItem} setSortItem={(obj) => changeSort(obj)} />
         </div>
         <h2 className="content__title">{categoryList[categoryId]}</h2>
         {/* Product List */}
         {status === 'error' ? (
            <div className="content__items--error">
               <h2>
                  Something is wrong <span>😕</span>
               </h2>
               <p>Try refreshing the page later</p>
            </div>
         ) : (
            <div className="content__items">{status === 'loading' ? skeleton : productList}</div>
         )}
         {/* Pagination */}
         {status === 'success' && <Pagination />}
      </>
   );
};

export default Home;
