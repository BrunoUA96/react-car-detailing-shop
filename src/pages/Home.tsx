import qs from "qs";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import Categories, { categoryList } from "../components/Categories";
import Pagination from "../components/Pagination";
import ProductCard from "../components/ProductCard";
import Skeleton from "../components/ProductCard/Skeleton";
import { Sort } from "../components/Sort";
import { sortOptions } from "../components/Sort";
import {
  selectFilterCategory,
  selectFilterSortItem,
} from "../redux/filters/selectors";
import { setCategoryId, setFilters } from "../redux/filters/slice";
import { fetchProducts } from "../redux/products/asyncActions";
import {
  selectProductPagination,
  selectProducts,
} from "../redux/products/selectors";
import { setCurrentPage, setItemsPerPage } from "../redux/products/slice";
import { URLParamsType } from "../redux/products/types";
import { selectSearchValue } from "../redux/search/selectors";
import { store } from "../redux/store";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  // Use this ref to check url params
  const initialParams = React.useRef(false);
  const isMounted = React.useRef(false);

  // State for Category
  const categoryId: number = useSelector(selectFilterCategory);

  // State for SortBy
  const sortItem = useSelector(selectFilterSortItem);

  const { products, status } = useSelector(selectProducts);

  const pagination: any = useSelector(selectProductPagination);

  const { searchValue } = useSelector(selectSearchValue);

  // Im use these two functions (changeCategory) to reset pagination
  // If (Category) has been changet
  const changeCategory = React.useCallback((id: number) => {
    dispatch(setCategoryId(id));
    if (categoryId != id) dispatch(setCurrentPage(1));
  }, []);

  // Only first render, check url params
  // If url has parameters, use them on the first render
  useEffect(() => {
    // Check if url params exist in the first render
    if (location.search) {
      // Destructuring url params
      const { category, _sort, _order, _page, _limit } = qs.parse(
        location.search,
        {
          // Use to delete '?' from params
          ignoreQueryPrefix: true,
        }
      ) as unknown as URLParamsType;

      // If does not have category put 0
      const categoryParam = category || 0;

      // if exist pagination params
      if (_page) dispatch(setCurrentPage(Number(_page)));
      if (_limit) dispatch(setItemsPerPage(Number(_limit)));

      // To find selected sort obj in the sortOptions list
      const sortItem = sortOptions.find(
        (obj) => obj.property == _sort && obj.orderBy == _order
      );

      // If success find param in params list
      dispatch(
        setFilters({
          category: categoryParam,
          // If sortItem == undefined put first item from sortOptions list
          sortItem: sortItem || sortOptions[0],
        })
      );

      initialParams.current = true;
    }
  }, []);

  // First render, i need to check
  useEffect(() => {
    if (isMounted.current) {
      const params: URLParamsType = {
        // if category 'All products' is selected, i dont need param 'category' in params
        ...(categoryId && { category: categoryId }),
        _sort: sortItem.property,
        _order: sortItem.orderBy,
        ...(pagination.itemsPerPage != "all" && {
          _page: pagination.currentPage,
        }),
        // _limit has static number, thus i limit number of items per page
        ...(pagination.itemsPerPage != "all" && {
          _limit: pagination.itemsPerPage,
        }),
        ...(searchValue && { title_like: searchValue }),
      };

      const queryParams = qs.stringify({ ...params }, { addQueryPrefix: true }); //addQueryPrefix add '?' before params

      navigate(queryParams);
    }

    isMounted.current = true;
  }, [
    categoryId,
    sortItem,
    pagination.currentPage,
    pagination.itemsPerPage,
    searchValue,
  ]);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!initialParams.current) {
      getProducts();
    }

    initialParams.current = false;
  }, [
    categoryId,
    sortItem,
    pagination.currentPage,
    pagination.itemsPerPage,
    searchValue,
  ]);

  // Get products
  const getProducts = async () => {
    const params: URLParamsType = {
      // if category 'All products' is selected, i dont need param 'category' in params
      ...(categoryId && { category: categoryId }),
      _sort: sortItem.property,
      _order: sortItem.orderBy,
      ...(pagination.itemsPerPage != "all" && {
        _page: pagination.currentPage,
      }),
      // _limit has static number, thus i limit number of items per page
      ...(pagination.itemsPerPage != "all" && {
        _limit: pagination.itemsPerPage,
      }),
      ...(searchValue && { title_like: searchValue }),
    };

    // Cant use useAppDispatch.... error: Expected 0 arguments, but got 1
    // Using store.dispatch to fix this error
    store.dispatch(fetchProducts(params));
  };

  // Render skeleton component
  const skeleton = [...new Array(8)].map((_, index) => (
    <Skeleton key={index} />
  ));

  // Render product list
  const productList = products.map((obj: any, index: number) => (
    <ProductCard key={index + obj.title} {...obj} />
  ));

  return (
    <>
      {/* Categories & Sort */}
      <div className="content__top">
        <Categories categoryId={categoryId} setCategoryId={changeCategory} />
        <Sort sortOption={sortItem} />
      </div>
      <h2 className="content__title">{categoryList[categoryId]}</h2>
      {/* Product List */}
      {status === "error" ? (
        <div className="content__items--error">
          <h2>
            Something is wrong <span>😕</span>
          </h2>
          <p>Try refreshing the page later</p>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading" ? skeleton : productList}
        </div>
      )}
      {/* Pagination */}
      {status === "success" && <Pagination />}
    </>
  );
};

export default Home;
