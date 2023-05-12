import { useContext, useEffect, useRef, useState } from 'react';

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
   // Use this ref to check url params
   const initialParams = useRef(false);
   const isMounted = useRef(false);

   // State for Category
   const categoryId = useSelector((state) => state.filters.category);
   const isLoading = useSelector((state) => state.loading.isLoading);

   // State for SortBy
   const sortItem = useSelector((state) => state.filters.sortItem);

   // Pagination state
   const pagination = useSelector((state) => state.filters.pagination);

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

   // Only first render, check url params
   // If there are parameters, use them on the first render
   useEffect(() => {
      if (window.location.search) {
         const urlParams = qs.parse(window.location.search, { ignoreQueryPrefix: true });

         // To find selected sort obj in the sortOptions list
         const sortObj = sortOptions.find(
            (obj) => obj.property == urlParams._sort && obj.orderBy == urlParams._order,
         );

         dispatch(setFilters({ ...urlParams, sortObj }));

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

         const queryParams = qs.stringify({ ...params }, { addQueryPrefix: true });

         navigate(queryParams);
      }

      isMounted.current = true;
   }, [categoryId, sortItem, pagination.currentPage, pagination.itemsPerPage, searchValue]);

   useEffect(() => {
      window.scrollTo(0, 0);

      if (!initialParams.current) {
         fetchItems();
      }

      initialParams.current = false;
   }, [categoryId, sortItem, pagination.currentPage, pagination.itemsPerPage, searchValue]);

   const fetchItems = async () => {
      dispatch(setIsLoading(true));

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
      try {
         const baseAPI = 'http://localhost:3000/products';

         const [items, quantity] = await axios.all([
            // First get to items per page
            axios.get(baseAPI, { params: { ...params } }),
            // Second get return all items with selected caregory, to calculate quantity pagination pages
            axios.get(baseAPI, {
               params: { category: params.category, title_like: params.title_like },
            }),
         ]);

         // Save Products
         setProducts(items.data);

         // Count number of pages
         dispatch(
            setPaginationCount(Math.ceil(quantity.data.length / Number(pagination.itemsPerPage))),
         );
      } catch (error) {
         console.log(error);
         window.alert('Products are currently unavailable');
      } finally {
         dispatch(setIsLoading(false));
      }
   };

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
